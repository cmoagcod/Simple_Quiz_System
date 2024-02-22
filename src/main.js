// JS Main File

// A compléter
var questions = [
    {
        "question" : "Qui a mangé le chat ?",
        "type" : 0,
        "reponses" : ["moi","lui","eux","la réponse 4"],
        "correct" : 0
    },
    {
        "question" : "Question Test 2 ?",
        "type" : 1,
        "reponses" : ["a10","a20","a30"],
        "correct" : 2
    },
    {
        "question" : "Question Test 3 ?",
        "type" : 1,
        "reponses" : ["oui","non","Lorem ipsum indolor sit amet"],
        "correct" : 2
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


// Code
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

        reponse_href = "?qn=" + next_question_number + "&rp=[" + reponse_prec + "," + i + "]&rc=" + next_reponses_correctes;
        reponses = reponses + "<li id='reponse" + i +"'>" + "<a href='" + reponse_href + "'>" + questions[question_number].reponses[i] + "</a></li>";
    }

    html_reponses.innerHTML = reponses;
}
else {
    html_quizBox.innerHTML = "FIN";
}