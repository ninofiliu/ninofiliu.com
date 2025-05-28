$files = Get-ChildItem -Path ./src/media -Include "*.jpg", "*.png", "*.webp" -Recurse

foreach ($file in $files) {
    $json = ffprobe.exe $file.FullName -hide_banner -print_format json -show_streams -v quiet
    $w = $json | jq '.streams[0].width'
    $h = $json | jq '.streams[0].height'
    if ($w -gt 1920 -or $h -gt 1080) {
        echo "$w x $h $($file.FullName)"
        $big = $file.DirectoryName + "/" + $file.BaseName + "_big" + $file.Extension
        mv $file.FullName $big
        convert $big -resize "1920x1080>" $file.FullName
        rm $big
    }
}