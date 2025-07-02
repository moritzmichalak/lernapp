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
        "<ul><small>Rose: </small> Vous avez aussi bu <strong>toutes les</strong> boissons ? <strong>Tout le</strong> vin et <strong>toute l'</strong>eau ?</ul>"+
        "<ul><small>Alex: </small> Eh ... oui ..."+
        "<ul><small>Rose: </small> Demain, tu vas faire ➡️ ____ courses !</ul>",
        woerter: ["tout le", "toute la", "tous les", "toutes les"],
        korrekt: "toutes les"
    },
        //POPUP: Titel: Oui, c'est vrai ! Text: courses steht im Plural und es ist weiblich -> toutes les courses (alle Einkäufe). 
    // p. 65 ex 2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> ➡️ ____  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> ____ viande hachée."+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "un kilo de"
    },
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small><small>(500)</small>  ➡️ ____ viande hachée."+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "500 grammes de"
    },
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> ➡️ ____eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> ____ coca. </ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "De l'"
    },
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
        satz: "<ul><small>Yohann: </small> Je vais faire les courses pour la fête. Qu'est-ce qu'il nous faut<sup>*</sup> ?</ul>"+
        "<ul><small>Doriane: </small> Pour la salade, il me faut<sup>*</sup> <img src='img/1kg.png' alt='1K Gewicht' width='40' height='50'></img> <strong>un kilo de</strong>  "+
        "tomates et pour les spaghettis, <img src='img/500g.png' alt='500g Gewicht' width='40' height='50'></img><small>(500)</small> <strong>500 grammes de</strong> viande hachée."+
        "<ul><small>Yohann: </small> Et comme boisson, qu'est-ce qu'on prend ?</ul>"+
        "<ul><small>Marine: </small> <strong>De l'</strong>eau et <img src='img/5bouteilles.png' alt='5 Flaschen' width='60' height='40'></img> ➡️ ____ coca. </ul>"+
        "<br><br>(<small><sup>*</sup> <strong> il nous / me fait</strong> = wir brauchen / ich brauche ) </small>",
        typ: "text",
        korrekt: "cinq bouteilles de"
    },
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "2 la fête: Samedi matin, les trois colocs préparent la fête. <br> Complétez avec les <u>quantités</u>  ou avec <u> l'article partitif</u>",
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
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous ➡️ ____ <em>(prendre / agneau)</em> ?</ul>",
        typ: "text",
        korrekt: "prenez de l'agneau"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je ➡️ ____ <em>(ne pas vouloir)</em> ?</ul>",
        typ: "text",
        korrekt: "n'en veux pas"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>a) Au restaurant</strong> <br><br>"+
        "<ul><small>Le garçon:</small> Alors, vous <strong>prenez de l'agneau</strong><em> (prendre / agneau)</em> ?</ul>"+
        "<ul><small>Meike:</small> Non merci, je ➡️ ____ <em>(ne pas vouloir)</em> ?</ul>",
        typ: "text",
        korrekt: "n'en veux pas"
    },
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


    


   {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On ➡️ ____ <em>(avoir / eau)</em> ?</ul>",
        typ: "text",
        korrekt: "a de l'eau"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on ➡️ ____ <em>(ne plus avoir)</em>.<br> "+
        "Alors on ____  <em>(prendre / trois bouteilles)</em></ul>.",
        typ: "text",
        korrekt: "n'en a plus"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on ➡️ ____  <em>(prendre / trois bouteilles)</em></ul>.",
        typ: "text",
        korrekt: "en prend trois bouteilles"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em></ul>."+
        "<ul><small>Alex:</small> Et ➡️ ____  <em>((il faut / vin)</em> ?</ul>",
        typ: "text",
        korrekt: "il faut du vin"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em></ul>."+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous ➡️ ____ <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>",
        typ: "text",
        korrekt: "en avons pris"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em></ul>."+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous <strong>en avons pris</strong> <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>"+
        "<ul><small>Alex:</small> Mais les parents de Meike ➡️ ____ <em>(boire/deux bouteilles/vin rouge, <strong>p.c.</strong>)</em> pendant leur visite ...</ul>",
        typ: "text",
        korrekt: "ont bu deux bouteilles de vin rouge"
    },
    {
        ueberschrift: "Exercixe 3 (Cahier, p. 66) Vous en voulez ? Complétez les dialoges. Mettez aussi les <em>articles partitifs</em>, <em>de</em> et <em>en</em>, là où c'est nécessaire.",
        satz: 
        "<strong>b) Au supermarché</strong> <br><br>"+
        "<ul><small>Alex:</small> On <strong>a de l'eau</strong> <em>(avoir / eau)</em> ?</ul>"+
        "<ul><small>Rose:</small> A mon avis, on <strong>n'en a plus</strong> <em>(ne plus avoir)</em>.<br> "+
        "Alors on <strong>en prend trois bouteilles</strong> <em>(prendre / trois bouteilles)</em></ul>."+
        "<ul><small>Alex:</small> Et <strong>il faut du vin</strong> <em>(il faut / vin)</em> ?</ul>"+
        "<ul><small>Rose:</small> Ah non, nous <strong>en avons pris</strong> <em>(prendre, <strong>p.c.</strong>)</em> la dernière fois.</ul>"+
        "<ul><small>Alex:</small> Mais les parents de Meike <strong>ont bu deux bouteilles de vin rouge</strong> <em>(boire/deux bouteilles/vin rouge, <strong>p.c.</strong>)</em> pendant leur visite ...</ul>"+
        "<ul><small>Rose:</small> Alex, ce nest pas vrai ! <br> Ils ➡️ ____ <em>(boire / bière, <strong>p.c.</strong>)</em> !</ul>",
        typ: "text",
        korrekt: "ont bu de la bière"
    }

]