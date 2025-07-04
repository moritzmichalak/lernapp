// aufgaben_extra.js

const aufgaben_extra2 = [

    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, d'</em> ou <em>du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte ➡️ ____ œufs et un pot crème fraîche.<br>"+
        "Il faut aussi ____ fromage.</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: ["d'"]
    },
//Popup2: <em>une boîte</em> als Mengenangabe bestimmt die Menge, also <em>de</em>, was wegen des <strong>Vokals œ</strong>ufs zu <em>d'</em> wird.
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi ➡️ ____ fromage.</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "du"
    },
//Popup3: Der Satz enthält keine Mengenangabe für <em>fromage</em>, also handelt es sich um eine unbestimmte Menge. Da <em>fromage</em> männlich ist und in Einzahl steht: <em>du</em>
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a ➡️ ____ viande hachée.</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "de la"
    },
//Popup4: Der Satz enthält keine Mengenangabe für <em>viande</em>, also handelt es sich um eine unbestimmte Menge. Da <em>viande</em> weiblich ist und in Einzahl steht: <em>du</em>
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire ➡️ ____ saumon avec ____ riz.</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "du"
    },

    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec ➡️ ____ riz.</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "du"
    },

    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec <strong>du</strong> riz.</ul>"+
        "<ul><small>Christoph:</small> Alors on fait des légumes. Rose, tu peux prendre un kilo ➡️ ____ carottes ?<br>"+
        "Et comme dessert, es crêpes ! Tu prends aussi un litre ____ lait ?</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "de"
    },
//Popup7: <em>un kilo</em> als Mengenangabe bestimmt die Menge, also <em>de</em>.
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec <strong>du</strong> riz.</ul>"+
        "<ul><small>Christoph:</small> Alors on fait des légumes. Rose, tu peux prendre un kilo <strong>de</strong> carottes ?<br>"+
        "Et comme dessert, es crêpes ! Tu prends aussi un litre ➡️ ____ lait ?</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "de"
    },
//Popup8: <em>un litre</em> als Mengenangabe bestimmt die Menge, also <em>de</em>.  
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec <strong>du</strong> riz.</ul>"+
        "<ul><small>Christoph:</small> Alors on fait des légumes. Rose, tu peux prendre un kilo <strong>de</strong> carottes ?<br>"+
        "Et comme dessert, es crêpes ! Tu prends aussi un litre <strong>de</strong> lait ?</ul>"+
        "<ul><small>Rose:</small> D'accord ! On a encore ➡️ ____ eau ?</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "de l'"
    },
    //Popup9: Der Satz enthält keine Mengenangabe für <em>eau</em>, also <em>de la</em>, weil <em>eau</em> weiblich ist und in Einzahl steht. Wegen des <strong>Vokals e</strong>au, wird es zu <em>de l'</em>.
    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec <strong>du</strong> riz.</ul>"+
        "<ul><small>Christoph:</small> Alors on fait des légumes. Rose, tu peux prendre un kilo <strong>de</strong> carottes ?<br>"+
        "Et comme dessert, es crêpes ! Tu prends aussi un litre <strong>de</strong> lait ?</ul>"+
        "<ul><small>Rose:</small> D'accord ! On a encore <strong>de l'</strong>eau ?</ul>"+
        "<ul><small>Alex:</small> Non. Prends deux bouteilles ➡️ ____ eau et puis une bouteille ____ vin blanc : ça va bien avec le saumon !</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "d'"
    },

    {    
        ueberschrift: "La visite des parents ... Complétez le texte avec <em>de, du, de l', de la</em>.",
        satz: 
        "<ul><small>Rose:</small> Moi, je vais faire les courses. Alors qu'est ce qu'il faut prendre ?</ul>"+
        "<ul><small>Alex:</small> Comme entrée, on va faire une quiche. Alors, prends une boîte <strong>d'</strong> œufs et un pot crème fraîche.<br>"+
        "Il faut aussi <strong>du</strong> fromage.</ul>"+
        "<ul><small>Christoph:</small> Et comme plat ?</ul>"+
        "<ul><small>Alex:</small> On peut faire des spaghettis, on a <strong>de la</strong> viande hachée.</ul>"+
        "<ul><small>Rose:</small> Ah non, pour les parents de Meike, les spaghettis, ça ne va pas ! On peut faire <strong>du</strong> saumon avec <strong>du</strong> riz.</ul>"+
        "<ul><small>Christoph:</small> Alors on fait des légumes. Rose, tu peux prendre un kilo <strong>de</strong> carottes ?<br>"+
        "Et comme dessert, es crêpes ! Tu prends aussi un litre <strong>de</strong> lait ?</ul>"+
        "<ul><small>Rose:</small> D'accord ! On a encore <strong>de l'</strong>eau ?</ul>"+
        "<ul><small>Alex:</small> Non. Prends deux bouteilles <strong>d'</strong> eau et puis une bouteille ➡️ ____ vin blanc : ça va bien avec le saumon !</ul>",
        woerter: ["de", "d'","du", "de la", "de l'", "des"],
        korrekt: "de"
    }
]