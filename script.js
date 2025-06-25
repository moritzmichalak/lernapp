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


if (thema === "subjonctif") {
    aufgaben = [
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "Wollen wir unsere Meinung oder Einschätzung zu etwas mitteilen, so benutzen wir den normalen <strong>Indikativ</strong>, falls wir "+
            "etwas als sehr wahrscheinlich oder ___ einschätzen.<br><br>"+
            "<ul><em>Je crois que</em> c'<strong>est</strong> une bonne idée ! <br> <small>(Ich glaube, dass das eine gute Idee ist!)</small> </ul>"+
            "<ul><em>Je pense que</em> les énergies renouvelables <strong> sont </strong> importantes pour l'avenir de la planète. <br>"+
            "<small>(Ich denke, dass die erneuerbaren Energien wichtig sind für die Zukunft des Planeten)</small> </ul>"+
            "<ul><em>Je suis convaincu(e) que</em> nos villes <strong> sont </strong> trop polluées. <br>"+
            "<small>(Ich bin überzeugt, dass unsere Städte zu verschmutzt sind.)</small> </ul>", 
            woerter: ["sicher", "unsicher"],
            korrekt: "sicher"
        },
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass ... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Je pense que ...", "Je suis convaincu(e) que ...", "Je trouve que ...", "Je crois que ...", "Je suis d'avis que ...", "Il est sûr que ..."], 
            korrekt: "Je trouve que ..."
        },     
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass ... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass ... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Je pense que ...", "Je suis convaincu(e) que ...", "Je crois que ...", "Je suis d'avis que ...", "Il est sûr que ..."], 
            korrekt: "Je crois que ..."
        },   
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass ... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass ... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Je pense que ...", "Je suis convaincu(e) que ...", "Je suis d'avis que ...", "Il est sûr que ..."], 
            korrekt: "Je suis convaincu(e) que ..."
        },   
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - Je suis convaincu(e) que </ul>"+
            "<ul>Ich denke, dass... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Je pense que ...", "Je suis d'avis que ...", "Il est sûr que ..."], 
            korrekt: "Je pense que ..."
        }, 
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - Je suis convaincu(e) que </ul>"+
            "<ul>Ich denke, dass... - Je pense que ...</ul>"+
            "<ul>Ich bin der Meinung, dass... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Je suis d'avis que ...", "Il est sûr que ..."], 
            korrekt: "Je suis d'avis que ..."
        }, 
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - Je suis convaincu(e) que </ul>"+
            "<ul>Ich denke, dass... - Je pense que ...</ul>"+
            "<ul>Ich bin der Meinung, dass... - Je suis d'avis que ... </ul>"+
            "<ul>Es ist sicher, dass... - ___ </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ...", "Il est sûr que ..."], 
            korrekt: "Il est sûr que ..."
        }, 
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - Je suis convaincu(e) que </ul>"+
            "<ul>Ich denke, dass... - Je pense que ...</ul>"+
            "<ul>Ich bin der Meinung, dass... - Je suis d'avis que ... </ul>"+
            "<ul>Es ist sicher, dass... - Il est sûr que ... </ul>"+
            "<ul>Es ist klar, dass... - ___  </ul>",
            woerter: ["Il est probable que ...", "Il est clair que ..."], 
            korrekt: "Il est clair que ..."
        }, 
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Ein paar Ausdrücke zum Formulieren der eigenen Meinung mit Indikativ</small><br>"+
            "Ordne zu: <br><br>"+
            "<ul>Ich finde, dass... - Je trouve que ... </ul>"+
            "<ul>Ich glaube, dass... - Je crois que ... </ul>"+
            "<ul>Ich bin überzeugt, dass... - Je suis convaincu(e) que </ul>"+
            "<ul>Ich denke, dass... - Je pense que ...</ul>"+
            "<ul>Ich bin der Meinung, dass... - Je suis d'avis que ... </ul>"+
            "<ul>Es ist sicher, dass... - Il est sûr que ...  </ul>"+
            "<ul>Es ist klar, dass... - Il est clair que ... </ul>"+
            "<ul>Es ist wahrscheinlich, dass... - ___ ... </ul>",
            woerter: ["Il est probable que ..."], 
            korrekt: "Il est probable que ..."
        }, 
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Setze die richtige Verbform im Indikativ/Grundform ein: </small><br><br>"+
            "<ul><em>Il est clair que</em> la radioactivité ___ (être) dangereuse.", 
            woerter: ["serait", "est", "soit"],
            korrekt: "est"
        },
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Setze die richtige Verbform im Indikativ/Grundform ein: </small><br><br>"+
            "<ul><em>Je pense que </em> la pollution ___ (être) un grand problème.", 
            typ: "text",
            korrekt: "est"
        },
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Setze die richtige Verbform im Indikativ/Grundform ein: </small><br><br>"+
            "<ul><em>Je suis convaincu(e) que</em> nous ___ (devoir) protéger la nature.", 
            woerter: ["devions", "devons", "devrions"],
            korrekt: "devons"
        },
        { 
            ueberschrift: "Meinung äußern (Indikativ)",
            satz: "<small>Setze die richtige Verbform im Indikativ/Grundform ein: </small><br><br>"+
            "<ul><em>Je trouve que</em> faire du sport, ça ___ (faire) du bien. <br>"+
            "<small>(Ich finde Sport machen tut gut.)</small>",
            typ: "text",
            korrekt: "fait"
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Wir benutzen den <strong>Subjonctif</strong>, falls wir "+
            "etwas anzweifeln oder etwas als unwahrscheinlich oder ➡️ ___ einschätzen.<br><br>", 
            woerter: ["sicher", "unsicher"],
            korrekt: "unsicher"
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Die Ausdrücke nach denen man den Indikativ benutzt, drücken eine Sicherheit oder hohe Wahrscheinlichkei aus."+
            "➡️  ___ man diese, so drückt man Zweifel bzw. Unsicherheit aus und benutzt den <strong>Subjonctif</strong>: <br><br>"+
            "<ul><em>Je <strong>ne</strong> crois <strong>pas</strong>  que</em> ce <strong>soit</strong> une bonne idée ! <br>"+
            "(Ich glaube nicht, dass das eine gute Idee ist!)</small> </ul>"+
            "<ul><em>Je <strong>ne</strong> pense <strong>pas</strong> que</em> les énergies renouvelables <strong> soient </strong> importantes pour l'avenir' de la planète. <br>"+
            "<small>(Ich denke nicht, dass die erneuerbaren Energien wichtig sind für die Zukunft des Planeten)</small> </ul>"+
            "<ul><em>Je <strong>ne</strong> suis <strong>pas</strong> convaincu(e) que</em> nos villes <strong> soient </strong> trop polluées. <br>"+
            "<small>(Ich bin nicht überzeugt, dass unsere Städte zu verschmutzt sind.)</small> </ul>",  
            woerter: ["Verneint", "Bejaht"],
            korrekt: "Verneint"
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der fünf Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = ➡️ ___ </ul>",
            woerter: ["Es ist wichtig, dass...", "Es ist notwendig, dass ...", "Man muss ...", "Es ist schade, dass ...", "Ich bezweifele, dass ..."],
            korrekt: "Es ist wichtig, dass..."
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der fünf Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = Es ist wichtig, dass...</ul>"+
            "<ul><em>Il est nécessaire que ... </em> = ➡️ ___ </ul>",
            woerter: ["Es ist notwendig, dass ...", "Man muss ...", "Es ist schade, dass ...", "Ich bezweifele, dass ..."],
            korrekt: "Es ist notwendig, dass ..."
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der fünf Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = Es ist wichtig, dass...</ul>"+
            "<ul><em>Il est nécessaire que ... </em> = Es ist notwendig, dass ...</ul>"+
            "<ul><em>Il est dommage que ... </em> = ➡️ ___ </ul>",
            woerter: ["Man muss ...", "Es ist schade, dass ...", "Ich bezweifele, dass ..."],
            korrekt: "Es ist schade, dass ..."
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der fünf Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = Es ist wichtig, dass...</ul>"+
            "<ul><em>Il est nécessaire que ... </em> = Es ist notwendig, dass ...</ul>"+
            "<ul><em>Il est dommage que ... </em> = Es ist schade, dass ... </ul>"+
            "<ul><em>Il faut que ... </em> = ➡️ ___ </ul>",
            woerter: ["Man muss ...", "Ich bezweifele, dass ..."],
            korrekt: "Man muss ..."
        },
        { 
            ueberschrift: "Meinung äußern (Subjonctif)",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der fünf Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = Es ist wichtig, dass...</ul>"+
            "<ul><em>Il est nécessaire que ... </em> = Es ist notwendig, dass ...</ul>"+
            "<ul><em>Il est dommage que ... </em> = Es ist schade, dass ... </ul>"+
            "<ul><em>Il faut que ... </em> = Man muss ...</ul>"+
            "<ul><em>Je doute que ... </em> = ➡️ ___ </ul>",
            woerter: ["Ich bezweifele, dass ..."],
            korrekt: "Ich bezweifele, dass ..."
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> que je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>tu ➡️ ___ </ul>",
            woerter: ["vendes", "vendent", "vendions", "vende", "vendiez"],
            korrekt: "vendes"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> que je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>que tu vendes</ul>"+
            "<ul>qu'il/elle/on ➡️ ___ </ul>",
            woerter: ["vendent", "vendions", "vende", "vendiez"],
            korrekt: "vende"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> que je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>que tu vendes</ul>"+
            "<ul>qu'il/elle/on vende </ul>"+
            "<ul>que nous ➡️ ___ </ul>",
            woerter: ["vendent", "vendions", "vendiez"],
            korrekt: "vendions"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> que je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>que tu vendes</ul>"+
            "<ul>qu'il/elle/on vende </ul>"+
            "<ul>que nous vendions </ul>"+
            "<ul>que vous ➡️ ___  </ul>",
            woerter: ["vendent", "vendiez"],
            korrekt: "vendiez"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> que je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>que tu vendes</ul>"+
            "<ul>qu'il/elle/on vende </ul>"+
            "<ul>que nous vendions </ul>"+
            "<ul>que vous vendiez </ul>"+
            "<ul>qu'ils/elles ➡️ ___  </ul>",
            woerter: ["vendent"],
            korrekt: "vendent"
        },

        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 "+
            "ils /elles ➡️ ___ :</small>",
            woerter: ["prendent", "prennent"],
            korrekt: "prennent"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 "+
            "   ils /elles prennent <br>"+
            "2. Jetzt entfernen wir <em>-ent</em> und bekommen den Stamm für den Subjonctif: ➡️ ___  </small>",
            woerter: ["prend", "prenn"],
            korrekt: "prenn"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 "+
            "   ils /elles prennent: <br>"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn  </small><br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>➡️que je prenn___</ul>",
            woerter: ["es", "ent", "e", "e", "ions", "iez"],
            korrekt: "e"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 <br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn <br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>que je prenn<strong>e</strong></ul>"+
            "<ul>➡️que tu prenn___</ul>",
            woerter: ["es", "ent", "e", "ions", "iez"],
            korrekt: "es"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 <br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn <br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>que je prenn<strong>e</strong></ul>"+
            "<ul>que tu prenn<strong>es</strong></ul>"+
            "<ul>➡️qu'il/elle/on prenn___</ul>",
            woerter: [ "ent", "e", "ions", "iez"],
            korrekt: "e"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 <br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn <br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>que je prenn<strong>e</strong></ul>"+
            "<ul>que tu prenn<strong>es</strong></ul>"+
            "<ul>qu'il/elle/on prenn<strong>e</strong></ul>"+
            "<ul>que nous ❓</ul>"+
            "<ul>que vous ❓</ul>"+
            "<ul>➡️ qu'il/elle/on prenn___</ul>",
            woerter: [ "ent", "ions", "iez"],
            korrekt: "ent"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Bis hierhin also alles wie gehabt! Es gibt aber <strong>Ausnahmen</strong> für ➡️ ___ und vous. <br>"+
            "<ul>que je prenn<strong>e</strong></ul>"+
            "<ul>que tu prenn<strong>es</strong></ul>"+
            "<ul>qu'il/elle/on prenn<strong>e</strong></ul></small>"+
            "<ul>que nous <strong>prenions</strong></ul>"+
            "<ul>que vous <strong>preniez</strong></ul>"+
            "<ul><small> qu'ils/elles prenn<strong>ent</strong></small></ul>",
            woerter: [ "elle", "nous", "je"],
            korrekt: "nous"
        },
        // POPUP: Dass nous und vous die einzigen Ausnahmen von der Regel bilden, ist nicht nur bei prendre so. Bei den Verben <em>venir, prendre, boire, voir</em> ist es analog.
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Es gibt außerdem unregelmäßige Verben, für die es in allen Fällen einen anderen Stamm gibt."+
            " Hier sind ein paar wichtige: <em>aller, savoir, faire</em></small><br>"+
            "Versuche zu jedem Verb den richtigen Stamm zu finden:<br><br></small>"+
            "<ul>aller - ➡️___</ul>", 
            woerter: [ "sach-", "fass-", "aill-/all-"],
            korrekt: "aill-/all-"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Bei <em>aller</em> ist der Stamm <em>aill</em>, nur für ➡️___ und <strong>vous</strong> ist der Stamm <em>all</em> </small><br><br>"+
            "<ul>que j'<em>aill</em><strong>e</strong></ul>"+
            "<ul>que tu <em>aill</em><strong>es</strong></ul>"+
            "<ul>qu'il/elle/on <em>aill</em><strong>e</strong></ul>"+
            "<ul>que nous <em>all</em><strong>ions</strong></ul>"+
            "<ul>que vous <em>all</em><strong>iez</strong></ul>"+
            "<ul>qu'ils/elles <em>aill</em><strong>ent</strong></ul>", 
            woerter: ["nous", "je", "elles"],
            korrekt: "nous"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Es gibt außerdem unregeömäßige Verben, für die es in allen Fällen einen anderen Stamm gibt. Hier sind ein paar wichtige: <em> aller, savoir, faire</em><br>"+
            "Versuche zu jedem Verb den richtigen Stamm zu finden:<br><br></small>"+
            "<ul>aller: aill-/all-</ul>"+
            "<ul>savoir: ➡️ ___ </ul>",
            woerter: [ "sach-", "fass-"],
            korrekt: "sach-"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Bei <em>savoir</em> hängen wir unsere ➡️ ___ Subjonctif-Endungen an den Stamm <em>sach-</em>: <br><br></small>"+
            "<ul>que je <em>sach</em><strong>e</strong></ul>"+
            "<ul>que tu <em>sach</em><strong>es</strong></ul>"+
            "<ul>qu'il/elle/on <em>sach</em><strong>e</strong></ul>"+
            "<ul>que nous <em>sach</em><strong>ions</strong></ul>"+
            "<ul>que vous <em>sach</em><strong>iez</strong></ul>"+
            "<ul>qu'ils/elles <em>sach</em><strong>ent</strong></ul>", 
            woerter: ["normalen", "speziellen"],
            korrekt: "normalen"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Es gibt außerdem unregelmäßige Verben, für die es in allen Fällen einen anderen Stamm gibt. Hier sind ein paar wichtige: <em> aller, savoir, faire</em><br>"+
            "Versuche zu jedem Verb den richtigen Stamm zu finden:<br><br></small>"+
            "<ul>aller: aill-/all-</ul>"+
            "<ul>savoir: sach-</ul>"+
            "<ul>faire: ➡️ ___ </ul>",
            woerter: ["fass-"],
            korrekt: "fass-"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Bei <em>faire</em> hängen wir unsere ➡️ ___ Subjonctif-Endungen an den Stamm <em>fass-</em>: <br><br></small>"+
            "<ul>que je <em>fass</em><strong>e</strong></ul>"+
            "<ul>que tu <em>fass</em><strong>es</strong></ul>"+
            "<ul>qu'il/elle/on <em>fass</em><strong>e</strong></ul>"+
            "<ul>que nous <em>fass</em><strong>ions</strong></ul>"+
            "<ul>que vous <em>fass</em><strong>iez</strong></ul>"+
            "<ul>qu'ils/elles <em>fass</em><strong>ent</strong></ul>", 
            woerter: ["normalen", "speziellen"],
            korrekt: "normalen"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je ➡️ ___</ul>",
            woerter: ["sois", "sois", "soyez", "soit", "soyons", "soient"],
            korrekt: "sois"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je sois</ul>"+
            "<ul>que tu ➡️ ___</ul>",
            woerter: ["sois", "soyez", "soit", "soyons", "soient"],
            korrekt: "sois"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je sois</ul>"+
            "<ul>que tu sois</ul>"+
            "<ul>qu'il/elle/on ➡️ ___</ul>",
            woerter: ["soyez", "soit", "soyons", "soient"],
            korrekt: "soit"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je sois</ul>"+
            "<ul>que tu sois</ul>"+
            "<ul>qu'il/elle/on soit</ul>"+
            "<ul>que nous ➡️ ___</ul>",
            woerter: ["soyez", "soyons", "soient"],
            korrekt: "soyons"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je sois</ul>"+
            "<ul>que tu sois</ul>"+
            "<ul>qu'il/elle/on soit</ul>"+
            "<ul>que nous soyons</ul>"+
            "<ul>que vous ➡️ ___</ul>",
            woerter: ["soyez", "soient"],
            korrekt: "soyez"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Zu guter letzt haben wir noch die Verben <em>être</em> und <em>avoir</em>. Hier ist alles anders: "+
            "Der Stamm und die Endungen. 😵‍💫 Aber das hast du sicher schnell raus 😌"+
            "Versuche mal zuzuordnen für <strong>être</strong>: <br><br></small>"+
            "<ul>que je sois</ul>"+
            "<ul>que tu sois</ul>"+
            "<ul>qu'il/elle/on soit</ul>"+
            "<ul>que nous soyons</ul>"+
            "<ul>que vous soyez</ul>"+
            "<ul>qu'ils/elles ➡️ ___</ul>",
            woerter: ["soient"],
            korrekt: "soient"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j' ➡️ ___</ul>",
            woerter: ["ait", "aies", "ayez", "aie", "ayons", "aient"],
            korrekt: "aie"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j'aie</ul>"+
            "<ul>que tu ➡️ ___</ul>",
            woerter: ["ait", "aies", "ayez",  "ayons", "aient"],
            korrekt: "aies"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j'aie</ul>"+
            "<ul>que tu aies</ul>"+
            "<ul>qu'il/elle/on ➡️ ___</ul>",
            woerter: ["ait", "ayez",  "ayons", "aient"],
            korrekt: "ait"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j'aie</ul>"+
            "<ul>que tu aies</ul>"+
            "<ul>qu'il/elle/on ait</ul>"+
            "<ul>que nous ➡️ ___</ul>",
            woerter: ["ayez",  "ayons", "aient"],
            korrekt: "ayons"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j'aie</ul>"+
            "<ul>que tu aies</ul>"+
            "<ul>qu'il/elle/on ait</ul>"+
            "<ul>que nous ayons</ul>"+
            "<ul>que vous ➡️ ___</ul>",
            woerter: ["ayez", "aient"],
            korrekt: "ayez"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Und für <strong>avoir</strong>: <br><br></small>"+
            "<ul>que j'aie</ul>"+
            "<ul>que tu aies</ul>"+
            "<ul>qu'il/elle/on ait</ul>"+
            "<ul>que nous ayons</ul>"+
            "<ul>que vous ayez</ul>"+
            "<ul>qu'ils/elles ➡️ ___</ul>",
            woerter: ["aient"],
            korrekt: "aient"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Il est important qu'on➡️ ___  (être) actif/-ive dans la société.<br>"+
            "<small>(Es ist wichtig aktiv in der Gesellschaft zu sein)</small>",
            woerter: ["soit", "est"],
            korrekt: "soit"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Il faut que nous➡️ ___  (protéger) l’écosystème.<br>"+
            "<small>(Wir müssen das Ökosystem schützen.)</small>",
            woerter: ["protégions", "protégeons"],
            korrekt: "protégions"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Je ne crois pas que le gaspillage d'énergie ➡️ ___  (être) une bonne idée.<br>"+
            "<small>(Ich glaube nicht, dass Energieverschwendung eine gute Idee ist...)</small>",
            woerter: ["soit", "est"],
            korrekt: "soit"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Je trouve super que vous ➡️ ___  (utiliser) souvent les transports en commun .<br>"+
            "<small>(Ich finde es super, dass ihr häufig die öffentlichen Verkehrsmittel benutzt)</small>",
            woerter: ["utilisez", "utilisiez"],
            korrekt: "utilisez"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Il est important que nous➡️ ___  (lutter) contre le gaspillage d'énergie .<br>"+
            "<small>(Es ist wichtig, dass wir die Energieverschwendung bekämpfen.)</small>",
            woerter: ["luttions", "luttons"],
            korrekt: "luttions"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Je trouve que l'énergie nucléaire➡️ ___  (faire) peur .<br>"+
            "<small>(Ich finde, dass die Atomenergie Angst macht.)</small>",
            woerter: ["fait", "fasse"],
            korrekt: "fait"
        },
        { 
            ueberschrift: "Exprimer son opinion",
            satz: "Pour moi c'est le contraire. Je ne trouve pas que l'énergie nucléaire➡️ ___  (faire) peur .<br>"+
            "<small>(Bei mir ist es das Gegentei. Ich finde nicht, dass die Atomenergie Angst macht.)</small>",
            woerter: ["fait", "fasse"],
            korrekt: "fasse"
        }
    ];
} else if (thema === "conditionnel") {
    aufgaben = [
        {    
            satz: "Das <em>conditionnel</em> benutzt man, um Ratschläge/Vorschläge, ___ oder Möglichkeiten auszudrücken. Das wort <em>condition</em> bedeutet <em>Bedingung</em>. " + 
            "Mit Hilfe des Conditionnel spricht man also über Dinge, die nur unter einer bestimmten Bedingung eintreten können. <br>",
            woerter: ["Befehle", "Vergangenheit", "Wünsche"],
            korrekt: "Wünsche"
        },  
        {    
            satz: "<small>Das <em>conditionnel</em> benutzt man, um Ratschläge, Wünsche oder Möglichkeiten auszudrücken. Das wort <em>condition</em> bedeutet <em>Bedingung</em>. " + 
            "Mit Hilfe des Conditionnel spricht man also über Dinge, die <em>nur unter einer bestimmten Bedingung</em> eintreten können. <br><br></small>" +
            "<strong>Ordne zu: </strong><br>"+
            "<ul>Je <em> voudrais </em> aller à la mer. (Ich würde gerne ans Meer fahren) ⬅️ <strong>___</strong> </ul>",
            woerter: ["Ratschlag/Vorschlag", "Wunsch", "Möglichkeit"],
            korrekt: "Wunsch"
        },  
        {    
            satz: "<small>Das <em>conditionnel</em> benutzt man, um Ratschläge, WÜnsche oder Möglichkeiten auszudrücken. Das wort <em>condition</em> bedeutet <em>Bedingung</em>. " + 
            "Mit Hilfe des Conditionnel spricht man also über Dinge, die nur unter einer bestimmten Bedingung eintreten können. <br><br></small>" +
            "<strong>Ordne zu: </strong><br>"+
            "<ul>Je <em> voudrais </em> aller à la mer. (Ich würde gerne ans Meer fahren) ⬅️ <strong>Wunsch</strong> </ul>" +
            "<ul>À ta place, je <em> partirais </em> en vacances. (An deiner Stelle, würde ich in den Urlaub fahren.) ⬅️ <strong>___</strong> </ul>",
            woerter: ["Ratschlag/Vorschlag", "Wunsch", "Möglichkeit"],
            korrekt: "Ratschlag/Vorschlag"
        },  
        {    
            satz: "<small>Das <em>conditionnel</em> benutzt man, um Ratschläge, Wünsche oder Möglichkeiten auszudrücken. Das wort <em>condition</em> bedeutet <em>Bedingung</em>. " + 
            "Mit Hilfe des Conditionnel spricht man also über Dinge, die nur unter einer bestimmten Bedingung eintreten können. <br><br></small>" +
            "<strong>Ordne zu: </strong><br>"+
            "<ul>Je <em> voudrais </em> aller à la mer. (Ich würde gerne ans Meer fahren) ⬅️ <strong>Wunsch</strong> </ul>" +
            "<ul>À ta place, je <em> partirais </em> en vacances. (An deiner Stelle, würde ich in den Urlaub fahren.) ⬅️ <strong>Ratschlag</strong> </ul>" +
            "<ul> Si je gagnais à la loterie, je <em>donnerais</em> de l'argent à ma famille. (Gewänne ich im Lotto, würde ich Geld  meiner Familie geben.) ⬅️ <strong>___</strong> </ul>",
            woerter: ["Ratschlag/Vorschlag", "Wunsch", "Möglichkeit"],
            korrekt: "Möglichkeit"
        },  
        {    
            ueberschrift: "Regelmäßige Verben",
            satz: "Um die regelmäßigen Formen zu bilden, hängt man an ___ die Endungen <em>-ais, -ait, -ions, -iez, -aient</em> an. <br><br>"+
            "<ul>À ta place, je <strong>partir</strong><em>ais </em> en vacances." +
            "<ul> Si je gagnais à la loterie, je <strong>donner</strong><em>ais</em>  de l'argent à ma famille. </ul>",
            woerter: ["die Grundform des Verbs", "das Partizip"],
            korrekt: "die Grundform des Verbs"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "je ___",
            woerter: ["souhaiteraient","souhaiterait", "souhaiterais", "souhaiterais", "souhaiterions", "souhaiteriez"],
            korrekt: "souhaiterais"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "tu ___",
            woerter: ["souhaiteraient","souhaiterait", "souhaiterais", "souhaiterions", "souhaiteriez"],
            korrekt: "souhaiterais"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "il/elle/on ___",
            woerter: ["souhaiteraient","souhaiterait", "souhaiterions", "souhaiteriez"],
            korrekt: "souhaiterait"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "nous ___",
            woerter: ["souhaiteraient", "souhaiterions", "souhaiteriez"],
            korrekt: "souhaiterions"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "vous ___",
            woerter: ["souhaiteraient", "souhaiteriez"],
            korrekt: "souhaiteriez"
        },
        {    
            ueberschrift: "<small>Endungen (Beispiel <em>souhaiter</em> = wünschen).</small> <br> <strong>Ordne zu</strong>",
            satz: "ils/elles ___",
            woerter: ["souhaiteraient"],
            korrekt: "souhaiteraient"
        },
        {    
            ueberschrift: "Regelmäßige Formen: Verben auf -re",
            satz: "Bei den Verben auf <em>-re</em> hängt man die Endungen auch an die Grundform an, allerdings fällt am Ende das ___ weg."+
            "<ul>prendr<strong>e</strong> -> je prendr<em>ais</em></ul>"+
            "<ul>dir<strong>e</strong> -> elle dir<em>ait</em></ul> <br>",
            woerter: ["re", "e", "dre"],
            korrekt: "e"
        },
        {    
            ueberschrift: "Regelmäßige Formen: Verben auf -re",
            satz: "<small>Bei den Verben auf <em>-re</em> hängt man die Endungen auch an die Grundform an, allerdings fällt am Ende das e weg.<small><br><br>"+
            "<strong>Probiere es mal selbst:</strong><br>"+
            "Si j'avais le temps, j' ___ (attendre). (Hätte ich die Zeit, würde ich warten)",
            typ: "text",
            korrekt: "attendrais",
            bild: "img/zeit.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je➡️ ____ (voyager) plus souvent avec ma famille.",
            typ: "text",
            korrekt: "voyagerais",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous ➡️ ____  (choisir)",
            typ: "text",
            korrekt: "choisirions",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère ➡️ ____  (préparer) "+
            "toujours un programme très détaillé.",
            typ: "text",
            korrekt: "préparerait",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère préparerait "+
            "toujours un programme très détaillé. Mes parents ➡️ ____  (aimer) visiter des musées, mais moi, "+
            "je _ _ _  (préférer) passer du temps à la plage.",
            typ: "text",
            korrekt: "aimeraient",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère préparerait "+
            "toujours un programme très détaillé. Mes parents aimeraient visiter des musées, mais moi, "+
            "je ➡️ ____ (préférer) passer du temps à la plage.",
            typ: "text",
            korrekt: "préférerais",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère préparerait "+
            "toujours un programme très détaillé. Mes parents aimeraient visiter des musées, mais moi, "+
            "je préférerais passer du temps à la plage. Si nous partions en hiver, nous ➡️ ____  (attendre) "+
            "la neige avec impatience.",
            typ: "text",
            korrekt: "attendrions",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère préparerait "+
            "toujours un programme très détaillé. Mes parents aimeraient visiter des musées, mais moi, "+
            "je préférerais passer du temps à la plage.Si nous partions en hiver, nous attendrions "+
            "la neige avec impatience. Et s'il faisait froid, nous ➡️ ____ (manger) des plats chauds dans des restaurants typiques.",
            typ: "text",
            korrekt: "mangerions",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Regelmäßige Formen",
            satz: "Si j'avais plus de temps, je voyagerais plus souvent avec ma famille. Nous choisirions "+
            "des destinations intéressantes comme l'Italie ou le Canada. Mon frère préparerait "+
            "toujours un programme très détaillé. Mes parents aimeraient visiter des musées, mais moi, "+
            "je préférerais passer du temps à la plage.Si nous partions en hiver, nous attendrions "+
            "la neige avec impatience. Et s'il faisait froid, nous mangerions des plats chauds dans des restaurants typiques."+
            "Et toi, qu'est-ce que tu ➡️ ____  (aimer) faire ?",
            typ: "text",
            korrekt: "aimerais",
            bild: "img/reise.jpg"
        },
        {    
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Es gibt Verben, bei denen hängt man die Endungen nicht an die Grundform an, sondern an eine spezielle Form. "+
            "Ein Beispiel ist vouloir (=wollen): <em>Je <strong>voudr</strong>ais un croissant, s'il vous plait.</em>.</small> <br><br>"+
            "Ordne zu: <em>tu ___</em>",
            woerter: ["voudraient","voudrait", "voudrais", "voudrions", "voudriez"],
            korrekt: "voudrais",
            bild: "img/boulangerie.jpg"
        },
        {    
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Es gibt Verben, bei denen hängt man die Endungen nicht an die Grundform an, sondern an eine spezielle Form. "+
            "Ein Beispiel ist vouloir (=wollen): <em>Je <strong>voudr</strong>ais un croissant, s'il vous plait.</em>.</small> <br><br>"+
            "Ordne zu: <em>il/elle/on ___</em>",
            woerter: ["voudraient","voudrait", "voudrions", "voudriez"],
            korrekt: "voudrait",
            bild: "img/boulangerie.jpg"
        },
        {    
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Es gibt Verben, bei denen hängt man die Endungen nicht an die Grundform an, sondern an eine spezielle Form. "+
            "Ein Beispiel ist vouloir (=wollen): <em>Je <strong>voudr</strong>ais un croissant, s'il vous plait.</em>.</small> <br><br>"+
            "Ordne zu: <em>nous ___</em>",
            woerter: ["voudraient","voudrions", "voudriez"],
            korrekt: "voudrions",
            bild: "img/boulangerie.jpg"
        },
        {    
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Es gibt Verben, bei denen hängt man die Endungen nicht an die Grundform an, sondern an eine spezielle Form. "+
            "Ein Beispiel ist vouloir (=wollen): <em>Je <strong>voudr</strong>ais un croissant, s'il vous plait.</em>.</small> <br><br>"+
            "Ordne zu: <em>vous ___</em>",
            woerter: ["voudraient", "voudriez"],
            korrekt: "voudriez",
            bild: "img/boulangerie.jpg"
        },
        {    
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Es gibt Verben, bei denen hängt man die Endungen nicht an die Grundform an, sondern an eine spezielle Form. "+
            "Ein Beispiel ist vouloir (=wollen): <em>Je <strong>voudr</strong>ais un croissant, s'il vous plait.</em>.</small> <br><br>"+
            "Ordne zu: <em>ils/elles ___</em>",
            woerter: ["voudraient"],
            korrekt: "voudraient",
            bild: "img/boulangerie.jpg"
        },  
        // POPUP: Super ! Vielleicht ist dir aufgefallen, dass wir <strong> genau die gleichen Endungen</strong> wie bei den regelmäßigen Verben benutzen. Nur der <strong>Stamm ist anders</strong>!
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["pouvoir", "devoir", "avoir", "être", "aller", "faire"],
            korrekt: "devoir"
        },
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : devoir </ul>"+
            "<ul><strong>fer</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["pouvoir", "avoir", "être", "aller", "faire"],
            korrekt: "faire"
        },
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : devoir </ul>"+
            "<ul><strong>fer</strong>(ais) : faire </ul>"+
            "<ul><strong>pourr</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["pouvoir", "avoir", "être", "aller"],
            korrekt: "pouvoir"
        },
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : devoir </ul>"+
            "<ul><strong>fer</strong>(ais) : faire </ul>"+
            "<ul><strong>pourr</strong>(ais) : pouvoir </ul>"+
            "<ul><strong>aur</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["avoir", "être", "aller"],
            korrekt: "avoir"
        },
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : devoir </ul>"+
            "<ul><strong>fer</strong>(ais) : faire </ul>"+
            "<ul><strong>pourr</strong>(ais) : pouvoir </ul>"+
            "<ul><strong>aur</strong>(ais) : avoir</ul>"+
            "<ul><strong>ir</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["être", "aller"],
            korrekt: "aller"
        },
        {
            ueberschrift: "Unegelmäßige Formen",
            satz: "<small>Zu den unregelmäßigen Formen gehören auch die Verben. z.B. <em>pouvoir, devoir, avoir, être, aller, faire</em>. Versuche jeweils das passende Verb zum unregelmäßigen Stamm zu finden: <br><br><small>"+
            "<ul><strong>devr</strong>(ais) : devoir </ul>"+
            "<ul><strong>fer</strong>(ais) : faire </ul>"+
            "<ul><strong>pourr</strong>(ais) : pouvoir </ul>"+
            "<ul><strong>aur</strong>(ais) : avoir</ul>"+
            "<ul><strong>ir</strong>(ais) : aller </ul>"+
            "<ul><strong>ser</strong>(ais) : ➡️ ___ </ul>",
            woerter: ["être"],
            korrekt: "être"
        },
        {
            ueberschrift: "Unegelmäßige Formen: faire",
            satz: "Clément Mathieu ___ (faire) tout pour aider les élèves.<br>"+
            "<small>(Clément Mathieu würde alles tun, um den Schülern zu helfen.)</small>",
            typ: "text",
            korrekt: "ferait",
            bild: "img/mathieu.jpg"
        },
        {
            ueberschrift: "Unegelmäßige Formen: faire",
            satz: "Si j'étais professeur, je ___ (faire) aussi une chorale dans mon école.<br>"+
            "<small>(Wäre ich Lehrer, würde ich auch einen Chor in meiner Schule kreieren.</small>",
            typ: "text",
            korrekt: "ferais",
            bild: "img/chorale.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: faire",
            satz: "S'il ne pleuvait pas, nous ___ (faire) la fête !."+
            "<small>(Regnete es nicht, würden wir Party machen!).</small>",
            typ: "text",
            korrekt: "ferions",
            bild: "img/party.jpg"
        },
        {
            ueberschrift: "Unegelmäßige Formen: pouvoir",
            satz: "Si Violette Morhange était moins distancée, elle ___ (pouvoir) avoir une meilleure relation avec son fils. <br>"+
            "<small>(Wäre Violette Morhange weniger distanziert, könnte sie eine bessere Beziehung zu ihrem Sohn haben.) </small>",
            typ: "text",
            korrekt: "pourrait",
            bild: "img/violette.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: pouvoir",
            satz: "Avec plus de liberté, les élèves ___ (pouvoir) s'exprimer plus facilement.<br>"+
            "<small>(Mit mehr Freiheiten, könnten sich die Schülerinnen und Schüler leichter ausdrücken.)</small>",
            typ: "text",
            korrekt: "pourraient",
            bild: "img/chorale.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: pouvoir",
            satz: "Rachin ___ (pouvoir) être plus gentil pour avoir une meilleure relation avec les élèves.<br>"+
            "<small>(Rachin könnte netter sein, um eine bessere Beziehung zu den Schülern zu haben.)</small>",
            typ: "text",
            korrekt: "pourrait",
            bild: "img/rachin.jpg"
        },
        {
            ueberschrift: "Unegelmäßige Formen: avoir",
            satz: "Si Pierre n'était pas en colère, il ___ (avoir) une meilleure relation avec son père. <br>"+
            "<small>(Wäre Pierre nicht wütend, hätte er eine bessere Beziehung zu seinem Vater.) </small>",
            typ: "text",
            korrekt: "aurait",
            bild: "img/pierre.jpeg"
        },
        {
            ueberschrift: "Unegelmäßige Formen: avoir",
            satz: "Avec plus de soutien, les enfants ___ (avoir) confiance en eux.<br>"+
            "<small>(Mit mehr Unterstützung hätten sich die Schülerinnen und Schüler mehr Vertrauen in sich selbst.)</small>",
            typ: "text",
            korrekt: "auraient",
            bild: "img/chorale.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: être",
            satz: "Sans la chorale, les journées ____ (être) très monotones pour les garçons. <br>"+
            "<small>(Ohne den Chor wären die Tage zu monoton für die Jungs.)</small> ",
            typ: "text",
            korrekt: "seraient",
            bild: "img/chorale.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: être",
            satz: "Si Rachin était plus humain, il ___ (être) apprécié par les élèves.<br>"+
            "<small>(Wäre Rachin menschlicher, würde er von den Schülern mehr geschätzt werden.)</small>",
            typ: "text",
            korrekt: "serait",
            bild: "img/rachin.jpg"
        },
        {
            ueberschrift: "Unegelmäßige Formen: aller",
            satz: "À ta place, j' ____ (aller) voir Les Choristes, c'est un très bon film. <br>"+
            "<small>(An deiner Stelle würde ich Les Choristes gucken gehen, das ist ein sehr guter Film.)</small> ",
            typ: "text",
            korrekt: "irais",
            bild: "img/chorale.png"
        },
        {
            ueberschrift: "Unegelmäßige Formen: aller",
            satz: "S'il n'avait pas de chorale, Pierre n' ___ (aller) pas à l'école.<br>"+
            "<small>(Gäbe es keinen Chor, würde Pierre nicht zur Schule gehen.)<small>",
            typ: "text",
            korrekt: "irait",
            bild: "img/pierre.jpeg"
        },
        // POPUP: Jetzt verwenden wir den Conditionnel, um Vorschläge zu machen :)
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "À ta place, je ___ (faire) un grand voyage !<br> <small> (An deiner Stelle würde ich eine große Reise machen)</small>",
            typ: "text",
            korrekt: "ferais",
            bild: "img/voyage.jpg"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "À ta place, je n' ___ (aller) plus à l'école !<br><small> (An deiner Stelle würde ich nicht mehr zur Schule gehen)</small></>",
            typ: "text",
            korrekt: "irais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "À ta place, je ___ (continuer) d'aller à l'école, pour que tu puisses faire un travail intéressant plus tard !<br><small> (An deiner Stelle würde ich weiter zur Schule gehen, damit du etwas machen kannst, das dich interessiert)</small>",
            typ: "text",
            korrekt: "continuerais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "Nous ___ (pouvoir) faire un voyage avec tous les amis ! <br><small>(Wir könnten eine große Reise mit allen Freunden machen)</small>",
            typ: "text",
            korrekt: "pourrions"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "À ta place, je ___ (garder) l'argent pour plus tard ! <br><small>(An deiner Stelle, würde ich das Geld für später behalten)</small>",
            typ: "text",
            korrekt: "garderais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "À ta place, je ___ (mettre) un peu d'argent de côté ! <br><small>(An deiner Stelle, würde ein wenig Geld zu Seite legen)</small>",
            typ: "text",
            korrekt: "mettrais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Ton amie a gagné à la loterie ! Sie weiß nicht, was sie mit dem Geld machen soll. Vervollständige die Ratschläge.</small><br>"+
            "<ul>Génial ! Toi et ta famille, vous ___ (pouvoir) acheter une maison ! <small>(Genial! Du und deine Familie, ihre könnt euch ein Haus kaufen!)</small></ul>",
            typ: "text",
            korrekt: "pourriez"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "<small>Le coloc de ton ami ronfle ! (Der Mitbewohner deines Freundes schnarcht!) Was schlägst du vor?.</small>"+
            "Tu ___ (devoir) mettre des bouchons d'oreille ! <small>(Du solltest Ohrstöpsel tragen)</small>",
            typ: "text",
            korrekt: "devrais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "Encore un problème 🤷... Un ami te raconte son problème: 'Ce soir il y a la fête d'anniversaire de mon ami Cédric."+
            " Mais demain matin je dois me lever tôt pour un tornoi de handball. Je ne sais pas si je dois aller à la fête ou si "+
            "je dois me coucher tôt. Qu'est-ce que tu ferais ?' <br>"+
            "Vorschlag 1: À ta place, j' ___ (aller) à la fête, mais je ne ___ (rentrer) pas trop tard.<br>"+
            "<small>(An deiner Stelle, würde ich zur PArty gehen, aber ...)</small>",
            typ: "text",
            korrekt: "irais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "Encore un problème 🤷... Un ami te raconte son problème: 'Ce soir il y a la fête d'anniversaire de mon ami Cédric."+
            " Mais demain matin je dois me lever tôt pour un tornoi de handball. Je ne sais pas si je dois aller à la fête ou si "+
            "je dois me coucher tôt. Qu'est-ce que tu ferais ?' <br>"+
            "Vorschlag 1: À ta place, j'irais à la fête, mais je ne ___ (rentrer) pas trop tard.<br>"+
            "<small>(An deiner Stelle, würde ich zur PArty gehen, aber ich würde nicht zu spät nach Hause gehen.)</small>",
            typ: "text",
            korrekt: "rentrerais"
        },
        {
            ueberschrift: "Ratschläge geben / Vorschläge machen",
            satz: "Encore un problème 🤷... Un ami te raconte son problème: 'Ce soir il y a la fête d'anniversaire de mon ami Cédric."+
            " Mais demain matin je dois me lever tôt pour un tornoi de handball. Je ne sais pas si je dois aller à la fête ou si "+
            "je dois me coucher tôt. Qu'est-ce que tu ferais ?' <br>"+
            "Vorschlag 2: À ta place, je me ___ (coucher) tôt.<br>"+
            "<small>(An deiner Stelle, würde ich früh ins Bett gehen.)</small>",
            typ: "text",
            korrekt: "coucherais"
        }
    ];
} else if (thema === "partie1") {
    aufgaben = [
        { satz: "Clément Mathieu est un homme ___ .", woerter: ["passionné", "patient" , "compréhensif", "autoritaire", "sévère", "rigide"], korrekt: ["passionné", "patient", "compréhensif"], bild: "img/mathieu.jpg" },
        { satz: "Rachin est un directeur  ___ .", woerter: ["compréhensif", "strict", "timide", "autoritaire", "froid", "gentil"], korrekt: ["strict", "autoritaire", "froid"], bild: "img/rachin.jpg" },
        { satz: "Pierre Morhange est un chanteur  ___ .", woerter: ["talentueux", "mauvais", "talentueuse", "doué"], korrekt: ["doué", "talentueux"], bild: "img/pierre.jpeg" },
        { satz: "Pierre Morhange est un garçon  ___ .", woerter: ["rebelle", "strict", "autoritaire", "heureuse", "indépendent"], korrekt: ["indépendent", "rebelle"], bild: "img/pierre.jpeg" },
        { satz: "Pépinot est un garçon  ___ .", woerter: ["intimidant", "attachant", "autoritaire", "timide", "violant"], korrekt: ["attachant", "timide"], bild: "img/pepinot.jpeg" },
        // Ende Adjektive  
        // Beginn aimer, détester, adorer, préférer
        { satz: "Clément Mathieu adore ___ musique.", woerter: ["la", "de la", "de"], korrekt: "la", bild: "img/mathieu.jpg"},
        { satz: "Clément Mathieu aime ___ travail avec les élèves.", woerter: ["le", "du", "de"], korrekt: "le", bild: "img/mathieu.jpg"},
        { satz: "Rachin préfère ___ autorité excessive à la bienveillance.", woerter: ["l'", "de l'", "d'"], korrekt: "l'", bild: "img/rachin.jpg"},
        { satz: "Pierre Morhange déteste ___ règles.", woerter: ["les", "de", "des"], korrekt: "les", bild: "img/pierre.jpeg"},
        { satz: "Elle aime ___  chocolat.", woerter: ["le", "du", "la"], korrekt: "le", bild: "img/chocolat.png" },
        { satz: "Elle adore ___  musique.", woerter: ["le", "de", "la", "de la", "du"], korrekt: "la", bild: "img/musique.png" },
        { satz: "Elle préfère ___  chiens aux chats.", woerter: ["les", "des", "d'", "du"], korrekt: "les", bild: "img/chiens.png" },
        { satz: "Il déteste ___  épinards.", woerter: ["des", "les", "d'", "de la"], korrekt: "les", bild: "img/épinards.png" },
        { satz: "Je m'appelle Léo. Je vais à l'école ___  pied.", woerter: ["à", "en", "avec"], korrekt: "à", bild: "img/schulweg.png" },
        { satz: "Ma mère va au travail ___ voiture.", woerter: ["à", "en", "avec"], korrekt: "en", bild: "img/mutter.jpeg" },
        { satz: "Mon père va au travail ___  vélo.", woerter: ["à", "en", "avec"], korrekt: "à", bild: "img/vater.jpg" },
        { satz: "Ma sœur va au lycée ___ bus.", woerter: ["à", "en", "avec"], korrekt: "en", bild: "img/schwester.png" },
        {    
            satz: "Ils vont en France ____ moto.",
            typ: "text",
            korrekt: "à",
            bild: "img/moto.png"
        },
        {    
            satz: "Elle va chez ses parents  ____ train.",
            typ: "text",
            korrekt: "en",
            bild: "img/train.jpg"
        },
        { satz: "Il joue ___ guitare.", woerter: ["de la", "à la"], korrekt: "de la", bild: "img/guitare.png" },
        { satz: "Il joue ___ piano.", woerter: ["de la", "du", "à la"], korrekt: "du", bild: "img/piano.png" },
        { satz: "Ils jouent ___ volleyball (männlich).", woerter: ["au", "du", "à la", " à le"], korrekt: "au", bild: "img/volley.png" },
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
        // { satz: "Si on avait beaucoup d'argent, on ___ (faire) un grand voyage.", woerter: ["faissait", "ferait", "fairiait"], korrekt: "ferait" }
    ];
} else if (thema === "bilan") {
    aufgaben = [
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "1. Meike: Qu'est-ce que tu ➡️ ____ ? Du vin ?",
            typ: "text",
            korrekt: "bois",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu ➡️ ____ de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>",
            woerter: ["manges", "bois", "mange"],
            korrekt: "manges",
            bild: "img/manger_boire.png"
        }/*,
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà ➡️ ____ un apéritif avec Alex à la maison.</ul>",
            typ: "text",
            korrekt: "bu",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous ➡️ ____ souvent de la bière, hein ? </ul>",
            typ: "text",
            korrekt: "buvez",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous ➡️ ____ souvent de la bière, hein ? </ul>",
            typ: "text",
            korrekt: "buvez",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous <strong> buvez </strong>  souvent de la bière, hein ? </ul>"+
            "<ul>5. Meike: Oui, et on ne ➡️ ____ pas de café après le repas. </ul>",
            typ: "text",
            korrekt: "boit",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous <strong> buvez </strong>  souvent de la bière, hein ? </ul>"+
            "<ul>5. Meike: Oui, et on ne <strong> boit </strong> pas de café après le repas. </ul>"+
            "<ul>6. Rose: Et quand vous ➡️ ____, vous ne buvez pas d'eau. C'est vrai ? </ul>",
            typ: "text",
            korrekt: "mangez",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous <strong> buvez </strong>  souvent de la bière, hein ? </ul>"+
            "<ul>5. Meike: Oui, et on ne <strong> boit </strong> pas de café après le repas. </ul>"+
            "<ul>6. Rose: Et quand vous <strong> mangez </strong>, vous ne buvez pas d'eau. C'est vrai ? </ul>"+
            "<ul>7. Meike: Oui, c'est vrai, et souvent, on ➡️ ____trop... et trop vite ! </ul>",
            typ: "text",
            korrekt: "mange",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous <strong> buvez </strong>  souvent de la bière, hein ? </ul>"+
            "<ul>5. Meike: Oui, et on ne <strong> boit </strong> pas de café après le repas. </ul>"+
            "<ul>6. Rose: Et quand vous <strong> mangez </strong>, vous ne buvez pas d'eau. C'est vrai ? </ul>"+
            "<ul>7. Meike: Oui, c'est vrai, et souvent, on <strong> mange </strong> trop... et trop vite ! </ul>"+
            "<ul>8. Rose: Tiens, les gens là-bas ➡️ ____ déjà leurs entrées.... hmm ! On commande aussi ? ... </ul>",
            typ: "text",
            korrekt: "mangent",
            bild: "img/manger_boire.png"
        },
        {    
            ueberschrift: "Meike et Rose vont au Restaurant. Complétez avec les formes de <strong>manger</strong> et <strong>boire</strong>.",
            satz: "<ul>1. Meike: Qu'est-ce que tu <strong> bois </strong> ? Du vin ?</ul>"+
            "<ul>2. Rose: Si tu <strong> manges </strong> de la viande, on prend du vin rouge, d'accord ? On prend aussi un apéritif ?</ul>"+
            "<ul>3. Meike: Non, merci. J'ai déjà <strong> bu </strong> un apéritif avec Alex à la maison.</ul>"+
            "<ul>4. Rose: D'accord. En Allemagne, vous <strong> buvez </strong>  souvent de la bière, hein ? </ul>"+
            "<ul>5. Meike: Oui, et on ne <strong> boit </strong> pas de café après le repas. </ul>"+
            "<ul>6. Rose: Et quand vous <strong> mangez </strong>, vous ne buvez pas d'eau. C'est vrai ? </ul>"+
            "<ul>7. Meike: Oui, c'est vrai, et souvent, on <strong> mange </strong> trop... et trop vite ! </ul>"+
            "<ul>8. Rose: Tiens, les gens là-bas <strong> mangez </strong> déjà leurs entrées.... hmm ! On commande aussi ? ... </ul>"+
            "<ul>9. (plus tard) <br> Rose: Ah, voilà nos salades. ➡️ ____, j'ai faim !</ul>",
            typ: "text",
            korrekt: "mangeons",
            bild: "img/manger_boire.png"
        } 
        */
    ]
} else if (thema === "recette") {
    aufgaben = [
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
    ]
} else if (thema === "mengen") {
  aufgaben = [
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Für bestimmte Mengen verwendest du <strong><em>de</em></strong> (oder <strong><em>d'</em></strong> vor Vokal oder stummem <em>h</em>)."+
        "<ul>Un litre ➡️___ lait.</ul>",
        woerter: ["de", "d'"],
        korrekt: "de"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Für bestimmte Mengen verwendest du <strong><em>de</em></strong> (oder <strong><em>d'</em></strong> vor Vokal oder stummem <em>h</em>)."+
        "<ul>Un litre <strong>de</strong> lait.</ul>"+
        "<ul>Une bouteille ➡️___ eau.</ul>",
        woerter: ["de", "d'"],
        korrekt: "d'"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Für bestimmte Mengen verwendest du <strong><em>de</em></strong> (oder <strong><em>d'</em></strong> vor Vokal oder stummem <em>h</em>)."+
        "<ul>Un litre <strong>de</strong> lait.</ul>"+
        "<ul>Une bouteille <strong>d'</strong> eau.</ul>"+
        "<ul>200 grammes ➡️___ sucre.</ul>",
        woerter: ["de", "d'"],
        korrekt: "de"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Für bestimmte Mengen verwendest du <strong><em>de</em></strong> (oder <strong><em>d'</em></strong> vor Vokal oder stummem <em>h</em>)."+
        "<ul>Un litre <strong>de</strong> lait.</ul>"+
        "<ul>Une bouteille <strong>d'</strong> eau.</ul>"+
        "<ul>200 grammes <strong>de</strong> sucre.</ul>"+
        "<ul>Une cuillère ➡️___ huile. <small>(Ein Löffel Öl.)</small></ul>",
        woerter: ["de", "d'"],
        korrekt: "d'"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Dabei spielt es keine Rolle, ob das Wort weiblich, männlich ist oder im Plural steht:"+
        "<ul>Un kilo ➡️___ farine. (la farine)<br>"+
        "<small>(Ein Kilo Mehl)</small></ul>"+
        "<ul>Un litre ___ lait. (le lait)<br>"+
        "<small>(Ein Liter Milch)</small></ul>"+
        "<ul>200 grammes ___ spaghettis. (les spaghettis)<br>"+
        "<small>(200 Gramm Spaghetti)</small></ul>",
        typ: "text",
        korrekt: "de"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Dabei spielt es keine Rolle, ob das Wort weiblich, männlich ist oder im Plural steht:"+
        "<ul>Un kilo <strong>de</strong> farine. (la farine)<br>"+
        "<small>(Ein Kilo Mehl)</small></ul>"+
        "<ul>Un litre ➡️ ___ lait. (le lait)<br>"+
        "<small>(Ein Liter Milch)</small></ul>"+
        "<ul>200 grammes ___ spaghettis. (les spaghettis)<br>"+
        "<small>(200 Gramm Spaghetti)</small></ul>",
        typ: "text",
        korrekt: "de"
    },
    {    
        ueberschrift: "Bestimmte Mengen",
        satz: "Dabei spielt es keine Rolle, ob das Wort weiblich, männlich ist oder im Plural steht:"+
        "<ul>Un kilo <strong>de</strong> farine. (la farine)<br>"+
        "<small>(Ein Kilo Mehl)</small></ul>"+
        "<ul>Un litre <strong>de</strong> lait. (le lait)<br>"+
        "<small>(Ein Liter Milch)</small></ul>"+
        "<ul>200 grammes ➡️ ___ spaghettis. (les spaghettis)<br>"+
        "<small>(200 Gramm Spaghetti)</small></ul>",
        typ: "text",
        korrekt: "de"
    },

    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Mengen werden häufig in Maßeinheiten angegeben. Wie im Deutschen benutzt man im Französischen"+
        " das metrische System, also: <em>(kilo)grammes, (centi)litres, (kilo)mètres, ...</em>  <br>"+
        "Auch Wörter wie <em>bouteille</em>, <em>cuillère (= Löffel)</em> oder <em>boîte (= Box / Packung)</em> geben bestimmte Mengen an."+
        "Lass uns diese Wörter ein wenig üben:",
        satz:
        "<ul>Un ➡️ ___ <strong>de</strong> yaourt.<br>",
        woerter: ["pot", "boîte", "bouteille", "cuillère"],
        korrekt: "pot",
        bild: "img/yaourt.jpg"
    },

    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Mengen werden häufig in Maßeinheiten angegeben. Wie im Deutschen benutzt man im Französischen"+
        " das metrische System, also: <em>(kilo)grammes, (centi)litres, (kilo)mètres, ...</em>  <br>"+
        "Auch Wörter wie <em>bouteille</em>, <em>cuillère (= Löffel)</em> oder <em>boîte (= Box / Packung)</em> geben bestimmte Mengen an."+
        "Lass uns diese Wörter ein wenig üben:",
        satz:
        "<ul><em> Un pot </em> <strong>de</strong> yaourt.</ul>"+
        "<ul>Une ➡️ ___ <strong>d'</strong> eau.</ul>",
        woerter: ["boîte", "bouteille", "cuillère"],
        korrekt: "bouteille",
        bild: "img/eau.jpg"
    },
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Mengen werden häufig in Maßeinheiten angegeben. Wie im Deutschen benutzt man im Französischen"+
        " das metrische System, also: <em>(kilo)grammes, (centi)litres, (kilo)mètres, ...</em>  <br>"+
        "Auch Wörter wie <em>bouteille</em>, <em>cuillère (= Löffel)</em> oder <em>boîte (= Box / Packung)</em> geben bestimmte Mengen an."+
        "Lass uns diese Wörter ein wenig üben:",
        satz:
        "<ul><em> Un pot </em> <strong>de</strong> yaourt.</ul>"+
        "<ul><em> Une bouteille </em><strong>d'</strong> eau.</ul>"+
        "<ul>Une ➡️ ___ </em><strong>d'</strong> huile.<br>",
        woerter: ["boîte", "cuillère"],
        korrekt: "cuillère",
        bild: "img/huile.jpg"
    },
     // Bien joué !  <em> (une) cuillère</em> bedeutet ein <em>Löffel</em>. Man unterscheidet  zwischen: <em>cuillère à thé (=Teelöffel)</em> und <em>cuillère à soupe (=Esslöffel)</em>
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Mengen werden häufig in Maßeinheiten angegeben. Wie im Deutschen benutzt man im Französischen"+
        " das metrische System, also: <em>(kilo)grammes, (centi)litres, (kilo)mètres, ...</em>  <br>"+
        "Auch Wörter wie <em>bouteille</em>, <em>cuillère (= Löffel)</em> oder <em>boîte (= Box / Packung)</em> geben bestimmte Mengen an."+
        "Lass uns diese Wörter ein wenig üben:",
        satz:
        "<ul><em> Un pot </em> <strong>de</strong> yaourt.</ul>"+
        "<ul><em> Une bouteille </em><strong>d'</strong> eau.</ul>"+
        "<ul><em> Une cuillère </em><strong>d'</strong> huile.</ul>"+
        "<ul>Une ➡️ ___ </em><strong>d'</strong> œufs.<br>",
        woerter: ["boîte"],
        korrekt: "boîte",
        bild: "img/eier.png"
    },
    // Auch Wörter wie <strong><em>beaucoup</em></strong> (= viel) bestimmten die Menge. Das ist auf den ersten Blick vielleicht etwas unintuitiv. Schließlich ist es keine exakte Bestimmung wie beispielsweise eine genaue Grammangabe. Trotzdem handelt es sich um eine bestimmte Menge.
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a ➡️ ___ eau.</ul>",
        woerter: [ "beaucoup de/d'", "un peu de/d'", "trop de/d'", "pas de/d'"],
        korrekt: "un peu de/d'",
        bild: "img/peu.jpg"
    },   
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a <strong>un peu d'</strong>eau. <small>(Es gibt <strong>ein wenig</strong> Wasser.)</small></ul>"+
        "<ul>Il y a ➡️ ___ eau.</ul>",
        woerter: [ "beaucoup de/d'", "trop de/d'", "pas de/d'"],
        korrekt: "beaucoup de/d'",
        bild: "img/beaucoup.jpg"
    },  
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a <strong>un peu d'</strong>eau. <small>(Es gibt <strong>ein wenig</strong> Wasser.)</small></ul>"+
        "<ul>Il y a <strong>beaucoup d'</strong>eau. <small>(Es gibt <strong>viel</strong> Wasser.)</small></ul>"+
        "<ul>Il y a ➡️ ___ eau.</ul>",
        woerter: ["trop de/d'", "pas de/d'"],
        korrekt: "trop de/d'",
        bild: "img/trop.jpg"
    }, 
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a <strong>un peu d'</strong>eau. <small>(Es gibt <strong>ein wenig</strong> Wasser.)</small></ul>"+
        "<ul>Il y a <strong>beaucoup d'</strong>eau. <small>(Es gibt <strong>viel</strong> Wasser.)</small></ul>"+
        "<ul>Il y a <strong>trop d'</strong>eau. <small>(Es gibt <strong>zu viel</strong> Wasser.)</small></ul>"+
        "<ul>Il <strong>n'</strong>y a ➡️ ___ eau.</ul>",
        woerter: ["pas de/d'"],
        korrekt: "pas de/d'",
        bild: "img/pas.png"
    }, 
    // Ein besonderer Fall der bestimmten Menge ist, wenn wir gar nichts von etwas haben. Man sagt auch leere Menge dazu.
    //Il ne mange pas ____ viande. (Er ist kein Fleisch) 

    // Übersicht
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas ➡️ ____ recette préférée. Et toi ? </ul>",
        typ: "text",
        korrekt: "de",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a beaucoup ➡️ ___ recettes.</ul>"+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?",
        typ: "text",
        korrekt: "de",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes.</ul>"+
            "<ul>Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 ➡️ ___ (Gramm Mehl), "+
            "3 ____ (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile </strong>(Esslöffel Öl), 50 ____ (Gramm Butter), ____ (ein wenig Salz), 3 oeufs et 0,1 ____ (Liter Milch).</ul>",
        woerter: ["grammes de farine", "litres de lait", "bouteilles de farine", "grammes de sucre"],
        korrekt: "grammes de farine",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes."+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 ➡️ ____ (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile </strong>(Esslöffel Öl), 50 ____ (Gramm Butter), ____ (ein wenig Salz), 3 oeufs et 0,1 ____ (Liter Milch).</ul>",
        woerter: ["cuillères à café de sucre", "cuillères à soupe de sucre", "cuillères à soupe de farine"],
        korrekt: "cuillères à soupe de sucre",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes."+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 <strong>cuillères à soupe de sucre</strong> (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile </strong>(Esslöffel Öl), 50 ➡️ ____ (Gramm Butter), ____ (ein wenig Salz), 3 oeufs et 0,1 ____ (Liter Milch).</ul>",
        typ: "text",
        korrekt: "grammes de beurre",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes."+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 <strong>cuillères à soupe de sucre</strong> (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile</strong>(Esslöffel Öl), 50 <strong>grammes du beurre</strong> (Gramm Butter), ➡️ ____ (ein wenig) sel, 3 oeufs et 0,1 ____ (Liter Milch).</ul>",
        typ: "text",
        korrekt: "un peu de",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ?</ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes."+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 <strong>cuillères à soupe de sucre</strong> (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile</strong>(Esslöffel Öl), "+
            "50 <strong>grammes du beurre</strong> (Gramm Butter), <strong>un peu de</strong>(ein wenig) sel, 3 oeufs et 0,1 ➡️ ____ (Liter Milch).</ul>",
        typ: "text",
        korrekt: "litres de lait",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ? </ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes.</ul>"+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 <strong>cuillères à soupe de sucre</strong> (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile</strong>(Esslöffel Öl), "+
            "50 <strong>grammes du beurre</strong> (Gramm Butter), <strong>un peu de</strong>(ein wenig) sel, 3 oeufs et 0,1 <strong>litres de lait</strong> (Liter Milch).</ul>"+
            "<ul><small>Manon</small>: Ah génial ! Merci ! Mais il ne faut pas ➡️ ____ sel ?</ul>",
        typ: "text",
        korrekt: "de",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Manon et Mathieu parlent de leurs plats préférés ... <br>",
        satz: 
 	        "<ul><small>Manon</small>: Est-ce que tu as une recette préférée ?</ul>"+
            "<ul><small>Mathieu</small>: Non, je n'ai pas <strong>de</strong> recette préférée. Et toi ?</ul>"+
            "<ul><small>Manon</small>: Oui, j'adore les crêpes !</ul>"+
            "<ul><small>Mathieu</small>: Ah oui, moi aussi ! Sur internet il y a trop <strong>de</strong> recettes."+
            "Mais la recette de ma grand-mère est super ! Tu veux l'avoir ?</ul>"+
            "<ul><small>Manon</small>: Oui, s'il te plaît !</ul>"+
            "<ul><small>Mathieu</small>: Alors, pour les ingrédients… Il faut 300 <strong>grammes de farine</strong> (Gramm Mehl), "+
            "3 <strong>cuillères à soupe de sucre</strong> (Esslöffel Zucker), 2 <strong> cuillères à soupe d'huile</strong>(Esslöffel Öl), "+
            "50 <strong>grammes du beurre</strong> (Gramm Butter), <strong>un peu de</strong>(ein wenig) sel, 3 oeufs et 0,1 <strong>litres de lait</strong> (Liter Milch).</ul>"+
            "<ul><small>Manon</small>: Ah génial ! Merci ! Mais il ne faut pas <strong>de</strong> sel ?</ul>"+
            "<ul><small>Mathieu</small>: Si tu veux, tu peux mettre ____ (ein wenig Salz). Mais pas trop !</ul>",
        typ: "text",
        korrekt: "un peu de sel",
        bild: "img/manonmathieu.png"
    }, 
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: 
 	        "<ul><small>Manon</small>: Et la préparation ?</ul>"+
            "<ul><small>Mathieu</small>: Je t'explique étape par étape :</ul>"+
            "<ul>Étape 1: Mettre la farine dans un grand bol. <small>(Das Mehl in eine große Schüssel geben.)</small></ul>"+
            "<ul>Étape 2: <strong>Ajouter</strong> le sel, le sucre et les œufs. <small>(Salz, Zucker und Eier <strong> ➡️ ____</strong>.)</small></ul>",
        woerter: ["erhitzen", "hinzufügen", "vermengen", "kochen"],
        korrekt: "hinzufügen",
        bild: "img/ajouter.png"
    },   
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: 
 	        "<ul><small>Manon</small>: Et la préparation ?</ul>"+
            "<ul><small>Mathieu</small>: Je t'explique étape par étape :</ul>"+
            "<ul>Étape 1: Mettre la farine dans un grand bol. <small>(Das Mehl in eine große Schüssel geben.)</small></ul>"+
            "<ul>Étape 2: <strong>Ajouter</strong> le lait, le sucre et les œufs. <small>(Salz, Zucker und Eier <strong>hinzugeben</strong>.)</small></ul>"+
            "<ul>Étape 3: <strong>Mélanger</strong> avec un fouet. <small>(Mit einem Schneebesen <strong>➡️ ____</strong>)</small></ul>",
        woerter: ["erhitzen", "vermengen", "kochen"],
        korrekt: "vermengen",
        bild: "img/melanger.png"
    }, 
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: 
 	        "<ul><small>Manon</small>: Et la préparation ?</ul>"+
            "<ul><small>Mathieu</small>: Je t'explique étape par étape :</ul>"+
            "<ul>Étape 1: Mettre la farine dans un grand bol. <small>(Das Mehl in eine große Schüssel geben.)</small></ul>"+
            "<ul>Étape 2: <strong>Ajouter</strong> le sel, le sucre et les œufs. <small>(Salz, Zucker und Eier <strong>hinzugeben</strong>.)</small></ul>"+
            "<ul>Étape 3: <strong>Mélanger</strong> avec un fouet. <small>(Mit einem Schneebesen <strong>vermengen</strong>)</small></ul>"+
            "<ul>Étape 4: <strong>Chauffer</strong> une poêle avec un peu d'huile. <small>(Eine Pfanne mit etwas Öl <strong>➡️ ____</strong>.)</small></ul>",
        woerter: ["erhitzen", "kochen"],
        korrekt: "erhitzen",
        bild: "img/chauffer.png"
    }, 
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: 
 	        "<ul><small>Manon</small>: Et la préparation ?</ul>"+
            "<ul><small>Mathieu</small>: Je t'explique étape par étape :</ul>"+
            "<ul>Étape 1: Mettre la farine dans un grand bol. <small>(Das Mehl in eine große Schüssel geben.)</small></ul>"+
            "<ul>Étape 2: <strong>Ajouter</strong> le sel, le sucre et les œufs. <small>(Salz, Zucker und Eier <strong>hinzugeben</strong>.)</small></ul>"+
            "<ul>Étape 3: <strong>Mélanger</strong> avec un fouet. <small>(Mit einem Schneebesen <strong>vermengen</strong>)</small></ul>"+
            "<ul>Étape 4: <strong>Chauffer</strong> une poêle avec un peu d'huile. <small>(Eine Pfanne mit etwas Öl <strong>erhitzen</strong>.)</small></ul>"+
            "<ul>Étape 5: <strong>Mettre</strong> une un peu de pâte dans la poêle. <small>(Ein wenig Teig in die Pfanne geben.)</small></ul>"+
            "<ul>Étape 6: <strong>Cuire</strong> pendant 2 à 3 minutes.</ul> <small>(Während zwei bis drei Minuten <strong>➡️ ____</strong>.)</small>",
        woerter: ["kochen"],
        korrekt: "kochen",
        bild: "img/cuire.png"
    }, 
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: "<small>Mathieu</small>: À la fin tu peux mettre de la banane, aussi. Il faut l' ➡️ ____ (schälen) et après il faut la ___ (schneiden).",
        woerter: ["éplucher", "couper"],
        korrekt: "éplucher",
        bild: "img/eplucher.png"
    },
    {    
        ueberschrift: "Quelques nouveaux mots ...",
        satz: "<small>Mathieu</small>: À la fin tu peux mettre de la banane, aussi. Il faut <strong>éplucher</strong> et après il faut la ___ (schneiden).",
        woerter: ["éplucher", "couper"],
        korrekt: "couper",
        bild: "img/couper.png"
    }/*,

    {
      ueberschrift: "🍎 Ingrédients",
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
      */
  ];
}

/* else {
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
    if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
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
                // console.log("Erklärugen für Popups:", erklaerung, erklaerungen);
                // Popups anzeigen:
                if (erklaerung && !localStorage.getItem(`popupShown_${thema}_${aktuellesLevel}`)) {
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


    }, recette: {
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
        const falsch = doc.data();
        
        
        // Finde die Original-Aufgabe basierend auf dem Satz
        const original = aufgaben.find(a =>
            (a.satz?.includes(falsch.aufgabe) || falsch.aufgabe?.includes(a.satz)) &&
            (!falsch.level || aufgaben.indexOf(a) === falsch.level - 1)
        );
        /*
        const original = aufgaben.find(a =>
            (a.satz === falsch.aufgabe || a.ueberschrift === falsch.aufgabe || a.typ === "textarea") &&
            (!falsch.level || a.typ === "textarea"  || aufgaben.indexOf(a) === falsch.level - 1)
        );
        */
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
    for (let i = 31; i <= 41; i++) {
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
                    .filter(e => e.aufgabe?.includes("Ingrédient"))
                    .at(-1)?.antwort || "–";
                console.log("zutaten: ", zutaten);
                const zubereitung = daten.find(e => e.level === 2)?.antwort || "–";

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
