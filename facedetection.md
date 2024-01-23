# facedetection.py

## Użycie metod
Aby użyć detekcji twarzy wystarczy użyć metody `compareFaces(model_name)`. Metoda ta zwraca nazwę pliku rozpoznanego zdięcia.

W metodzie compareFaces(model_name) wprowadzamy nazwę modelu, z którego chcemy skorystać (np. `"VGG-Face"`)

Metoda próbuje dostać się do pliku `img.jpg`  i podkatalogu `/face`, które znajdują się w obecnym folderze.

Użycie metody `createFaceNameLabel(model_name)` utworzy plik tekstowy w obecnym katalogu z rezultatem nazwy pliku rozpoznanej osoby z metody `compareFaces(model_name)`(bez dopisku .jpg).
