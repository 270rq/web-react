import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1111",
  database="meteo"
)
url = 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8'
df = pd.read_html(url)[0]
cities = list(zip(df['Город'], df['Регион']))
print(cities)
mycursor = mydb.cursor()

# Добавление записей в таблицу регион
for index,city in enumerate(cities):
    region_name = city[1]
    mycursor.execute("SELECT * FROM Region WHERE region_name = %s", (region_name,))
    region = mycursor.fetchone()
    if region is None:
        mycursor.execute("INSERT INTO Region (region_name) VALUES (%s)", (region_name,))
        mydb.commit()
        region_id = mycursor.lastrowid
    else:
        region_id = region[0]

    # Добавление записей в таблицу город
    city_name = city[0]
    mycursor.execute("INSERT INTO City (region_id, name) VALUES (%s, %s)", (region_id, city_name))
    mydb.commit()