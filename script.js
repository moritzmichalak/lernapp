// Firebase initialisieren
const firebaseConfig = {
    apiKey: "DEIN_API_KEY",
    authDomain: "DEIN_AUTH_DOMAIN",
    projectId: "DEIN_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
    
    // 👉 Nur ausblenden, wenn es wirklich ein neues Level ist
    if (aktuellesLevel <= aufgaben.length) {
        document.getElementById('nextLevelBtn').style.display = "none";
    }
    
    const wordsDiv = document.getElementById('words');
    wordsDiv.innerHTML = "";
    /*
    aufgabe.woerter.forEach((wort, index) => {
        wordsDiv.innerHTML += `<div class="word" draggable="true" ondragstart="drag(event)" id="word${index}">${wort}</div>`;
    */
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
/*
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var word = document.getElementById(data);
    ev.target.innerHTML = "";
    ev.target.appendChild(word);
}
*/
function wordClick(event) {
    const dropzone = document.querySelector('.dropzone');
    dropzone.innerHTML = "";
    dropzone.appendChild(event.target);
}

function checkAnswer() {
    const schuelerId = document.getElementById('schuelerSelect').value;
    const dropzone = document.querySelector('.dropzone');
    const feedback = document.getElementById('feedback');

    if (!schuelerId) {
        feedback.innerText = "⚠️ Bitte wähle deine Schüler-ID aus.";
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

            const progressBar = document.getElementById('progressBar');

            if (aktuellesLevel < aufgaben.length) {
                console.log("Button sollte jetzt sichtbar sein!");
                document.getElementById('nextLevelBtn').style.display = "inline-block";
            } else {
                feedback.innerText += " 🎉 Du hast alle Level geschafft!";
                progressBar.style.width = "100%";
                progressBar.innerText = "100%";
                progressBar.classList.add("full");

                // 🎊 Konfetti
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
        feedback.innerText = "Bitte ziehe ein Wort in die Lücke.";
    }
}

function naechstesLevel() {
    if (aktuellesLevel < aufgaben.length) {
        aktuellesLevel++;
        ladeLevel();
    }
}

// Initialisierung
window.onload = ladeLevel;
