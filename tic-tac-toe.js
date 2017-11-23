//aquest codi l'he fet tenint en compte els continguts de la UD2
//amb els de la UD3 ho faria diferent
//també aquesta versió fa només el que demana l'enunciat
//que el jugador no pugui guanyar a la màquina (i això és tapar quan vegis 2 seguides)
const NCASELLES = 3;
var taulell = [ [], [], [] ];
var missatge = {};

window.onload = init;

//funció que inicialitza les variables, s'executa quan la pàgina és carregada
function init() {
    //inicialitz la matriu que demana l'anunciat
    //mantenir una estructura de dades així pareix lògic en un joc d'aquestes característiques
    taulell = [
        [document.getElementById("cell00"),
            document.getElementById("cell01"),
            document.getElementById("cell02")],
        [document.getElementById("cell10"),
            document.getElementById("cell11"),
            document.getElementById("cell12")],
        [document.getElementById("cell20"),
            document.getElementById("cell21"),
            document.getElementById("cell22")]
    ];
    buidaTaulell(taulell, "_");
    eventHandlersTaulell(taulell, onClickCell);
    document.getElementById("btn").onclick = btnOnClick;
    missatge = document.getElementById("missatge");
}
function setColor(myArray, myColor) {
    for (var i=0; i< NCASELLES; i++) {
        for (var j=0; j < NCASELLES; j++)
            myArray[i][j].style.backgroundColor = myColor;
    }
}
function btnOnClick() {
    buidaTaulell(taulell, "_");
    missatge.innerHTML ="";
    setColor(taulell, "white");
}
//fic la funció que s'executarà quan es cliquin les cel·les de la taula
//això es podria haver fer a pinyó en el HTML
function eventHandlersTaulell(myArray, myFunction) {
    for (var i=0; i< NCASELLES; i++) {
        for (var j=0; j < NCASELLES; j++)
            myArray[i][j].onclick = myFunction;
    }
}
//funció que ompl la taula amb l'string que li diguis
function buidaTaulell(myArray, myChar) {
    for (var i=0; i< NCASELLES; i++) {
        for (var j=0; j < NCASELLES; j++)
            myArray[i][j].innerHTML = myChar;
    }
}
//quan cliques una cel·la es posa una X si es buida, després la màquina juga i es mira si s'ha guanyat
function onClickCell() {
    if (this.innerHTML == "_") {
        this.innerHTML = "x"
        jugarComputadora();
        comprovarVictories();
    }
}
//la màquina agafa la casella central, si no l'ha agafada l'usuari,  perquè et dóna una posició estratègica
function colocarAlCentre() {
    if (taulell[1][1].innerHTML == "_") {
        taulell[1][1].innerHTML = "o";
        return true;
    } else {
        return false;
    }
}
//funció que mira si l'usari té en alguna de les files xx_, x_x o _xx i per tant se li ha de tapar el "_" per a què no guanyi
function comprovarFiles() {
    for(var i=0; i<NCASELLES; i++) {
        if (taulell[i][0].innerHTML == taulell[i][1].innerHTML && taulell[i][2].innerHTML == "_" && taulell[i][0].innerHTML == "x") {
            taulell[i][2].innerHTML = "o";
            return true;
        } else if (taulell[i][0].innerHTML == taulell[i][2].innerHTML && taulell[i][1].innerHTML == "_" && taulell[i][0].innerHTML == "x") {
            taulell[i][1].innerHTML = "o";
            return true;
        } else if (taulell[i][1].innerHTML == taulell[i][2].innerHTML && taulell[i][0].innerHTML == "_" && taulell[i][1].innerHTML == "x") {
            taulell[i][0].innerHTML = "o";
            return true;
        }
    }
    return false;
}
/*funció que mira si l'usari té en alguna de les columnes:
x
x
_
o
x
_
x
o
_
x
x
i per tant se li ha de tapar el "_" per a què no guanyi
 */
function comprovarColumnes() {
    for(var j=0; j<NCASELLES; j++) {
        if (taulell[0][j].innerHTML == taulell[1][j].innerHTML && taulell[2][j].innerHTML == "_" && taulell[0][j].innerHTML == "x") {
            taulell[2][j].innerHTML = "o";
            return true;
        } else if (taulell[0][j].innerHTML == taulell[2][j].innerHTML && taulell[1][j].innerHTML == "_" && taulell[0][j].innerHTML == "x") {
            taulell[1][j].innerHTML = "o";
            return true;
        } else if (taulell[1][j].innerHTML == taulell[2][j].innerHTML && taulell[0][j].innerHTML == "_" && taulell[1][j].innerHTML == "x") {
            taulell[0][j].innerHTML = "o";
            return true;
        }
    }
    return false;
}
/*funció que mira si l'usari té:
x
 x
  _
o
_
 x
  x
o
x
 _
  x
o
  _
 x
x
o
  x
 x
_
o
  x
 _
x
i per tant se li ha de tapar el "_" per a què no guanyi
 */
function comprovarDiagonal() {
    //comprovar primera diagonal (0,0), (1,1) i (2,2)
    if ((taulell[0][0].innerHTML == taulell[1][1].innerHTML && taulell[2][2].innerHTML == "_" ||
            taulell[1][1].innerHTML == taulell[2][2].innerHTML && taulell[0][0].innerHTML == "_" ||
            taulell[0][0].innerHTML == taulell[2][2].innerHTML && taulell[1][1].innerHTML == "_")
        &&
        (taulell[0][0].innerHTML == "x" || taulell[1][1].innerHTML == "x" || taulell[2][2].innerHTML == "x")
    ) {
        if (taulell[0][0].innerHTML == "_") {
            taulell[0][0].innerHTML = "o";
            return true;
        } else if (taulell[1][1].innerHTML == "_") {
            taulell[1][1].innerHTML = "o";
            return true;
        } else if (taulell[2][2].innerHTML == "_") {
            taulell[2][2].innerHTML = "o";
            return true;
        }
    }
    //comprovar segona diagonal (2,0), (1,1) i (0,2)
    if ((taulell[2][0].innerHTML == taulell[1][1].innerHTML && taulell[0][2].innerHTML == "_" ||
            taulell[1][1].innerHTML == taulell[0][2].innerHTML && taulell[2][0].innerHTML == "_" ||
            taulell[0][2].innerHTML == taulell[2][0].innerHTML && taulell[1][1].innerHTML == "_")
        &&
        (taulell[2][0].innerHTML == "x" || taulell[1][1].innerHTML == "x" || taulell[0][2].innerHTML == "x")
    ) {
        if (taulell[2][0].innerHTML == "_") {;
            taulell[2][0].innerHTML = "o";
            return true;
        } else if (taulell[1][1].innerHTML == "_") {
            taulell[1][1].innerHTML = "o";
            return true;
        } else {
            if (taulell[0][2].innerHTML == "_") {
                taulell[0][2].innerHTML = "o";
                return true;
            }
        }
    }
    return false;
}
//Mira en totes les files si hi ha xxx o ooo
function comprovarVictoriaFiles() {
    for(var i=0; i<NCASELLES; i++) {
        if (taulell[i][0].innerHTML == taulell[i][1].innerHTML && taulell[i][1].innerHTML ==  taulell[i][2].innerHTML && taulell[i][0].innerHTML != "_") {
            taulell[i][0].style.backgroundColor = "red";
            taulell[i][1].style.backgroundColor = "red";
            taulell[i][2].style.backgroundColor = "red";
            return taulell[i][2].innerHTML;
        }
    }
    return "";
}
/*Mira en totes les files si hi ha
x  o  o
x     o
x     o
*/
function comprovarVictoriaColumnes() {
    for(var j=0; j<NCASELLES; j++) {
        if (taulell[0][j].innerHTML == taulell[1][j].innerHTML && taulell[1][j].innerHTML ==  taulell[2][j].innerHTML && taulell[0][j].innerHTML != "_") {
            taulell[0][j].style.backgroundColor = "red";
            taulell[1][j].style.backgroundColor = "red";
            taulell[2][j].style.backgroundColor = "red";
            return taulell[2][j].innerHTML;
        }
    }
    return "";
}
function comprovarVictoriaDiagonal() {
    //comprovar primera diagonal (0,0), (1,1) i (2,2)
    if (taulell[0][0].innerHTML == taulell[1][1].innerHTML && taulell[2][2].innerHTML == taulell[1][1].innerHTML  && taulell[0][0].innerHTML != "_") {
        taulell[0][0].style.backgroundColor = "red";
        taulell[1][1].style.backgroundColor = "red";
        taulell[2][2].style.backgroundColor = "red";
        return taulell[2][2].innerHTML;
    }
    //comprovar segona diagonal (2,0), (1,1) i (0,2)
    if (taulell[2][0].innerHTML == taulell[1][1].innerHTML && taulell[0][2].innerHTML == taulell[1][1].innerHTML && taulell[0][0].innerHTML != "_") {
        taulell[2][0].style.backgroundColor = "red";
        taulell[1][1].style.backgroundColor = "red";
        taulell[0][2].style.backgroundColor = "red";
        return taulell[1][1].innerHTML;
    }
    return "";
}

function comprovarVictories() {
    var vicFiles = "";
    var vicColumnes = "";
    var vicDiagonal = "";

    vicFiles = comprovarVictoriaFiles();
    if (vicFiles == "") {
        vicColumnes = comprovarVictoriaColumnes();
        if (vicColumnes == "") {
            vicDiagonal = comprovarVictoriaDiagonal();
        }
    }

    if (vicFiles != "" || vicColumnes != "" || vicDiagonal != "") {
        missatge.innerHTML ="GAME OVER: Player " + vicFiles + vicColumnes + vicDiagonal + " wins!";
        //no fa falta canviar l'event handrler ja que es fa per codi
        //eventHandlersTaulell(taulell, null);
    }

}
//la màquina mira si pot guanyar fent tres en retxa en una fila
//aquesta funció s'hauria d'unar amb comprovarFiles ja que no canvia gaire
function guanyarFiles() {
    for(var i=0; i<NCASELLES; i++) {
        if (taulell[i][0].innerHTML == taulell[i][1].innerHTML && taulell[i][2].innerHTML == "_" && taulell[i][0].innerHTML == "o") {
            taulell[i][2].innerHTML = "o";
            return true;
        } else if (taulell[i][0].innerHTML == taulell[i][2].innerHTML && taulell[i][1].innerHTML == "_" && taulell[i][0].innerHTML == "o") {
            taulell[i][1].innerHTML = "o";
            return true;
        } else if (taulell[i][1].innerHTML == taulell[i][2].innerHTML && taulell[i][0].innerHTML == "_" && taulell[i][1].innerHTML == "o") {
            taulell[i][0].innerHTML = "o";
            return true;
        }
    }
    return false;
}
//la màquina mira si pot guanyar fent tres en retxa en una fila
//aquesta funció s'hauria d'unar amb comprovarColumnes ja que no canvia gaire
function guanyarColumnes() {
    for(var j=0; j<NCASELLES; j++) {
        if (taulell[0][j].innerHTML == taulell[1][j].innerHTML && taulell[2][j].innerHTML == "_" && taulell[0][j].innerHTML == "o") {
            taulell[2][j].innerHTML = "o";
            return true;
        } else if (taulell[0][j].innerHTML == taulell[2][j].innerHTML && taulell[1][j].innerHTML == "_" && taulell[0][j].innerHTML == "o") {
            taulell[1][j].innerHTML = "o";
            return true;
        } else if (taulell[1][j].innerHTML == taulell[2][j].innerHTML && taulell[0][j].innerHTML == "_" && taulell[1][j].innerHTML == "o") {
            taulell[0][j].innerHTML = "o";
            return true;
        }
    }
    return false;
}
//la màquina mira si pot guanyar fent tres en retxa en una fila
//aquesta funció s'hauria d'unar amb comprovarDiagonal ja que no canvia gaire
function guanyarDiagonal() {
    //comprovar primera diagonal (0,0), (1,1) i (2,2)
    if ((taulell[0][0].innerHTML == taulell[1][1].innerHTML && taulell[2][2].innerHTML == "_" ||
            taulell[1][1].innerHTML == taulell[2][2].innerHTML && taulell[0][0].innerHTML == "_" ||
            taulell[0][0].innerHTML == taulell[2][2].innerHTML && taulell[1][1].innerHTML == "_")
        &&
        (taulell[0][0].innerHTML == "o" || taulell[1][1].innerHTML == "o" || taulell[2][2].innerHTML == "o")
    ) {
        if (taulell[0][0].innerHTML == "_") {
            taulell[0][0].innerHTML = "o";
            return true;
        } else if (taulell[1][1].innerHTML == "_") {
            taulell[1][1].innerHTML = "o";
            return true;
        } else if (taulell[2][2].innerHTML == "_") {
            taulell[2][2].innerHTML = "o";
            return true;
        }
    }
    //comprovar segona diagonal (2,0), (1,1) i (0,2)
    if ((taulell[2][0].innerHTML == taulell[1][1].innerHTML && taulell[0][2].innerHTML == "_" ||
            taulell[1][1].innerHTML == taulell[0][2].innerHTML && taulell[2][0].innerHTML == "_" ||
            taulell[0][2].innerHTML == taulell[2][0].innerHTML && taulell[1][1].innerHTML == "_")
        &&
        (taulell[2][0].innerHTML == "o" || taulell[1][1].innerHTML == "o" || taulell[0][2].innerHTML == "o")
    ) {
        if (taulell[2][0].innerHTML == "_") {;
            taulell[2][0].innerHTML = "o";
            return true;
        } else if (taulell[1][1].innerHTML == "_") {
            taulell[1][1].innerHTML = "o";
            return true;
        } else {
            if (taulell[0][2].innerHTML == "_") {
                taulell[0][2].innerHTML = "o";
                return true;
            }
        }
    }
    return false;
}
function jugarComputadora() {
    var x = 0;
    var y = 0;
    var sum = 0;

    //el primer que s'ha de mirar és a veure si puc guanyar
    //les funcions són una còpia a mirar si hi has de tapar (que vaig implementar primer)
    //estaria millor "compactar" les funcions amb codi similar
    //ho he posat així per a què sigui fàcil d'entendre, però s'haurien de fer les 6 funcions en 3 (o 1)
    if (!guanyarFiles()) {
        if (!guanyarColumnes()) {
            if (!guanyarDiagonal()) {
                //me pareix que agafar la del centre et dona avantatge
                //per això l'agaf sa primera
                if (!colocarAlCentre()) {
                    //tècnica: comprovar si el jugador té dues seguides per tapar-li
                    if (!comprovarFiles()) {
                        if (!comprovarColumnes()) {
                            if (!comprovarDiagonal()) {
                                //quan entra aquí no ha hagut ni de tapar 2 del jugador per files, columnes o diagonal
                                //aquí ja la partida és empat omplir la primera a l'atzar o treu un missatge de game over
                                //també entra quan el jugador ha clicat el centre, aquí col·locar a l'atzar
                                for (var i=0; i< NCASELLES; i++) {
                                    for (var j=0; j < NCASELLES; j++) {
                                        if (taulell[i][j].innerHTML == "_") {
                                            sum += 1;
                                        }
                                    }
                                }
                                if (sum == NCASELLES*NCASELLES - 1) {
                                    //només hi ha una col·locada alcentre
                                    //poso a l'atzar però en un dels cantons
                                    //si no poses als cantons guanyes segur
                                    //amb aquest codi dones opció a guanyar a l'usuari
                                    //podria ser una opció per nivell de digicultat mitjà i després col·locar a l'atzar
                                    //per fàcil
                                    /*
                                    do {
                                            x = Math.floor(Math.random() * NCASELLES);
                                            y = Math.floor(Math.random() * NCASELLES);
                                        } while (taulell[x][y].innerHTML != "_");
                                    */
                                    alert("antes");
                                    do {
                                        x = Math.floor(Math.random() * NCASELLES);
                                        y = Math.floor(Math.random() * NCASELLES);
                                    } while (!((x == 0 && y == 0) || (x == 0 && y == 2) || (x == 2 && y == 0) || (x == 0 && y == 2))  || taulell[x][y].innerHTML != "_");
                                    taulell[x][y].innerHTML = "o";
                                }
                                else {
                                    if (sum == 0) { //només queden dos per col·locar i ja és draw, es podria fer <= 2
                                        missatge.innerHTML ="GAME OVER: Draw game!";
                                        setColor(taulell, "blue");
                                        //llevar que quan cliquin la taula faci alguna cosa
                                        //no fa falta canviar l'event handrler ja que es fa per codi
                                        //eventHandlersTaulell(taulell, null);
                                    } else {
                                        //ni he guanyat ni col·locat, posar a l'atzar
                                        //seria millor posar on hi hagi posibilitat de victòria
                                        //és una possibilitat de millora
                                        do {
                                            x = Math.floor(Math.random() * NCASELLES);
                                            y = Math.floor(Math.random() * NCASELLES);
                                        } while (!((x == 0 && y == 0) || (x == 0 && y == 2) || (x == 2 && y == 0) || (x == 0 && y == 2)) || taulell[x][y].innerHTML != "_");
                                        taulell[x][y].innerHTML = "o";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}