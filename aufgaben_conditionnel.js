// aufgaben_conditionnel.js

const aufgaben_conditionnel = [
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

]