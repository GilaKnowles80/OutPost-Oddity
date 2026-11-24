import { useState, useEffect, useCallback } from 'react'

// Hook for managing township save/load state
export function useTownshipStorage({
  storageKey = 'outpostOddity_buildings',
  playerName = 'default',
  autoSave = true,
} = {}) {
  
  const [savedBuildings, setSavedBuildings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      if (typeof window === 'undefined') return
      
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const data = JSON.parse(stored)
          setSavedBuildings(data.buildings || [])
        }
      } catch (e) {
        console.error('Failed to load from localStorage', e)
        setError('Failed to load saved data')
      }
    }
    
    loadFromStorage()
  }, [storageKey])
  
  // Save to localStorage
  const saveToStorage = useCallback((buildings) => {
    if (typeof window === 'undefined') return
    
    try {
      const saveData = {
        schemaVersion: '1.0',
        playerName,
        createdAt: localStorage.getItem(`${storageKey}_created`) || Date.now().toString(),
        lastModified: new Date().toISOString(),
        gridSize: 1,
        buildings: buildings.map(b => ({
          id: b.id || `bld_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: b.type,
          position: b.position,
          rotation: b.rotation || 0,
          scale: b.scale || 1,
          purchasedAt: b.purchasedAt || Date.now(),
          unlocked: b.unlocked !== undefined ? b.unlocked : true
        })),
        metadata: {
          totalBuildings: buildings.length,
          totalValue: buildings.reduce((sum, b) => sum + (b.value || 100), 0),
          notes: ''
        }
      }
      
      localStorage.setItem(storageKey, JSON.stringify(saveData))
      setSavedBuildings(buildings)
      
      // Also trigger auto-save to server if configured
      if (autoSave) {
        // Could call API here
      }
      
    } catch (e) {
      console.error('Failed to save to localStorage', e)
      setError('Failed to save game data')
    }
  }, [storageKey, playerName, autoSave])
  
  // Auto-save handler
  useEffect(() => {
    if (!autoSave) return
    
    const timer = setTimeout(() => {
      saveToStorage(savedBuildings)
    }, 1000) // Debounce: save 1s after last change
    
    return () => clearTimeout(timer)
  }, [savedBuildings, autoSave, saveToStorage])
  
  // Methods to expose
  const methods = {
    save: (buildingsOrCallback) => {
      const buildings = typeof buildingsOrCallback === 'function' 
        ? buildingsOrCallback(savedBuildings) 
        : buildingsOrCallback
      saveToStorage(buildings)
    },
    load: () => {
      return new Promise((resolve) => {
        const stored = typeof window !== 'undefined' ? 
          localStorage.getItem(storageKey) : null
        if (stored) {
          resolve(JSON.parse(stored).buildings)
        } else {
          resolve([])
        }
      })
    },
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey)
        setSavedBuildings([])
      }
    },
    exportData: () => {
      if (typeof window === 'undefined') return null
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : null
    },
    importData: (data) => {
      if (!data) return
      try {
        localStorage.setItem(storageKey, JSON.stringify(data))
        setSavedBuildings(data.buildings || [])
        return true
      } catch (e) {
        console.error('Failed to import data', e)
        return false
      }
    }
  }
  
  return {
    savedBuildings,
    isLoading,
    error,
    ...methods
  }
}
