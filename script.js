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

if (thema === "subjonctif") {
    aufgaben = [
        { satz: "Il faut que tu ___ (faire) tes devoirs.", woerter: ["fasses", "fait", "fera"], korrekt: "fasses" },
        { satz: "Bien que nous ___ (être) fatigués, nous continuons.", woerter: ["soyons", "sommes", "sera"], korrekt: "soyons" }
    ];
} else if (thema === "conditionnel") {
    aufgaben = [
        { satz: "Si j'étais riche, je ___ (acheter) une maison.", woerter: ["achèterais", "achète", "acheterai"], korrekt: "achèterais" },
        { satz: "Nous ___ (vouloir) voyager plus.", woerter: ["voudrions", "voulons", "voudrons"], korrekt: "voudrions" }
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

    aufgabe.woerter.forEach((wort, index) => {
        wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${wort}</div>`;
    });

    document.querySelector('.dropzone').innerHTML = "<span>Hier ablegen</span>";
    updateProgressBar();
}

function updateProgressBar() {
    const totalLevels = aufgaben.length;
    const progressPercent = ((aktuellesLevel - 1) / totalLevels) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progressPercent + "%";
    progressBar.innerText = Math.round(progressPercent) + "%";
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

        if (droppedWord === richtigeAntwort) {
            dropzone.style.border = "2px solid #4caf50";
            feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
            punkte += 10;
            // 12.05.25
            if (punkte === 10 && thema === "conditionnel") {
                showPopup();
            }
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

            if (aktuellesLevel < aufgaben.length) {
                document.getElementById('nextLevelBtn').style.display = "inline-block";
            } else {
                feedback.innerText += " 🎉 Du hast alle Level geschafft!";
                const progressBar = document.getElementById('progressBar');
                progressBar.style.width = "100%";
                progressBar.innerText = "100%";
                progressBar.classList.add("full");

                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
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
    if (aktuellesLevel < aufgaben.length) {
        aktuellesLevel++;
        ladeLevel();
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
function showPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}