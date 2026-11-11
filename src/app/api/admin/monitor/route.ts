import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get('adminId');
    const timeRange = searchParams.get('range') || '24h';

    if (!adminId) {
      return NextResponse.json(
        { success: false, error: 'Admin ID required' },
        { status: 401 }
      );
    }

    // Calculate time range
    let interval = "INTERVAL '24 hours'";
    if (timeRange === '7d') interval = "INTERVAL '7 days'";
    if (timeRange === '30d') interval = "INTERVAL '30 days'";

    // Get suspicious activities (high risk scores)
    const suspiciousActivities = await query(
      `SELECT pa.id, pa.user_id, pu.email, pu.username, pa.ip_address, 
              pa.action, pa.details, pa.risk_score, pa.flagged, pa.created_at
       FROM player_activity pa
       LEFT JOIN premium_users pu ON pa.user_id = pu.id
       WHERE pa.risk_score >= 50 
         AND pa.created_at > CURRENT_TIMESTAMP - ${interval}
       ORDER BY pa.risk_score DESC, pa.created_at DESC
       LIMIT 100`
    );

    // Get failed login attempts
    const failedLogins = await query(
      `SELECT COUNT(*) as failed_count, pa.ip_address
       FROM player_activity pa
       WHERE pa.action = 'failed_login'
         AND pa.created_at > CURRENT_TIMESTAMP - ${interval}
       GROUP BY pa.ip_address
       HAVING COUNT(*) >= 5
       ORDER BY failed_count DESC
       LIMIT 20`
    );

    // Get rapid purchase patterns (potential fraud)
    const rapidPurchases = await query(
      `SELECT pa.user_id, pu.email, COUNT(*) as purchase_count, SUM((pa.details->>'amount')::float) as total_spent
       FROM player_activity pa
       LEFT JOIN premium_users pu ON pa.user_id = pu.id
       WHERE pa.action = 'token_purchase'
         AND pa.created_at > CURRENT_TIMESTAMP - ${interval}
       GROUP BY pa.user_id, pu.email
       HAVING COUNT(*) >= 10
       ORDER BY purchase_count DESC
       LIMIT 20`
    );

    // Get flagged users summary
    const flaggedUsers = await query(
      `SELECT pu.id, pu.email, pu.username, COUNT(pa.id) as flagged_count, MAX(pa.risk_score) as max_risk
       FROM premium_users pu
       LEFT JOIN player_activity pa ON pa.user_id = pu.id AND pa.flagged = TRUE
       GROUP BY pu.id, pu.email, pu.username
       HAVING COUNT(pa.id) > 0
       ORDER BY max_risk DESC
       LIMIT 50`
    );

    // Log admin monitoring access
    await query(
      `INSERT INTO admin_audit_log (admin_id, action, details, ip_address)
       VALUES ($1, $2, $3, $4)`,
      [adminId, 'security_monitor', JSON.stringify({ timeRange }), 
       request.headers.get('x-forwarded-for') || 'unknown']
    );

    return NextResponse.json({
      success: true,
      suspiciousActivities: suspiciousActivities.rows,
      failedLogins: failedLogins.rows,
      rapidPurchases: rapidPurchases.rows,
      flaggedUsers: flaggedUsers.rows,
      timeRange,
    });
  } catch (error: any) {
    console.error('Admin monitor error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch security data' },
      { status: 500 }
    );
  }
}