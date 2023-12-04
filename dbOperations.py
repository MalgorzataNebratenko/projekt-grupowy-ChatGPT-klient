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
