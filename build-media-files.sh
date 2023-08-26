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
	desktop=public/desktop/$base.mp4
	if [ ! -f $desktop ]; then
		ffmpeg -i $file -vf "scale=960:-2,fps=30" -crf 23 -pix_fmt yuv420p $desktop
	fi
	mobile=public/mobile/$base.mp4
	if [ ! -f $mobile ]; then
		ffmpeg -i $file -vf "scale=320:-2,fps=30" -crf 30 -pix_fmt yuv420p $mobile
	fi
done
