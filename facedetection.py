from deepface import DeepFace
import pandas as pd
import os

img_path="E:/Projekty/FaceDetectionDB/img.jpg"

db_path="E:/Projekty/FaceDetectionDB/face"

def compare_faces():

    # porównanie zdjęcia wejciowego ze zbiorem zdjęć znajdującymi się w podanym folderze
    # zwraca wszystkie podobne zdjęcia do podanego
    try:
        result = DeepFace.find(img_path, db_path)
    except ValueError:
        return "Nie rozpoznano twarzy"

    frame = pd.DataFrame(result[0])

    # podanie najpodobniejszego zdjęcia do obrazu wejciowego
    dbPathResult = frame.get('identity')[0]
    
    closestImage = os.path.basename(dbPathResult)
    
    name, _= os.path.splitext(closestImage)
    # wypisanie imienia na podstawie nazwy zdjęcia
    return name
    
print(compare_faces())