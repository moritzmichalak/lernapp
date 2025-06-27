// aufgaben_subjonctig.js

const afgaben_subjonctif = [
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
]