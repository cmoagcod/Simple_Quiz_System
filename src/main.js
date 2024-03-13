// JS Main File

// A compléter
var questions = [
    {
        "question" : "QUEL EST LE TITRE EXACT DE CETTE MUSIQUE EXTRAITE DE LA SAGA STAR WARS ?",
        "reponses" : ["La Marche Impériale","Le thème de Star Wars","Le thème de Yoda"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo est issue cette musique modifiée ?",
        "reponses" : ["Tetris","Minecraft","Candy Crush"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo est issu ce bruitage ?",
        "reponses" : ["Zelda","Luigi","Mario"],
        "correct" : 2
    },
    {
        "question" : "A quel jeu vidéo correspond cette image furtive ?",
        "reponses" : ["Mario","Half-Life","Portal"],
        "correct" : 2
    },
    {
        "question" : "Quel est cet instrument ?",
        "reponses" : ["Guitare","Banjo","Mandoline"],
        "correct" : 1
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Elden Ring","Zelda","Outer Wilds"],
        "correct" : 2
    },
    {
        "question" : "De quel jeu vidéo est issue cette musique modifiée ?",
        "reponses" : ["Celeste","Minecraft","Tetris"],
        "correct" : 1
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Pong","Donkey Kong","Pac-Man"],
        "correct" : 2
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Zelda","Kirby","Zelda"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Mortal Kombat","King of Fighters","Street Fighter"],
        "correct" : 2
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Mario","Kirby","Sonic"],
        "correct" : 1
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Undertale","Deltarune","Cuphead"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Super Smash Bros Brawl","Super Smash Bros Melee","Super Smash Bros Ultimate"],
        "correct" : 2
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Banjo-Kazooie","Doom","Yoshi"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Elder Scrolls","Final Fantasy","GTA"],
        "correct" : 0
    },
    {
        "question" : "De quel jeu vidéo vient cette musique ?",
        "reponses" : ["Candy Crush","Fruit Ninja","Salade de Fruits"],
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