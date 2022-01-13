window.onload = ()=>{
    
    function numRandom(){
        return Math.floor(Math.random()*7);
    }
    
    const protagonista = 'O';
    const salida = 'S';
    const examenes = 'Y';
    const villano = 'X';

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

        tabla[0].children[0].textContent = protagonista;
        tabla[7].children[7].textContent = salida;

        let prep = 0;

        while(prep<2){
            let ale1 = numRandom();
            let ale2 = numRandom();
            
            if(!((ale1==0 && ale2==0)||(ale1==7&&ale2==7))){
                if(prep==0){
                    tabla[ale1].children[ale2].textContent = villano;
                    prep++;
                }else if(prep==1 && tabla[ale1].children[ale2].textContent!=villano){
                    tabla[ale1].children[ale2].textContent = examenes;
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
    function posElemento(cadena){
        for(let fila = 0; fila<tabla.length; fila++){
            for(let columna = 0; columna<tabla.length; columna++){
                if(tabla[fila].children[columna].textContent == cadena){
                    return new Array(fila,columna); 
                }
            } 
        }
    }

    /*
    *
    *
    * Movimiento del malo
    *
    * 
    */
    
    function movimientoVillano(){
        let filaFinal;
        if(posElemento(protagonista)[0]>posElemento(villano)[0]){
            filaFinal = posElemento(protagonista)[0] - posElemento(villano)[0];
        }else{
            filaFinal = posElemento(villano)[0] - posElemento(protagonista)[0];
        }

        let columnaFinal;
        if(posElemento(protagonista)[1]>posElemento(villano)[1]){
            columnaFinal = posElemento(protagonista)[1] - posElemento(villano)[1];
        }else{
            columnaFinal = posElemento(villano)[1] - posElemento(protagonista)[1];
        }

        console.log(new Array(filaFinal,columnaFinal));
        console.log(posElemento(protagonista) + ' protagonista');
        console.log(posElemento(villano) + ' villano');
        
        tabla[posElemento(villano)[0]].children[posElemento(villano)[1]].textContent = '.';
        if(tabla[filaFinal].children[columnaFinal].textContent!=examenes){
            tabla[filaFinal].children[columnaFinal].textContent = villano;
        }

    }

    /*
    *
    *
    * Le añado las propiedades onclick a los botones
    *
    * 
    */
   
    function cambiarColor(){
        document.querySelector('.examen').style.backgroundColor='green';
    }

    let buttons = Array.from(document.querySelector('.botones').children);

    buttons.forEach((item,index) => {
        switch(index){
            case 0: //Arriba 
                
                item.onclick = ()=>{ 
                    let posAntigua = posElemento(protagonista);

                    if(posAntigua[0]!=0){
                        if(document.querySelector('.examen').style.backgroundColor!='green'){
                            if( ((posElemento(protagonista)[0]-1) == posElemento(examenes)[0]) && (posElemento(protagonista)[1] == posElemento(examenes)[1]) )
                            {
                                cambiarColor();
                            }
                            
                        }
                        tabla[posElemento(protagonista)[0]-1].children[posElemento(protagonista)[1]].textContent = protagonista;
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                        movimientoVillano();
                    }
                }

            break;

            case 1: //Izquierda
                
                item.onclick = ()=>{
                    let posAntigua = posElemento(protagonista);
                    if(posAntigua[1]!=0){
                        if(document.querySelector('.examen').style.backgroundColor!='green'){
                            if( (posElemento(protagonista)[0] == posElemento(examenes)[0]) && ((posElemento(protagonista)[1]-1) == posElemento(examenes)[1]) )
                            {
                                cambiarColor();
                            }
                        }
                        tabla[posElemento(protagonista)[0]].children[posElemento(protagonista)[1]-1].textContent = protagonista;
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                        movimientoVillano();
                    }   
                }

            break;

            case 2: //Derecha

                item.onclick = ()=>{
                    let posAntigua = posElemento(protagonista);
                    if(posAntigua[1]!=tabla.length-1){
                        if(document.querySelector('.examen').style.backgroundColor!='green'){
                            if( (posElemento(protagonista)[0] == posElemento(examenes)[0]) && ((posElemento(protagonista)[1]+1) == posElemento(examenes)[1]) )
                            {
                                cambiarColor();
                            }                        
                            tabla[posElemento(protagonista)[0]].children[posElemento(protagonista)[1]+1].textContent = protagonista;
                        }else{
                            if(tabla[posElemento(protagonista)[0]].children[posElemento(protagonista)[1]+1].textContent == salida){
                                
                                tabla[posElemento(protagonista)[0]].children[posElemento(protagonista)[1]+1].textContent = protagonista;
                                tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                                alert('¡Has ganado!');
                            }else{
                                tabla[posElemento(protagonista)[0]].children[posElemento(protagonista)[1]+1].textContent = protagonista; 
                            }
                        }
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                        movimientoVillano();
                    }      
                }

            break;

            case 3: //Abajo

                item.onclick = ()=>{
                    let posAntigua = posElemento(protagonista);
                    if(posAntigua[0]!=tabla.length-1){

                        if(document.querySelector('.examen').style.backgroundColor!='green'){

                            if( ((posElemento(protagonista)[0]+1) == posElemento(examenes)[0]) && (posElemento(protagonista)[1] == posElemento(examenes)[1]) )
                            {
                                cambiarColor();
                            }                        
                            tabla[posElemento(protagonista)[0]+1].children[posElemento(protagonista)[1]].textContent = protagonista;
                        }else{
                            if(tabla[posElemento(protagonista)[0]+1].children[posElemento(protagonista)[1]].textContent == salida){
                                
                                tabla[posElemento(protagonista)[0]+1].children[posElemento(protagonista)[1]].textContent = protagonista;
                                tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                                alert('¡Has ganado!');
                            }else{
                                tabla[posElemento(protagonista)[0]+1].children[posElemento(protagonista)[1]].textContent = protagonista;
                            }
                        }
                        tabla[posAntigua[0]].children[posAntigua[1]].textContent = '.';
                        movimientoVillano();
                    }    
                    
                }

            break;
        }
    });



}