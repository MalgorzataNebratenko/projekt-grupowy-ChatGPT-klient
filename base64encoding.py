import os
import base64
from PIL import Image
from io import BytesIO

def encodeImage(imageData):
    return base64.b64encode(imageData)

def decodeImage(imageData):  
    imageData = Image.open(BytesIO(base64.b64decode(imageData)))
    return imageData

def readFileData(file_name):
    file = open(file_name, "rb")
    return file.read()

def writeFileData(file_name, data): #data - dane do zapisania
    file = open(file_name, 'w')
    return file.write(data)
