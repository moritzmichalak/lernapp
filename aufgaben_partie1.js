// aufgaben_partie1.js

const aufgaben_partie1 = [
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
    }

]