Add-Type -TypeDefinition @"
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
    public static extern bool MoveFile(string lpExistingFileName, string lpNewFileName);
}
"@

$dir = "D:\龙虾\QClaw\workspace\carelong-website\public\images\factory"
$renames = @("1.jpg","bolts-workshop-1.jpg"),@("2.jpg","bolts-workshop-2.jpg"),@("3.png","bolts-workshop-3.png"),@("4.jpg","bolts-workshop-4.jpg"),@("5.jpg","bolts-workshop-5.jpg"),@("6.jpg","bolts-workshop-6.jpg")
foreach ($r in $renames) {
    $src = Join-Path $dir $r[0]
    $dst = Join-Path $dir $r[1]
    $ok = [Win32]::MoveFile($src, $dst)
    if ($ok) { Write-Host "OK: $($r[0]) -> $($r[1])" }
    else { Write-Host "FAIL: $($r[0])" }
}
Get-ChildItem $dir\bolts* | ForEach-Object { Write-Host $_.Name ($_.Length/1MB).ToString("0.0") "MB" }