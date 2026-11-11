$path = 'c:\Users\Gila\outpost-oddity\src\app\page.tsx'
$lines = Get-Content -LiteralPath $path

$newLines = @()
$inPlayingMode = $false
$playingContent = @()
$braceCount = 0

foreach ($line in $lines) {
    # Detect start of playing mode JSX
    if ($line -match "\{gameMode === 'playing' && <div>") {
        $inPlayingMode = $true
        $braceCount = 1
        # Add variable definition before the content
        $newLines += "let playingView = null;"
        $newLines += "if (gameMode === 'playing') {"
        $newLines += "  playingView = ("
        $newLines += $line -replace "\{gameMode === 'playing' && <div>", "    <div>"
        continue
    }
    
    if ($inPlayingMode) {
        # Track braces to find the end of playing mode
        $braceCount += ($line -match "\{" | Measure-Object).Count
        $braceCount -= ($line -match "\}" | Measure-Object).Count
        
        if ($braceCount -le 0) {
            # End of playing mode - close the variable
            $newLines += "  );"
            $newLines += "}"
            $inPlayingMode = $false
            # Skip this line (it's the </div>})
            continue
        } else {
            $playingContent += $line
            continue
        }
    }
    
    $newLines += $line
}

# Replace the {playingView} placeholder
$finalLines = @()
foreach ($line in $newLines) {
    if ($line -match "\{playingView\}") {
        $finalLines += $line -replace "\{playingView\}", "{playingView}"
    } else {
        $finalLines += $line
    }
}

Set-Content -LiteralPath $path -Value $finalLines -Encoding UTF8
Write-Host "Page restructured successfully"