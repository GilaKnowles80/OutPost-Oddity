// In any component
import { useTownshipStorage } from '../hooks/useTownshipStorage'

function TownshipPage() {
  const {
    savedBuildings,
    save,
    load,
    clear,
    exportData,
    importData,
    isLoading,
    error
  } = useTownshipStorage({
    storageKey: 'outpostOddity_township_save',
    playerName: 'DrArisThorne',
    autoSave: true,
  })
  
  // Example: Save button
  const handleSave = () => {
    save(savedBuildings) // Saves to localStorage + optional API
  }
  
  // Example: Load backup
  const handleLoadBackup = (backupData) => {
    const success = importData(backupData)
    if (success) {
      // Reload component or show notification
    }
  }
  
  return (
    <div>
      {/* Township builder using savedBuildings */}{/* Save/load controls */}
    </div>
  )
}
