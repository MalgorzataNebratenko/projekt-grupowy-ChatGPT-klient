from deepface import DeepFace
import pandas as pd
import os

file_path = os.getcwd().replace("\\", "/")

# wskazanie pojedynczego zdjęcia do porównania
img_path = file_path + "/img.jpg"

# wskazanie miejsca bazy zdjęć (w postaci folderu), w którym znajdują sie zdjęcia do porównania
db_path = file_path + "/face"

def compareFaces():

    # porównanie zdjęcia wejciowego ze zbiorem zdjęć znajdującymi się w podanym folderze
    # zwraca wszystkie podobne zdjęcia do podanego
    try:
        result = DeepFace.find(img_path, db_path)
    except ValueError:
        # w przypadku nierozpoznania twarzy
        return ""

    frame = pd.DataFrame(result[0])

    # podanie najpodobniejszego zdjęcia do obrazu wejciowego
    dbPathResult = frame.get('identity')[0]
    
    closestImage = os.path.basename(dbPathResult)
    
    name, _= os.path.splitext(closestImage)
    
    #print("Cosine value:")
    #print(frame.get('VGG-Face_cosine')[0])
    
    # wypisanie imienia na podstawie nazwy zdjęcia
    return name

def createFaceLabelFile():
    with open('name.txt', 'w') as text_file:
        text_file.write(compareFaces())
