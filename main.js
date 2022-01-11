window.onload = ()=>{
    
    function numRandom(){
        return Math.floor(Math.random()*7);
    }
    


    let tabla = document.querySelectorAll('tr');

    /*
    *
    *
    * Inicio juego
    *
    * 
    */
    function iniciarJuego(){

        for(let fila = 0; fila<tabla.length; fila++){
            for(let columna = 0; columna<tabla.length; columna++){
                tabla[fila].children[columna].textContent = '.';
            }    
        }

        tabla[0].children[0].textContent = 'O';
        tabla[7].children[7].textContent = 'S';

        let prep = 0;

        while(prep<2){
            let ale1 = numRandom();
            let ale2 = numRandom();
            
            if(!((ale1==0 && ale2==0)||(ale1==7&&ale2==7))){
                if(prep==0){
                    tabla[ale1].children[ale2].textContent = 'X';
                    prep++;
                }else if(prep==1 && tabla[ale1].children[ale2].textContent!='X'){
                    tabla[ale1].children[ale2].textContent = 'Y';
                    prep++;
                }
                
            }
        }
    }

    iniciarJuego();

    /*
    *
    *
    * Propiedad privada para recibir la posición del protagonista
    *
    * 
    */
    function posProtagonista(){
        for(let fila = 0; fila<tabla.length; fila++){
            for(let columna = 0; columna<tabla.length; columna++){
                if(tabla[fila].children[columna].textContent == 'O'){
                    return new Array(fila,columna); 
                }
            } 
        }
    }

    /*
    *
    *
    * Le añado las propiedades onclick a los botones
    *
    * 
    */
    let buttons = Array.from(document.querySelector('.botones').children);

    buttons.forEach((item,index) => {
        switch(index){
            case 0: //Arriba 
                
                item.onclick = ()=>{
                    let posAntigua = posProtagonista();
                    if(posAntigua[0]!=0){
                        tabla[posProtagonista()[0]-1].children[posProtagonista()[1]].textContent = 'O';
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                    }
                }

            break;

            case 1: //Izquierda
                
                item.onclick = ()=>{
                    let posAntigua = posProtagonista();
                    if(posAntigua[1]!=0){
                        tabla[posProtagonista()[0]].children[posProtagonista()[1]-1].textContent = 'O';
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                    }   
                }

            break;

            case 2: //Derecha

                item.onclick = ()=>{
                    let posAntigua = posProtagonista();
                    if(posAntigua[1]!=tabla.length-1){
                        tabla[posProtagonista()[0]].children[posProtagonista()[1]+1].textContent = 'O';
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                    }      
                }

            break;

            case 3: //Abajo

                item.onclick = ()=>{
                    let posAntigua = posProtagonista();
                    if(posAntigua[0]!=tabla.length-1){
                        tabla[posProtagonista()[0]+1].children[posProtagonista()[1]].textContent = 'O';
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                        
                    }    
                }

            break;
    
        }
        
    });



}