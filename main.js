
function numRandom(num){
    return Math.floor(Math.random()*num);
}

const crearTablero = ()=>{
    let tabla = document.createElement('table');
    

    for(let fila=0; fila<8; fila++){
        let fila = document.createElement('tr');
        for(let columna=0; columna<8; columna++){
            let columna = document.createElement('td');
            // columna.style.height = "50px";
            // columna.style.width = "50px";
            columna.style.backgroundColor = "gray";
            columna.style.backgroundImage = 'url(assets/img/suelo.png)';
            columna.style.backgroundSize = 'cover';
            fila.appendChild(columna);

        }
        tabla.appendChild(fila);
    }

    document.querySelector('.container').insertBefore(tabla,document.querySelector('.examenes'));
}
var protagonista = document.createElement('img');
protagonista.id = 'protagonista';
protagonista.src = 'assets/img/npc.gif';

var villano = document.createElement('img');
villano.id = 'villano';
villano.src = 'assets/img/malo.gif';

var salida = document.createElement('img');
salida.id = 'salida';
salida.src = 'assets/img/salida.png';

var examenes = document.createElement('img');
examenes.id = 'examenes'
examenes.src = 'assets/img/Ember.png';

var obstaculoSrc = 'assets/img/obstaculo.png';

const posicionarItems = ()=>{
    const fila = document.querySelectorAll('tr');

    for(let numFila=0; numFila<fila.length; numFila++){
        for(let numColumna=0; numColumna<fila.length; numColumna++){
            if(fila[numFila].children[numColumna].firstChild){

                fila[numFila].children[numColumna].removeChild(fila[numFila].children[numColumna].firstChild);
            }
        }
    }

    let obstaculoContador = 0;
    while(obstaculoContador<8){
        let ale1 = numRandom(6)+1;
        let ale2 = numRandom(7);
        
        if(!((ale1==0 && ale2==0)||(ale1==7&&ale2==7))){
            if(!fila[ale1].children[ale2].hasChildNodes()){
                let ObsImg = document.createElement('img');
                ObsImg.className = 'obstaculo';
                ObsImg.src = obstaculoSrc;
                fila[ale1].children[ale2].appendChild(ObsImg);
                obstaculoContador++;                 
            }
        }
    }

    fila[0].children[0].appendChild(protagonista);
    fila[fila.length-1].children[fila.length-1].appendChild(salida);

    let prep = 0;

    while(prep<2){
        let ale1 = numRandom(6)+1;
        let ale2 = numRandom(7);
        
        if(!((ale1==0 && ale2==0)||(ale1==7&&ale2==7))){
            if(prep==0){
                if(!fila[ale1].children[ale2].hasChildNodes()){
                    fila[ale1].children[ale2].appendChild(villano);
                    prep++;
                }
            }else if(prep==1 && fila[ale1].children[ale2].textContent!=villano){
                if(!fila[ale1].children[ale2].hasChildNodes()){
                    fila[ale1].children[ale2].appendChild(examenes);
                    prep++;
                }
            }
            
        }
    }
}

/*
*
*   FUNCIÓN PRIVADA
*
*/

//En principio funciona
const getPos = (id)=>{
    const fila = document.querySelectorAll('tr');
    
    for(let numFila in fila){
        for(let numColumna in fila[numFila].children){
            if(fila[numFila].children[numColumna].firstChild){
                if(fila[numFila].children[numColumna].firstChild.id == id){
                    return new Array(numFila,numColumna);
                }
            }
        }
    }
}
const ventanaEmergente = (perdido=false)=>{
    document.querySelector('.floatingBox').style.display = 'block';
    document.querySelector('.container').style.opacity='0.2';
    let fila = document.querySelectorAll('tr');
    if(perdido){
        for(let numFila=0; numFila<fila.length; numFila++){
            for(let numColumna=0; numColumna<fila.length; numColumna++){
                fila[numFila].children[numColumna].style.backgroundColor = "red";
            }
        }
        document.querySelector('.floatingBox').style.animation = 'fade-in 10s linear';
        document.querySelector('.floatingBox').style.color = 'Red';
        document.querySelector('.floatingBox').style.animation = 'text-zoom 5s linear';
        document.querySelector('.texto').firstChild.textContent = 'YOU DIED';

        let sonido = document.createElement('audio');
        sonido.src = 'assets/died.mp3';
        sonido.autoplay = true;
        sonido.hidden = true;

        document.body.appendChild(sonido);
        window.setTimeout(function(){
            document.body.removeChild(sonido);
        },8000);
    }else{
        document.querySelector('.floatingBox').style.animation = 'fade-in 10s linear';
        document.querySelector('.floatingBox').style.animation = 'text-zoom 5s linear';
        document.querySelector('.floatingBox').style.color = 'Yellow';
        document.querySelector('.texto').firstChild.textContent = 'YOU DEFEATED';
        let sonido = document.createElement('audio');
        sonido.src = 'assets/defeated.mp3';
        sonido.autoplay = true;
        sonido.volume = '0.5';
        sonido.hidden = true;

        document.body.appendChild(sonido);
        window.setTimeout(function(){
            document.body.removeChild(sonido);
        },13000);
    }
        
    document.querySelector('#closeButton').onclick= (e)=>{
        e.preventDefault();

        document.querySelector('.floatingBox').style.display = 'none';
        document.querySelector('.container').style.opacity='1';
    
        posicionarItems();
        analizarMovimiento();
        document.querySelector('.examenes').style.visibility = 'hidden';
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

const moverVillanoDerecha = (fila,filaVillano, columnaVillano)=>{
    if(columnaVillano+1<fila.length){
        if(fila[filaVillano].children[columnaVillano+1].firstChild){
            if(fila[filaVillano].children[columnaVillano+1].firstChild.className!='obstaculo' && fila[filaVillano].children[columnaVillano+1].firstChild.id!='examenes'){
                fila[filaVillano].children[columnaVillano+1].appendChild(villano);
                fila[filaVillano].children[columnaVillano+1].style.backgroundColor = "gray";
                fila[filaVillano].children[columnaVillano+1].onclick = null;                
            }
        }else{

            fila[filaVillano].children[columnaVillano+1].appendChild(villano);
            fila[filaVillano].children[columnaVillano+1].style.backgroundColor = "gray";
            fila[filaVillano].children[columnaVillano+1].onclick = null;                
            
        }
        
    }
}

const moverVillanoIzquierda = (fila = document.querySelectorAll('tr'),filaVillano, columnaVillano)=>{
    if(columnaVillano-1>=0){
        if(fila[filaVillano].children[columnaVillano-1].firstChild){
            if(fila[filaVillano].children[columnaVillano-1].firstChild.className!='obstaculo' && fila[filaVillano].children[columnaVillano-1].firstChild.id!='examenes'){
                fila[filaVillano].children[columnaVillano-1].appendChild(villano);
                fila[filaVillano].children[columnaVillano-1].style.backgroundColor = "gray";
                fila[filaVillano].children[columnaVillano-1].onclick = null;                
            }
        }else{

            fila[filaVillano].children[columnaVillano-1].appendChild(villano);
            fila[filaVillano].children[columnaVillano-1].style.backgroundColor = "gray";
            fila[filaVillano].children[columnaVillano-1].onclick = null;            
        }
    
    }
}

const moverVillanoAbajo = (fila = document.querySelectorAll('tr'),filaVillano, columnaVillano)=>{
    if(filaVillano+1<fila.length){
        if(fila[filaVillano+1].children[columnaVillano].firstChild){
            if(fila[filaVillano+1].children[columnaVillano].firstChild.className!='obstaculo' && fila[filaVillano+1].children[columnaVillano].firstChild.id!='examenes'){
                fila[filaVillano+1].children[columnaVillano].appendChild(villano);
                fila[filaVillano+1].children[columnaVillano].style.backgroundColor = "gray";
                fila[filaVillano+1].children[columnaVillano].onclick = null;                
            }
        }else{

            fila[filaVillano+1].children[columnaVillano].appendChild(villano);
            fila[filaVillano+1].children[columnaVillano].style.backgroundColor = "gray";
            fila[filaVillano+1].children[columnaVillano].onclick = null;            
        }
    
    }
}

const moverVillanoArriba = (fila = document.querySelectorAll('tr'),filaVillano, columnaVillano)=>{
    if(filaVillano-1>=0){
        if(fila[filaVillano-1].children[columnaVillano].firstChild){

            if(fila[filaVillano-1].children[columnaVillano].firstChild.className!='obstaculo' && fila[filaVillano-1].children[columnaVillano].firstChild.id!='examenes' ){
                fila[filaVillano-1].children[columnaVillano].appendChild(villano);
                fila[filaVillano-1].children[columnaVillano].style.backgroundColor = "gray";
                fila[filaVillano-1].children[columnaVillano].onclick = null;                
            }
        }else{
            fila[filaVillano-1].children[columnaVillano].appendChild(villano);
            fila[filaVillano-1].children[columnaVillano].style.backgroundColor = "gray";
            fila[filaVillano-1].children[columnaVillano].onclick = null;       
        }
             
        
    }
}

const moverVillano = ()=>{
    const fila = document.querySelectorAll('tr');

    let filaProta = parseInt(getPos('protagonista')[0]);
    let columnaProta = parseInt(getPos('protagonista')[1]);

    let filaVillano = parseInt(getPos('villano')[0]);
    let columnaVillano = parseInt(getPos('villano')[1]);

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
        if(fila[filaVillano-1].children[columnaVillano].firstChild){
            if(fila[filaVillano-1].children[columnaVillano].firstChild.className=='obstaculo'){
                if(derecha<izquierda){
                    moverVillanoDerecha(fila, filaVillano, columnaVillano);
                }else{
                    moverVillanoIzquierda(fila, filaVillano, columnaVillano);
                }
            }else if(fila[filaVillano-1].children[columnaVillano].firstChild.id=='protagonista'){
                moverVillanoAbajo(fila, filaVillano, columnaVillano);
                ventanaEmergente(true);
            }
        }else{
            moverVillanoArriba(fila, filaVillano, columnaVillano);
        }
        
    }else if(mapaValores.get("Ab")!=undefined){
        //Abajo
        if(fila[filaVillano+1].children[columnaVillano].firstChild){
            
            if(fila[filaVillano+1].children[columnaVillano].firstChild.className=='obstaculo'){
                if(derecha<izquierda){
                    moverVillanoDerecha(fila, filaVillano, columnaVillano);
                }else{
                    moverVillanoIzquierda(fila, filaVillano, columnaVillano);
                }
            }else if(fila[filaVillano+1].children[columnaVillano].firstChild.id=='protagonista'){
                moverVillanoAbajo(fila, filaVillano, columnaVillano);
                ventanaEmergente(true);
            }
        }else{
            moverVillanoAbajo(fila, filaVillano, columnaVillano);
        }


    }else if(mapaValores.get("D")!=undefined){
        //Derecha
        if(fila[filaVillano].children[columnaVillano+1].firstChild){

            if(fila[filaVillano].children[columnaVillano+1].firstChild.className=='obstaculo'){
                if(arriba<abajo){
                    moverVillanoArriba(fila, filaVillano, columnaVillano);
                }else{
                    moverVillanoAbajo(fila, filaVillano, columnaVillano);
                }
            }else if(fila[filaVillano].children[columnaVillano+1].firstChild.id=='protagonista'){
                moverVillanoAbajo(fila, filaVillano, columnaVillano);
                ventanaEmergente(true);
            }
        }else{

            moverVillanoDerecha(fila, filaVillano, columnaVillano);
        }
    }else{
        //Izquierda
        if(fila[filaVillano].children[columnaVillano-1].firstChild){
            if(fila[filaVillano].children[columnaVillano-1].firstChild.className=='obstaculo'){
                if(arriba<abajo){
                    moverVillanoArriba(fila, filaVillano, columnaVillano);
                }else{
                    moverVillanoAbajo(fila, filaVillano, columnaVillano);
                }
            }else if(fila[filaVillano].children[columnaVillano-1].firstChild.id=='protagonista'){
                moverVillanoAbajo(fila, filaVillano, columnaVillano);
                ventanaEmergente(true);
            }

        }else{

            moverVillanoIzquierda(fila, filaVillano, columnaVillano);
        }
    }
    fila[getPos('villano')[0]].children[getPos('villano')[1]].style.backgroundImage = 'url(assets/img/suelo.png)';
}


const analizarMovimiento = ()=>{
    const fila = document.querySelectorAll('tr');
    
    

    let filaProt = parseInt(getPos('protagonista')[0]);
    let columnaProt = parseInt(getPos('protagonista')[1]);

    for(let numFila=0; numFila<fila.length; numFila++){
        for(let numColumna=0; numColumna<fila.length; numColumna++){
            fila[numFila].children[numColumna].style.backgroundImage = 'url(assets/img/suelo.png)';
            fila[numFila].children[numColumna].style.backgroundSize = 'cover';
            fila[numFila].children[numColumna].style.backgroundColor = "gray";
            fila[numFila].children[numColumna].onclick = null;
                        
        }
    }

    //Izquierda
    if(columnaProt-1>=0){
        
        if(fila[filaProt].children[columnaProt-1].firstChild){
            if(fila[filaProt].children[columnaProt-1].firstChild.id == 'villano' || fila[filaProt].children[columnaProt-1].firstChild.className == 'obstaculo'){
                fila[filaProt].children[columnaProt-1].style.backgroundColor = "gray";
                fila[filaProt].children[columnaProt-1].onclick = null;
            }
            if(fila[filaProt].children[columnaProt-1].firstChild.id == 'examenes'){

                fila[filaProt].children[columnaProt-1].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt].children[columnaProt-1].style.backgroundColor = "green";
                fila[filaProt].children[columnaProt-1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt-1))}
                
            }
        }else{
            fila[filaProt].children[columnaProt-1].style.backgroundImage = 'url(assets/img/camino.png)';
            fila[filaProt].children[columnaProt-1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt-1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt-1))}  
        }
        
    }
    
    //Derecha
    if(columnaProt+1<fila.length){
        
        if(fila[filaProt].children[columnaProt+1].firstChild){
            
            if(fila[filaProt].children[columnaProt+1].firstChild.id == 'villano' && fila[filaProt].children[columnaProt+1].firstChild.id != 'salida' && fila[filaProt].children[columnaProt+1].firstChild.className == 'obstaculo'){
                
                fila[filaProt].children[columnaProt+1].style.backgroundColor = "gray";
                fila[filaProt].children[columnaProt+1].onclick = null;
                
            }
            if(fila[filaProt].children[columnaProt+1].firstChild.id == 'salida' && document.querySelector('.indicador').style.backgroundColor == "green"){
                
                fila[filaProt].children[columnaProt+1].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt].children[columnaProt+1].style.backgroundColor = "green";
                fila[filaProt].children[columnaProt+1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt+1))}
                
            }

            if(fila[filaProt].children[columnaProt+1].firstChild.id == 'examenes'){
                
                fila[filaProt].children[columnaProt+1].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt].children[columnaProt+1].style.backgroundColor = "green";
                fila[filaProt].children[columnaProt+1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt+1))}
                
            }
        }else{
            fila[filaProt].children[columnaProt+1].style.backgroundImage = 'url(assets/img/camino.png)';
            fila[filaProt].children[columnaProt+1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt+1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt+1))}

        }
    }
    
    //Abajo
    if(filaProt+1!=fila.length){
        
        if(fila[filaProt+1].children[columnaProt].firstChild){
            
            if(fila[filaProt+1].children[columnaProt].firstChild.id == 'villano' || fila[filaProt+1].children[columnaProt].firstChild.id == 'salida' || fila[filaProt+1].children[columnaProt].firstChild.className == 'obstaculo'){
                
                fila[filaProt+1].children[columnaProt].style.backgroundColor = "gray";
                fila[filaProt+1].children[columnaProt].onclick = null;
                
            }
            if(fila[filaProt+1].children[columnaProt].firstChild.id == 'salida' && document.querySelector('.indicador').style.backgroundColor == "green"){
                
                fila[filaProt+1].children[columnaProt].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt+1].children[columnaProt].style.backgroundColor = "green";
                fila[filaProt+1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt+1),(columnaProt))}
                
            }
            if(fila[filaProt+1].children[columnaProt].firstChild.id == 'examenes'){
                
                fila[filaProt+1].children[columnaProt].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt+1].children[columnaProt].style.backgroundColor = "green";
                fila[filaProt+1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt+1),(columnaProt))}
                
            }
            
        }else{
            fila[filaProt+1].children[columnaProt].style.backgroundImage = 'url(assets/img/camino.png)';
            fila[filaProt+1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt+1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt+1),columnaProt)}
        }
    }

    //Arriba
    if(filaProt-1>=0){
        
        if(fila[filaProt-1].children[columnaProt].firstChild){
            if(fila[filaProt-1].children[columnaProt].firstChild.id == 'villano' || fila[filaProt-1].children[columnaProt].firstChild.className == 'obstaculo'){
                fila[filaProt-1].children[columnaProt].style.backgroundColor = "gray";
                fila[filaProt-1].children[columnaProt].onclick = null
            }
            if(fila[filaProt-1].children[columnaProt].firstChild.id == 'examenes'){
                fila[filaProt-1].children[columnaProt].style.backgroundImage = 'url(assets/img/camino.png)';
                fila[filaProt-1].children[columnaProt].style.backgroundColor = "green";
                fila[filaProt-1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt-1),columnaProt)}
            }
        }else{
            fila[filaProt-1].children[columnaProt].style.backgroundImage = 'url(assets/img/camino.png)';
            fila[filaProt-1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt-1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt-1),columnaProt)}
        }
    }
}


const moverProtagonista = (filaFutura, columnaFutura)=>{
    const fila = document.querySelectorAll('tr');
 
    if(fila[filaFutura].children[columnaFutura].firstChild){
        if(fila[filaFutura].children[columnaFutura].firstChild.id=='salida' && document.querySelector('.indicador').style.backgroundColor == "green"){
            ventanaEmergente();
            return true;
        }else{
            if(fila[filaFutura].children[columnaFutura].firstChild.id=='examenes'){
                document.querySelector('.indicador').style.backgroundColor = "green";
                document.querySelector('.examenes').style.visibility = 'visible';
                fila[filaFutura].children[columnaFutura].removeChild(fila[filaFutura].children[columnaFutura].firstChild);
                fila[filaFutura].children[columnaFutura].appendChild(protagonista);
            }        
        }
    }else{
        fila[filaFutura].children[columnaFutura].appendChild(protagonista);
    }
    
    analizarMovimiento();
    moverVillano();
    if(!comprobarVerde()){
        ventanaEmergente(true);
    }
}

const comprobarVerde = ()=>{
    let fila = document.querySelectorAll('tr');
    for(let numFila=0; numFila<fila.length; numFila++){
        for(let numColumna=0; numColumna<fila.length; numColumna++){
            if(fila[numFila].children[numColumna].style.backgroundColor == "green"){
                return true;
            }                     
        }
    }
    return false;
}

window.onload = ()=>{
    crearTablero();
    posicionarItems();
    analizarMovimiento();
}