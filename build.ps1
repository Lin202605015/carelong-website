$ErrorActionPreference = "Continue"
Set-Location "D:\龙虾\QClaw\workspace\carelong-website"
Write-Host "Building Carelong Website..."
npm run build 2>&1
Write-Host "Exit code: $LASTEXITCODE"
