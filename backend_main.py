from fastapi import FastAPI, HTTPException # Schnittstelle Frontend zur Datenbank 
from fastapi.responses import FileResponse # Bereitstellen von den HTML Dateinen
from fastapi.staticfiles import StaticFiles # Bereitstellen der Static Daten z.B Bilder / JS
import sqlite3 # Datenbank
from pydantic import BaseModel # Validierung
from typing import Union, Optional # Validierung
from datetime import datetime # Für das Datum 

DB_NAME = "dashboard_data.db"

#uvicorn backend_main:app --reload sorgt dafür, dass nach einer Änderung der Server neu gestartet wird! 

class HinweisCreate(BaseModel):
    titel: str
    inhalt: str
    prioritaet: str | None # Standartwert ist auf None 
    sichtbarkeit: str | None # Standartwert ist auf None 
    zuletzt_geaendert_am: str | None

class AufgabeCreate(BaseModel):
    titel: str
    inhalt: str
    prioritaet: str
    sichtbarkeit: str
    status: str
    rechercheangehoerigkeit: str | None
    personangehoerigkeit: str | None
    zuletzt_geaendert_am: str | None

class KommentareCreate(BaseModel):
    commentable_id: int
    commentable_type: str
    inhalt: str

class Kommentar(BaseModel):
    commentable_id: int
    commentable_type: str
    inhalt: str
    ersteller: str 
    erstelldatum: str 

app = FastAPI()

# NEUE ZEILE: Mache den Ordner 'static' im Hauptverzeichnis deines Projekts
# unter dem URL-Pfad '/static' verfügbar.
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/api/hinweise")
async def api_get_alle_hinweise():
    hinweise = get_alle_hinweise_aus_db()
    return hinweise

@app.get("/api/aufgaben")
async def api_get_alle_aufgaben():
    aufgaben = get_alle_aufgaben_aus_db()
    return aufgaben

@app.get("/api/{commentable_type}/{commentable_id}/kommentare")
async def api_get_alle_kommentare(commentable_type: str, commentable_id: int):
    kommentare = get_alle_passenden_kommentare_aus_db(commentable_type, commentable_id)
    return kommentare



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

@app.get("/aufgabenliste.html")
async def read_aufgabenliste():
    return FileResponse("template/aufgabenliste.html")


@app.post("/api/hinweise", status_code=201)
async def api_erstelle_neuen_hinweis(hinweis_payload: HinweisCreate):
    ersteller_name = "Nico" # Oder später aus einem User-Login

    try:
        neue_hinweise_id = add_hinweis_in_db(hinweis_payload, ersteller_name)
        return {
            "message": "Hinweis erfolgreich erstellt!",
            "hinweis_id": neue_hinweise_id,
            "titel": hinweis_payload.titel
        }
    except Exception as e:
        print(f"Fehler beim Erstellen des Hinweises: {e}")
        return {"message": "Fehler beim erstellen des Hinweises", "details": str(e) }


@app.post("/api/aufgaben", status_code=201)
async def api_erstelle_neue_aufgaben(aufgaben_payload: AufgabeCreate):
    ersteller_name = "Nico"

    try:
        neue_aufgabe_id = add_aufgaben_in_db(aufgaben_payload, ersteller_name)
        return {
            "message": "Aufgabe erfolgreich erstellt!",
            "hinweis_id": neue_aufgabe_id,
            "titel": aufgaben_payload.titel
        }
    except Exception as e:
        print(f"Fehelr beim Erstellen der Aufgabe: {e}")
        return {"message": "Fehler beim erstellen von der Aufgabe", "details": str(e)}
    

@app.post("/api/kommentare")
async def api_erstelle_neuen_kommentar(kommentar_daten: KommentareCreate):
    try:
        neue_kommentar_id = add_kommentare_in_db(kommentar_daten)
        return {
            "message": "Kommentar erstellt",
            "kommentar_id": neue_kommentar_id,
            "Type": kommentar_daten.commentable_type
        }
    except Exception as e:
        print(f"Fehler beim erstellen des Kommentares: {e}")
        return {"message": "Fehler beim erstellen vom Kommentar", "details:": str(e)}
    

@app.delete("/api/hinweise/{hinweis_id}", status_code=200)
async def api_loesche_einen_hinweis(hinweis_id: int):
    erfolgreich_geloscht = loesche_hinweis_aus_db(hinweis_id)
    if (erfolgreich_geloscht):
        return {"message": f"Hinweis mit ID {hinweis_id} erfolgreich gelöscht"}
    else:
        raise HTTPException(status_code=404, detail=f"Hinweis mit ID {hinweis_id} nicht gefunden")
    
@app.delete("/api/aufgaben/{aufgabe_id}", status_code=200)
async def api_loesche_eine_aufgabe(aufgabe_id: int):
    erfolgreich_geloescht = loesche_aufgabe_aus_db(aufgabe_id)
    if (erfolgreich_geloescht):
        return {"message": f"Aufgabe mit ID {aufgabe_id} erfolgreich gelöscht"}
    else:
        raise HTTPException(status_code=404, detail=f"AUfgabe mit ID {aufgabe_id} nicht gefunden")
    
@app.delete("/api/kommentare/{kommentar_id}", status_code=200)
async def api_loesche_einen_kommentar(kommentar_id: int):
    erfolgreich_geloescht = loesche_kommentar_aus_db(kommentar_id)
    if(erfolgreich_geloescht):
        return {"message": f"Kommentar mit ID {kommentar_id} erfolgreich gelöscht."}
    else:
        raise HTTPException(status_code=404, detail=f"Kommentar mit ID {kommentar_id} nicht gefunden")

@app.put("/api/hinweise/{hinweis_id}", status_code=200)
async def api_update_einen_hinweis(hinweis_daten: HinweisCreate, hinweis_id: int):
    erfolgreich_geaendert = update_hinweis_in_db(hinweis_daten, hinweis_id)
    
    if (erfolgreich_geaendert):
        return {"message": f"Hinweis mit ID {hinweis_id} erfolgreich geändert"}
    else:
        raise HTTPException(status_code=404, detail=f"Hinweis mit ID {hinweis_id} nicht gefunden")

@app.put("/api/aufgaben/{aufgabe_id}", status_code=200)
async def api_update_eine_aufgabe(aufgabe_daten: AufgabeCreate, aufgabe_id: int):
    erfolgreich_geaendert = update_aufgabe_in_db(aufgabe_daten, aufgabe_id)
    if (erfolgreich_geaendert):
        return{"message": f"Aufgabe mit ID {aufgabe_id} erfolgreich geändert"}
    else:
        raise HTTPException(status_code=404, detail=f"Aufgabe mit ID {aufgabe_id} nicht geändert")



# Anzeigen aller Hinweise aus DB
def get_alle_hinweise_aus_db():
    conn = sqlite3.connect(DB_NAME)


    # Diese Zeile ist sehr nützlich! Sie sorgt dafür, dass du auf Datenbankspalten
    # auch über ihren Namen zugreifen kannst (wie bei einem Dictionary),
    # nicht nur über ihren Index (z.B. row['titel'] statt row[1]).
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # SQL-Befehl, um alle Spalten aller Einträge aus der Tabelle 'hinweise' zu holen.
    # ORDER BY id DESC sortiert sie so, dass die neuesten (höchste ID) zuerst kommen.
    cursor.execute("SELECT id, titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum, zuletzt_geaendert_am FROM hinweise ORDER BY id DESC")

    hinweise_als_row_objekte = cursor.fetchall() # Holt alle Ergebniszeilen
    conn.close()

    # Die Datenbank gibt uns eine Liste von speziellen Row-Objekten.
    # Für FastAPI ist es am einfachsten, wenn wir eine Liste von normalen Python-Dictionaries daraus machen.
    # Diese List Comprehension macht genau das:
    hinweise_als_dictionaries = [dict(row) for row in hinweise_als_row_objekte]

    return hinweise_als_dictionaries
    
# Anzeigen aller Aufgaben aus DB
def get_alle_aufgaben_aus_db():
    conn = sqlite3.connect(DB_NAME)

    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT id, titel, inhalt, prioritaet, sichtbarkeit, status, ersteller, erstelldatum, rechercheangehoerigkeit, personangehoerigkeit, zuletzt_geaendert_am FROM aufgaben ORDER BY id DESC")

    aufgaben_als_row_objekt = cursor.fetchall()
    conn.close()

    aufgaben_als_dic = [dict(row) for row in aufgaben_als_row_objekt]

    return aufgaben_als_dic

def get_alle_passenden_kommentare_aus_db(commentable_type: str, commentable_id: int):
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
                   SELECT id, inhalt, ersteller, erstelldatum 
                   FROM kommentare 
                   WHERE commentable_id = ? AND commentable_type = ?
                    """, (commentable_id, commentable_type)) 
    kommentare_als_row_objekt = cursor.fetchall()
    conn.close()

    kommentare_als_dict = [dict(row) for row in kommentare_als_row_objekt]
    return kommentare_als_dict


# Hinzufügen von Hinweis!
def add_hinweis_in_db(hinweis_daten: HinweisCreate, ersteller: str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    erstellungszeitpunkt = datetime.now().isoformat() 

    sql = """
    INSERT INTO hinweise (titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum, zuletzt_geaendert_am)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """

    daten_tulpe = (
        hinweis_daten.titel,
        hinweis_daten.inhalt,
        hinweis_daten.prioritaet,
        hinweis_daten.sichtbarkeit,
        ersteller,
        erstellungszeitpunkt,
        hinweis_daten.zuletzt_geaendert_am
    )

    cursor.execute(sql, daten_tulpe)
    neue_id = cursor.lastrowid # Holt die ID des gerade eingefügten Datensatzes

    conn.commit()
    conn.close()

    print(f"Neuer Hinweis mit ID {neue_id} hinzugefügt: {hinweis_daten.titel}")
    return neue_id

# Hinzufügen von Aufgaben!
def add_aufgaben_in_db(aufgaben_daten: AufgabeCreate, ersteller: str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    erstellzeitpunkt = datetime.now().isoformat()

    sql = """
    INSERT INTO aufgaben (titel, inhalt, prioritaet, sichtbarkeit, status, ersteller, erstelldatum, rechercheangehoerigkeit, personangehoerigkeit, zuletzt_geaendert_am)
    VALUES (?,?,?,?,?,?,?,?,?,?)
    """

    daten_tulpe = (
        aufgaben_daten.titel,
        aufgaben_daten.inhalt,
        aufgaben_daten.prioritaet,
        aufgaben_daten.sichtbarkeit,
        aufgaben_daten.status,
        ersteller,
        erstellzeitpunkt,
        aufgaben_daten.rechercheangehoerigkeit, 
        aufgaben_daten.personangehoerigkeit,
        aufgaben_daten.zuletzt_geaendert_am
    )

    cursor.execute(sql, daten_tulpe)
    neue_id = cursor.lastrowid


    conn.commit()
    conn.close()

    print(f"Neue Aufgabe mit der ID: {neue_id} erstellt.")
    return neue_id

def add_kommentare_in_db(kommentar_daten: KommentareCreate):
    conn = sqlite3.Connection(DB_NAME)
    cursor = conn.cursor()

    erstellungszeitpunkt = datetime.now().isoformat()
    user = "Nico"

    sql = """
    INSERT INTO kommentare (commentable_id, commentable_type, inhalt, ersteller, erstelldatum)
    VALUES(?,?,?,?,?)
    """
    kommentar_tuple = (
        kommentar_daten.commentable_id,
        kommentar_daten.commentable_type,
        kommentar_daten.inhalt,
        user,
        erstellungszeitpunkt
    )

    cursor.execute(sql, kommentar_tuple)
    neue_id = cursor.lastrowid
    conn.commit()
    conn.close()

    print(f"Neuer Kommentar für {kommentar_daten.commentable_type} unter der ID: {kommentar_daten.commentable_id} angelegt. Kommentar-ID: {neue_id}")
    return neue_id


# Funktion Löschen Hinweis
def loesche_hinweis_aus_db(hinweis_id: int):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    sql = """
    DELETE FROM hinweise WHERE id = ?
    """

    cursor.execute(sql, (hinweis_id,))
    geloeschte_zeilen = cursor.rowcount
    conn.commit()
    conn.close()

    if geloeschte_zeilen > 0:
        print(f"Hinweis mit ID {hinweis_id} wurde gelöscht")
        return True
    else:
        print(f"Hinweis mit ID {hinweis_id} konnte nicht gelöscht werden")
        return False

# Funktion Löschen Aufgaben  
def loesche_aufgabe_aus_db(aufgabe_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    sql = """
    DELETE FROM aufgaben WHERE id = ?
    """

    cursor.execute(sql, (aufgabe_id,))
    change_lines = cursor.rowcount
    conn.commit()
    conn.close()

    if change_lines > 0:
        print(f"Aufgabe mit der ID: {aufgabe_id} wurde gelöscht")
        return True
    else:
        print(f"Aufgabe mit der ID {aufgabe_id} konnte nicht gelöscht werden")
        return False

def loesche_kommentar_aus_db(kommentar_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    sql = """
    DELETE FROM kommentare WHERE id = ?    
    """

    cursor.execute(sql, (kommentar_id,))
    change_line = cursor.rowcount
    conn.commit()
    conn.close()

    if change_line > 0:
        print(F"Kommentar mit der ID {kommentar_id} konnte erfolgreich gelöscht werden.")
        return True
    else: 
        print(f"Kommentar mit der ID: {kommentar_id} konnte nicht gelöscht werden")
        return False
    

def update_hinweis_in_db(hinweis_daten: HinweisCreate, hinweis_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    geaendert = datetime.now().isoformat()


    sql = """
    UPDATE hinweise SET titel = ?, inhalt = ?, prioritaet = ?, sichtbarkeit = ?, zuletzt_geaendert_am = ? WHERE id = ?
    """

    daten_tulpe = (
        hinweis_daten.titel,
        hinweis_daten.inhalt,
        hinweis_daten.prioritaet,
        hinweis_daten.sichtbarkeit,
        geaendert,
        hinweis_id,
    )

    cursor.execute(sql, daten_tulpe)

    geaenderte_zeilen = cursor.rowcount
    conn.commit()
    conn.close()
    

    if geaenderte_zeilen > 0:
        print(f"Hinweis mit der ID {hinweis_id} wurde erfolgreich geändert")
        return True
    else:
        print(f"Hinweis mit der ID: {hinweis_id} konnte nicht geändert werden")
        return False
    
def update_aufgabe_in_db(aufgabe_daten: AufgabeCreate, aufgabe_id :int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    geandert = datetime.now().isoformat()

    sql = """
    UPDATE aufgaben SET titel = ?, inhalt = ?, prioritaet = ?, sichtbarkeit = ?, status = ?, rechercheangehoerigkeit = ?, personangehoerigkeit = ?, zuletzt_geaendert_am = ? WHERE id = ?
    """

    daten_tuple = (
        aufgabe_daten.titel,
        aufgabe_daten.inhalt,
        aufgabe_daten.prioritaet,
        aufgabe_daten.sichtbarkeit,
        aufgabe_daten.status,
        aufgabe_daten.rechercheangehoerigkeit,
        aufgabe_daten.personangehoerigkeit,
        geandert,
        aufgabe_id
    )

    cursor.execute(sql, daten_tuple)
    geandert_zeilen = cursor.rowcount
    conn.commit()
    conn.close()

    if geandert_zeilen > 0:
        print(f"Aufgabe mit der ID {aufgabe_daten} konnte erfolgreich geändert werden")
        return True
    else:
        print(f"Aufgabe mit der ID: {aufgabe_daten} konnte nicht geändert werden")
        return False