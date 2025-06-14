# backend_main.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
# Entferne diese Imports, da die Modelle jetzt aus models.py kommen:
# from pydantic import BaseModel
# from typing import Union, Optional
# from datetime import datetime

# Importiere die Pydantic-Modelle aus der neuen Datei
from models import HinweisCreate, AufgabeCreate, KommentareCreate, Kommentar

# Importiere die CRUD-Operationen aus der crud.py Datei
from crud import (
    get_alle_hinweise_aus_db,
    add_hinweis_in_db,
    loesche_hinweis_aus_db,
    update_hinweis_in_db,
    get_alle_aufgaben_aus_db,
    add_aufgaben_in_db,
    loesche_aufgabe_aus_db,
    update_aufgabe_in_db,
    get_alle_passenden_kommentare_aus_db,
    add_kommentare_in_db,
    loesche_kommentar_aus_db
)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# ... (der Rest deines backend_main.py bleibt gleich, da die Endpunkte die importierten Modelle verwenden)

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

@app.get("/")
async def read_root():
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
        raise HTTPException(status_code=500, detail=f"Fehler beim erstellen des Hinweises: {e}")


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
        raise HTTPException(status_code=500, detail=f"Fehler beim erstellen von der Aufgabe: {e}")


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
        raise HTTPException(status_code=500, detail=f"Fehler beim erstellen vom Kommentar: {e}")


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