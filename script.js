const db = firebase.firestore();
let schuelerId = "";
let istWiederholung = false;
let userAntworten = {};

function entferneAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Auth-Check und Start der Lernumgebung
firebase.auth().onAuthStateChanged(function(user) {
    console.log("Auth-Zustand geprüft:", user);
    if (user && user.email) {
        console.log("✅ Eingeloggt als:", user.email);
        const email = user.email;
        schuelerId = email.split('@')[0];
        document.getElementById('userInfo').innerText = "Eingeloggt als: " + schuelerId;

        // Starte erst jetzt die Lernumgebung
        // ladeLevel();
        // Jetzt erst Lernstand laden!
        db.collection("lernstaende").doc(`${schuelerId}_${thema}`).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                console.log("Gefundener Lernstand:", data);
                aktuellesLevel = data.aktuellesLevel;
                punkte = data.punkte;
                // 12.05.25
                updateProgressBar();
            } else {
                console.log("Kein gespeicherter Lernstand für dieses Thema gefunden.");
                aktuellesLevel = 1;
                punkte = 0;
            }
            ladeLevel();
        });
    } else {
        console.log("Erstmal kein User erkannt");
        if (firebase.auth().currentUser  && firebase.auth().currentUser.email) {
            console.log("User doch gefunden!");
        } else {
            window.location.href = "index.html";
        }
    }
});

// Definiere die Aufgaben je nach Thema
let aufgaben = [];
let richtige = [];
let offeneKorrekte = []; // Für Mehrfachlösungen

// Hole das Thema aus der URL
const urlParams = new URLSearchParams(window.location.search);
const thema = urlParams.get('thema');
console.log("Das Thema ist:", thema);
/*
if (thema === "partie 1") {
    console.log("Mir haven's erkannt!");
    thema = "partie_1";
} 
*/
console.log("Das Thema ist:", thema);


switch (thema) {
  case "subjonctif":
    aufgaben = aufgaben_subjonctif;
    break;
  case "conditionnel":
    aufgaben = aufgaben_conditionnel;
    break;
  case "partie1":
    aufgaben = aufgaben_partie1;
    break;
  case "extra":
    aufgaben = aufgaben_extra;
    break;
  case "bilan":
    aufgaben = aufgaben_bilan;
    break;
  case "recette":
    aufgaben = aufgaben_recette;
    break;
  case "mengen":
    aufgaben = aufgaben_mengen;
    break;
  default:
    console.error("Unbekanntes Thema:", thema);
    break;
}
/*
if (thema === "subjonctif") {
    aufgaben = [
        // Aufgaben bereits migriert.
    ];
} else if (thema === "conditionnel") {
    aufgaben = [
        // Aufgaben bereits migriert.
    ];
} else if (thema === "partie1") {
    aufgaben = [
        // Aufgaben bereits migiriert.
    ];
} else if (thema === "bilan") {
    aufgaben = [
        // Aufgaben bereits migiriert.
    ]
} else if (thema === "recette") {
    aufgaben = [
        // Aufgaben bereits migiriert.
    ]
} else if (thema === "mengen") {
  aufgaben = [

  ];
}
*/


// Lernstand laden
db.collection("lernstaende").doc(`${schuelerId}_${thema}`).get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        console.log("Gefundener Lernstand:", data);
        aktuellesLevel = data.aktuellesLevel;
        punkte = data.punkte;
        // 12.05.25
        updateProgressBar();
    } else {
        console.log("Kein gespeicherter Lernstand für dieses Thema gefunden.");
        aktuellesLevel = 1;
        punkte = 0;
    }
    ladeLevel();
});

function ladeLevel() {
    console.log("aufgaben: ", aufgaben);
    console.log("aktuelles level: ", aktuellesLevel);
    const aufgabe = aufgaben[aktuellesLevel - 1];
    console.log("aufgaben: ", aufgaben);
    if (aufgabe.korrekt) {
        offeneKorrekte = [...(Array.isArray(aufgabe.korrekt) ? aufgabe.korrekt : [aufgabe.korrekt])];
    } else {
        offeneKorrekte = []; // bei Reflexionstyp etc.
    }
    // dropzone.innerHTML = "<span class='placeholder'>...</span>";
    const sentenceContainer = document.getElementById('sentence');
    const wordsDiv = document.getElementById('words');
    const textContainer = document.getElementById('textAntwortContainer');
    const textInput = document.getElementById('textInput');
    const checkAnswerBtn = document.getElementById('checkAnswerBtn');
    const dropzone = document.querySelector('.dropzone');
    const feedback = document.getElementById('feedback');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const bildContainer = document.getElementById('bildContainer');

    // 🛠️ Reset-Logik
    feedback.innerText = "";
    nextLevelBtn.style.display = "none";
    sentenceContainer.innerHTML = "";
    wordsDiv.innerHTML = "";
    bildContainer.innerHTML = "";
    if (dropzone) dropzone.innerHTML = "";
    if (textInput) textInput.value = "";

    // 🛠️ Spezialfall: Reflexion
    if (aufgabe.typ === "reflexion") {
        sentenceContainer.innerHTML = `
            <p>${aufgabe.satz}</p>
            <textarea id="reflexionInput" rows="6" placeholder="z. B. Ich habe gelernt, dass ..."></textarea>
            <br>
            <button onclick="saveReflexion()">Speichern & Abschließen</button>
        `;
        wordsDiv.style.display = "none";
        textContainer.style.display = "none";
        checkAnswerBtn.style.display = "none";
        if (dropzone) dropzone.style.display = "none";


        
        // Bild für Reflexion laden, falls vorhanden
        if (aufgabe.bild) {
            bildContainer.innerHTML = `<img src="${aufgabe.bild}" alt="Bild zur Aufgabe" class="aufgabenbild">`;
        }
        updateProgressBar();
        return; // 🛠️ WICHTIG: keine weitere Verarbeitung
    } else if (aufgabe.typ === "text") {
        const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
        const satzMitLuecke = aufgabe.satz.replace("___", luecke);
        /*
        const satzMitLuecke = aufgabe.satz?.includes("___")
        
          ? aufgabe.satz.replace("___", luecke)
          : aufgabe.satz || "";
        */
        // sentenceContainer.innerHTML = satzMitLuecke;
        // const satzMitLuecke = aufgabe.satz.replace("___", luecke);
        sentenceContainer.innerHTML = satzMitLuecke;

        wordsDiv.style.display = "none";
        textContainer.style.display = "block";
        checkAnswerBtn.style.display = "none";
        if (dropzone) dropzone.style.display = "none";
        /*
        // ✨ 19.06.25: Falls Referenz vorhanden, vorherige Antwort anzeigen
        const promptLabel = document.getElementById('textPrompt');
        if (aufgabe.referenziert && userAntworten[aufgabe.referenziert]) {
            promptLabel.innerHTML =
                `<p><strong>${aufgabe.ueberschrift || ""}</strong></p>` +
                `<p><u>Ingrédients:</u><br>${userAntworten[aufgabe.referenziert].replace(/\n/g, "<br>")}</p>`;
        } else {
            promptLabel.innerHTML = `<strong>${aufgabe.ueberschrift || ""}</strong>`;
        }
        */
    }else if (aufgabe.typ === "textarea") {
        const ueberschriftDiv = document.getElementById('ueberschrift');
        const previousIngredients = sessionStorage.getItem("ingredients") || "<em>Keine Angaben</em>";

        // 🧾 Überschrift anzeigen
        ueberschriftDiv.innerHTML = aufgabe.ueberschrift
            ? `<h3>${aufgabe.ueberschrift}</h3>`
            : "<h3>Frage</h3>";

        // 📝 Satz anzeigen inkl. ggf. Platzhalter-Ersetzung
        const satzText = aufgabe.satz?.includes("___")
            ? aufgabe.satz.replace("___", previousIngredients)
            : aufgabe.satz || "";

        // 📥 Textfeld und Button rendern
        sentenceContainer.innerHTML = `
            ${satzText ? `<p>${satzText}</p>` : ""}
            ${aufgabe.ueberschrift === "Préparation" && !satzText ? `<p><strong>Deine Ingrédients:</strong><br>${previousIngredients}</p>` : ""}
            <textarea id="textareaInput" rows="6" placeholder="Antwort eingeben..."></textarea>
            <br>
            <button onclick="saveTextarea()">Speichern und weiter</button>
        `;

        // UI bereinigen
        wordsDiv.style.display = "none";
        textContainer.style.display = "none";
        checkAnswerBtn.style.display = "none";
        if (dropzone) dropzone.style.display = "none";

        // Bild laden
        bildContainer.innerHTML = aufgabe.bild
            ? `<img src="${aufgabe.bild}" alt="Bild zur Aufgabe" class="aufgabenbild">`
            : "";

        updateProgressBar();
        return; // Wichtig, um weiteren Code zu verhindern
    

    // 🛠️ Normalfall: Drag & Drop
    } else {
        const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
        const satzMitLuecke = aufgabe.satz.replace("___", luecke);
        sentenceContainer.innerHTML = satzMitLuecke;

        if (dropzone) {
            dropzone.innerHTML = "<span class='placeholder'>...</span>";
            dropzone.style.display = "inline-flex";
        }

        wordsDiv.style.display = "flex";
        checkAnswerBtn.style.display = "inline-block";
        textContainer.style.display = "none";

        if (Array.isArray(aufgabe.woerter)) {
            aufgabe.woerter.forEach((wort, index) => {
                const formattedWord = aufgabe.ueberschrift?.startsWith("Endungen")
                    ? formatWord(wort)
                    : wort;
            
                wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${formattedWord}</div>`;
            });
        }
    }
    // Überschrift einblenden 
    const ueberschriftDiv = document.getElementById('ueberschrift');
    if (aufgabe.ueberschrift) {
        ueberschriftDiv.innerHTML = `<h3>${aufgabe.ueberschrift}</h3>`;
    } else {
        ueberschriftDiv.innerHTML = "";
    }
    
    // 🛠️ Bild einblenden
    if (aufgabe.bild) {
        bildContainer.innerHTML = `<img src="${aufgabe.bild}" alt="Bild zur Aufgabe" class="aufgabenbild">`;
    }

    // 🛠️ Fortschritt & evtl. Popup
    document.getElementById('levelDisplay').innerText = aktuellesLevel;
    document.getElementById('punkteDisplay').innerText = punkte;
    updateProgressBar();

    const erklaerung = erklaerungen[thema]?.[aktuellesLevel];
    console.log("Erklärugen für Popups1(lL):", erklaerung);
    if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
        console.log("Erklärugen für Popups2(lL):", erklaerung);
        showPopup(erklaerung.titel, erklaerung.text);
        localStorage.setItem(`popupShown_${thema}_${aktuellesLevel}`, "true");
    }
}

function entferneElemente(array1, array2) {
  return array1.filter(element => !array2.includes(element));
}

function updateProgressBar() {
    const totalLevels = aufgaben.length;
    const progressPercent = ((aktuellesLevel - 1) / totalLevels) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressPercent === 100) {
        console.log("Ich gehe hier rein, also 100%. Das ist mein aktuelles Level:", aktuellesLevel);
        progressBar.style.width = "100%";
        progressBar.innerText = "100%";
        progressBar.classList.add("full");    
    } else {
        progressBar.style.width = progressPercent + "%";
        progressBar.innerText = Math.round(progressPercent) + "%";

    }
    /*
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = "100%";
    progressBar.innerText = "100%";
    progressBar.classList.add("full");
    */
}

function wordClick(event) {
    const dropzone = document.querySelector('.dropzone');
    dropzone.innerHTML = "";
    dropzone.appendChild(event.target);
}

function checkAnswer() {
    const dropzone = document.querySelector('.dropzone');
    const feedback = document.getElementById('feedback');
    /*
    // 19.06.25
    if (!dropzone) {
        feedback.innerText = "⚠️ Diese Aufgabe verwendet kein Drag & Drop.";
        return;
    }
    */

    if (!schuelerId) {
        feedback.innerText = "⚠️ Keine Schüler-ID gefunden.";
        return;
    }

    if (dropzone.children.length > 0) {
        const droppedWord = dropzone.children[0].innerText;
        // const richtigeAntwort = aufgaben[aktuellesLevel - 1].korrekt;
        // 13.05.25
        const aufgabe = aufgaben[aktuellesLevel - 1];
        const richtigeAntwort = aufgabe.korrekt;

        console.log("Aktuelles level (1. Check):", aktuellesLevel);
        const isCorrect = Array.isArray(richtigeAntwort)
            ? richtigeAntwort.includes(droppedWord)
            : droppedWord === richtigeAntwort;

        if (isCorrect) {
            dropzone.style.border = "2px solid #4caf50";
            feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
            punkte += 10;
            // Handelt es sich um eine Aufgabe mit mehreren richtigen Antworten? Dann ist "richtigeAntwort" ein Array.
            if (Array.isArray(richtigeAntwort)) {
                // Bei Mehrfachlösungen: korrektes Wort aus Liste entfernen
                aufgabe.korrekt = richtigeAntwort.filter(w => w !== droppedWord);

                // Entferne richtiges Wort aus Wortliste (optisch)
                document.querySelectorAll('.word').forEach(btn => {
                  if (btn.innerText === droppedWord) btn.remove();
                });
            
                // Leere Dropzone
                dropzone.innerHTML = "<span class='placeholder'>...</span>";
            
                // Speichern
                db.collection("antworten").add({
                  schuelerId,
                  level: aktuellesLevel,
                  aufgabe: aufgabe.satz,
                  antwort: droppedWord,
                  korrekt: true,
                  punkte,
                  timestamp: new Date()
                });
            
                if (aufgabe.korrekt.length === 0) {
                    // Wenn alle gefunden → Level erhöhen
                    aktuellesLevel++;
                    const istHalbzeit = aktuellesLevel === Math.ceil(aufgaben.length / 2);
                    if (istHalbzeit) {
                        if (typeof confetti === "function") {
                            confetti({
                                particleCount: 150,
                                spread: 70,
                                origin: { y: 0.6 }
                            });
                        }
                        alert("🎉 Bravo ! Du hast die Hälfte geschafft !");
                    }
                    db.collection("lernstaende").doc(`${schuelerId}_${thema}`).set({
                      schuelerId,
                      thema,
                      aktuellesLevel,
                      punkte,
                      timestamp: new Date()
                    });
                
                    document.getElementById('nextLevelBtn').style.display = "inline-block";
                    feedback.innerText += " 🎉 Alle richtigen Antworten gefunden!";
                }
            } else {
                // Nur eine richtige Antwort
                console.log("Aktuelles level (2. Check):", aktuellesLevel);
                dropzone.style.border = "2px solid #4caf50";
                feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
                punkte += 10;
                // console.log("Richtige Antworten abgespeichert?", richtige);

                const erklaerung = erklaerungen[thema]?.[aktuellesLevel];
                console.log("Erklärugen für Popups1(cA):", erklaerung);
                // Popups anzeigen:
                if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
                    console.log("Erklärugen für Popups2(cA):", erklaerung);
                    showPopup(erklaerung.titel, erklaerung.text);
                }
                aktuellesLevel++;
                const istHalbzeit = aktuellesLevel === Math.ceil(aufgaben.length / 2);
                if (istHalbzeit) {
                    if (typeof confetti === "function") {
                        confetti({
                            particleCount: 150,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                    alert("🎉 Bravo ! Du hast die Hälfte geschafft !");
                }
                if (aktuellesLevel - 1 < aufgaben.length) {
                    console.log("Ich komm hier raus");
                    document.getElementById('nextLevelBtn').style.display = "inline-block";
                } else {
                    console.log("Ich komm da raus: Letzte Aufgabe erreicht.");

                    feedback.innerText += " 🎉 Du hast alle Level geschafft!";

                    const aufgabe = aufgaben[aktuellesLevel - 2];
                    console.log("Aktuelles Level:", aktuellesLevel);
                    console.log("Aufgabe:", aufgabe);
                    const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
                    const satzMitLuecke = aufgabe.satz.replace("___", luecke);
                    document.getElementById('sentence').innerHTML = satzMitLuecke;
                    document.getElementById('levelDisplay').innerText = aktuellesLevel;
                    document.getElementById('punkteDisplay').innerText = punkte;
                    updateProgressBar();
                    if (typeof confetti === "function") {
                        confetti({
                            particleCount: 150,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                    // 17.05.25:    
                    console.log("Jetzt sollte ich die falschen Aufgaben laden");
                    setTimeout(() => {
                        ladeFalschBeantworteteAufgaben();
                    }, 1500); // optional: 1,5 Sekunden Verzögerung
                }
                db.collection("antworten").add({
                    schuelerId: schuelerId,
                    level: aktuellesLevel,
                    aufgabe: aufgaben[aktuellesLevel - 2].satz,
                    antwort: droppedWord,
                    korrekt: true,
                    punkte: punkte,
                    timestamp: new Date()
                });
                // HIER das neue Stück einfügen 👇
                db.collection("lernstaende").doc(`${schuelerId}_${thema}`).set({
                    schuelerId: schuelerId,
                    thema: thema,
                    aktuellesLevel: aktuellesLevel,
                    punkte: punkte,
                    timestamp: new Date()
                });
            }
        } else {
            feedback.innerText = "❌ Leider falsch. Versuch es nochmal.";
            dropzone.style.border = "2px solid #FF0000";
            db.collection("antworten").add({
                schuelerId: schuelerId,
                level: aktuellesLevel,
                aufgabe: aufgaben[aktuellesLevel - 1].satz,
                antwort: droppedWord,
                korrekt: false,
                punkte: punkte,
                timestamp: new Date()
            });
        }

        document.getElementById('punkteDisplay').innerText = punkte;

    } else {
        feedback.innerText = "Bitte wähle ein Wort aus.";
    }
}

function naechstesLevel() {
    console.log("Ich bin in Funktion next level");
    if (aktuellesLevel - 1 < aufgaben.length) {
        // aktuellesLevel++;
        ladeLevel();
        console.log("Ich habe next level geladen");
    }
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert("Fehler beim Logout: " + error.message);
    });
}

function zurueckThemenwahl() {
    window.location.href = "themenwahl.html";
}

/* 12.05.25:
function showPopup(titel, text) {
    document.querySelector("#popupOverlay .popup-content h2").innerText = titel;
    document.querySelector("#popupOverlay .popup-content p").innerHTML = text;
    document.getElementById("popupOverlay").style.display = "flex";
    document.body.style.overflow = "hidden";
}
*/
function showPopup(titel, text) {
    if (!titel || !text) return; // ➕ Nur anzeigen, wenn beide vorhanden
    const overlay = document.getElementById('popupOverlay');
    overlay.style.display = 'block';
    overlay.querySelector('h2').innerHTML = titel;
    overlay.querySelector('p').innerHTML = text;
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.body.style.overflow = "auto"; // erlaubt wieder Scrollen
}

// 12.05.25
const erklaerungen = {
    conditionnel: {
        1: {
            titel: "Wann verwendet man das Conditionnel?",
            text: "Zunächst wollen wir uns anschauen, in welchen Situationen man das Conditionnel benutzt."
        },
        27: {
            titel: "Super!",
            text: "Vielleicht ist dir aufgefallen, dass wir <strong>genau die gleichen Endungen</strong> wie bei den regelmäßigen Verben benutzen. Nur der <strong>Stamm ist anders</strong>!"
        },
        33: {
            titel: "Très bien !",
            text: "Jetzt üben wir die unregelmäßigen Formen noch ein wenig. Wir starten mit <strong>faire</strong>. Merke dir gut: der Stamm lautet <strong>fer-</strong>!"
        },
        36: {
            titel: "Très bien !",
            text: "Weiter geht's mit <strong>pouvoir</strong>. Merke dir gut: der Stamm lautet <strong>pourr-</strong>!"
        },
        39: {
            titel: "Très bien !",
            text: "Weiter geht's mit <strong>avoir</strong>. Merke dir gut: der Stamm lautet <strong>aur-</strong>!"
        },
        41: {
            titel: "Très bien !",
            text: "Weiter geht's mit <strong>être</strong>. Merke dir gut: der Stamm lautet <strong>ser-</strong>!"
        },
        43: {
            titel: "Très bien !",
            text: "Weiter geht's mit <strong>aller</strong>. Merke dir gut: der Stamm lautet <strong>ir-</strong>!"
        },
        45: {
            titel: "Vorschläge machen mit dem Conditionnel",
            text: "Jetzt verwenden wir den Conditionnel, um Vorschläge zu machen. 💡 Achte darauf, ob das Verb unregelmäßig ist ;)"
        }
    },
    subjonctif: {
        2: {
            titel: " 🤔 Was ist eigentlich der Indikativ?",
            text: "Der <em>Indikativ</em> ist die <em>Normalform</em>. Möchtest du etwas im Präsens ausrücken, benutzt du also einfach das Präsens. "
        },
        10: {
            titel: "Meinung äußern mit Indikativ?",
            text: "Très bien ! Jetzt üben wir ein bisschen wie man seine Meinung im Indikativ äußern kann."
        },
        14: {
            titel: "Meinung äußern mit Subjonctif",
            text: "Jetzt gehen wir vom Indikativ zum <em>Subjonctif</em>."
        },   
        21: {
            titel: "Meinung äußern mit Subjonctif",
            text: "Super ! Jetzt weißt du, dass man den Subjonctif verwendet wenn:"+
            "<ul>man eine Unsicherheit oder einen Zweifel ausdrückt</ul>"+
            "<ul>nach bestimmten Ausdrücken wie z.B. <em>Il est important que ... ,</em> oder Il <em>faut que ...  </em></ul>."
        },  
        26: {
            titel: "Meinung äußern mit Subjonctif",
            text: "Sehr gut, jetzt weißt du wie man den Subjonctif bei regelmäßigen Verben bildet 👍 <br>"+
            "Schauen wir uns noch ein paar unregelmäßige Verben an 🙌"
        },  
        27: {
            titel: "Subjonctif: Unregelmäßige Verben ",
            text: "Genau im Präsens ist prendre unregelmäßig für ils/elles, nächmlich <em>prennent</em>!"
        }, 
        33: {
            titel: "Subjonctif: Unregelmäßige Verben ",
            text: "Dass nous und vous die einzigen Ausnahmen von der Regel bilden, ist <strong>nicht nur bei prendre so</strong>. Bei den Verben <em>venir, prendre, boire, voir</em> ist es analog.!"
        }, 
        51: {
            titel: "Geschafft!",
            text: "Zum Schluss wiederholen wir nochmal alles mit ein paar Übungssätzen 🔁 🏋️"
        }, 
        52: {
            titel: "Exactement !",
            text: "Nach dem Ausdruck <em>Il est important que</em> benutzt man den Subjonctif 👍 "
        }, 
        53: {
            titel: "Exactement !",
            text: "Nach dem Ausdruck <em>Il faut que</em> benutzt man den Subjonctif 👍 "
        }, 
        54: {
            titel: "Schon wieder Subjonctif !",
            text: "<em>Je ne crois pas que</em> drückt einen Zweifel aus -> Also Subjonctif 👍 "
        }, 
        55: {
            titel: "Indikativ!",
            text: "Auf <em>Je trouve que</em> folgt der Indikativ ⚠️ "
        }
    },
    partie1: {
        1: {
            titel: "Wir starten mit Adjektiven!",
            text: "Adjektive helfen, um Personen zu beschreiben. Bei den folgenden Sätze sind manchmal mehrere Antworten möglich. (Beim ersten Satz zum Beispiel 3 richtige Antworten).<br> Wähle deine Antworten aus und klicke auf  <em>Antwort prüfen</em>, bis der Button  <em>Weiter zu nächstem Level</em> erscheint."
        },
        4: {
            titel: "Adjektive an das grammatikalische Geschlecht anpassen",
            text: "<em>talentueu<strong>x</strong></em> ist die männliche Form,  <em>talenteu<strong>se</strong></em> die weibliche. <br> In der Regel hängt man für die weibliche Form ein e an die männliche Grundform. Ausnahmen sind z.B. <em>eux -> euse </em> oder <em> if -> ive </em>   "
        },
        6: {
            titel: "Adjektive",
            text: "Die weibliche Form zu <em>attachant</em> wäre <em>attachant<strong>e</strong></em>. <br> An Adjektive, die in ihrer Grundform bereits auf -e enden, wie <em>timide</em>, wird kein weiteres -e angehängt. <br> <strong>Jetzt beschäftigen wir uns mit den Verben aimer, détester, adorer, préférer!</strong>"
        },
        7: {
            titel: "aimer, détester, adorer, préférer",
            text: "Nach <strong>aimer, détester, adorer, préférer</strong> folgt immer der bestimmte Artikel: <em>le, la, les</em>. <br> Probiere es weiter aus!" 
        },
        10: {
            titel: "aimer, détester, adorer, préférer",
            text: "Übe noch mehr Beispiele, damit du dir das mit dem bestimmten Artikel besser merkst."
        },
        14: {
            titel: "Fortbewegungsmittel: aller + ... ?",
            text: "Wenn du den Kopf an der frischen Luft hast (z.\u202fB. beim Fahrrad), nimmst du <strong>à</strong>. Bist du vom Gefährt umschlossen (Auto, Bus), dann <strong>en</strong>. <br> Probiere es mal aus!" 
        },
        18: {
            titel: "Forbewegungsmittel mit aller",
            text: "Vielleicht ist dir aufgefallen: Auch wenn aller eigentlich gehen bedeutet, benutzt man <strong>aller</strong> auch für Transportmittel: <em>Je vais en train</em>."
        },
        20: {
            titel: "Instrumente vs. Sport (jouer)",
            text: "Weg von den Fortbewegungsmitteln, hin zu Hobbys! <br> Auf das Verb jouer folgt entweder <strong>de</strong> (bei Instrumenten) oder <strong>à</strong> (bei Spielen/Sport). <br> Lass uns ein paar Beispiele machen!"
        },
        21: {
            titel: "Gut erkannt!",
            text: "Wir brauchen nicht nur die Präposition <em>de</em> bzw. <em>à</em>, sondern auch den <strong>bestimmten Artikel</strong>, z.B. <em>de</em> <strong>la</strong> guitare. <br> Attention : <br> <em>de + le</em> verschmilzt zu <strong>du</strong> und <em>de + les</em> verschmilzt zu <strong>des</strong>! <br> à + le verschmilzt zu <strong>au</strong> und <strong>à + les</strong> verschmilzt zu <strong>aux</strong>!"
        },
        24: {
            titel: "Noch mehr Beispiele zu jouer mit den Choristes 😊 ",
            text: "Denk dran: Instrumente mit <em>de</em> und Spiele/Sport mit <em>à</em>"
        },
        26: {
            titel: "Bravo !👏 Zum Abschluss eine kleine Wiederholung 😊 ",
            text: "Vervollständige den Steckbrief von Emma!"
        },
    }, 
    bilan: {
        2: {
            titel: "Très bien !👏",
            text: "Sicher ist dir schon aufgefallen, dass <em>boire</em> ist ein unregelmäßiges Verb."
        },
        4: {
            titel: "Bravo !👏",
            text: "Hier war <em>bu</em> richtig (das Partizip Passé von <em>boire</em>) da wir in der Vergangenheitsform <em>Passé Composé</em> sind."
        },
        8: {
            titel: "Fast regelmäßig...",
            text: "Wie du siehst, verhält sich <em>manger</em> bisher regelmäßig. Nur bei <em>nous</em>, gibt es eine kleine Unregelmäßigkeit..."
        }


    }, 
    mengen: {
        8: {
            titel: "Bravo ! 👏 Wir halten also fest:",
            text: "Bei bestimmten Mengen benutzt man <em>de</em> bzw.<em>d'</em> <br>"+
            "Aber was genau verstehen wir eigentlich unter einer bestimmten Menge? 🤔"
        },
        9: {
             titel: "Genau, <em>(un) pot</em> bedeutet ein <em>Becher</em>. :)"
        },
        11: {
            titel: "Bien joué !",
            text:  "<em> (une) cuillère</em> bedeutet ein <em>Löffel</em>. Man unterscheidet  zwischen: <em>cuillère à café (=Teelöffel)</em> und <em>cuillère à soupe (=Esslöffel)</em>."
        },
        12:{
        text: "Auch Wörter wie <strong><em>beaucoup</em></strong> (= viel) bestimmen die Menge. Das ist auf den ersten Blick vielleicht etwas unintuitiv. Schließlich ist es keine exakte Bestimmung wie beispielsweise eine genaue Grammangabe. Trotzdem handelt es sich um eine bestimmte Menge."
        },
        16:{
            titel: "Ein besonderer Fall...",
            text:" der bestimmten Menge ist <em>pas de</em>, wenn wir gar nichts von etwas haben. Man sagt auch leere Menge dazu. zum Beispiel : <em>Il ne mange <strong>pas de</strong> viande.<em> (Er ist kein Fleisch)"
        }
    }

};

function checkTextarea() {
    const input = document.getElementById('textareaInput');
    const antwort = input.value.trim();
    const aufgabe = aufgaben[aktuellesLevel - 1];

    if (!antwort) {
        alert("Bitte gib eine Antwort ein.");
        return;
    }

    // 🔑 Wenn aktuelle Aufgabe die Ingrédients ist, speichern in sessionStorage
    if (aufgabe.ueberschrift?.toLowerCase().includes("ingrédient")) {
        sessionStorage.setItem("ingredients", antwort);
    }

    // Speichern in Firestore
    db.collection("antworten").add({
        schuelerId,
        thema,
        level: aktuellesLevel,
        aufgabe: aufgabe.satz || aufgabe.ueberschrift || "textarea",
        antwort: antwort,
        korrekt: true,
        punkte,
        timestamp: new Date()
    });
    aktuellesLevel++;
    updateProgressBar();
    if (aktuellesLevel - 1 < aufgaben.length) {
        console.log("Ich komm hier raus");
        document.getElementById('nextLevelBtn').style.display = "inline-block";

    // 23.06.2025
    } else {
        console.log("Jetzt sollte Pinnwand geladen werden");
        zeigeRezeptPinnwand(); // statt ladeFalschBeantworteteAufgaben()
        return;
    }
}

function checkTextAnswer() {
    const input = document.getElementById('textInput');
    const antwort = input.value.trim().toLowerCase();
    const aufgabe = aufgaben[aktuellesLevel - 1];

    /*
    const richtigeAntworten = Array.isArray(aufgabe.korrekt)
        ? aufgabe.korrekt.map(a => a.toLowerCase())
        : [aufgabe.korrekt.toLowerCase()];
    */
    const richtigeAntwort = aufgabe.korrekt;
    let isCorrect = false;
    let accentFehler = false;

    if (Array.isArray(richtigeAntwort)) {
        console.log("Hier1");
        for (let korrektWort of richtigeAntwort) {
            if (antwort === korrektWort.toLowerCase()) {
                console.log("Hier1.1");
                isCorrect = true;
                break;
            }
            if (entferneAccents(antwort) === entferneAccents(korrektWort.toLowerCase())) {
                console.log("Hier1.2");
                isCorrect = true;
                accentFehler = true;
                break;
            }
        }
    } else {
        console.log("Hier2");
        if (antwort === richtigeAntwort.toLowerCase()) {
            console.log("Hier2.1");
            isCorrect = true;
        } else if (entferneAccents(antwort) === entferneAccents(richtigeAntwort.toLowerCase())) {
            console.log("Hier2.2");
            isCorrect = true;
            accentFehler = true;
        }
    }
    // const isCorrect = richtigeAntworten.includes(antwort);

    // 19.06.25: Antwort für spätere Verwendung speichern
    if (aufgabe.speichereAls) {
        userAntworten[aufgabe.speichereAls] = input.value.trim(); // Originaltext
    }

    if (isCorrect) {
        if (accentFehler) {
            alert("Kleiner Accent-Fehler, kein Problem 🙂");
            feedback.innerText = "✅ Richtig!";
        } else {
            feedback.innerText = "✅ Richtig!";
        }
        punkte += 10;
        aktuellesLevel++;
        const istHalbzeit = aktuellesLevel === Math.ceil(aufgaben.length / 2);
        if (istHalbzeit) {
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            alert("🎉 Bravo ! Du hast die Hälfte geschafft !");
        }

        updateProgressBar(); // ✅ Fortschrittsbalken korrekt setzen

        db.collection("antworten").add({
            schuelerId,
            level: aktuellesLevel,
            aufgabe: aufgabe.satz,
            antwort: antwort,
            korrekt: true,
            punkte,
            timestamp: new Date()
        });

        db.collection("lernstaende").doc(`${schuelerId}_${thema}`).set({
            schuelerId,
            thema,
            aktuellesLevel,
            punkte,
            timestamp: new Date()
        });

        document.getElementById('nextLevelBtn').style.display = "inline-block";
    } else {
        feedback.innerText = "❌ Leider falsch. Versuch es nochmal.";
        // Falsche Antworten speichern
        db.collection("antworten").add({
            schuelerId,
            thema,
            level: aktuellesLevel,
            aufgabe: aufgabe.satz,
            antwort: antwort,
            korrekt: false,
            punkte,
            timestamp: new Date()
        });
    }

    document.getElementById('punkteDisplay').innerText = punkte;

    // Nach document.getElementById('punkteDisplay').innerText = punkte;
    if (aktuellesLevel - 1 >= aufgaben.length) {
        console.log("Letzte Aufgabe bei Texteingabe erreicht → Wiederholung");
        setTimeout(() => {
            ladeFalschBeantworteteAufgaben();
        }, 1000); // kleine Verzögerung
    }
}

function saveReflexion() {
  const text = document.getElementById("reflexionInput").value.trim();
  if (!text) {
    alert("Bitte schreibe eine kurze Reflexion.");
    return;
  }

  db.collection("reflexionen").add({
    schuelerId,
    thema,
    text,
    timestamp: new Date()
  });

  alert("✅ Danke für deine Rückmeldung!");
    if (thema === "conditionnel") {
        console.log("sollte zeigen");
        showLinkPopup(); // Zeigt das Popup mit Link
    } else {
        window.location.href = "themenwahl.html";
    }
}

async function ladeFalschBeantworteteAufgaben() {
    const snapshot = await db.collection("antworten")
        .where("schuelerId", "==", schuelerId)
        .where("thema", "==", thema)
        .where("korrekt", "==", false)
        .get();

    const falschBeantwortete = [];
    console.log("Zeig mir den rausgefischten Datensatz an:", snapshot);
    snapshot.forEach(doc => {
      console.log("Antwort:", doc.data());
    });
    snapshot.forEach(doc => {
        const falsch = doc.data();
        console.log("Datensatz geprüft:", falsch);
        
        // Finde die Original-Aufgabe basierend auf dem Satz
        // const original = aufgaben[falsch.level - 1];
        console.log("Original gefunden:", original);
        /*
        const original = aufgaben.find(a =>
            (a.satz?.includes(falsch.aufgabe) || falsch.aufgabe?.includes(a.satz)) &&
            (!falsch.level || aufgaben.indexOf(a) === falsch.level - 1)
        );
        */
        const original = aufgaben.find(a =>
            (a.satz === falsch.aufgabe || a.ueberschrift === falsch.aufgabe ) &&
            (!falsch.level || aufgaben.indexOf(a) === falsch.level - 1)
        );
        
        if (original && !falschBeantwortete.find(a => a.satz === original.satz)) {
            falschBeantwortete.push(original);
        }
    });
    console.log("Gefundene falsch beantwortete Aufgaben:", falschBeantwortete);
    if (falschBeantwortete.length > 0) {
        alert("Lass uns jetzt die Aufgaben wiederholen, mit denen du Probleme hattest :)");
        aufgaben = falschBeantwortete;
        aufgaben.push({
            typ: "reflexion",
            satz: "✍️ Was hast du durch diese Einheit gelernt? Notiere stichpunktartig zwei, drei Gedanken.",
            bild: "img/takeaway.jpeg"
        });  
        aktuellesLevel = 1;
        ladeLevel();
    } else {
        alert("🎉 Du hast alle Aufgaben korrekt gelöst!");
        aufgaben = [{
            typ: "reflexion",
            satz: "✍️ Was hast du aus dieser Einheit mitgenommen? Notiere stichpunktartig zwei, drei Gedanken",
            bild: "img/takeaway.jpeg"
        }];
        aktuellesLevel = 1;
        ladeLevel();
    }
}

function formatWord(wort) {
    return wort.replace(/(ais|ait|ions|iez|aient)$/g, "<em>$1</em>");
}

function showLinkPopup() {
    document.getElementById('linkPopup').style.display = 'flex';
}

function closeLinkPopup() {
    document.getElementById('linkPopup').style.display = 'none';
    window.location.href = "themenwahl.html";
}

function saveTextarea() {
    const input = document.getElementById('textareaInput');
    const antwort = input.value.trim();
    const aufgabe = aufgaben[aktuellesLevel - 1];

    if (!antwort) {
        alert("Bitte gib eine Antwort ein.");
        return;
    }

    // 🔑 Wenn aktuelle Aufgabe die Ingrédients ist, speichern in sessionStorage
    if (aufgabe.ueberschrift?.toLowerCase().includes("ingrédient")) {
        sessionStorage.setItem("ingredients", antwort);
    }

    // Speichern in Firestore
    db.collection("antworten").add({
        schuelerId,
        thema,
        level: aktuellesLevel,
        aufgabe: aufgabe.satz || aufgabe.ueberschrift || "textarea",
        antwort: antwort,
        korrekt: true,
        punkte,
        timestamp: new Date()
    });

    aktuellesLevel++;
    updateProgressBar();
    if (aktuellesLevel - 1 < aufgaben.length) {
        ladeLevel();
    } else {
        zeigeRezeptPinnwand();
    }
}

function zeigeRezeptPinnwand() {
    const container = document.getElementById("sentence");

    // Automatisch IDs von schueler-30 bis schueler-43 erzeugen
    const userIds = [];
    for (let i = 31; i <= 40; i++) {
        userIds.push(`schueler-${i}`);
    }

    container.innerHTML = "<h3>📌 Übersicht</h3>";
    document.getElementById("words").style.display = "none";
    document.getElementById("textAntwortContainer").style.display = "none";
    document.getElementById("checkAnswerBtn").style.display = "none";
    document.getElementById("bildContainer").innerHTML = "";
    document.getElementById("ueberschrift").innerHTML = "";
    document.getElementById("nextLevelBtn").style.display = "none";

    userIds.forEach(id => {
        if (thema === "recette") {

        
        db.collection("antworten")
            .where("schuelerId", "==", id)
            .where("thema", "==", "recette")
            .get()
            .then(snapshot => {
                console.log("schuelerId =? ",id);
                const daten = snapshot.docs.map(doc => doc.data());
                console.log("daten: ",daten);
                const zutaten = daten
                    .filter(e => e.aufgabe?.includes("ton tour"))
                    .reduce((latest, current) => {
                      const lt = latest?.timestamp?.seconds || 0;
                      const ct = current?.timestamp?.seconds || 0;
                      return ct > lt ? current : latest;
                    }, null)?.antwort;
                    // .filter(e => e.aufgabe?.includes("Ingrédient"))
                    // .at(-1)?.antwort || "–";
                console.log("zutaten: ", zutaten);
                // const zubereitung = daten.find(e => e.level === 2)?.antwort || "–";
                const zubereitung = daten
                    .filter(e => e.aufgabe?.includes("étapes"))
                    .reduce((latest, current) => {
                      const lt = latest?.timestamp?.seconds || 0;
                      const ct = current?.timestamp?.seconds || 0;
                      return ct > lt ? current : latest;
                    }, null)?.antwort;
                    // .at(-1)?.antwort || "–";

                const block = document.createElement("div");
                block.classList.add("rezept-block");
                block.innerHTML = `
                    <h4>👤 ${id}</h4>
                    <p><strong>🧂 Ingrédients:</strong><br>${zutaten}</p>
                    <p><strong>👨‍🍳 Préparation:</strong><br>${zubereitung}</p>
                    <hr>
                `;
                container.appendChild(block);
            });
        } else if (thema === "mengen") {
        db.collection("antworten")
            .where("schuelerId", "==", id)
            .where("thema", "==", "mengen")
            .get()
            .then(snapshot => {
                console.log("schuelerId =? ",id);
                const daten = snapshot.docs.map(doc => doc.data());
                console.log("daten: ",daten);
                const farben = daten
                    .filter(e => e.aufgabe?.includes("irgendeine"))
                    .reduce((latest, current) => {
                      const lt = latest?.timestamp?.seconds || 0;
                      const ct = current?.timestamp?.seconds || 0;
                      return ct > lt ? current : latest;
                    }, null)?.antwort;
                    // .at(-1)?.antwort || "–";
                console.log("Farben: ", farben);
                const zubereitung = daten.find(e => e.level === 2)?.antwort || "–";

                const block = document.createElement("div");
                block.classList.add("rezept-block");
                block.innerHTML = `
                    <h4>👤 ${id}</h4>
                    <p><strong>🎨 Farbe:</strong><br>${farben}</p>
                    <hr>
                `;
                container.appendChild(block);
            })
        } 
    });
}
