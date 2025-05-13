const db = firebase.firestore();
let schuelerId = "";

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
        /*
        console.log("Kein User eingeloggt, Weiterleitung...");
        window.location.href = "index.html";
        */
        if (firebase.auth().currentUser  && firebase.auth().currentUser.email) {
            console.log("User doch gefunden!");
        } else {
            window.location.href = "index.html";
        }
        /*
        console.log("⚠️ Kein User erkannt. Warte 300ms vor Weiterleitung...");
        setTimeout(() => {
            if (firebase.auth().currentUser  && firebase.auth().currentUser.email) {
                console.log("User doch gefunden!");
            } else {
                window.location.href = "index.html";
            }
        }, 300);
        */
    }
});

/*
const aufgaben = [
    { satz: "Ich ___ gerne ein Buch.", woerter: ["lese", "renne", "trinke"], korrekt: "lese" },
    { satz: "Du ___ Fußball im Park.", woerter: ["spielst", "isst", "schläfst"], korrekt: "spielst" },
    { satz: "Wir ___ einen Kuchen.", woerter: ["backen", "fahren", "laufen"], korrekt: "backen" }
];
*/

// Hole das Thema aus der URL
const urlParams = new URLSearchParams(window.location.search);
const thema = urlParams.get('thema');

// Definiere die Aufgaben je nach Thema
let aufgaben = [];
let richtige = [];
if (thema === "subjonctif") {
    aufgaben = [
        { satz: "Il faut que tu ___ (faire) tes devoirs.", woerter: ["fasses", "fait", "fera"], korrekt: "fasses" },
        { satz: "Bien que nous ___ (être) fatigués, nous continuons.", woerter: ["soyons", "sommes", "sera"], korrekt: "soyons" },
        { satz: "Je ne pense pas que ce / c' ___ (être) une bonne idée !", woerter: ["soit", "est", "sera"], korrekt: "soit" }
    ];
} else if (thema === "conditionnel") {
    aufgaben = [
        { satz: "Si j'étais riche, je ___ (acheter) une maison.", woerter: ["achèterais", "achète", "acheterai"], korrekt: "achèterais" },
        { satz: "Nous ___ (vouloir) voyager plus.", woerter: ["voudrions", "voulons", "voudrons"], korrekt: "voudrions" },
        { satz: "Je / J' ___ (aimer) aller au Japon.", woerter: ["aimais", "aimeriais", "aimerais"], korrekt: "aimerais" },
        { satz: "Si on avait beaucoup d'argent, on ___ (faire) un grand voyage.", woerter: ["faissait", "ferait", "fairiait"], korrekt: "ferait" }
    ];
} else if (thema === "partie 1") {
    aufgaben = [
        { satz: "Clément Mathieu est un homme ___ .", woerter: ["passionné", "patient" , "compréhensif", "autoritaire", "sévère", "rigide"], korrekt: "passionné", bild: "img/mathieu.jpg" },
        { satz: "Clément Mathieu est un homme ___ .", woerter: ["patient" , "compréhensif", "autoritaire", "sévère", "rigide"], korrekt: "patient", bild: "img/mathieu.jpg" },
        { satz: "Clément Mathieu est un homme ___ .", woerter: ["compréhensif", "autoritaire", "sévère", "rigide"], korrekt: "compréhensif", bild: "img/mathieu.jpg" },
        { satz: "Clément Mathieu adore ___ musique.", woerter: ["la", "de la", "de"], korrekt: "la", bild: "img/mathieu.jpg"},
        { satz: "Clément Mathieu aime ___ travail avec les élèves.", woerter: ["le", "du", "de"], korrekt: "le", bild: "img/mathieu.jpg"},
        { satz: "Je vais à l'école ___  pied.", woerter: ["à", "en", "avec"], korrekt: "à" },
        { satz: "Ma mère va au travail ___ voiture.", woerter: ["à", "en", "avec"], korrekt: "en" },
        { satz: "Mon père va au travail ___  vélo.", woerter: ["à", "en", "avec"], korrekt: "à" },
        { satz: "Ma sœur va au lycée ___ bus.", woerter: ["à", "en", "avec"], korrekt: "en" },
    ];
} /* else {
    alert("Kein gültiges Thema gewählt. Du wirst zur Themenwahl zurückgeleitet.");
    window.location.href = "themenwahl.html";
} */

/*
let aktuellesLevel = 1;
let punkte = 0;
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
    const aufgabe = aufgaben[aktuellesLevel - 1];
    const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
    const satzMitLuecke = aufgabe.satz.replace("___", luecke);
    document.getElementById('sentence').innerHTML = satzMitLuecke;
    document.getElementById('levelDisplay').innerText = aktuellesLevel;
    document.getElementById('punkteDisplay').innerText = punkte;
    /*
    document.getElementById('sentence').innerText = aufgabe.satz;
    */
    document.getElementById('feedback').innerText = "";
    document.getElementById('nextLevelBtn').style.display = "none";

    const wordsDiv = document.getElementById('words');
    wordsDiv.innerHTML = "";
    if (aufgabe.bild) {
        console.log("Wir haben ein Bild.");
        document.getElementById('bildContainer').innerHTML = 
        `<img src="${aufgabe.bild}" alt="Bild zur Aufgabe" class="aufgabenbild">`;
    } else {
        console.log("Wir haben kein Bild.");
        document.getElementById('bildContainer').innerHTML = "";
    }
    aufgabe.woerter.forEach((wort, index) => {
        wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${wort}</div>`;
    });

    document.querySelector('.dropzone').innerHTML = "<span>Hier ablegen</span>";
    console.log("Ich bin in lade level und sollte jetzt die ProgressBar abfeuern");
    updateProgressBar();

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

    if (!schuelerId) {
        feedback.innerText = "⚠️ Keine Schüler-ID gefunden.";
        return;
    }

    if (dropzone.children.length > 0) {
        const droppedWord = dropzone.children[0].innerText;
        const richtigeAntwort = aufgaben[aktuellesLevel - 1].korrekt;
        console.log("Aktuelles level (1. Check):", aktuellesLevel);
        if (droppedWord === richtigeAntwort) {
            console.log("Aktuelles level (2. Check):", aktuellesLevel);
            dropzone.style.border = "2px solid #4caf50";
            feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
            punkte += 10;
            if(aufgaben[aktuellesLevel - 1].satz.startsWith("Clément Mathieu est un homme")) {
                richtige.push(droppedWord);
                console.log("Satz beginnt mit CM est un homme...")
            }
            console.log("Richtige Antworten abgespeicher?", richtige)
            // 12.05.25
            // hier falls im vorletzten Level, dann: akutelleslevel ++
            const erklaerung = erklaerungen[thema]?.[aktuellesLevel];
            console.log("Erklärugen für Popups:", erklaerung, erklaerungen);
            if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
                showPopup(erklaerung.titel, erklaerung.text);
                //localStorage.setItem(`popupShown_${thema}_${aktuellesLevel}`, "true");
            }
            /*
            db.collection("antworten").add({
                schuelerId: schuelerId,
                level: aktuellesLevel,
                aufgabe: aufgaben[aktuellesLevel - 1].satz,
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
            */
            aktuellesLevel++;
            if (aktuellesLevel - 1 < aufgaben.length) {
                console.log("Ich komm hier raus");
                document.getElementById('nextLevelBtn').style.display = "inline-block";
            } else {
                console.log("Ich komm da raus");
                // muss woanders hin:
                // aktuellesLevel++;
                feedback.innerText += " 🎉 Du hast alle Level geschafft!";
                // 12.05.25:
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

// 12.05.25:
function showPopup(titel, text) {
    document.querySelector("#popupOverlay .popup-content h2").innerText = titel;
    document.querySelector("#popupOverlay .popup-content p").innerHTML = text;
    document.getElementById("popupOverlay").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.body.style.overflow = "auto"; // erlaubt wieder Scrollen
}

// 12.05.25
const erklaerungen = {
    conditionnel: {
        1: {
            titel: "Was ist das Conditionnel?",
            text: "Das Conditionnel drückt Möglichkeiten, Wünsche oder höfliche Bitten aus. Beispiel: <em>Je voudrais un café.</em>"
        },
        2: {
            titel: "Formation: Stamm + Endung",
            text: "Man nimmt den Futur-Stamm + die imparfait-Endungen. Beispiel: <em>je parlerais</em>, <em>nous finirions</em>."
        }
    },
    subjonctif: {
        1: {
            titel: "Wofür braucht man den Subjonctif?",
            text: "Der Subjonctif wird nach bestimmten Auslösern verwendet, z. B. <em>il faut que</em>, <em>bien que</em> etc."
        }
    }
};

/*
window.logout = logout;
window.zurueckThemenwahl = zurueckThemenwahl;
*/