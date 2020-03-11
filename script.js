var juegoActivo = false; 
var jugadorActual = 0;
var tablero = []; 
var colorJugador = []; 
colorJugador[1] = "Rojo"; 
colorJugador[2] = "Azul"; 
var turno = 0;
var contador = 0;

function juegoComienza() {
    if (juegoActivo == true) return false; 
    juegoActivo = true;  
    for (row=0; row<=5; row++) {
        tablero[row] = [];
        for (col=0; col<=6; col++) {
            tablero[row][col] = 0;
        }	
    }		
    
    condicionGanadora();
    circulosTabla(); 				
    jugadorActual = 1; 
    turnoSiguiente();

    

}

function circulosTabla() {
    condicionGanadora();
    for (col = 0; col<=6; col++) {
        for (row=0; row<=5; row++) {
            document.getElementById('square_'+row+'_'+col).innerHTML ="<span class='piece player"+tablero[row][col]+"'></span>";
        }
    }
}

function condicionGanadora() {
//4 IZQUIERDA A DERECHA
    for (i=1; i<=2; i++) {
        for (col = 0; col <=3; col++) {
            for (row = 0; row <=5; row++) {
                if (tablero[row][col] == i) {
                    if ((tablero[row][col+1] == i) && (tablero[row][col+2] == i) && (tablero[row][col+3] == i)) {
                        final(i);
                        return true; 
                    }
                }
            }
        }
    }
    
//ABAJO HACIA ARRIBA
    for (i=1; i<=2; i++) {
        for (col = 0; col <=6; col++) {
            for (row = 0; row <=2; row++) {
                if (tablero[row][col] == i) {
                    if ((tablero[row+1][col] == i) && (tablero[row+2][col] == i) && (tablero[row+3][col] == i)) {
                        final(i); 
                        return true; 
                    }
                }
            }
        }
    }
    
//DIAGONAL ABAJO
    for (i=1; i<=2; i++) {
        for (col = 0; col <=3; col++) {
            for (row = 0; row <=2; row++) {
                if (tablero[row][col] == i) {
                    if ((tablero[row+1][col+1] == i) && (tablero[row+2][col+2] == i) && (tablero[row+3][col+3] == i)) {
                        final(i);
                        return true;
                    }
                }
            }
        }
    }
                    
//DIAGONAL ARRIBA
    for (i=1; i<=2; i++) {
        for (col = 0; col <=3; col++) {
            for (row = 3; row <=5; row++) {
                if (tablero[row][col] == i) {
                    if ((tablero[row-1][col+1] == i) && (tablero[row-2][col+2] == i) && (tablero[row-3][col+3] == i)) {
                        final(i);
                        return true;
                    }
                }
            }
        }
    }
}

function final(ganador) {
    juegoActivo = false; 
   setTimeout(() => {
        alert("Felicidades jugador: " + ganador);
        document.getElementById("game_info").style.visibility = "hidden";
    }, 100);
    setTimeout(() => {
        window.location.reload();
    }, 100);       
}

function empate(){
    console.log(contador);

    if(contador == 42){
        setTimeout(() => {
            alert("Empate");
            document.getElementById("game_info").style.visibility = "hidden";
        }, 100);
        setTimeout(() => {
            window.location.reload();
        }, 100);  
    }
    contador++ ;
}

function turnoSiguiente() {
    empate();
    if (juegoActivo) { 
        document.getElementById('game_info').innerHTML = "Tu turno: Jugador <span>" + colorJugador[jugadorActual] + "</span>";
    }
    
}			

function tirar(col) {
        for (row=5; row>=0; row--) { 
            if (tablero[row][col] == 0) {
                tablero[row][col] = jugadorActual;
                circulosTabla();
                if (jugadorActual == 1) {
                    jugadorActual = 2;
                } else {
                    jugadorActual = 1;
                }         
                turnoSiguiente(); 
                return true;
            }
            turno ++;
        }
        
}