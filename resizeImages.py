from PIL import Image

from resizeimage import resizeimage

print("hello")

images ='''src/images/5a.png
src/images/5b.png
src/images/5c.png
src/images/5d.png
src/images/6a.png
src/images/6b.png
src/images/6c.png
src/images/6d.png
src/images/7a.png
src/images/7b.png
src/images/7c.png
src/images/8a.png
src/images/8b.png
src/images/8c.png
src/images/8d.png
src/images/9a.png
src/images/9b.png
src/images/9c.png
src/images/9d.png
src/images/10a.png
src/images/10b.png
src/images/10c.png
src/images/10d.png
'''.splitlines()


for path in images:

  with open(path, 'r+b') as f:
      with Image.open(f) as image:
          cover = resizeimage.resize_cover(image, [500, 400])
          cover.save(path, image.format)
          print("done: "+path)


print("done")