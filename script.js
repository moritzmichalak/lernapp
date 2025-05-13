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
if (thema === "partie 1") {
    console.log("Mir haven's erkannt!");
    thema = "partie_1";
} 

console.log("Das Thema ist:", thema);


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
} else if (thema === "partie_1") {
    aufgaben = [
        { satz: "Clément Mathieu est un homme ___ .", woerter: ["passionné", "patient" , "compréhensif", "autoritaire", "sévère", "rigide"], korrekt: ["passionné", "patient", "compréhensif"], bild: "img/mathieu.jpg" },
        { satz: "Rachin est un directeur  ___ .", woerter: ["compréhensif", "strict", "timide", "autoritaire", "froid", "gentil"], korrekt: ["strict", "autoritaire", "froid"], bild: "img/rachin.jpg" },
        { satz: "Pierre Morhange est un chanteur  ___ .", woerter: ["talentueux", "mauvais", "talentueuse", "doué"], korrekt: ["doué", "talentueux"], bild: "img/pierre.jpeg" },
        { satz: "Pierre Morhange est un garçon  ___ .", woerter: ["rebelle", "strict", "autoritaire", "heureuse", "indépendent"], korrekt: ["indépendent", "rebelle"], bild: "img/pierre.jpeg" },
        { satz: "Pépinot est un garçon  ___ .", woerter: ["intimidant", "attachant", "autoritaire", "timide", "violant"], korrekt: ["attachant", "timide"], bild: "img/pepinot.jpeg" },
        // Ende Adjektive  
        // Beginn aimer, détester, adorer, préférer
        // POPUP: Wir schauen uns jetzt an mit welcher Art von Artikeln die vier Verben aimer, détester, adorer und préférer funktionieren. Probiere es zunächst einmal:
        { satz: "Clément Mathieu adore ___ musique.", woerter: ["la", "de la", "de"], korrekt: "la", bild: "img/mathieu.jpg"},
        { satz: "Clément Mathieu aime ___ travail avec les élèves.", woerter: ["le", "du", "de"], korrekt: "le", bild: "img/mathieu.jpg"},
        { satz: "Rachin préfère ___ autorité excessive à la bienveillance.", woerter: ["l'", "de l'", "d'"], korrekt: "l'", bild: "img/rachin.jpg"},
        { satz: "Pierre Morhange déteste ___ règles.", woerter: ["les", "de", "des"], korrekt: "les", bild: "img/.jpg"},
        // POPUP: Die Besonderheit bei aimer, détester, adorer, préférer ist, dass immer der bestimmte Artikel folgt (le, la, les). Wir machen noch ein paar Beispiele zur Übung:
        { satz: "Elle aime ___  chocolat.", woerter: ["le", "du", "la"], korrekt: "le", bild: "img/chocolat.png" },
        { satz: "Elle adore ___  musique.", woerter: ["le", "de", "la", "de la", "du"], korrekt: "la", bild: "img/musique.png" },
        { satz: "Elle préfère ___  chiens aux chats.", woerter: ["les", "des", "d'", "du"], korrekt: "les", bild: "img/chiens.png" },
        { satz: "Il déteste ___  épinards.", woerter: ["des", "les", "d'", "de la"], korrekt: "les", bild: "img/épinards.png" },
        // POPUP: Jetzt beschäftigen wir uns mit Fortbewegunsmitteln. Welche Präsposition passt zu welchem Fortbeweungsmittel? Es gibt hier eine Regel: Immer wenn ich den Kopf an der frischen Luft habe, so benutzt man 'à' (z.B. à pied, à vélo). Wenn man in einem geschlossenen Fortbewegungsmittel ist, nimmt man 'en' (z.B. en train)
        { satz: "Je m'appelle Léo. Je vais à l'école ___  pied.", woerter: ["à", "en", "avec"], korrekt: "à", bild: "img/schulweg.png" },
        { satz: "Ma mère va au travail ___ voiture.", woerter: ["à", "en", "avec"], korrekt: "en", bild: "img/mutter.jpeg" },
        { satz: "Mon père va au travail ___  vélo.", woerter: ["à", "en", "avec"], korrekt: "à", bild: "img/vater.jpg" },
        { satz: "Ma sœur va au lycée ___ bus.", woerter: ["à", "en", "avec"], korrekt: "en", bild: "img/schwester.png" },
        // POPUP: Wie du siehst, benutzt man immer das Verb 'aller' - auch wenn man eigentlich gar nicht geht! Beispiele ... fett(aller)
        {    
            satz: "Ils vont en France ____ moto.",
            typ: "text",
            korrekt: "à",
            bild: "img/moto.jpeg"
        },
        // POPUP: Genau, beim Motorradfahren ist der Kopf an der frischen Luft, also à :)
        {    
            satz: "Elle va chez ses parents  ____ train.",
            typ: "text",
            korrekt: "en",
            bild: "img/train.jpg"
        },
        // POPUP: Steigt man in den Zug ist man innerhalb eines Fortbewegungsmittels, also en :) Jetzt schauen wir uns das Verb jouer an. Auch hier benutzt man entweder die Präposition 'à' oder 'de'. Hier ist die Regel: Bei Instrumenten benutzt man 'de' und bei Sport oder anderen Spielen 'à'
        { satz: "Il joue ___ guitare.", woerter: ["de la", "à la"], korrekt: "de la", bild: "img/guitare.png" },
        // POPUP: Vielleicht ist dir aufgefallen, dass man de + le/la/les verwendet.
        { satz: "Il joue ___ piano.", woerter: ["de la", "du", "à la"], korrekt: "du", bild: "img/piano.png" },
        // POPUP: de + le verschmilzt zu 'du' und de + les verschmilzt zu 'des'
        { satz: "Ils jouent ___ volleyball (männlich).", woerter: ["au", "du", "à la", " à le"], korrekt: "au", bild: "img/volley.png" },
        // POPUP: Volleyball ist kein Instrument, sondern ein Sport. à + le verschmilzt zu 'au' und à + les verschmilzt zu 'aux'
        { satz: "Ils jouent ___ boules.", woerter: ["aux", "du", "à la", " à le", "des"], korrekt: "aux", bild: "img/boules.jpg" },
        {    
            satz: "Clément Mathieu joue ____ piano.",
            typ: "text",
            korrekt: "du",
            bild: "img/mathieu.jpg"
        },
        {    
            satz: "Les élèves jouent ____ foot(ball).",
            typ: "text",
            korrekt: "au",
            bild: "img/foot.jpg"
        },
        
        {    
            satz: "Salut, je m'appelle Emma 😊<ul>➡️ Je vais à l'école _____ pied. 🚶‍♀️</ul><select disabled><ul>Je joue _____ guitare. 🎸🎶</ul><ul>Je joue _____ Badminton. 🏸💪</ul><ul>Je suis un peu _____ (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>Mais le plus souvent je suis _____ (Aber meistens ist sie <b>glücklich</b>)</ul><ul>J'aime ____ chocolat.🍫❤️ </ul><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "à",
            bild: "img/Emma.png"
        },
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> ➡️Je joue _____ guitare. 🎸🎶</ul><select disabled><ul>Je joue _____ Badminton. 🏸💪</ul><ul>Je suis un peu _____ (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>Mais le plus souvent je suis _____ (Aber meistens ist sie <b>glücklich</b>)</ul><ul>J'aime ____ chocolat.🍫❤️ </ul><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "de la",
            bild: "img/Emma.png"
        },
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> Je joue <b>de la </b> guitare. 🎸🎶</ul><ul>➡️Je joue _____ Badminton. 🏸💪</ul><select disabled><ul>Je suis un peu _____ (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>Mais le plus souvent je suis _____ (Aber meistens ist sie <b>glücklich</b>)</ul><ul>J'aime ____ chocolat.🍫❤️ </ul><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "au",
            bild: "img/Emma.png"
        },    
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> Je joue <b>de la </b> guitare. 🎸🎶</ul><ul>Je joue <b>au</b> Badminton. 🏸💪</ul><ul>➡️Je suis un peu _____ (Sie ist ein wenig <b>schüchtern</b>)</ul><select disabled><ul>Mais le plus souvent je suis _____ (Aber meistens ist sie <b>glücklich</b>)</ul><ul>J'aime ____ chocolat.🍫❤️ </ul><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "timide",
            bild: "img/Emma.png"
        }, 
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> Je joue <b>de la </b> guitare. 🎸🎶</ul><ul>Je joue <b>au</b> Badminton. 🏸💪</ul><ul>Je suis un peu <b>timide</b> (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>➡️Mais le plus souvent je suis _____ (Aber meistens ist sie <b>glücklich</b>)</ul><select disabled><ul>J'aime ____ chocolat.🍫❤️ </ul><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "heureuse",
            bild: "img/Emma.png"
        },  
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> Je joue <b>de la </b> guitare. 🎸🎶</ul><ul>Je joue <b>au</b> Badminton. 🏸💪</ul><ul>Je suis un peu <b>timide</b> (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>Mais le plus souvent je suis <b>heureuse</b> (Aber meistens ist sie <b>glücklich</b>)</ul><ul>➡️J'aime ____ chocolat.🍫❤️ </ul><select disabled><ul>J'adore ____ chats. 🐈😊 </ul></select>",
            typ: "text",
            korrekt: "le",
            bild: "img/Emma.png"
        },  
        {    
            satz: "Salut, je m'appelle Emma 😊<ul> Je vais à l'école <b>à</b> pied. 🚶‍♀️</ul><ul> Je joue <b>de la </b> guitare. 🎸🎶</ul><ul>Je joue <b>au</b> Badminton. 🏸💪</ul><ul>Je suis un peu <b>timide</b> (Sie ist ein wenig <b>schüchtern</b>)</ul><ul>Mais le plus souvent je suis <b>heureuse</b> (Aber meistens ist sie <b>glücklich</b>)</ul><ul>J'aime <b>le</b> chocolat.🍫❤️ </ul><ul>➡️J'adore ____ chats. 🐈😊 </ul>",
            typ: "text",
            korrekt: "les",
            bild: "img/Emma.png"
        },  
        { satz: "Ma sœur va au lycée ___ bus.", woerter: ["à", "en", "avec"], korrekt: "en", bild: "img/schwester.png" },
    ];
} /* else {
    alert("Kein gültiges Thema gewählt. Du wirst zur Themenwahl zurückgeleitet.");
    window.location.href = "themenwahl.html";
} */

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
    offeneKorrekte = [...aufgabe.korrekt]; // Kopie für Tracking
    // dropzone.innerHTML = "<span class='placeholder'>...</span>";

    const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
    const satzMitLuecke = aufgabe.satz.replace("___", luecke);
    document.getElementById('sentence').innerHTML = satzMitLuecke;

    /*
    // Jetzt existiert .dropzone im DOM → erst jetzt zurücksetzen
    document.querySelector('.dropzone').innerHTML = "<span class='placeholder'>...</span>";
    */
    const dropzone = document.querySelector('.dropzone');
    // 13.05.25:
    if (dropzone) {
        dropzone.innerHTML = "<span class='placeholder'>...</span>";
        dropzone.style.display = "inline-flex";
    }
    dropzone.innerHTML = "<span class='placeholder'>...</span>";
    dropzone.style.display = "inline-flex";

    document.getElementById('levelDisplay').innerText = aktuellesLevel;
    document.getElementById('punkteDisplay').innerText = punkte;
    document.getElementById('feedback').innerText = "";
    document.getElementById('nextLevelBtn').style.display = "none";

    const wordsDiv = document.getElementById('words');
    wordsDiv.innerHTML = "";
    /*
    aufgabe.woerter.forEach((wort, index) => {
        wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${wort}</div>`;
    });
    */
    // 13.05.25:
    const textContainer = document.getElementById('textAntwortContainer'); // 🔧 NEU
    const textInput = document.getElementById('textInput'); // 🔧 NEU

    const checkAnswerBtn = document.getElementById('checkAnswerBtn'); // ✅ NEU


    if (aufgabe.typ === "text") {
        if (dropzone) dropzone.style.display = "none"; // 🔧 NEU
        wordsDiv.style.display = "none"; // 🔧 NEU
        checkAnswerBtn.style.display = "none";      // ❌ ausblenden
        textContainer.style.display = "block"; // 🔧 NEU
        if (textInput) textInput.value = ""; // 🔧 NEU: Eingabe leeren
    } else {
        if (dropzone) dropzone.style.display = "inline-flex"; // 🔧 NEU
        wordsDiv.style.display = "flex"; // 🔧 NEU
        checkAnswerBtn.style.display = "inline-block"; // ✅ einblenden
        textContainer.style.display = "none"; // 🔧 NEU

        aufgabe.woerter.forEach((wort, index) => {
            wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${wort}</div>`;
        });
    }
    if (aufgabe.bild) {
        console.log("Wir haben ein Bild.");
        document.getElementById('bildContainer').innerHTML = 
        `<img src="${aufgabe.bild}" alt="Bild zur Aufgabe" class="aufgabenbild">`;
    } else {
        console.log("Wir haben kein Bild.");
        document.getElementById('bildContainer').innerHTML = "";
    };
    // document.querySelector('.dropzone').innerHTML = "<span>Hier ablegen</span>";
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
                // if (droppedWord === richtigeAntwort) {
                console.log("Aktuelles level (2. Check):", aktuellesLevel);
                dropzone.style.border = "2px solid #4caf50";
                feedback.innerText = "✅ Richtig! Du bekommst 10 Punkte!";
                punkte += 10;
                if(aufgaben[aktuellesLevel - 1].satz.startsWith("Clément Mathieu est un homme")) {
                    richtige.push(droppedWord);
                    console.log("Satz beginnt mit CM est un homme...")
                }
                console.log("Richtige Antworten abgespeichert?", richtige)
                // 12.05.25
                const erklaerung = erklaerungen[thema]?.[aktuellesLevel];
                console.log("Erklärugen für Popups:", erklaerung, erklaerungen);
                if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
                    showPopup(erklaerung.titel, erklaerung.text);
                }
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
    },
    partie_1: {
        6: {
            titel: "Was folgt auf aimer, détester, adorer, préférer?",
            text: "Nach <strong>aimer, détester, adorer, préférer</strong> folgt immer der bestimmte Artikel: <em>le, la, les</em>."
        },
        10: {
            titel: "Noch ein paar Übungen dazu",
            text: "Übe noch mehr Beispiele, damit du dir das mit dem bestimmten Artikel besser merkst."
        },
        14: {
            titel: "Fortbewegungsmittel & Präpositionen",
            text: "Wenn du den Kopf frei hast (z.\u202fB. beim Fahrrad), nimmst du <strong>à</strong>. Bist du im Gefährt (Auto, Bus), dann <strong>en</strong>."
        },
        18: {
            titel: "Wortspiel mit aller",
            text: "Auch wenn du 'gehst' sagst, benutzt du oft <strong>aller</strong> mit Transportmitteln: <em>Je vais en train</em>."
        },
        20: {
            titel: "Instrumente vs. Sport (jouer)",
            text: "<strong>de</strong> bei Instrumenten (jouer de la guitare), <strong>à</strong> bei Spielen/Sport (jouer au foot)."
        },
        21: {
            titel: "de + le / les",
            text: "<strong>de + le</strong> wird <strong>du</strong>, <strong>de + les</strong> wird <strong>des</strong>."
        },
        22: {
            titel: "à + le / les",
            text: "<strong>à + le</strong> wird <strong>au</strong>, <strong>à + les</strong> wird <strong>aux</strong>."
        }
    }
};

function checkTextAnswer() {
    const input = document.getElementById('textInput');
    const antwort = input.value.trim().toLowerCase();
    const aufgabe = aufgaben[aktuellesLevel - 1];
    const richtigeAntworten = Array.isArray(aufgabe.korrekt)
        ? aufgabe.korrekt.map(a => a.toLowerCase())
        : [aufgabe.korrekt.toLowerCase()];

    const isCorrect = richtigeAntworten.includes(antwort);

    if (isCorrect) {
        feedback.innerText = "✅ Richtig!";
        punkte += 10;
        aktuellesLevel++;

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
    }

    document.getElementById('punkteDisplay').innerText = punkte;
}
/*
window.logout = logout;
window.zurueckThemenwahl = zurueckThemenwahl;
*/