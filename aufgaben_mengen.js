// aufgaben_mengen.js

const aufgaben_mengen = [
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
        "<ul><em> Une cuillère </em><strong>d'</strong> huile. <small>(Ein Löffel Öl.)</small></ul>"+
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
        woerter: [ "beaucoup d'", "un peu d'", "trop d'", "pas d'"],
        korrekt: "un peu d'",
        bild: "img/peu.jpg"
    },   
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a <strong>un peu d'</strong>eau. <small>(Es gibt <strong>ein wenig</strong> Wasser.)</small></ul>"+
        "<ul>Il y a ➡️ ___ eau.</ul>",
        woerter: [ "beaucoup d'", "trop d'", "pas d'"],
        korrekt: "beaucoup d'",
        bild: "img/beaucoup.jpg"
    },  
    {    
        ueberschrift: "Was sind bestimmte Mengen? 🤔 <br>"+
        "Auch Wörter wie beaucoup (= viel) bestimmen die Menge. Versuche das passende Wort zu finden. Il y a combien d'eau ?:",
        satz: 
        "<ul>Il y a <strong>un peu d'</strong>eau. <small>(Es gibt <strong>ein wenig</strong> Wasser.)</small></ul>"+
        "<ul>Il y a <strong>beaucoup d'</strong>eau. <small>(Es gibt <strong>viel</strong> Wasser.)</small></ul>"+
        "<ul>Il y a ➡️ ___ eau.</ul>",
        woerter: ["trop d'", "pas d'"],
        korrekt: "trop d'",
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
        woerter: ["pas d'"],
        korrekt: "pas d'",
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
]