import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

export async function GET(request: Request) {
  try {
    const currentMonth = new Date().getMonth(); // 0 = Jan, 9 = Oct, 10 = Nov, 11 = Dec
    let activeSeason = 'Standard';
    let seasonalThemeMetadata: any = {};

    // 1. Determine the active season based on the real-world calendar matrix
    if (currentMonth === 9 || currentMonth === 10) {
      // Late October to November (Halloween transition)
      activeSeason = 'Spooky_Halloween';
      seasonalThemeMetadata = { 
        weather: 'Foggy', 
        skyColor: '#4a0e4e', 
        gimmickItem: 'Spooky_Pumpkin_Token',
        particles: 'falling_leaves'
      };
    } else if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
      // December, January, February (Winter & Christmas)
      activeSeason = 'Winter_Christmas';
      seasonalThemeMetadata = { 
        weather: 'Snowing_Purple', 
        skyColor: '#1a237e', 
        gimmickItem: 'Candy_Cane_Battery',
        particles: 'falling_snow'
      };
    } else if (currentMonth >= 2 && currentMonth <= 4) {
      // March, April, May (Spring)
      activeSeason = 'Spring_Blossom';
      seasonalThemeMetadata = { 
        weather: 'Pollen_Storm', 
        skyColor: '#2e7d32', 
        gimmickItem: 'Mega_Pollen_Filter',
        particles: 'falling_pollen'
      };
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      // June, July, August (Summer)
      activeSeason = 'Summer_Heatwave';
      seasonalThemeMetadata = { 
        weather: 'Solar_Flare', 
        skyColor: '#e65100', 
        gimmickItem: 'Cryo_Coolant_Cup',
        particles: 'heat_shimmer'
      };
    } else {
      // September and early October (Fall)
      activeSeason = 'Fall_Harvest';
      seasonalThemeMetadata = { 
        weather: 'Golden_Leaves', 
        skyColor: '#ef6c00', 
        gimmickItem: 'Golden_Leaf_Blueprint',
        particles: 'falling_golden_leaves'
      };
    }

    // 2. Return the dynamic parameters directly to your React components
    return NextResponse.json({
      success: true,
      season: activeSeason,
      month: currentMonth,
      config: seasonalThemeMetadata
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to compute seasonal event parameters.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, current_episode, current_sector_id, space_inventory, recruited_crew } = body;

    await query(
      `INSERT INTO outpost_player_states (user_id, current_episode, current_sector_id, space_inventory, recruited_crew, last_saved_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) DO UPDATE SET
         current_episode = EXCLUDED.current_episode,
         current_sector_id = EXCLUDED.current_sector_id,
         space_inventory = EXCLUDED.space_inventory,
         recruited_crew = EXCLUDED.recruited_crew,
         last_saved_at = CURRENT_TIMESTAMP`,
      [user_id, current_episode, current_sector_id, JSON.stringify(space_inventory || []), JSON.stringify(recruited_crew || [])]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save progress.' }, { status: 500 });
  }
}

