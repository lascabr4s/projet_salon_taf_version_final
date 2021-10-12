q1 = document.querySelector("#q1");
q2 = document.querySelector("#q2");
q3 = document.querySelector("#q3");
q4 = document.querySelector("#q4");

let valider_question = document.querySelector(".valider_question");

let q = 1;
let reponse;

const result = {};
result.q1 = "r2";
result.q2 = "r1";
result.q3 = "r1";
result.q4 = "r3";
let nbPoints = 0;
console.log(result);

valider_question.addEventListener("click", function() {
    q++;
    if (q <= 4) {
        if (q == 4) {
            valider_question.textContent = "VALIDER";
        }
        resetQuestionnaire();
    } else {

    }
});


resetQuestionnaire();

function resetQuestionnaire() {
    q1.style.display = "none";
    q2.style.display = "none";
    q3.style.display = "none";
    q4.style.display = "none";
    affquestionnaire();
}

function affquestionnaire() {
    switch (q) {
        case 1:
            q1.style.display = "block";
            reponse = document.querySelectorAll("#q1 .reponses");
            // le FOR OF permet de circuler dans un tableau !!!!
            for (elt of reponse) {
                elt.addEventListener("click", check);
            }
            // UNE 2EME FACON DE FAIRE LE for of, plus longue !!!!
            // let lg = reponse.length;
            // for (let i = 0; i < lg; i++){
            //     reponse[i].addEventListener("click", check);
            // }
            console.log(reponse);
            break;
        case 2:
            q2.style.display = "block";
            reponse = document.querySelectorAll("#q2 .reponses");
            for (elt of reponse) {
                elt.addEventListener("click", check);
            }
            break;
        case 3:
            q3.style.display = "block";
            reponse = document.querySelectorAll("#q3 .reponses");
            for (elt of reponse) {
                elt.addEventListener("click", check);
            }
            break;
        case 4:
            q4.style.display = "block";
            reponse = document.querySelectorAll("#q4 .reponses");
            for (elt of reponse) {
                elt.addEventListener("click", check);
            }
            break;
        default:
            q1.style.display = "block";
    }
}


// la function "check" s'active quand l'utilisateur clique sur une reponse
function check(event) {

    // on enleve les ecouteurs pour eviter de marquer encore des points
    for (elt of reponse) {
        elt.removeEventListener("click", check);
        elt.style.cursor = "default";
        if (elt.id != event.target.id) {
            elt.style.opacity = 0.1;
        }
    }

    document.querySelector("#" + event.target.id).style.backgroundColor = "#C90205";
    let question = event.target.id.slice(0, 2);
    let rep = event.target.id.slice(2, 4);
    console.log(result[question]);

    if (result[question] == rep) {
        switch (question) {
            case "q1":
                nbPoints = nbPoints + 10;
                break;
            case "q2":
                nbPoints = nbPoints + 20;
                break;
            case "q3":
                nbPoints = nbPoints + 30;
                break;
            case "q4":
                nbPoints = nbPoints + 40;
                break;
            default:
                nbPoints = nbPoints;
                break;
        }
    }
    console.log(nbPoints);
}