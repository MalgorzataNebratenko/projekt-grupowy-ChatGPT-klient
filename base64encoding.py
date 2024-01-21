import os
import base64
from PIL import Image
from io import BytesIO

def remove_base64_prefix(encoded_bytes):
    prefix = b"data:image/jpeg;base64,"
    return encoded_bytes[len(prefix):] if encoded_bytes.startswith(prefix) else encoded_bytes

def encodeImage(imageData):
    return base64.b64encode(imageData)

def decodeImage(imageData):
    imageData = Image.open(BytesIO(base64.b64decode(imageData)))
    return imageData

def readFileData(file_name):
    file = open(file_name, "rb")
    return remove_base64_prefix(file.read())

def writeFileData(file_name, data): #data - dane do zapisania
    file = open(file_name, 'w')
    return file.write(data)

def writeImageFileData(file_name, data):
    img = Image.open(BytesIO(base64.b64decode(data)))
    return img.save(file_name, 'JPEG')