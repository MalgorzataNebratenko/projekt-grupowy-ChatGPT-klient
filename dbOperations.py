import mysql.connector
import os

def connectDB(host, user, password, database):
    mysqlDatabase = mysql.connector.connect(
      host = host,
      user = user,
      passwd = password,
      database = database
      )
    return mysqlDatabase

def sqlCommand(database, command):
    dbCursor = database.cursor()
    dbCursor.execute(command) 
    return dbCursor.fetchone()

# dodanie zakodowanego obrazu do bazy
def addEncodedImage(database, imageData):
    data = "INSERT INTO user_images VALUES ('','','','"+ imageData +"'); "
    sqlCommand(database, data)

# pobranie obrazu z bazy danych
def getImageFromDB(database, index):
    dbCursor = database.cursor()
    dbCursor.execute('SELECT image_content FROM `user_images` WHERE image_id = '+ str(index)) 
    data = dbCursor.fetchone()
    return data[0]