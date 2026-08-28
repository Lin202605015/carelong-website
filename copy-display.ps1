$src = "D:\OneDrive\桌面\工厂图\Display Rack Workshop"
$dst = "C:\temp-display"
if (!(Test-Path $dst)) { New-Item -ItemType Directory $dst -Force | Out-Null }
$files = Get-ChildItem $src
foreach ($f in $files) {
    Copy-Item $f.FullName $dst
}
Get-ChildItem $dst | ForEach-Object { Write-Host $_.Name }
