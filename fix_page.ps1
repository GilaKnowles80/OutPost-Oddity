$path = 'c:\Users\Gila\outpost-oddity\src\app\page.tsx'
$lines = Get-Content -LiteralPath $path

# Find and remove the old EPISODES loop and getEpisodeTheme function
$newLines = @()
$skip = $false
$braceCount = 0

foreach ($line in $lines) {
    # Skip old EPISODES loop
    if ($line -match "for \(let ep = 1; ep <= 200; ep>\) \{") {
        $peek = $lines | Select-Object -Skip ($newLines.Count + 1) -First 3
        if ($peek -match "adventureTypes") {
            $skip = $true
            $braceCount = 1
            continue
        }
    }
    
    # Skip old getEpisodeTheme function
    if ($line -match "function getEpisodeTheme") {
        $skip = $true
        $braceCount = 1
        continue
    }
    
    if ($skip) {
        $braceCount += ($line -match "\{" | Measure-Object).Count
        $braceCount -= ($line -match "\}" | Measure-Object).Count
        if ($braceCount -le 0) {
            $skip = $false
        }
        continue
    }
    
    $newLines += $line
}

Set-Content -LiteralPath $path -Value $newLines -Encoding UTF8
Write-Host 'Old loop and getEpisodeTheme removed'

# Remove old getEpisodeTheme function
$oldTheme = [regex]::Escape("function getEpisodeTheme(ep: number): string {
  const themes = ['Oddity', 'Mystery', 'Chaos', 'Hilarity', 'Survival', 'Absurdity', 'Pandemonium', 'Bizarre', 'Nonsense', 'Quirk'];
  return themes[(ep - 1) % themes.length];
}")

$content = $content -replace $oldTheme, ""

# Remove the old EPISODES loop (everything from the second "for (let ep = 1" to before "export default")
# Find the second occurrence of the for loop
$oldLoopStart = [regex]::Escape("for (let ep = 1; ep <= 200; ep++) {
  const levels: LevelContent[] = [];

  for (let lv = 1; lv <= 9; lv++) {
    const adventureTypes = ['adventure', 'funny', 'farming', 'survival', 'mystery', 'comedy'];
    const type = adventureTypes[(ep + lv) % adventureTypes.length];

    levels.push({
      id: lv,
      type: 'adventure',
      title: `Level ${lv}: ${type.charAt(0).toUpperCase() + type.slice(1)} Challenge`,
      story: `Episode ${ep}, Level ${lv}: A ${type} encounter awaits. You must use your wits and space gear to survive the absurdity of the Outpost.`,
      rewardToken: type === 'farming' ? 'Space_Seed' : type === 'survival' ? 'Oxygen_Canister' : undefined,
    });
  }

  levels.push({
    id: 10,
    type: 'puzzle',
    title: `Level 10: The Token Vault`,
    story: `Episode ${ep}, Level 10: Solve the puzzle to win the ${ep % 3 === 0 ? 'Golden' : 'Silver'} Space Token! Without it, you cannot proceed to the next episode.`,
    rewardToken: `Episode_${ep}_Token`,
    requiredToken: ep > 1 ? `Episode_${ep - 1}_Token` : undefined,
  });

  EPISODES.push({
    id: ep,
    title: `Episode ${ep}`,
    subtitle: `The ${getEpisodeTheme(ep)} Saga`,
    story: `Welcome to Episode ${ep}! ${getEpisodeStory(ep)}`,
    levels,
  });
}")

$content = $content -replace $oldLoopStart, ""

# Add new helper functions before export default
$newHelpers = @"
function getLevelTypeTitle(type: string): string {
  const titles: Record<string, string> = {
    adventure: 'Cosmic Expedition',
    funny: 'Absurd Encounter',
    farming: 'Intergalactic Agriculture',
    survival: 'Hostile Environment Survival',
    building: 'Absurd Architecture',
    comedy: 'Interplanetary Stand-Up',
  };
  return titles[type] || 'Challenge';
}

function charName(ep: number): string {
  const names = ['Zorblax', 'Glimmer', 'Quark', 'Nebulon', 'Stardust', 'Cosmo', 'Nova', 'Orion', 'Lyra', 'Vega'];
  return names[(ep - 1) % names.length];
}

export default function OutpostOddityGame() {
"@

$content = $content -replace "export default function OutpostOddityGame() {", $newHelpers

Set-Content -LiteralPath $path -Value $content -Encoding UTF8
Write-Host 'Page fixed successfully'