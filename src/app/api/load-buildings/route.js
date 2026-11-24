// src/app/api/load-buildings/route.js
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const playerName = searchParams.get('player') || 'default'
    
    // In production, fetch from Vercel Blob, database, etc.
    // For now, check localStorage first
    let savedBuildings = []
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('outpostOddity_buildings')
      if (stored) {
        savedBuildings = JSON.parse(stored)
      }
    }
    
    // Could also fetch from API based on playerName
    // const dbData = await fetch(`/api/save-buildings?player=${playerName}`)
    
    return NextResponse.json({
      success: true,
      buildings: savedBuildings,
      from: 'localStorage'
    })
    
  } catch (error) {
    console.error('Load error:', error)
    return NextResponse.json(
      { error: 'Failed to load buildings', buildings: [] }, 
      { status: 500 }
    )
  }
}
