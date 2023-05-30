# HOW TO RUN + BUILD

## serve
node_modules/.bin/eleventy --serve --input=src

## make build
node_modules/.bin/eleventy --input=src


# NOTES

## direnv
allows config for different projects
https://direnv.net/#basic-installation
e.g. i can use eleventy command without prefixing it with "node_modules/.bin/", but only in that project folder


## card image background on start:
<div class="card-image" style="background-color: {{ project.data.cover.bgColor }};">

# TODO

[x] fix image paths
[x] rename css class blogpost into project
[x] fix imprint link in footer
[x] add project <header> into project layout / make into data fields
[x] regex for externalLink in project.njk
[x] set project color
[x] summary texts comp
[x] make cards dynamic
[] sort projects https://www.11ty.dev/docs/collections/#sorting