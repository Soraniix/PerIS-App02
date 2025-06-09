import sqlite3
import os

#Def Name Datenbank
DB_NAME = "dashboard_data.db"

def create_database():
    conn = sqlite3.connect(DB_NAME)
    #Verbindet sich mit Datenbank. Wenn die Datei nicht verhanden ist, wird sie erstellt.
    print(f"Datenbank '{DB_NAME} erstellt oder bereits vorhanden.")

    # Erstelle ein "Cursor"-Objekt, um SQL-Befehle auszuführen
    cursor = conn.cursor()

    # SQL-Befehl zum Erstellen der 'hinweise'-Tabelle, falls sie noch nicht existiert
    # Wir verwenden """ für einen mehrzeiligen String, das ist übersichtlicher
    create_table_hinweise_sql = """
    CREATE TABLE IF NOT EXISTS hinweise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT NOT NULL,
        inhalt TEXT NOT NULL,
        prioritaet TEXT,
        sichtbarkeit TEXT,
        ersteller TEXT,
        erstelldatum TEXT,
        zuletzt_geaendert_am TEXT
    );
    """

    # SQL Erstellung für DB Aufgaben
    creat_table_aufgaben_sql = """
    CREATE TABLE IF NOT EXISTS aufgaben (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT NOT NULL,
        inhalt TEXT NOT NULL,
        prioritaet TEXT NOT NULL,
        sichtbarkeit TEXT NOT NULL,
        status TEXT NOT NULL,
        ersteller TEXT NOT NULL,
        erstelldatum TEXT NOT NULL,
        rechercheangehoerigkeit TEXT,
        personangehoerigkeit TEXT,
        zuletzt_geaendert_am TEXT
    );
    """

    creat_table_kommentare_sql = """
    CREATE TABLE IF NOT EXISTS kommentare (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        commentable_id INTEGER NOT NULL,
        commentable_type TEXT NOT NULL,
        inhalt TEXT NOT NULL,
        ersteller TEXT NOT NULL,
        erstelldatum TEXT NOT NULL
    );
    """


    #Führe den SQL-Befehl aus
    cursor.execute(create_table_hinweise_sql)
    print("Tabelle 'hinweise' erstellt oder bereits vorhanden.")

    cursor.execute(creat_table_aufgaben_sql)
    print("Tabelle 'aufgaben' erstellt oder bereits vorhanden")

    cursor.execute(creat_table_kommentare_sql)
    print("Tabelle 'kommentare' erstellt oder bereits vorhanden")


    # Optional: Füge ein paar Test-Daten ein, damit wir am Anfang etwas sehen
    # Wir prüfen erst, ob die Tabelle leer ist, um zu vermeiden, bei jedem Aufruf neue Daten hinzuzufügen
    cursor.execute("SELECT COUNT(id) FROM hinweise")
    count = cursor.fetchone()[0]
    if count == 0:
        print("Füge Test-Daten in 'hinweise' ein...")
        test_hinweise = [
            ('Wichtige Info', 'Das ist eine wichtige Test-Notiz für alle.', 'Hoch', 'Öffentlich', 'System', '2025-06-02T18:30:00', None),
            ('Private Notiz', 'Nur für mich sichtbare Notiz.', 'Mittel', 'Privat', 'Nico', '2025-06-02T18:35:00', None)
        ]
        # executemany ist gut, um mehrere Datensätze auf einmal einzufügen
        cursor.executemany(
            "INSERT INTO hinweise (titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum, zuletzt_geaendert_am) VALUES (?, ?, ?, ?, ?, ?, ?)",
            test_hinweise
        )
        print(f"{len(test_hinweise)} Test-Hinweise hinzugefügt.")
    else:
        print("Tabelle 'hinweise' enthält bereits Daten, füge keine Test-Daten hinzu.")


    cursor.execute("SELECT COUNT(id) FROM aufgaben")
    count = cursor.fetchone()[0]
    if count == 0:
        print("Füge Test-Daten in 'aufgaben' hinzu...")
        test_aufgaben = [
            ("Wichtige Aufgabe", "Das ist der Inhalt der wichtigen Aufgabe...", "hoch", "öffentlich", "offen", "Admin", "2025-06-02T18:35:00", None, None, None),
            ("Nicht so wichtig", "Das ist der INhalt von nicht so wichtig", "niedrig", "privat", "in Arbeit", "Admin", "2025-06-02T18:35:00", None, None, None)
        ]

        cursor.executemany(
            "INSERT INTO aufgaben (titel, inhalt, prioritaet, sichtbarkeit, status, ersteller, erstelldatum, rechercheangehoerigkeit, personangehoerigkeit, zuletzt_geaendert_am) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            test_aufgaben
        )
        print(f"{len(test_aufgaben)} Test-Aufgaben hinzugefügt.")
    else:
        print("Tabelle 'aufgaben' enthält bereits Daten, keine Test-Daten notwendig")

    cursor.execute("SELECT COUNT(id) FROM kommentare")
    count = cursor.fetchone()[0]
    if count == 0:
        test_kommentare = [
            ("1", "aufgaben", "Das ist ein Test Kommentar!!", "Nico", "2025-06-02T18:35:00"),
            ("1", "aufgaben", "Das ist der zweite Test Kommentar!!", "Nico", "2025-06-02T18:35:00"),
            ("2", "aufgaben", "Das ist ein Test Kommentar!! für die Zweite aufgabe!", "Nico", "2025-06-02T18:35:00")
        ]

        cursor.executemany(
            "INSERT INTO kommentare (commentable_id, commentable_type, inhalt, ersteller, erstelldatum) VALUES (?, ?, ?, ?, ?)",
            test_kommentare
        )
        print(f"{len(test_kommentare)} Test Kommentare hinzugefügt")
    
    else:
        print("Tabelle 'kommentare' enthält bereits Daten, keine Test-Daten notwendig")



    # Änderungen speichern (commit) und Verbindung schließen
    conn.commit()
    conn.close()
    print("Datenbankverbindung geschlossen.")

# Dieser Block sorgt dafür, dass die Funktion create_database() nur dann ausgeführt wird,
# wenn du diese Datei (database_setup.py) direkt mit Python startest.
if __name__ == "__main__":
    create_database()