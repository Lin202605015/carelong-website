$f = $args[0]
$c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# 匹配 expand-hint 行 + 换行 + collapse-hint 行 + 换行
$pattern = "(?s)<p class=""expand-hint"">.*?</p>\s*<p class=""collapse-hint"">.*?</p>\s*"
$count = ([regex]::Matches($c, $pattern)).Count
$c2 = [regex]::Replace($c, $pattern, '')
[System.IO.File]::WriteAllText($f, $c2, [System.Text.UTF8Encoding]::new($false))
Write-Host "Removed hint blocks: $count"