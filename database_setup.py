import sqlite3
import os

#Def Name Datenbank
DB_NAME = "dashboard_data-db"

def create_database():
    conn = sqlite3.connect(DB_NAME)
    #Verbindet sich mit Datenbank. Wenn die Datei nicht verhanden ist, wird sie erstellt.
    print(f"Datenbank '{DB_NAME} erstellt oder bereits vorhanden.")

    # Erstelle ein "Cursor"-Objekt, um SQL-Befehle auszuführen
    cursor = conn.cursor()

    # SQL-Befehl zum Erstellen der 'hinweise'-Tabelle, falls sie noch nicht existiert
    # Wir verwenden """ für einen mehrzeiligen String, das ist übersichtlicher
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS hinweise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT NOT NULL,
        inhalt TEXT NOT NULL,
        prioritaet TEXT,
        sichtbarkeit TEXT,
        ersteller TEXT,
        erstelldatum TEXT
    );
    """

    #Führe den SQL-Befehl aus
    cursor.execute(create_table_sql)
    print("Tabelle 'hinweise' erstellt oder bereits vorhanden.")


    # Optional: Füge ein paar Test-Daten ein, damit wir am Anfang etwas sehen
    # Wir prüfen erst, ob die Tabelle leer ist, um zu vermeiden, bei jedem Aufruf neue Daten hinzuzufügen
    cursor.execute("SELECT COUNT(id) FROM hinweise")
    count = cursor.fetchone()[0]
    if count == 0:
        print("Füge Test-Daten in 'hinweise' ein...")
        test_hinweise = [
            ('Wichtige Info', 'Das ist eine wichtige Test-Notiz für alle.', 'Hoch', 'Öffentlich', 'System', '2025-06-02T18:30:00'),
            ('Private Notiz', 'Nur für mich sichtbare Notiz.', 'Mittel', 'Privat', 'Nico', '2025-06-02T18:35:00')
        ]
        # executemany ist gut, um mehrere Datensätze auf einmal einzufügen
        cursor.executemany(
            "INSERT INTO hinweise (titel, inhalt, prioritaet, sichtbarkeit, ersteller, erstelldatum) VALUES (?, ?, ?, ?, ?, ?)",
            test_hinweise
        )
        print(f"{len(test_hinweise)} Test-Hinweise hinzugefügt.")
    else:
        print("Tabelle 'hinweise' enthält bereits Daten, füge keine Test-Daten hinzu.")

    # Änderungen speichern (commit) und Verbindung schließen
    conn.commit()
    conn.close()
    print("Datenbankverbindung geschlossen.")

# Dieser Block sorgt dafür, dass die Funktion create_database() nur dann ausgeführt wird,
# wenn du diese Datei (database_setup.py) direkt mit Python startest.
if __name__ == "__main__":
    create_database()