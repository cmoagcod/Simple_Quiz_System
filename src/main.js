// JS Main File

// A compléter
var questions = [
    {
        "question" : "Dorian est ",
        "reponses" : ["Beau","Très Beau","Célèbre"],
        "correct" : 2
    },
    {
        "question" : "Dorian aime ",
        "reponses" : ["La vie","Le monde","Dorian"],
        "correct" : 2
    },
    {
        "question" : "Dorian est ",
        "reponses" : ["Communiste","Riche","Bizarre et Communiste"],
        "correct" : 0
    },
    {
        "question" : "Dorian a ",
        "reponses" : ["Un PC","Un grille-pain qui fait office de PC","Un PC qui fait office de grille-pain"],
        "correct" : 2
    },
    {
        "question" : "Dorian drift",
        "reponses" : ["Mal","Bien","oui."],
        "correct" : 2
    },
    {
        "question" : "Dorian est ",
        "reponses" : ["Grand","Très Grand","Très Gros"],
        "correct" : 1
    },
    {
        "question" : "Dorian dirige ",
        "reponses" : ["Dorian","La Russie","Le Monde","Une 207"],
        "correct" : 3
    },
    {
        "question" : "Dorian a le permis car ",
        "reponses" : ["Il l'a payé ?","Il l'a payé !","Il l'a mordu ?!"],
        "correct" : 2
    },
    {
        "question" : "Champé",
        "reponses" : ["mon","mont","moune"],
        "correct" : 1
    },
    {
        "question" : "Le communisme c'est ",
        "reponses" : ["Bien","Dodo le dino","Dino le Dodo","Communiste"],
        "correct" : 3
    },
    {
        "question" : "Dorian mute ",
        "reponses" : ["Seb","Pas Seb","Tout le monde","Lui-même"],
        "correct" : 3
    },
    {
        "question" : "Dorian grandit ",
        "reponses" : ["Vite","Lentement","Pas"],
        "correct" : 2
    },
    {
        "question" : "Sa daronne ",
        "reponses" : ["La gestapo","Le Blitzkrieg","vit."],
        "correct" : 0
    },
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