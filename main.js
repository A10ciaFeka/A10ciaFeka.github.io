function numRandom(){
    return Math.floor(Math.random()*7);
}

const crearTablero = ()=>{
    let tabla = document.createElement('table');
    tabla.style.width = "80%";
    tabla.style.height = "50%";
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


const posicionarItems = ()=>{
    const fila = document.querySelectorAll('tr');
    const protagonista = 'O';
    const salida = 'S';
    const examenes = 'Y';
    const villano = 'X';

    for(let filas=0; filas<8; filas++){
        for(let columna=0; columna<8; columna++){
            fila[filas].children[columna].textContent = "·";
        }
    }


    fila[0].children[0].textContent = protagonista;
    fila[fila.length-1].children[fila.length-1].textContent = salida;

    let prep = 0;

    while(prep<2){
        let ale1 = numRandom();
        let ale2 = numRandom();
        
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

const moverJaime = ()=>{

    const protagonista = 'O';
    const villano = 'X';

    let posRober=getPos(protagonista);
    let posJaime=getPos(villano);

    let x=posJaime[0]-posRober[0];
    let y=posJaime[1]-posRober[1];

    
}


const analizarMovimiento = ()=>{
    const fila = document.querySelectorAll('tr');
    
    const protagonista = "O";
    const villano = 'X';
    const salida = 'S';
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
        if(fila[filaProt].children[columnaProt-1].textContent != villano){
            fila[filaProt].children[columnaProt-1].style.backgroundColor = "green";
            fila[filaProt].children[columnaProt-1].onclick = ()=>{moverProtagonista(filaProt,(columnaProt-1))}  
        }
        
    }
    
    //Derecha
    if(columnaProt+1<fila.length){
        if(fila[filaProt].children[columnaProt+1].textContent != villano && fila[filaProt].children[columnaProt+1].textContent != salida){
                
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
        if(fila[filaProt+1].children[columnaProt].textContent != villano && fila[filaProt+1].children[columnaProt].textContent != salida){
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
        if(fila[filaProt-1].children[columnaProt].textContent != villano){
            fila[filaProt-1].children[columnaProt].style.backgroundColor = "green";
            fila[filaProt-1].children[columnaProt].onclick = ()=>{moverProtagonista((filaProt-1),columnaProt)}
        }
    }
}

const moverProtagonista = (filaFutura, columnaFutura)=>{
    const fila = document.querySelectorAll('tr');
    const protagonista = "O";
    const examenes = "Y";
    const salida = 'S';

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
}


window.onload = ()=>{
    crearTablero();
    posicionarItems();
    analizarMovimiento();
}