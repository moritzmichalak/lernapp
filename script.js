const db = firebase.firestore();
let schuelerId = "";
let istWiederholung = false;

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
            "<ul><em>Je pense que</em> les énergies renouvelables <strong> sont </strong> importantes pour l'avenir' de la planète. <br>"+
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
            "<ul><em>Je trouve que</em> faire du sport, ca ___ (faire) du bien. <br>"+
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
            "<ul><em>Je <strong>ne</strong> crois <strong>pas</strong>  que</em> ce <strong>soit</strong> une bonne idée ! <br> <small>"+
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
        //POPUP: Super ! Jetzt weißt du, dass man den Subjonctif verwendet wenn: 
        // -man eine Unsicherheit oder einen Zweifel ausdrückt
        // -nach bestimmten Ausdrücken (z.B. Il est important que ... , Il faut que ...  )
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> je vend<strong>e</strong> <br><br></small>"+
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
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>tu vendes</ul>"+
            "<ul>il/elle/on ➡️ ___ </ul>",
            woerter: ["vendent", "vendions", "vende", "vendiez"],
            korrekt: "vende"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>tu vendes</ul>"+
            "<ul>il/elle/on vende </ul>"+
            "<ul>nous ➡️ ___ </ul>",
            woerter: ["vendent", "vendions", "vendiez"],
            korrekt: "vendions"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>tu vendes</ul>"+
            "<ul>il/elle/on vende </ul>"+
            "<ul>nous vendions </ul>"+
            "<ul>vous ➡️ ___  </ul>",
            woerter: ["vendent", "vendiez"],
            korrekt: "vendiez"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "<small>Lass uns noch anschauen wie man den Subjonctif bildet?🤔 <br>"+
            "Um den Subjonctif zu bilden, nimmt man einfach die 3. Person Plural der normalen Präsensform, "+
            " streicht das <em>-ent</em> und hängt die folgenden Endungen an: <em>-e, -es, -e, -ions, -iez, -ent</em>. <br>"+
            "Par exemple : ils vend<em>ent</em> (vendre) -> Stamm vend<br> -> je vend<strong>e</strong> <br><br></small>"+
            "Ordne zu:"+
            "<ul>tu vendes</ul>"+
            "<ul>il/elle/on vende </ul>"+
            "<ul>nous vendions </ul>"+
            "<ul>vous vendiez </ul>"+
            "<ul>ils/elles ➡️ ___  </ul>",
            woerter: ["vendent"],
            korrekt: "vendent"
        },
        //POPUP: Sehr gut, jetzt weißt du wie man den Subjonctif bei regelmäßigen Verben bildet :) 
        // Schauen wir uns noch ein paar unregelmäßige Verben an.
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small>"+
            "ils /elles ➡️ ___ :",
            woerter: ["prendent", "prennent"],
            korrekt: "prennent"
        },
            //POPUP: Exaxtement ! prendre ist im Präsens für die 3. Person Plural unregelmäßig, nämlich. elles prennent
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small><br>"+
            "   ils /elles prennent :"+
            "2. Jetzt entfernen wir <em>-ent</em> und bekommen den Stamm für den Subjonctif: ➡️ ___  </small>",
            woerter: ["prend", "prenn"],
            korrekt: "prenn"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small>"+
            "   ils /elles prennent: <br>"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn  </small><br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>➡️je prenn___</ul>",
            woerter: ["es", "ent", "e", "e", "ions", "iez"],
            korrekt: "e"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small><br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn  </small><br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>je prenn<strong>e</strong></ul>"+
            "<ul>➡️tu prenn___</ul>",
            woerter: ["es", "ent", "e", "ions", "iez"],
            korrekt: "es"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small><br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn  </small><br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>je prenn<strong>e</strong></ul>"+
            "<ul>tu prenn<strong>es</strong></ul>"+
            "<ul>➡️il/elle/on prenn___</ul>",
            woerter: [ "ent", "e", "ions", "iez"],
            korrekt: "e"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Schauen wir uns einmal das Verb <em>prendre</em> an. Wir wollen den Subjonctif bilden.<br>"+
            "1. Also überlegen wir zu allererst wie lautet die Form der 3. Person Plural im Präsens? 🤔 </small><br>"+
            "   ils /elles prennent:"+
            "2. Wir entfernen <em>-ent</em> und bekommen den Stamm für den Subjonctif: prenn  </small><br>"+
            "3. Jetzt hängen unsere Endungen an:  </small><br>"+
            "<ul>je prenn<strong>e</strong></ul>"+
            "<ul>tu prenn<strong>es</strong></ul>"+
            "<ul>il/elle/on prenn<strong>e</strong></ul>"+
            "<ul>nous ❓</ul>"+
            "<ul>vous ❓</ul>"+
            "<ul>➡️ il/elle/on prenn___</ul>",
            woerter: [ "ent", "ions", "iez"],
            korrekt: "ent"
        },
        { 
            ueberschrift: "Subjonctif bilden: Unregelmäßige Verben",
            satz: "<small>Bis hierhin also alles wie gehabt! Es gibt aber Ausnahmen für ___ und vous. </small><br>"+
            "<ul>je prenn<strong>e</strong></ul>"+
            "<ul>tu prenn<strong>es</strong></ul>"+
            "<ul>il/elle/on prenn<strong>e</strong></ul>"+
            "<ul>nous ❓</ul>"+
            "<ul>vous ❓</ul>"+
            "<ul>➡️ il/elle/on prenn___</ul>",
            woerter: [ "elle", "nous", "je"],
            korrekt: "nous"
        },
        { 
            ueberschrift: "Subjonctif bilden:",
            satz: "Außerdem benutzt man den Subjonctif bei bestimmten Ausdrücken, wie z.B.: <em> Il est important que ... , Il faut que ..., Il est nécessaire que ... , Il est dommage que ..., Je doute que ...</em><br>"+
            "Versuche für jeden der vier Ausrücke die richtige Übersetzung zu finden: <br><br>"+
            "<ul><em>Il est important que ... </em> = Es ist wichtig, dass...</ul>"+
            "<ul><em>Il est nécessaire que ... </em> = Es ist notwendig, dass ...</ul>"+
            "<ul><em>Il est dommage que ... </em> = Es ist schade, dass ... </ul>"+
            "<ul><em>Il faut que ... </em> = ➡️ ___ </ul>",
            woerter: ["Man muss ..."],
            korrekt: "Man muss ..."
        },
        { satz: "Bien que nous ___ (être) fatigués, nous continuons.", woerter: ["soyons", "sommes", "sera"], korrekt: "soyons" },
        { satz: "Je ne pense pas que ce / c' ___ (être) une bonne idée !", woerter: ["soit", "est", "sera"], korrekt: "soit" }
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
        //POPUP: Très bien ! Jetzt üben wir die unregelmäßigen Formen noch ein wenig. Wir starten mit faire. Merke dir gut, der Stamm lautet fer-!
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
        //POPUP: Très bien ! Weiter geht's mit pouvoir. Merke dir gut, der Stamm lautet pourr-!
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
        //POPUP: Très bien ! Weiter geht's mit avoir. Merke dir gut, der Stamm lautet aur-!
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
        //POPUP: Très bien ! Weiter geht's mit être. Merke dir gut, der Stamm lautet ser-!
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
        //POPUP: Très bien ! Weiter geht's mit aller. Merke dir gut, der Stamm lautet ir-!
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
        // POPUP: Wir schauen uns jetzt an mit welcher Art von Artikeln die vier Verben aimer, détester, adorer und préférer funktionieren. Probiere es zunächst einmal:
        { satz: "Clément Mathieu adore ___ musique.", woerter: ["la", "de la", "de"], korrekt: "la", bild: "img/mathieu.jpg"},
        { satz: "Clément Mathieu aime ___ travail avec les élèves.", woerter: ["le", "du", "de"], korrekt: "le", bild: "img/mathieu.jpg"},
        { satz: "Rachin préfère ___ autorité excessive à la bienveillance.", woerter: ["l'", "de l'", "d'"], korrekt: "l'", bild: "img/rachin.jpg"},
        { satz: "Pierre Morhange déteste ___ règles.", woerter: ["les", "de", "des"], korrekt: "les", bild: "img/pierre.jpeg"},
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
            bild: "img/moto.png"
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
        // { satz: "Si on avait beaucoup d'argent, on ___ (faire) un grand voyage.", woerter: ["faissait", "ferait", "fairiait"], korrekt: "ferait" }
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
    }

    // 🛠️ Normalfall: Textaufgabe
    if (aufgabe.typ === "text") {
        const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
        const satzMitLuecke = aufgabe.satz.replace("___", luecke);
        sentenceContainer.innerHTML = satzMitLuecke;

        wordsDiv.style.display = "none";
        textContainer.style.display = "block";
        checkAnswerBtn.style.display = "none";
        if (dropzone) dropzone.style.display = "none";

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

        aufgabe.woerter.forEach((wort, index) => {
            const formattedWord = aufgabe.ueberschrift?.startsWith("Endungen")
                ? formatWord(wort)
                : wort;

        wordsDiv.innerHTML += `<div class="word" onclick="wordClick(event)" id="word${index}">${formattedWord}</div>`;
});
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

    //Vor 14.05 01:58 Uhr
    /*
    const luecke = '<span class="dropzone"><span class="placeholder">...</span></span>';
    const satzMitLuecke = aufgabe.satz.replace("___", luecke);
    document.getElementById('sentence').innerHTML = satzMitLuecke;


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
    } else if (aufgabe.typ === "reflexion") {
        const container = document.getElementById("sentence");
        container.innerHTML = `
          <p>${aufgabe.satz}</p>
          <textarea id="reflexionInput" rows="6" placeholder="z. B. Ich habe gelernt, dass ..."></textarea>
          <br>
          <button onclick="saveReflexion()">Speichern & Abschließen</button>
        `;
        document.getElementById("words").innerHTML = "";
        document.getElementById("bildContainer").innerHTML = aufgabe.bild
          ? `<img src="${aufgabe.bild}" class="aufgabenbild">`
          : "";       
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
    */
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
        1: {
            titel: "Wofür braucht man den Subjonctif?",
            text: "Der Subjonctif wird nach bestimmten Auslösern verwendet, z.B. <em>il faut que</em>, <em>bien que</em> etc."
        },
        2: {
            titel: " 🤔 Was ist eigentlich der <em>Indikativ</em>?",
            text: "Der <em>Indikativ</em> ist die <em>Normalform</em>. Möchtest du etwas im Präsens ausrücken, benutzt du also einfach das Präsens. "
        },
        8: {
            titel: " Meinung äußern mit <em>Indikativ</em>?",
            text: "Très bien ! Jetzt üben wir ein bisschen wie man seine Meinung im Indikativ äußern kann."
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
    }
};

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

    if (isCorrect) {
        if (accentFehler) {
            alert("Kleiner Accent-Fehler, kein Problem 🙂");
            feedback.innerText = "✅ Richtig!";
        } else {
            feedback.innerText = "✅ Richtig!";
        }
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

    snapshot.forEach(doc => {
        const falsch = doc.data();
        // Finde die Original-Aufgabe basierend auf dem Satz
        const original = aufgaben.find(a => a.satz === falsch.aufgabe);
        if (original && !falschBeantwortete.find(a => a.satz === original.satz)) {
            falschBeantwortete.push(original);
        }
    });

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

/*
window.logout = logout;
window.zurueckThemenwahl = zurueckThemenwahl;
*/

