import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get('adminId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const flagged = searchParams.get('flagged');

    // Verify admin access (simplified - in production, verify admin role)
    if (!adminId) {
      return NextResponse.json(
        { success: false, error: 'Admin ID required' },
        { status: 401 }
      );
    }

    let whereClause = '';
    let params: any[] = [];

    if (flagged === 'true') {
      whereClause = 'WHERE pa.flagged = TRUE';
    }

    const result = await query(
      `SELECT pa.id, pa.user_id, pu.email, pu.username, pu.is_premium, pu.token_balance,
              pa.ip_address, pa.action, pa.details, pa.risk_score, pa.flagged, pa.created_at
       FROM player_activity pa
       LEFT JOIN premium_users pu ON pa.user_id = pu.id
       ${whereClause}
       ORDER BY pa.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) FROM player_activity pa ${whereClause}`,
      params
    );

    // Log admin access
    await query(
      `INSERT INTO admin_audit_log (admin_id, action, details, ip_address)
       VALUES ($1, $2, $3, $4)`,
      [adminId, 'view_players', JSON.stringify({ limit, offset, flagged }), 
       request.headers.get('x-forwarded-for') || 'unknown']
    );

    return NextResponse.json({
      success: true,
      players: result.rows,
      total: parseInt(countResult.rows[0].count),
    });
  } catch (error: any) {
    console.error('Admin players error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { adminId, userId, action, details } = body;

    if (!adminId || !userId || !action) {
      return NextResponse.json(
        { success: false, error: 'Admin ID, user ID, and action are required' },
        { status: 400 }
      );
    }

    // Flag or unflag user
    if (action === 'flag_user') {
      await query(
        `UPDATE player_activity SET flagged = TRUE WHERE user_id = $1 AND created_at > CURRENT_TIMESTAMP - INTERVAL '24 hours'`,
        [userId]
      );
    }

    if (action === 'unflag_user') {
      await query(
        `UPDATE player_activity SET flagged = FALSE WHERE user_id = $1`,
        [userId]
      );
    }

    if (action === 'suspend_user') {
      await query(
        `UPDATE premium_users SET is_premium = FALSE, token_balance = 0 WHERE id = $1`,
        [userId]
      );
    }

    // Log admin action
    await query(
      `INSERT INTO admin_audit_log (admin_id, action, target_user_id, details, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [adminId, action, userId, JSON.stringify(details || {}), 
       request.headers.get('x-forwarded-for') || 'unknown']
    );

    return NextResponse.json({ success: true, message: 'Admin action recorded' });
  } catch (error: any) {
    console.error('Admin action error:', error);
    return NextResponse.json(
      { success: false, error: 'Admin action failed' },
      { status: 500 }
    );
  }
}