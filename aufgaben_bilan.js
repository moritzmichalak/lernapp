const aufgaben_bilan = [
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé ➡️ ____ spaghettis et ____ viande hachée. Et ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "tous les"
    },
    //POPUP 2: Titel: Gut erkannt! Text: spaghettis steht im Plural und ist männlich, also tous les. 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et ➡️ ____ viande hachée. Et ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toute la"
    },
    //POPUP 3: Titel: Bien joué ! Text: viande steht im Singular/Einzahl und es ist weiblich -> toute la viande (das ganze Fleisch). 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et ➡️ ____ tomates ...</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
    //POPUP 4: Titel: Super ! Text: tomates steht im Plural und es ist weiblich -> toutes les tomates (alle Tomaten). 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu ➡️ ____ boissons ? ____ vin et ____ eau ?</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
    //POPUP 5: Titel: Exactement ! Text: boissons steht im Plural und es ist weiblich -> toutes les boissons (alle Getränke). 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? ➡️ ____ vin et ____ eau ?</ul>",
        woerter: ["Tout le", "Toute la", "Tous les", "Toutes les"],
        korrekt: "Tout le"
    },
    //POPUP 6: Titel: Bien joué ! Text: vin steht im Singular/Einzahl und es ist männlich -> tout le vin (der ganze Wein). 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? <strong>Tout le</strong> vin et ➡️ ____ eau ?</ul>",
        woerter: ["tout l'", "toute l'", "tous les", "toutes les"],
        korrekt: "toute l'"
    },
    //POPUP 7: Titel: Bravo ! Text: eau steht im Singular/Einzahl und es ist weiblich -> toute l'eau (das ganze Wasser). 
    {
        ueberschrift: "Exercice 1: Rose kommt aus dem Urlaub zurück und schaut entsetzt in den Kühlschrank ... <br>"+
        "Complétez avec <strong><em>tout le / toute la / tous les / toutes les</em></strong>",
        satz: "<ul><small>Rose: </small> Alex, ce n'est pas possible, vous avez tout mangé !</ul>"+
        "<ul><small>Alex: </small> On a fait une fête samedi, et on a mangé <strong>tous les</strong> "+
        "spaghettis et <strong>toute la</strong> viande hachée. Et <strong>toutes les</strong> tomates ...</ul>"+
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? <strong>Tout le</strong> vin et <strong>toute l'</strong>eau ?</ul>"+
        "<ul><small>Alex: </small> Eh ... oui ..."+
        "<ul><small>Rose: </small> Demain, tu vas faire ➡️ ____ courses !</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
    

    // POPUP 8: Titel: Beginnen wir mit der nächsten Aufgabe, Text: Hier muss du entweder den article partitif (du, de la, des) für unbestimmten Mengen oder "de" für bestimmte Mengen angeben. Zahlen von bis einschließlich 10 solltest du ausschreiben, also z.B. "trois" statt 3, Zahlen >10 kanst du als Zahlen schreiben, also z.B. 100 grammes de beurre. Kilogramme(s), kannst du mit kilo(s) abkürzen
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> ➡️ ____  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> ____ viande hachée."+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "un kilo de"
    },
    // POPUP 9: Titel: Bien joué !, Text: Hier wird die Menge an Tomaten durch die Angabe 1 Kilo bestimmt -> Also bestimmte Menge mit "de" 
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small><small>(500)</small>  ➡️ ____ viande hachée."+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "500 grammes de"
    },
    // POPUP 9: Titel: Exactement !, Text: Hier wird die Menge an Fleisch durch die 500 Gramm bestimmt -> Also bestimmte Menge mit "de" 
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> ➡️ ____eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> ____ coca. </ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "De l'"
    },
    // POPUP 9: Titel: Gut gemacht !, Text: Hier ist die Menge an Wasser unbestimmt -> Also unbestimmte Menge mit article partitif: de la  
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> ➡️ ____ coca. </ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "cinq bouteilles de"
    },
        // POPUP 10
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi ➡️ ____ bière ?</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "de la"
    },
        // POPUP 11
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> ➡️ ____ bière, c'est assez ? </ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "dix bouteilles de"
    },
        // POPUP 12
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>dix bouteilles de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi ➡️ ____ vin.</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "du"
    },
        // POPUP 13
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>dix bouteilles de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi <strong>du</strong> vin.</ul>"+
        "<ul><small>Yohann: </small> Pour l'apéritif, je prends <img src='img/3bouteilles.png' alt='3 Flaschen' width='60' height='40'></img> ➡️ ____ vin blanc ?</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "trois bouteilles de"
    },
        // POPUP 14
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi <strong>du</strong> vin.</ul>"+
        "<ul><small>Yohann: </small> Pour l'apéritif, je prends <img src='img/3bouteilles.png' alt='3 Flaschen' width='60' height='40'></img> <strong>trois bouteilles de</strong> vin blanc ?</ul>"+
        "<ul><small>Marine: </small> Bonne idée ! Et pour le dessert, je fais un gâteau. Il me faut encore <img src='img/250g.png' alt='250g Gewicht' width='40' height='50'></img> "+
        " ➡️ ____ beurre, <img src='img/1boite.png' alt='1 Schachtel' width='60' height='50'></img> ____ œufs, "+
        " <img src='img/1pot.png' alt='1 Becker' width='40' height='50'></img> ____ crème fraiche et "+
        "<img src='img/1litre.png' alt='1 Liter' width='50' height='70'></img> ____ lait.</ul>"+
        "<ul><small>Yohann: </small> D'accord. C'est noté. Alors, à plus tard.</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "250 grammes de"
    },
        // POPUP 15
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi <strong>du</strong> vin.</ul>"+
        "<ul><small>Yohann: </small> Pour l'apéritif, je prends <img src='img/3bouteilles.png' alt='3 Flaschen' width='60' height='40'></img> <strong>de</strong> vin blanc ?</ul>"+
        "<ul><small>Marine: </small> Bonne idée ! Et pour le dessert, je fais un gâteau. Il me faut encore <img src='img/250g.png' alt='250g Gewicht' width='40' height='50'></img> "+
        " <strong>250 grammes de</strong> beurre, <img src='img/1boite.png' alt='1 Schachtel' width='60' height='50'></img>➡️ ____ œufs, "+
        " <img src='img/1pot.png' alt='1 Becker' width='40' height='50'></img> ____ crème fraiche et "+
        "<img src='img/1litre.png' alt='1 Liter' width='50' height='70'></img> ____ lait.</ul>"+
        "<ul><small>Yohann: </small> D'accord. C'est noté. Alors, à plus tard.</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "une boîte d'"
    },
        // POPUP 16
    {
        ueberschrift: "Exercice 2 (Cahier, p. 66) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi <strong>du</strong> vin.</ul>"+
        "<ul><small>Yohann: </small> Pour l'apéritif, je prends <img src='img/3bouteilles.png' alt='3 Flaschen' width='60' height='40'></img> <strong>de</strong> vin blanc ?</ul>"+
        "<ul><small>Marine: </small> Bonne idée ! Et pour le dessert, je fais un gâteau. Il me faut encore <img src='img/250g.png' alt='250g Gewicht' width='40' height='50'></img> "+
        " <strong>de</strong> beurre, <img src='img/1boite.png' alt='1 Schachtel' width='60' height='50'></img><strong>une boîte d'</strong>œufs, "+
        " <img src='img/1pot.png' alt='1 Becker' width='40' height='50'></img> ➡️ ____ crème fraiche et "+
        "<img src='img/1litre.png' alt='1 Liter' width='50' height='70'></img> ____ lait.</ul>"+
        "<ul><small>Yohann: </small> D'accord. C'est noté. Alors, à plus tard.</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "un pot de"
    },
        // POPUP17
    {
        ueberschrift: "Exercice 2 (Cahier, p. 65) La fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> <strong>cinq bouteilles de</strong> coca. </ul>"+
        "<ul><small>Yohann: </small> Et aussi <strong>de la</strong> bière ?</ul>"+
        "<ul><small>Doriane: </small> Bien sûr. <img src='img/10bouteilles.png' alt='10 Flaschen' width='80' height='40'></img> <strong>de</strong> bière, c'est assez ? </ul>"+
        "<ul><small>Marine: </small> Oui, il y a aussi <strong>du</strong> vin.</ul>"+
        "<ul><small>Yohann: </small> Pour l'apéritif, je prends <img src='img/3bouteilles.png' alt='3 Flaschen' width='60' height='40'></img> <strong>de</strong> vin blanc ?</ul>"+
        "<ul><small>Marine: </small> Bonne idée ! Et pour le dessert, je fais un gâteau. Il me faut encore <img src='img/250g.png' alt='250g Gewicht' width='40' height='50'></img> "+
        " <strong>250 grammes de</strong> beurre, <img src='img/1boite.png' alt='1 Schachtel' width='60' height='50'></img><strong>une boîte d'</strong>œufs, "+
        " <img src='img/1pot.png' alt='1 Becker' width='40' height='50'></img> <strong>un pot de</strong> crème fraiche et "+
        "<img src='img/1litre.png' alt='1 Liter' width='50' height='70'></img> ➡️ ____ lait.</ul>"+
        "<ul><small>Yohann: </small> D'accord. C'est noté. Alors, à plus tard.</ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "un litre de"
    },

     // POPUP 18: Titel: Troisième exercice !, TExt: In dieser Übung unterscheiden wir nicht nur zwischen "de" für bestimmte und du/de la/des für unbestimmte Mengen. Es gibt auch stellen an denen das Pronom "en" zu verwenden ist (zu deutsch: "davon"). Falls du die Vergangenheitsform Passé Composé benutzen musst, ist dies mit p.c. gekennzeichnet. Ansonsten benutzt die den Präsens.
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous ➡️ ____ <em>(prendre / agneau)</em> ?</ul>",
        typ: "text",
        korrekt: "prenez de l'agneau"
    },
    // POPUP 19: Sehr gut, die Menge von agneau wird nicht bestimmt, also article partitif: de l' !
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je ➡️ ____ <em>(ne pas vouloir)</em> ?</ul>",
        typ: "text",
        korrekt: "n'en veux pas"
    },
    // POPUP 19: Titel: Genau! Text: Das en bezieht sich auf agneau. Meike will nichts "davon". Das en steht vor dem Verb, auch bei der Verneinung und steht so mit nach dem ne der Verneinungsform: n'en (Verb) pas.
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je <strong>n'en veux pas</strong> <em>(ne pas vouloir)</em> ?</ul>"+
        "<ul><small>Christoph:</small> Tu , ➡️ ____  <em>(ne pas manger / viande)</em> ?</ul>",
        typ: "text",
        korrekt: "ne manges pas de viande"
    },
    // POPUP 20: Bei Verneinung spricht man von einer bestimmten Menge, man bestimmt die Menge nämlich auf 0 bzw. nichts. -> Also : de viande
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je <strong>n'en veux pas</strong> <em>(ne pas vouloir)</em> ?</ul>"+
        "<ul><small>Christoph:</small> Tu , <strong>ne manges pas de viande</strong> <em>(ne pas manger / viande)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non, je ➡️ ____  <em>(ne pas manger)</em> aujourd'hui. "+
        "Mais je ____ <em>(manger / poisson)</em>.</ul>",
        typ: "text",
        korrekt: "n'en mange pas"
    },
    // POPUP 21
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je <strong>n'en veux pas</strong> <em>(ne pas vouloir)</em> ?</ul>"+
        "<ul><small>Christoph:</small> Tu , <strong>ne manges pas de viande</strong> <em>(ne pas manger / viande)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non, je <strong>n'en mange pas</strong><em>(ne pas manger)</em> aujourd'hui. "+
        "Mais je ➡️ ____ <em>(manger / poisson)</em>.</ul>",
        typ: "text",
        korrekt: "mange du poisson"
    },
  // POPUP 22
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je <strong>n'en veux pas</strong> <em>(ne pas vouloir)</em> ?</ul>"+
        "<ul><small>Christoph:</small> Tu , <strong>ne manges pas de viande</strong> <em>(ne pas manger / viande)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non, je <strong>n'en mange pas</strong><em>(ne pas manger)</em> aujourd'hui. "+
        "Mais je <strong>mange du poisson</strong> <em>(manger / poisson)</em>.</ul>"+
        "<ul><small>Christoph:</small> Moi, j'adore la viande, alors je  ➡️ ____ <em>(prendre / gigot)</em>.</ul>",
        typ: "text",
        korrekt: "prends du gigot"
    },
  // POPUP 23


    // POPUP 24: Titel: Nouvelle exercice !, TExt: In dieser Übung üben wir die drei Verben venir, boire und manger. Falls du die Vergangenheitsform Passé Composé benutzen musst, ist dies mit p.c. gekennzeichnet. Ansonsten benutzt die den Präsens.
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous ➡️ ____ d'où ?</ul>",
        typ: "text",
        korrekt: "venez"
    },
     // POPUP 25:
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous ➡️ ____ de l'appart. Et toi, tu ____ d'où ? </ul>",
        typ: "text",
        korrekt: "venons"
    },
     // POPUP 26:
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu ➡️ ____ d'où ? </ul>",
        typ: "text",
        korrekt: "viens"
    },
     // POPUP 27
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu <strong>viens</strong> d'où ? </ul>"+
        "<ul><small>Manon:</small> Je ➡️ ____ du lycée. Vous ____ (<strong>p.c.</strong>) </ul>",
        typ: "text",
        korrekt: "viens"
    },
     // POPUP 28: Titel: Attention !, Text: Jetzt ist das Passé Composé zu verwenden!
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu <strong>viens</strong> d'où ? </ul>"+
        "<ul><small>Manon:</small> Je <strong>viens</strong> du lycée. Vous ➡️ ____ (<strong>p.c.</strong>) </ul>",
        typ: "text",
        korrekt: "avez mangé"
    },
     // POPUP 29: Titel: Bien joué ! Text: Die Passé Composé-Form von manger ist regelmäßig: mangé
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu <strong>viens</strong> d'où ? </ul>"+
        "<ul><small>Manon:</small> Je <strong>viens</strong> du lycée. Vous <strong>avez mangé</strong>(<strong>p.c.</strong>) </ul>"+
        "<ul><small>Christoph:</small> Non, pas encore. Et toi, tu ne ➡️ ____ pas à la cantine aujourdhui ?</ul>",
        typ: "text",
        korrekt: "manges"
    },
     // POPUP 30
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu <strong>viens</strong> d'où ? </ul>"+
        "<ul><small>Manon:</small> Je <strong>viens</strong> du lycée. Vous <strong>avez mangé</strong>(<strong>p.c.</strong>) </ul>"+
        "<ul><small>Christoph:</small> Non, pas encore. Et toi, tu ne <strong>manges</strong> pas à la cantine aujourdhui ?</ul>"+
        "<ul><small>Manon:</small> Non. Lucie et Farid ➡️ ____ à la cantine, mais le menu ne me plaît pas.</ul>",
        typ: "text",
        korrekt: "mangent"
    },
     // POPUP 31
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: 
        "<ul><small>Manon:</small> Salut ! Vous <strong>venez</strong> d'où ?</ul>"+
        "<ul><small>Meike:</small> Nous strong>venons</strong> de l'appart. Et toi, tu <strong>viens</strong> d'où ? </ul>"+
        "<ul><small>Manon:</small> Je <strong>viens</strong> du lycée. Vous <strong>avez mangé</strong>(<strong>p.c.</strong>) </ul>"+
        "<ul><small>Christoph:</small> Non, pas encore. Et toi, tu ne <strong>manges</strong> pas à la cantine aujourdhui ?</ul>"+
        "<ul><small>Manon:</small> Non. Lucie et Farid <strong>mangent</strong> à la cantine, mais le menu ne me plaît pas.</ul>"+
        "<ul><small>Meike:</small> Alors ➡️ ____  avec nous !</ul>",
        typ: "text",
        korrekt: "viens"
    },
     // POPUP 32
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous ➡️ ____ ?</ul>",
        typ: "text",
        korrekt: "mangez"
    },
     // POPUP 33
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous <strong>mangez</strong>?</ul>"+
        "<ul><small>Manon:</small> Moi, je ➡️ ____ une quiche, et Meike un sandwich. Et nous ____ du coca ! </ul>",
        typ: "text",
        korrekt: "mange"
    },
     // POPUP 34
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous <strong>mangez</strong>?</ul>"+
        "<ul><small>Manon:</small> Moi, je <strong>mange</strong> une quiche, et Meike un sandwich. Et nous ➡️ ____ du coca ! </ul>",
        typ: "text",
        korrekt: "buvons"
    },
     // POPUP 35
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous <strong>mangez</strong>?</ul>"+
        "<ul><small>Manon:</small> Moi, je <strong>mange</strong> une quiche, et Meike un sandwich. Et nous <strong>buvons</strong> du coca ! </ul>"+
        "<ul><small>Christoph:</small> Les filles ➡️ ____ tout le temps du coca !<br> Moi, je ____ une bière.</ul>",
        typ: "text",
        korrekt: "boivent"
    },
     // POPUP 36
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous <strong>mangez</strong>?</ul>"+
        "<ul><small>Manon:</small> Moi, je <strong>mange</strong> une quiche, et Meike un sandwich. Et nous <strong>buvons</strong> du coca ! </ul>"+
        "<ul><small>Christoph:</small> Les filles <strong>boivent</strong>  tout le temps du coca !<br> Moi, je ➡️ ____ une bière.</ul>",
        typ: "text",
        korrekt: "bois"
    },
     // POPUP 37
    {
        ueberschrift: "Exercixe 4: Tu viens ? Meike et Christophe rencontrent Manon dans la rue. <br>"+
        "Complétez avec les formes correctes de <em>venir</em>, <em>boire</em> et <em>manger</em>.",
        satz: "<strong>a) Au café de la Place. </strong> <br><br>"+
        "<ul><small>Christophe:</small> Alors les filles, qu'est-ce que vous <strong>mangez</strong>?</ul>"+
        "<ul><small>Manon:</small> Moi, je <strong>mange</strong> une quiche, et Meike un sandwich. Et nous <strong>buvons</strong> du coca ! </ul>"+
        "<ul><small>Christoph:</small> Les filles <strong>boivent</strong> tout le temps du coca !<br> Moi, je <strong>bois</strong> une bière.</ul>"+
        "<ul><small>Meike:</small> Ah bon, tu ➡️ ____ de la bière maintentant ?</ul>"+
        "<ul><small>Christophe:</small> Pourquoi pas ?</ul>",
        typ: "text",
        korrekt: "bois"
    },
    // POPUP 38
    
    //POPUP 38: Titel: Die fünfte und letzte Übung 💪, Text: Wir unterscheiden wieder zwischen "de" für bestimmte Mengen, du/de la/des für unbestimmte Mengen und müssen an manchen Stellen auch wieder das Pronom "en" verwenden. Falls du die Vergangenheitsform Passé Composé benutzen musst, ist dies mit p.c. gekennzeichnet. Ansonsten benutzt die den Präsens.

   {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On ➡️ ____ <em>(avoir / eau)</em> ?</ul>",
        typ: "text",
        korrekt: "a de l'eau"
    },
     //POPUP 39:  Titel: Reminder ;), Text: Es gibt die normale Form der Verneinung, z.B. <em>Elle ne vient pas (=Sie kommt nicht.)</em> , aber auch eine besondere Form der Verneinung: <em>Elle ne vient <strong>plus</strong> (=Sie kommt <strong>nicht mehr</strong>.)</em>
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on ➡️ ____ <em>(ne plus avoir)</em>.<br> "+
        "Alors on ____  <em>(prendre / trois bouteilles)</em></ul>.",
        typ: "text",
        korrekt: "n'en a plus"
    },
     //POPUP 40:
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on ➡️ ____  <em>(prendre / trois bouteilles)</em></ul>.",
        typ: "text",
        korrekt: "en prend trois bouteilles"
    },
     //POPUP 41
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em>.</ul>"+
        "<ul><small>Alex:</small> Et ➡️ ____  <em>(il faut / vin)</em> ?</ul>",
        typ: "text",
        korrekt: "il faut du vin"
    },
     //POPUP 42
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em>.</ul>"+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous ➡️ ____ <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>",
        typ: "text",
        korrekt: "en avons pris"
    },
     //POPUP 43: Titel: Attention ⚠️, Text: Il faut utiliser le passé composé !
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em>.</ul>"+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous <strong>en avons pris</strong> <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>"+
        "<ul><small>Alex:</small> Mais les parents de Meike ➡️ ____ <em>(boire/deux bouteilles/vin rouge, <strong>p.c.</strong>)</em> pendant leur visite ...</ul>",
        typ: "text",
        korrekt: "ont bu deux bouteilles de vin rouge"
    },
     //POPUP 44: Titel: Attention ⚠️, Text: Il faut utiliser le passé composé !
    {
        ueberschrift: "Exercixe 5 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em>.</ul>"+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous <strong>en avons pris</strong> <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>"+
        "<ul><small>Alex:</small> Mais les parents de Meike <strong>ont bu deux bouteilles de vin rouge</strong> <em>(boire/deux bouteilles/vin rouge, <strong>p.c.</strong>)</em> pendant leur visite ...</ul>"+
        "<ul><small>Rose:</small> Alex, ce nest pas vrai ! <br> Ils ➡️ ____ <em>(boire / bière, <strong>p.c.</strong>)</em> !</ul>",
        typ: "text",
        korrekt: "ont bu de la bière"
    }

]