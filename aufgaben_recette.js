// aufgaben_recette.js

const aufgaben_recette = [
    {
      ueberschrift: "🍎 Ingrédients",
      satz: "À ton tour, écris ta liste d'ingrédients <small> (Du bist dran, erstelle deine Zutatenliste) </small>  ",
      typ: "textarea",
      korrekt: "", // keine Bewertung nötig
      speichereAls: "ingredients"
    },
    {
      ueberschrift: "🍳 Préparation",
      typ: "textarea",
      satz: "Merci pour ta liste d'ingrédients : <strong>___</strong><br>Décris maintenant les étapes de la préparation :",
      korrekt: "", // keine Bewertung nötig
      referenziert: "ingredients" // auf vorherige Antwort verweisen
    }
    /*
    {    
        ueberschrift: "Testaufgabe 1",
        satz: "Bitte wähle das Wort <em>blau</em> aus: ➡️ ___",
        woerter: ["blau", "rot"],
        korrekt: "blau",
        bild: "img/blau.jpg"
    },
    {    
        ueberschrift: "Testaufgabe 2",
        satz: "Bitte schreibe das Wort <em>rot</em>: ➡️ ___",
        typ: "text",
        korrekt: "rot"
    },
    {    
        ueberschrift: "Testaufgabe 3",
        satz: "Schreibe irgendeine Farbe in das Feld:",
        typ: "textarea",
        korrekt: "rot"
    }
        */
]