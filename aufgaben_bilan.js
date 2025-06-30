const aufgaben_bilan = [
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé ➡️ ____ spaghettis et ____ viande hachée. Et ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "tous les"
    },
    //POPUP: Titel: Gut erkannt! Text: spaghettis steht im Plural und ist männlich, also tous les. 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et ➡️ ____ viande hachée. Et ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toute la"
    },
    //POPUP: Titel: Bien joué ! Text: viande steht im Singular/Einzahl und es ist weiblich -> toute la viande (das ganze Fleisch). 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et ➡️ ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
    //POPUP: Titel: Super ! Text: tomates steht im Plural und es ist weiblich -> toutes les tomates (alle Tomaten). 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu ➡️ ____ boissons ? ____ vin et ____ eau ?</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
    //POPUP: Titel: Exactement ! Text: boissons steht im Plural und es ist weiblich -> toutes les boissons (alle Getränke). 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? ➡️ ____ vin et ____ eau ?</ul>",
        woerter: ["Tout le", "Toute la", "Tous les", "Toutes les"],
        korrekt: "Tout le"
    },
    //POPUP: Titel: Bien joué ! Text: vin steht im Singular/Einzahl und es ist männlich -> tout le vin (der ganze Wein). 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? <strong>Tout le</strong> vin et ➡️ ____ eau ?</ul>",
        woerter: ["tout l'", "toute l'", "tous les", "toutes les"],
        korrekt: "toute l'"
    },
    //POPUP: Titel: Bravo ! Text: eau steht im Singular/Einzahl und es ist weiblich -> toute l'eau (das ganze Wasser). 
    {
        ueberschrift: "Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? <strong>Tout le</strong> vin et ➡️ ____ eau ?</ul>"+
        "<ul><small>Alex: </small> Eh ... oui ..."+
        "<ul><small>Rose: </small> Demain, tu vas faire ➡️ ____ courses !</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
        //POPUP: Titel: Oui, c'est vrai ! Text: courses steht im Plural und es ist weiblich -> toutes les courses (alle Einkäufe). 
    // p. 65 ex 2 La fête
    {
        ueberschrift: "Test 1",
        satz: "Pour la salade, il me faut <span class='emoji-gewicht'></span> ➡️ ____  et ainsi",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
        {
        ueberschrift: "Test 2",
        satz: "<img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img>"+
        "<img src='img/250g.png' alt='250g Gewicht' width='40' height='50'></img>"+
        "<img src='img/10bouteilles.png' alt='10 Flaschen' width='40' height='50'></img>"+
        "<img src='img/5bouteilles.png' alt='5 Flaschen' width='40' height='50'></img>"+
        "<img src='img/1pot.png' alt='1 Becker' width='40' height='50'></img>"+
        "<img src='img/1litre.png' alt='1 Liter' width='40' height='50'></img>"+
        "<img src='img/1boite.png' alt='1 Schachtel' width='40' height='50'></img>"+
        "Pour la salade, il me faut <img src='img/1kg.jpg' alt='1K Gewicht' width='40' height='50'></img> ➡️ ____  et ainsi",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    }
]