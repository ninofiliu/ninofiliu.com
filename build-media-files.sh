#!/bin/sh

for file in media/*.{png,jpg,webp}; do
	[ ! -f $file ] && continue
	base=$(basename $file)
	desktop=public/desktop/$base.webp
	if [ ! -f $desktop ]; then
		convert $file -resize '960>' $desktop
	fi
	mobile=public/mobile/$base.webp
	if [ ! -f $mobile ]; then
		convert $file -resize '320>' $mobile
	fi
done

for file in media/*.{mp4,webm,mov}; do
	[ ! -f $file ] && continue
	base=$(basename $file)
	desktop=public/desktop/$base.webm
	if [ ! -f $desktop ]; then
		ffmpeg -i $file -vf "scale=960:-1" $desktop
	fi
	mobile=public/mobile/$base.webm
	if [ ! -f $mobile ]; then
		ffmpeg -i $file -vf "scale=320:-1" $mobile
	fi
done
