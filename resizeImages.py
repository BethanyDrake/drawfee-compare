from PIL import Image

from resizeimage import resizeimage

print("hello")

images = [
'src/images/1a.png',
'src/images/1b.png',
'src/images/1c.png',
'src/images/2a.png',
'src/images/2b.png',
'src/images/2c.png',
'src/images/2d.png',
'src/images/3a.png',
'src/images/3b.png',
'src/images/3c.png',
'src/images/4a.png',
'src/images/4b.png',
'src/images/4c.png',
]

for path in images:

  with open(path, 'r+b') as f:
      with Image.open(f) as image:
          cover = resizeimage.resize_cover(image, [250, 200])
          cover.save(path, image.format)
          print("done: "+path)


print("done")