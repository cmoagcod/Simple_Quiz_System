// JS Main File

// A compléter
var questions = [
    {
        "question" : "Un ordinateur moderne avec un processeur Intel fonctionne généralement en ",
        "reponses" : ["16 bit","32 bit","64 bit"],
        "correct" : 2
    },
    {
        "question" : "Parmi ces 3 langages de programmation lequel est considéré comme étant de plus bas niveau",
        "reponses" : ["Python","C","JavaScript"],
        "correct" : 1
    },
    {
        "question" : "HTML est un acronyme pour :",
        "reponses" : ["HyperText Markup Langage","HyperText Motor of Linearity","HopText Marking Langage"],
        "correct" : 0
    },
    {
        "question" : "Le CSS sert ",
        "reponses" : ["à styliser un site","à créer un site web dit dynamique"],
        "correct" : 0
    },
    {
        "question" : "Un processeur utilise ",
        "reponses" : ["des portes logiques","des opérations simples basées exclusivement sur les additions et soustractions"],
        "correct" : 0
    },
    {
        "question" : "En 2003, lors d'éléctions belges par vote numérique un candidat à reçu 4096 votes supplémentaire, on suspecte la cause d'être: ",
        "reponses" : ["une erreur de manipulation","un rayonnement cosmique"],
        "correct" : 1
    },
    {
        "question" : "L'architecture de processeur la plus répandue aujourd'hui dans les ordinateurs personnels (mac exclus) est:",
        "reponses" : ["x86","ARM"],
        "correct" : 0
    },
    {
        "question" : "IOT signifie",
        "reponses" : ["International Organisation of Transfer","Intelligence Of Technology", "Internet Of Things", "IOT n'est pas un acronyme et est le nom d'une technologie singulière"],
        "correct" : 2
    },
    {
        "question" : "Le python est un langage",
        "reponses" : ["interprété","compilé"],
        "correct" : 0
    },
    {
        "question" : "L'intelligence artificielle est ",
        "reponses" : ["majoritairement basée sur des mathématiques","majoritairement basée sur de la physique"],
        "correct" : 0
    },
    {
        "question" : "La société qui gère Windows est ",
        "reponses" : ["Google","Alphabet","Microsoft","Apple","IBM"],
        "correct" : 2
    },
    {
        "question" : "Android est basé sur ",
        "reponses" : ["BSD","Windows IOT","Unix","Linux","iOS"],
        "correct" : 3
    },
    {
        "question" : "Il n'existe aucun virus informatique sur un système basé sur Linux.",
        "reponses" : ["Vrai","Faux"],
        "correct" : 1
    },
    {
        "question" : "Quelle porte logique n'existe pas ?",
        "reponses" : ["OR","AND","XOR","NAND","NOR","ORX"],
        "correct" : 5
    },
    {
        "question" : "En programmation lorsque l'on utilise des fonctions préfaites que l'on ne définit pas (ex: sinus, graphique...)",
        "reponses" : ["On utilise des livres","On utilise des librairies","On utilise des systèmes"],
        "correct" : 1
    },
    {
        "question" : "Dorian est",
        "reponses" : ["Beau","Très beau","Nous"],
        "correct" : 2
    },
    {
        "question" : "Quel nom ne correspond pas au nom d'un navigateur web ?",
        "reponses" : ["NetScape","Google","Firefox","League of Legends"],
        "correct" : 1
    },
    {
        "question" : "Microsoft a été crée par ",
        "reponses" : ["Bill Cipher","Bill Porte","Bill Gates","Bowling Portail", "Paul Allen & Bill Gates"],
        "correct" : 4
    },
    {
        "question" : "Le moteur de recherche crée par Microsoft est ",
        "reponses" : ["Bing","Qwant","Yahoo"],
        "correct" : 0
    }
];

// Definiton variables
nombre_questions = 0;
for (i in questions) {
    nombre_questions ++;
}
nombre_questions = nombre_questions - 1;

queryString = window.location.search;
console.log("Query: ", queryString)
if (queryString == "") {
    queryString = "?qn=0&rp=[-1]&rc=0";
}
const urlParams = new URLSearchParams(queryString);

const question_number = parseInt(urlParams.get('qn'));
console.log("Question ", question_number, "/", nombre_questions);

reponse_prec = urlParams.get('rp');
reponse_prec = JSON.parse(reponse_prec);
console.log("Réponses précédentes: ", reponse_prec);

reponses_correctes = parseInt(urlParams.get('rc'));
console.log("Reponses correctes ", reponses_correctes, "/", nombre_questions+1);

const html_quizBox = document.getElementById('quizBox');
const html_question = document.getElementById('question');
const html_reponses = document.getElementById('reponses');
const html_questionNumber = document.getElementById('questionNumber');
const html_finBox = document.getElementById('finBox');


// Code
window.onload = function () {
    html_quizBox.style = "opacity: 1; transition: 0.3s ease-in-out;";
    html_finBox.style.opacity = 1;
    html_finBox.style.transform = 'scale(100%)';
}

function delay (URL) {
    setTimeout( function() { window.location = URL }, 550 );
}

function clickedSelf (item) {
    console.log(item);
    item.style = "transform: scale(10%); color: white;";
    html_quizBox.style = "opacity: 0; transition: 0.5s ease-in-out;";
}


if (question_number != -1) {
    html_questionNumber.innerText = "Question " + parseInt(question_number+1) + "/" + parseInt(nombre_questions+1);
    html_question.innerText = questions[question_number].question;
    reponses = "";
    next_reponses_correctes = reponses_correctes;

    for (i in questions[question_number].reponses) {
        if (nombre_questions <= question_number) {
            next_question_number = -1;
        }
        else {
            next_question_number = question_number + 1;
        }

        if (i == questions[question_number].correct) {
            next_reponses_correctes ++;
        }else{
            next_reponses_correctes = reponses_correctes;
        }
        reponse_prec[question_number] = i;

        reponse_href = "?qn=" + next_question_number + "&rp=[" + reponse_prec + "," + i + "]&rc=" + next_reponses_correctes;
        reponses = reponses + "<a onclick='clickedSelf(this)' href='javascript:delay(\"" + reponse_href + "\")'>" + "<li id='reponse" + i +"'>" + questions[question_number].reponses[i] + "</li></a>";
    }

    html_reponses.innerHTML = reponses;
}
else {
    html_fin = `<h1 class='score'> Bravo vous avez ` + reponses_correctes + "/" + parseInt(nombre_questions+1) + ` (` + Math.round(parseFloat((reponses_correctes/(nombre_questions+1))*100)) + ` %) !</h1>`;
    for (i in questions) {
        html_fin += `<h1 class='question_fin'> Question ` + parseInt(parseInt(i)+1) + ": " + questions[i].question + `</h1>`;
        for (k in questions[i].reponses) {
            if (k == questions[i].correct) {
                if (questions[i].correct == reponse_prec[parseInt(i)]) {
                    class_color = "green"
                }else {
                    class_color = "red"
                }
                html_fin += `<p class='reponse_fin ` + class_color + `'>` + questions[i].reponses[k] + `</p>`;
            }
        }
        html_fin += `<p class='reponse_fin'>Votre réponse : ` + questions[i].reponses[parseInt(reponse_prec[parseInt(i)])] + `</p>`;
    }
    html_fin += `<a href="?qn=0&rp=[-1]&rc=0"><button>Recommencer</button></a>`;
    html_quizBox.innerHTML = "";
    html_finBox.innerHTML = html_fin;
}