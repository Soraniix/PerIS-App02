# crud.py
import sqlite3
from datetime import datetime
# Importiere die Pydantic-Modelle, die hier als Typ-Annotationen verwendet werden
from models import HinweisCreate, AufgabeCreate, KommentareCreate
# Die anderen Imports wie Union, Optional könnten je nach Nutzung hier bleiben oder entfernt werden.

# Annahme: DB_NAME ist im selben Verzeichnis oder der Pfad ist korrekt
DB_NAME = "dashboard_data.db"

# Allgemeine Funktion zur Verbindung mit der Datenbank und Cursor-Erstellung
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # Ermöglicht den Zugriff auf Spalten per Namen
    return conn

# Region: Hinweise CRUD Operationen
def get_alle_hinweise_aus_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum, zuletzt_geaendert_am FROM hinweise ORDER BY id DESC")
    hinweise = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return hinweise

def add_hinweis_in_db(hinweis_daten: HinweisCreate, ersteller: str): # Hier wird HinweisCreate jetzt erkannt
    conn = get_db_connection()
    cursor = conn.cursor()
    erstellungszeitpunkt = datetime.now().isoformat()
    sql = """
    INSERT INTO hinweise (titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum, zuletzt_geaendert_am)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """
    daten_tuple = (
        hinweis_daten.titel,
        hinweis_daten.inhalt,
        hinweis_daten.prioritaet,
        hinweis_daten.sichtbarkeit,
        ersteller,
        erstellungszeitpunkt,
        erstellungszeitpunkt # Setze zuletzt_geaendert_am auch beim Erstellen auf den Erstellungszeitpunkt
    )
    cursor.execute(sql, daten_tuple)
    neue_id = cursor.lastrowid
    conn.commit()
    conn.close()
    print(f"Neuer Hinweis mit ID {neue_id} hinzugefügt: {hinweis_daten.titel}")
    return neue_id

def loesche_hinweis_aus_db(hinweis_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM hinweise WHERE id = ?"
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

def update_hinweis_in_db(hinweis_daten: HinweisCreate, hinweis_id: int): # Hier wird HinweisCreate jetzt erkannt
    conn = get_db_connection()
    cursor = conn.cursor()
    geaendert = datetime.now().isoformat()
    sql = """
    UPDATE hinweise SET titel = ?, inhalt = ?, prioritaet = ?, sichtbarkeit = ?, zuletzt_geaendert_am = ? WHERE id = ?
    """
    daten_tuple = (
        hinweis_daten.titel,
        hinweis_daten.inhalt,
        hinweis_daten.prioritaet,
        hinweis_daten.sichtbarkeit,
        geaendert,
        hinweis_id,
    )
    cursor.execute(sql, daten_tuple)
    geaenderte_zeilen = cursor.rowcount
    conn.commit()
    conn.close()
    if geaenderte_zeilen > 0:
        print(f"Hinweis mit der ID {hinweis_id} wurde erfolgreich geändert")
        return True
    else:
        print(f"Hinweis mit der ID: {hinweis_id} konnte nicht geändert werden")
        return False
# Endregion: Hinweise CRUD Operationen

# Region: Aufgaben CRUD Operationen
def get_alle_aufgaben_aus_db():
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT id, titel, inhalt, prioritaet, sichtbarkeit, status, ersteller, erstelldatum, rechercheangehoerigkeit, personangehoerigkeit, zuletzt_geaendert_am FROM aufgaben ORDER BY id DESC")
    aufgaben = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return aufgaben

def add_aufgaben_in_db(aufgaben_daten: AufgabeCreate, ersteller: str): # Hier wird AufgabeCreate jetzt erkannt
    conn = get_db_connection()
    cursor = conn.cursor()
    erstellzeitpunkt = datetime.now().isoformat()
    sql = """
    INSERT INTO aufgaben (titel, inhalt, prioritaet, sichtbarkeit, status, ersteller, erstelldatum, rechercheangehoerigkeit, personangehoerigkeit, zuletzt_geaendert_am)
    VALUES (?,?,?,?,?,?,?,?,?,?)
    """
    daten_tuple = (
        aufgaben_daten.titel,
        aufgaben_daten.inhalt,
        aufgaben_daten.prioritaet,
        aufgaben_daten.sichtbarkeit,
        aufgaben_daten.status,
        ersteller,
        erstellzeitpunkt,
        aufgaben_daten.rechercheangehoerigkeit,
        aufgaben_daten.personangehoerigkeit,
        erstellzeitpunkt # Setze zuletzt_geaendert_am auch beim Erstellen
    )
    cursor.execute(sql, daten_tuple)
    neue_id = cursor.lastrowid
    conn.commit()
    conn.close()
    print(f"Neue Aufgabe mit der ID: {neue_id} erstellt.")
    return neue_id

def loesche_aufgabe_aus_db(aufgabe_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM aufgaben WHERE id = ?"
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

def update_aufgabe_in_db(aufgabe_daten: AufgabeCreate, aufgabe_id: int): # Hier wird AufgabeCreate jetzt erkannt
    conn = get_db_connection()
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
        print(f"Aufgabe mit der ID {aufgabe_id} konnte erfolgreich geändert werden")
        return True
    else:
        print(f"Aufgabe mit der ID: {aufgabe_id} konnte nicht geändert werden")
        return False
# Endregion: Aufgaben CRUD Operationen

# Region: Kommentare CRUD Operationen
def get_alle_passenden_kommentare_aus_db(commentable_type: str, commentable_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
                   SELECT id, inhalt, ersteller, erstelldatum
                   FROM kommentare
                   WHERE commentable_id = ? AND commentable_type = ?
                    """, (commentable_id, commentable_type))
    kommentare = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return kommentare

def add_kommentare_in_db(kommentar_daten: KommentareCreate): # Hier wird KommentareCreate jetzt erkannt
    conn = get_db_connection()
    cursor = conn.cursor()
    erstellungszeitpunkt = datetime.now().isoformat()
    user = "Nico" # Sollte später aus einem User-Kontext kommen

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

def loesche_kommentar_aus_db(kommentar_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    sql = "DELETE FROM kommentare WHERE id = ?"
    cursor.execute(sql, (kommentar_id,))
    change_line = cursor.rowcount
    conn.commit()
    conn.close()
    if change_line > 0:
        print(f"Kommentar mit der ID {kommentar_id} konnte erfolgreich gelöscht werden.")
        return True
    else:
        print(f"Kommentar mit der ID: {kommentar_id} konnte nicht gelöscht werden")
        return False
# Endregion: Kommentare CRUD Operationen