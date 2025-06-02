from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import sqlite3

DB_NAME = "dashboard_data.db"

#uvicorn backend_main:app --reload sorgt dafür, dass nach einer Änderung der Server neu gestartet wird! 

app = FastAPI()

# NEUE ZEILE: Mache den Ordner 'static' im Hauptverzeichnis deines Projekts
# unter dem URL-Pfad '/static' verfügbar.
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/api/hinweise")
async def api_get_alle_hinweise():
    hinweise = get_alle_hinweise_aus_db()
    return hinweise





def get_alle_hinweise_aus_db():
    conn = sqlite3.connect(DB_NAME)


    # Diese Zeile ist sehr nützlich! Sie sorgt dafür, dass du auf Datenbankspalten
    # auch über ihren Namen zugreifen kannst (wie bei einem Dictionary),
    # nicht nur über ihren Index (z.B. row['titel'] statt row[1]).
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # SQL-Befehl, um alle Spalten aller Einträge aus der Tabelle 'hinweise' zu holen.
    # ORDER BY id DESC sortiert sie so, dass die neuesten (höchste ID) zuerst kommen.
    cursor.execute("SELECT id, titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum FROM hinweise ORDER BY id DESC")

    hinweise_als_row_objekte = cursor.fetchall() # Holt alle Ergebniszeilen
    conn.close()

    # Die Datenbank gibt uns eine Liste von speziellen Row-Objekten.
    # Für FastAPI ist es am einfachsten, wenn wir eine Liste von normalen Python-Dictionaries daraus machen.
    # Diese List Comprehension macht genau das:
    hinweise_als_dictionaries = [dict(row) for row in hinweise_als_row_objekte]

    return hinweise_als_dictionaries
    

# Definiere eine "Route" für den Wurzelpfad ("/")
# Wenn jemand diese URL aufruft, wird die Funktion darunter ausgeführt.
@app.get("/")
async def read_root():

    # Gib den Pfad zu deiner index.html an.
    # Wenn backend_main.py im Hauptordner 'projekt-dashboard' liegt
    # und index.html in 'projekt-dashboard/templates/index.html',
    # dann ist der relative Pfad 'templates/index.html'.
    return FileResponse("template/index.html")

@app.get("/recherche_uebersicht.html")
async def read_recherche_uebersicht():
    return FileResponse("template/recherche_uebersicht.html")


@app.get("/index.html")
async def read_index():
    return FileResponse("template/index.html")