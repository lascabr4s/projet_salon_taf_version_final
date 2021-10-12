(function() {

    // SELECTION DES 4 QUESTIONS POSEES
    let q1 = document.querySelector('#q1');
    let q2 = document.querySelector('#q2');
    let q3 = document.querySelector('#q3');
    let q4 = document.querySelector('#q4');

    // SELECTION DES BOUTONS DE POUR LUI POSER UN ECOUTEUR
    let valider_question = document.querySelector('.valider_question');
    let logo = document.querySelector('.topbar-logo');
    let mon_Niveau = document.querySelector("#bt_monniveau");
    let bt_jeux = document.querySelector("#bt_jeux");

    let decouvre = document.querySelectorAll(".les_jeux .decouvre");
    let app = document.querySelectorAll(".les_jeux .app");
    let code = document.querySelectorAll(".les_jeux .code");

    // VARIABLES QUI PERMETTENT DE CONNAITRE QUELLES QUESTION ET SI ON A FINI
    let q = 1;

    let reponse;
    // CONSTRUCTION D'UN OBJET LITTERAL (NOTATION JSON) QUI PERMET DE CONNAITRE
    // LES BONNES REPONSES
    const result = {}; // on créer un objet littéral
    result.q1 = 'r2';
    result.q2 = 'r1';
    result.q3 = 'r3';
    result.q4 = 'r3';

    // VARIABLE QUI PERMET DE CALCULER LE nb DE POINTS OBTENUS
    let nbPoints = 0;

    // POSE D'ECOUTEURS SUR LE LOGO ET btn "MON NIVEAU"
    logo.addEventListener('click', from_header);
    mon_Niveau.addEventListener("click", from_header);
    bt_jeux.addEventListener("click", all_games);

    // REMISE A ZERO DES STYLES DES REPONSES EN CLIQUANT SUR LE LOGO
    function from_header() {
        q = 0;
        nbPoints = 0;
        reponse = document.querySelectorAll('.reponses');
        for (elt of reponse) {
            elt.removeAttribute('style');
        }
        valider();
    }

    valider_question.addEventListener('click', valider);

    function valider() {
        q++;
        if (q <= 4) {
            if (q == 4) {
                valider_question.textContent = 'VALIDER';
            }
            resetQestionnaire();
        } else {
            myLevel(); // les 4 questions ont été répondues!
        }
    }

    // 1ERE FONCTION APPELEE, PERMET D'AFFICHER UN SEUL BLOC DIV HTML DES QUESTIONS
    // ET MET LES AUTRES BLOCS EN DISPLAY 'NONE'
    resetQestionnaire();

    function resetQestionnaire() {
        q1.style.display = 'none';
        q2.style.display = 'none';
        q3.style.display = 'none';
        q4.style.display = 'none';
        document.querySelector(".les_niveaux").style.display = "none";
        document.querySelector(".main-carousel").style.display = "flex";
        document.querySelector(".niveau").style.display = "flex";
        document.querySelector("#titre").textContent = "Connaitre mon niveau";
        document.querySelector("#icon_jeux").textContent = "leaderboard";
        document.querySelector(".les_jeux").style.display = "none";
        if (document.querySelector("iframe") != null) {
            document.querySelector("main").removeChild(document.querySelector("iframe"));
        }


        // FONCTION QUI AFFICHE CHACUNES DES QUESTIONS
        affquestionnaire();
    }

    function affquestionnaire() { //gestion du questionnaire a afficher
        switch (q) {
            case 1:
                // q1.style.display = 'block'; //affiche le bloc
                // reponse = document.querySelectorAll('#q1 .reponses'); //selection de toutes les reponses

                // for (elt of reponse) {
                //     // ECOUTEUR POSES SUR CHACUNES DES REPONSES DE LA LISTE
                //     // ET APPEL DE LA FONCTION "check" qui dit quelle reponses a été choisie
                //     elt.addEventListener('click', check);
                // }

                // // OU ON PEUT FAIRE COMME CI DESSOUS
                // // let lg = reponse.length;
                // // for (let i = 0; i < lg; i++) {
                // //     reponse[i].addEventListener('click', check);
                // // }
                pose_ecouteurs(q1);
                break;

            case 2:
                // q2.style.display = 'block';
                // reponse = document.querySelectorAll('#q2 .reponses');

                // for (elt of reponse) {
                //     elt.addEventListener('click', check);
                // }
                pose_ecouteurs(q2);
                break;

            case 3:
                // q3.style.display = 'block';
                // reponse = document.querySelectorAll('#q3 .reponses');

                // for (elt of reponse) {
                //     elt.addEventListener('click', check);
                // }
                pose_ecouteurs(q3);
                break;

            case 4:
                // q4.style.display = 'block';
                // reponse = document.querySelectorAll('#q4 .reponses');
                // console.log(reponse);

                // for (elt of reponse) {
                //     elt.addEventListener('click', check);
                // }
                pose_ecouteurs(q4);
                break;

            default:
                q1.style.display = 'block';
        }
    }

    function pose_ecouteurs(elt) {
        elt.style.display = "block";
        let id = elt.getAttribute("id");
        reponse = document.querySelectorAll("#" + id + " .reponses");
        for (elt of reponse) {
            elt.addEventListener("click", check);
        }
    }


    // 2 function en 1 : une pour le rendu graphique 
    // et l'autre pour calcul des points
    function check(event) {

        // rendu graphique : clique qu'une seule fois --> on retire les ecouteurs
        // sur toutes les réponses, et change l'apparence pour indiquer
        // à l'utilisateur qu'il n'y a plus que le bouton 'SUITE'(aspect souris)
        for (elt of reponse) {
            elt.removeEventListener('click', check);
            elt.style.cursor = 'default';
            if (elt.id != event.target.id) {
                elt.style.opacity = 0.5;
                elt.style.backgroundColor = 'rgb(211, 211, 211)';
            }
            elt.style.color = '#000';
        }



        document.querySelector('#' + event.target.id).style.backgroundColor = '#C90205';
        let question = event.target.id.slice(0, 2); // 'slice' permet de recuperer une partie de l'id
        let rep = event.target.id.slice(2);

        // Pour déterminer les differentes façon de faire
        // console.log(result)
        // console.log(result['q1']);
        // console.log(result.q1);
        // console.log(result.question);
        // console.log(result[question]);

        if (result[question] == rep) {
            switch (question) {
                case 'q1':
                    nbPoints = nbPoints + 10;
                    break;
                case 'q2':
                    nbPoints = nbPoints + 20;
                    break;
                case 'q3':
                    nbPoints = nbPoints + 30;
                    break;
                case 'q4':
                    nbPoints = nbPoints + 40;
                    break;
                default:
                    nbPoints = nbPoints;
                    break;
            }

        }
        // valider();

    }

    // on passe en affichage HTML --->  section "jeux"
    function myLevel() {
        document.querySelector(".main-carousel").style.display = "none"; // on fait disparaitre tout le bloc questionnaire
        document.querySelector(".les_niveaux").style.display = "flex";
        document.querySelector(".les_niveaux").style.flexDirection = "column";
        document.querySelector("#icon_jeux").textContent = "circle"; // on change le style du titre et le texte
        document.querySelector("#icon_jeux").style.fontSize = "20px"; //
        document.querySelector("#titre").textContent = "Mon niveau"; //
        document.querySelector("#voirjeux").style.display = "flex";

        let voirjeux = document.querySelector("#voirjeux");
        voirjeux.addEventListener("click", seljeux); // ECOUTEUR POUR AFFICHER LES JEUX 

        resetResult();

        if (nbPoints <= 40) {
            document.querySelector(".les_niveaux .decouverte").style.display = "flex";
        }
        if (nbPoints >= 50 && nbPoints <= 70) {
            document.querySelector(".les_niveaux .approfondir").style.display = "flex";
        }
        if (nbPoints >= 80) {
            document.querySelector(".les_niveaux .niv-code").style.display = "flex";
        }
    }

    function resetResult() {
        let les_niveaux = document.querySelectorAll(".les_niveaux .niv");
        for (elt of les_niveaux) {
            elt.style.display = "none";
        }
    }

    function all_games() {
        resetjeu();
        resetnav();
        document.querySelector(".les_niveaux").style.display = "flex";
        document.querySelector(".les_niveaux").style.flexDirection = "row";

        let allgames = document.querySelectorAll(".les_niveaux .niv");
        // console.log(allgames);
        for (elt of allgames) {
            elt.style.display = "flex";
        }

        document.querySelector("#voirjeux").style.display = "none";
        document.querySelector(".niveau").style.display = "flex";
        document.querySelector(".les_jeux").style.display = "flex";
        document.querySelector(".main-carousel").style.display = "none";
        if (document.querySelector("iframe") != null) {
            document.querySelector("main").removeChild(document.querySelector("iframe"));
        }
        // let jeux = document.querySelectorAll(".jeux_content");
        // affjeux(jeux);
        document.querySelector(".les_niveaux .decouverte").classList.add("niv_hover");
        document.querySelector(".les_niveaux .decouverte .text").style.color = "white";
        // affichage par defaut : niveau je decouvre
        let decouvre = document.querySelectorAll(".les_jeux .decouvre");
        affjeux(decouvre);

        let filtre = document.querySelectorAll(".les_niveaux .niv");
        for (elt of filtre) {
            elt.addEventListener("click", sel_filtre);
        }
    }

    function sel_filtre(event) {
        let cible;
        if (event.target.id != "") {
            cible = event.target.id;
        } else {
            cible = event.target.offsetParent.getAttribute("id");
        }

        resetfiltre(cible);

        switch (cible) {
            case "approfondir":
                affjeux(app);
                break;
            case "decouverte":
                affjeux(decouvre);
                break;
            case "niv-code":
                affjeux(code);
                break;
            case "sandbox":
                aff_codepen();
                break;
            default:
                break;
        }
    }

    function resetfiltre(cible) {
        resetnav();
        let jeux = document.querySelectorAll(".jeux_content");
        for (elt of jeux) {
            elt.style.display = "none";
        }
        document.querySelector("#" + cible).classList.add("niv_hover");
        document.querySelector("#" + cible + " .text").style.color = "white";
    }

    function resetjeu() {
        document.querySelector(".les_niveaux").style.display = "none";
        document.querySelector("#titre").textContent = "Tous les jeux";
        document.querySelector("#icon_jeux").textContent = "videogame_asset";
        document.querySelector("#icon_jeux").style.fontSize = "50px";
        let jeux = document.querySelectorAll(".jeux_content");
        for (elt of jeux) {
            elt.style.display = "none";
        }
    }

    function resetnav() {
        let niv = document.querySelectorAll(".les_niveaux .niv");
        for (elt of niv) {
            elt.classList.remove("niv_hover");
        }

        let niv_text = document.querySelectorAll(".les_niveaux .niv .text");
        for (elt of niv_text) {
            elt.style.color = "black";
        }
    }

    function affjeux(jeux) {
        for (elt of jeux) {
            elt.style.display = "flex";
        }
        thegame();
    }

    function seljeux() {
        resetjeu();

        document.querySelector(".les_jeux").style.display = "flex";

        if (nbPoints <= 40) {
            // let decouvre = document.querySelectorAll(".les_jeux .decouvre");
            // console.log(decouvre);
            affjeux(decouvre);
        }
        if (nbPoints >= 50 && nbPoints <= 70) {
            // let app = document.querySelectorAll(".les_jeux .app");
            affjeux(app);
        }
        if (nbPoints >= 80) {
            // let code = document.querySelectorAll(".les_jeux .code");
            affjeux(code);
        }
    }

    function thegame() {
        let liens = document.querySelectorAll(".jeux_content a ");
        // console.log(liens);

        for (elt of liens) {
            let target = elt.getAttribute("id");
            let target_obj = document.querySelector("#" + target);
            target_obj.addEventListener("click", function(event) {
                event.preventDefault();
                console.log(event.target.parentElement.href);
                document.querySelector(".les_jeux").style.display = "none";
                document.querySelector(".niveau").style.display = "none";

                if (document.querySelector("iframe") != null) {
                    document.querySelector("main").removeChild(document.querySelector("iframe"));
                }
                let new_iframe = document.createElement("iframe");
                new_iframe.src = event.target.parentElement.href;
                new_iframe.style.height = "100%";
                new_iframe.style.width = "100%";
                document.querySelector("main").appendChild(new_iframe);
            });
        }
    }

    function aff_codepen() {

        document.querySelector(".les_jeux").style.display = "none";
        document.querySelector(".niveau").style.display = "none";
        if (document.querySelector("iframe") != null) {
            document.querySelector("main").removeChild(document.querySelector("iframe"));
        }
        let new_iframe = document.createElement("iframe");
        new_iframe.src = "https://codesandbox.io/s/";
        new_iframe.style.height = "100%";
        new_iframe.style.width = "100%";
        document.querySelector("main").appendChild(new_iframe);

    }

})();