$p = "c:\Users\hvmzv\Downloads\Riad_El_Omor_EMBEDDED_PHOTO_FINAL\index.html"
$c = [System.IO.File]::ReadAllText($p)
$old = "</script></body></html>"
$new = "</script><script src=""assets/js/i18n.js""></script></body></html>"
if ($c.Contains($old)) {
    $c = $c.Replace($old, $new)
    [System.IO.File]::WriteAllText($p, $c)
    Write-Host "Success"
} else {
    Write-Host "Not found"
}
