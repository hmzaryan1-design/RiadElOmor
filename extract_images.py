import re
import base64
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all base64 images
matches = re.findall(r'data:image/jpeg;base64,([^"\')\s]+)', content)

print(f"Found {len(matches)} matches")

if len(matches) >= 1:
    with open('assets/img/hero-artist.jpg', 'wb') as f:
        f.write(base64.b64decode(matches[0]))
    print("Extracted hero-artist.jpg")

if len(matches) >= 2:
    with open('assets/img/showreel-bg.jpg', 'wb') as f:
        f.write(base64.b64decode(matches[1]))
    print("Extracted showreel-bg.jpg")
