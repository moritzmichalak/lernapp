const db = firebase.firestore();
let schuelerId = "";

// Auth-Check und Start der Lernumgebung
firebase.auth().onAuthStateChanged(function(user) {
    console.log("Auth-Zustand geprüft:", user);
    if (user) {
        console.log("Das klappt, hier die Daten zum User: ", user);
        const email = user.email;
        schuelerId = email.split('@')[0];
        document.getElementById('userInfo').innerText = "Eingeloggt als: " + schuelerId;

        // Starte erst jetzt die Lernumgebung
        ladeLevel();
    } else {
        /*
        console.log("Kein User eingeloggt, Weiterleitung...");
        window.location.href = "index.html";
        */
        console.log("⚠️ Kein User erkannt. Warte 300ms vor Weiterleitung...");
        setTimeout(() => {
            firebase.auth().currentUser ? console.log("User doch gefunden!") : window.location.href = "index.html";
        }, 300);
    }
});

const aufgaben = [
    { satz: "Ich ___ gerne ein Buch.", woerter: ["lese", "renne", "trinke"], korrekt: "lese" },
    { satz: "Du ___ Fußball im Park.", woerter: ["spielst", "isst", "schläfst"], korrekt: "spielst" },
    { satz: "Wir ___ einen Kuchen.", woerter: ["backen", "fahren", "laufen"], korrekt: "backen" }
];

let aktuellesLevel = 1;
let punkte = 0;

function ladeLevel() {
    const aufgabe = aufgaben[aktuellesLevel - 1];
    document.getElementById('levelDisplay').innerText = aktuellesLevel;
    document.getElementById('punkteDisplay').innerText = punkte;
    document.getElementById('sentence').innerText = aufgabe.satz;
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
            feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
            punkte += 10;

            db.collection("antworten").add({
                schuelerId: schuelerId,
                level: aktuellesLevel,
                aufgabe: aufgaben[aktuellesLevel - 1].satz,
                antwort: droppedWord,
                korrekt: true,
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
