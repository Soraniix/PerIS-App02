# models.py
from pydantic import BaseModel
from typing import Union, Optional

class HinweisCreate(BaseModel):
    titel: str
    inhalt: str
    prioritaet: str | None
    sichtbarkeit: str | None
    zuletzt_geaendert_am: str | None # Dieser Wert wird normalerweise vom Backend gesetzt, nicht vom Frontend gesendet.
                                    # Wir werden das später anpassen, damit das Backend den Zeitstempel selbst setzt.

class AufgabeCreate(BaseModel):
    titel: str
    inhalt: str
    prioritaet: str
    sichtbarkeit: str
    status: str
    rechercheangehoerigkeit: str | None
    personangehoerigkeit: str | None
    zuletzt_geaendert_am: str | None # Gleicher Hinweis wie oben

class KommentareCreate(BaseModel):
    commentable_id: int
    commentable_type: str
    inhalt: str

class Kommentar(BaseModel):
    # Dieses Model kann verwendet werden, wenn du Kommentare aus der DB zurückgibst.
    # Die ID sollte nicht beim Erstellen, sondern beim Abrufen dabei sein.
    id: int
    commentable_id: int
    commentable_type: str
    inhalt: str
    ersteller: str
    erstelldatum: str