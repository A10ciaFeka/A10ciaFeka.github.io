function numRandom(num){
    return Math.floor(Math.random()*num);
}

const crearTablero = ()=>{
    let tabla = document.createElement('table');
    tabla.style.width = "500px";
    tabla.style.height = "500px";
    tabla.border= "2";
    tabla.style.textAlign = "center";

    tabla.style.borderCollapse = "collapse";
    tabla.style.margin =  "3em auto";

    for(let fila=0; fila<8; fila++){
        let fila = document.createElement('tr');
        for(let columna=0; columna<8; columna++){
            let columna = document.createElement('td');
            columna.style.height = "50px";
            columna.style.width = "50px";
            columna.style.backgroundColor = "gray";
            fila.appendChild(columna);

        }
        tabla.appendChild(fila);
    }

    document.querySelector('.container').insertBefore(tabla,document.querySelector('.examenes'));
}
var protagonista = "O";
var villano = 'X';
var salida = 'S';
var examenes = 'Y';
var obstaculo = '[]';


const posicionarItems = ()=>{
    const fila = document.querySelectorAll('tr');

    for(let filas=0; filas<8; filas++){
        for(let columna=0; columna<8; columna++){
            fila[filas].children[columna].textContent = "·";
        }
    }

    for(let i=0; i<16; i++){
        let ale1 = numRandom(5)+2;
        let ale2 = numRandom(7);

        fila[ale1].children[ale2].textContent = obstaculo;
    }

    fila[0].children[0].textContent = protagonista;
    fila[fila.length-1].children[fila.length-1].textContent = salida;

    let prep = 0;

    while(prep<2){
        let ale1 = numRandom(7);
        let ale2 = numRandom(7);
        
        if(!((ale1==0 && ale2==0)||(ale1==7&&ale2==7))){
            if(prep==0){
                fila[ale1].children[ale2].textContent = villano;
                prep++;
            }else if(prep==1 && fila[ale1].children[ale2].textContent!=villano){
                fila[ale1].children[ale2].textContent = examenes;
                prep++;
            }
            
        }
    }
}

/*
*
*   FUNCIÓN PRIVADA
*
*/
const getPos = (item)=>{
    const fila = document.querySelectorAll('tr');
    
    for(let numFila in fila){
        for(let numColumna in fila[numFila].children   ){
            if(fila[numFila].children[numColumna].textContent == item){
                return new Array(numFila,numColumna);
            }
        }
    }
}
const ventanaEmergente = (perdido=false)=>{
    document.querySelector('.floatingBox').style.display = 'block';
    document.querySelector('.container').style.opacity='0.2';
    if(perdido){
        document.querySelector('.texto').firstChild.textContent = '¡Has perdido!';
    }else{
        document.querySelector('.texto').firstChild.textContent = '¡Has ganado!';
    }
        
    document.querySelector('#closeButton').onclick= (e)=>{
        e.preventDefault();

        document.querySelector('.floatingBox').style.display = 'none';
        document.querySelector('.container').style.opacity='1';
    
        posicionarItems();
        analizarMovimiento();
        document.querySelector('.indicador').style.backgroundColor = "gray";
    };
    
}

const ordenarMapa = (mapa)=>{
    let array = [];
    for (const [key,value] of mapa) {
        array.push(value);
    }
    let menorValor = array.sort()[0];

    for (const [key,value] of mapa) {
        if(value!=menorValor){
            mapa.delete(key);
        }
    }
}

const moverVillanoDerecha = ()=>{
    if(columnaVillano+1<fila.length && fila[filaVillano].children[columnaVillano+1].textContent!=examenes){
        if(fila[filaVillano].children[columnaVillano+1].textContent==protagonista){

            for(let numFila=0; numFila<fila.length; numFila++){
                for(let numColumna=0; numColumna<fila.length; numColumna++){
                    fila[numFila].children[numColumna].style.backgroundColor = "red";
                }
            }
            ventanaEmergente(true);
        }
        fila[filaVillano].children[columnaVillano+1].textContent = villano;
        fila[filaVillano].children[columnaVillano+1].style.backgroundColor = "gray";
        fila[filaVillano].children[columnaVillano+1].onclick = null;
        
        fila[filaVillano].children[columnaVillano].textContent = '·';

    }
}

const moverVillano = ()=>{
    const fila = document.querySelectorAll('tr');

    let filaProta = parseInt(getPos(protagonista)[0]);
    let columnaProta = parseInt(getPos(protagonista)[1]);

    let filaVillano = parseInt(getPos(villano)[0]);
    let columnaVillano = parseInt(getPos(villano)[1]);

    let mapaValores = new Map();

    let arriba = Math.abs(filaProta-(filaVillano-1)) + Math.abs(columnaProta-columnaVillano);
    mapaValores.set("A",arriba);

    let abajo=Math.abs(filaProta-(filaVillano+1)) + Math.abs(columnaProta-columnaVillano);
    mapaValores.set("Ab",abajo);

    let derecha = Math.abs(filaProta-filaVillano) + Math.abs(columnaProta-(columnaVillano+1));
    mapaValores.set("D",derecha);

    let izquierda = Math.abs(filaProta-filaVillano) + Math.abs(columnaProta-(columnaVillano-1));
    mapaValores.set("I",izquierda);

    ordenarMapa(mapaValores);    

    if(mapaValores.get("A")!=undefined){
        //Arriba
        if(filaVillano-1>=0 && fila[filaVillano-1].children[columnaVillano].textContent!=examenes && fila[filaVillano-1].children[columnaVillano].textContent!=obstaculo){
            if(fila[filaVillano-1].children[columnaVillano].textContent==protagonista){

                for(let numFila=0; numFila<fila.length; numFila++){
                    for(let numColumna=0; numColumna<fila.length; numColumna++){
                        fila[numFila].children[numColumna].style.backgroundColor = "red";
                    }
                }
                ventanaEmergente(true);
            }
            fila[filaVillano-1].children[columnaVillano].textContent = villano;
            fila[filaVillano-1].children[columnaVillano].style.backgroundColor = "gray";
            fila[filaVillano-1].children[columnaVillano].onclick = null;
            fila[filaVillano].children[columnaVillano].textContent = '·';

            
        }else if(fila[filaVillano-1].children[columnaVillano].textContent==obstaculo){
            if(derecha<izquierda){
                moverVillanoDerecha();
            }else{
                moverVillanoIzquierda();
            }
        }
        
    }else if(mapaValores.get("Ab")!=undefined){
        //Abajo
        if(filaVillano+1<fila.length && fila[filaVillano+1].children[columnaVillano].textContent!=examenes && fila[filaVillano+1].children[columnaVillano].textContent!=obstaculo){
            if(fila[filaVillano+1].children[columnaVillano].textContent==protagonista){

                for(let numFila=0; numFila<fila.length; numFila++){
                    for(let numColumna=0; numColumna<fila.length; numColumna++){
                        fila[numFila].children[numColumna].style.backgroundColor = "red";
                    }
                }
                ventanaEmergente(true);
            }
            fila[filaVillano+1].children[columnaVillano].textContent = villano;
            fila[filaVillano+1].children[columnaVillano].style.backgroundColor = "gray";
            fila[filaVillano+1].children[columnaVillano].onclick = null;
            
            fila[filaVillano].children[columnaVillano].textContent = '·';

        }else if(fila[filaVillano+1].children[columnaVillano].textContent==obstaculo){
            if(derecha<izquierda){
                moverVillanoDerecha();
            }else{
                moverVillanoIzquierda();
            }
        }

    }else if(mapaValores.get("D")!=undefined){
        //Derecha
        if(columnaVillano+1<fila.length && fila[filaVillano].children[columnaVillano+1].textContent!=examenes && fila[filaVillano].children[columnaVillano+1].textContent!=obstaculo){
            if(fila[filaVillano].children[columnaVillano+1].textContent==protagonista){

                for(let numFila=0; numFila<fila.length; numFila++){
                    for(let numColumna=0; numColumna<fila.length; numColumna++){
                        fila[numFila].children[numColumna].style.backgroundColor = "red";
                    }
                }
                ventanaEmergente(true);
            }
            fila[filaVillano].children[columnaVillano+1].textContent = villano;
            fila[filaVillano].children[columnaVillano+1].style.backgroundColor = "gray";
            fila[filaVillano].children[columnaVillano+1].onclick = null;
            
            fila[filaVillano].children[columnaVillano].textContent = '·';

        }else if(fila[filaVillano].children[columnaVillano+1].textContent==obstaculo){
            if(arriba<abajo){
                moverVillanoArriba();
            }else{
                moverVillanoAbajo();
            }
        }
    }else{
        //Izquierda
        if(columnaVillano-1>=0 && fila[filaVillano].children[columnaVillano-1].textContent!=examenes && fila[filaVillano].children[columnaVillano-1].textContent!=obstaculo){
            if(fila[filaVillano].children[columnaVillano-1].textContent==protagonista){

                for(let numFila=0; numFila<fila.length; numFila++){
                    for(let numColumna=0; numColumna<fila.length; numColumna++){
                        fila[numFila].children[numColumna].style.backgroundColor = "red";
                    }
                }
                ventanaEmergente(true);
            }
            fila[filaVillano].children[columnaVillano-1].textContent = villano;
            fila[filaVillano].children[columnaVillano-1].style.backgroundColor = "gray";
            fila[filaVillano].children[columnaVillano-1].onclick = null;
            fila[filaVillano].children[columnaVillano].textContent = '·';

        }else if(fila[filaVillano].children[columnaVillano+1].textContent==obstaculo){
            if(arriba<abajo){
                moverVillanoArriba();
            }else{
                moverVillanoAbajo();
            }
        }
    }
}


const analizarMovimiento = ()=>{
    const fila = document.querySelectorAll('tr');
    
    
    let filaProt = parseInt(getPos(protagonista)[0]);
    let columnaProt = parseInt(getPos(protagonista)[1]);

    for(let numFila=0; numFila<fila.length; numFila++){
        for(let numColumna=0; numColumna<fila.length; numColumna++){
            fila[numFila].children[numColumna].style.backgroundColor = "gray";
            fila[numFila].children[numColumna].onclick = null;
                        
        }
    }

    //Izquierda
    if(columnaProt-1>=0){
        if(fila[filaProt].children[columnaProt-1].textContent != villano && fila[filaProt].children[columnaProt-1].textContent != obstaculo){
            fila[filaProt].children[columnaProt-1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt-1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt-1))}  
        }
        
    }
    
    //Derecha
    if(columnaProt+1<fila.length){
        if(fila[filaProt].children[columnaProt+1].textContent != villano && fila[filaProt].children[columnaProt+1].textContent != salida && fila[filaProt].children[columnaProt+1].textContent != obstaculo){
                
            fila[filaProt].children[columnaProt+1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt+1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt+1))}
        
        }
        if(fila[filaProt].children[columnaProt+1].textContent == salida && document.querySelector('.indicador').style.backgroundColor == "green"){
                
            fila[filaProt].children[columnaProt+1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt+1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt+1))}
    
        }
    }
    
    //Abajo
    if(filaProt+1!=fila.length){
        if(fila[filaProt+1].children[columnaProt].textContent != villano && fila[filaProt+1].children[columnaProt].textContent != salida && fila[filaProt+1].children[columnaProt].textContent != obstaculo){
            fila[filaProt+1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt+1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt+1),columnaProt)}
        }

        if(fila[filaProt+1].children[columnaProt].textContent == salida && document.querySelector('.indicador').style.backgroundColor == "green"){
                
            fila[filaProt+1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt+1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt+1),columnaProt)}
    
        }
    }

    //Arriba
    if(filaProt-1>=0){
        if(fila[filaProt-1].children[columnaProt].textContent != villano && fila[filaProt-1].children[columnaProt].textContent != obstaculo){
            fila[filaProt-1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt-1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt-1),columnaProt)}
        }
    }
}


const moverProtagonista = (filaFutura, columnaFutura)=>{
    const fila = document.querySelectorAll('tr');
    

    let filaAntigua = parseInt(getPos(protagonista)[0]);
    let columnaAntigua = parseInt(getPos(protagonista)[1]);
    
    if(fila[filaFutura].children[columnaFutura].textContent==salida && document.querySelector('.indicador').style.backgroundColor == "green"){
        ventanaEmergente();
    }else{
        if(fila[filaFutura].children[columnaFutura].textContent==examenes){
            document.querySelector('.indicador').style.backgroundColor = "green";
        }
    
        fila[filaFutura].children[columnaFutura].textContent = protagonista;
        fila[filaAntigua].children[columnaAntigua].textContent = "·";
    }
    
    

   
    
    analizarMovimiento();
    moverVillano();
}


window.onload = ()=>{
    crearTablero();
    posicionarItems();
    analizarMovimiento();
}