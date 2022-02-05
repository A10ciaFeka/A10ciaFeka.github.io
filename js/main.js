async function comprobarNombre(nombre){
    const url = "https://api-dark-tests.vercel.app/user/'"+nombre+"'";
    let resultado = await fetch(url);
    resultado = await resultado.json();
    
    return resultado.length==0;
}

const insertarUsuario = (objUsuario)=>{
    const url = "https://api-dark-tests.vercel.app/user";
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objUsuario)
    })
}

const validarFormulario = ()=>{
    document.querySelector('#btSubmit').addEventListener('click',async(e)=>{
        e.preventDefault();
        let nombre = document.querySelector('input').value;
        
        if(await comprobarNombre(nombre)){
            objUsuario = {
                "user_name": nombre,
                "user_points": '0'
            }

            insertarUsuario(objUsuario);
            localStorage.setItem('usuario',JSON.stringify(objUsuario));
            pantallaCarga();
            window.setTimeout(function(){
                document.body.style.overflowY = 'scroll';
                document.querySelector('.container').style.opacity = '1';
                document.querySelector('.pantallaCarga').style.display = 'none';
                document.querySelector('form').submit();
            },3000);

        }else{
            document.querySelector('.mensaje').style.display = 'block';

            window.setTimeout(function(){
                document.querySelector('.mensaje').style.display = 'none';
            },3000);
        }

    });


}

const mejoresJugadores = ()=>{
    const url = "https://api-dark-tests.vercel.app/user";
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        data.forEach((i,index) => {
            construirTop(i,index);
        });
    });
}

const construirTop = (i,index)=>{    
    let parr = document.createElement('p');

    let texto = (index+1) + ' - '+i.nombre+': '+i.puntuacion+' points';
    parr.appendChild(document.createTextNode(texto));

    document.querySelector('.topJugadores').appendChild(parr);
}

window.onload = ()=>{
    document.body.style.overflowY = 'scroll';
    document.querySelector('.pantallaCarga').style.display = 'none';
    document.querySelector('.container').style.opacity = '1';

    document.querySelector('#introAudio').volume = '0.5';
    mejoresJugadores();

    document.querySelectorAll('button').forEach(item =>{
        item.addEventListener('mouseover',(e)=>{
            let soundOver = document.createElement('audio');
            soundOver.src = 'assets/button-hover.mp3';
            soundOver.autoplay = true;
            soundOver.hidden = true;
            soundOver.volume = '1';
            document.body.appendChild(soundOver);

            window.setTimeout(function(){
                document.body.removeChild(soundOver);
            },1000);
        });
        item.addEventListener('click',(e)=>{

            if(item.id!='mute' && item.id!='sound'){
                let sonido = document.createElement('audio');
                sonido.src = 'assets/btpress.mp3';
                sonido.autoplay = true;
                sonido.hidden = true;

                document.body.appendChild(sonido);

                window.setTimeout(function(){
                    document.body.removeChild(sonido);
                },3000);
                
                if(item.id=='historia'){
                    pantallaCarga();
                    window.setTimeout(function(){
                        document.body.style.overflowY = 'scroll';
                        document.querySelector('.container').style.opacity = '1';
                        document.querySelector('.pantallaCarga').style.display = 'none';
                        window.location.href = 'historia.html';
                    },3000);
                }

                if(item.id=='btRegla'){
                    let reglas = document.querySelector('.reglas');
                    if(reglas.style.display=='none'){
                        reglas.style.display = 'block';
                    }else{
                        reglas.style.display = 'none';
                    }
                }

                if(item.id=='jugar'){
                    if(localStorage.getItem('usuario')){
                        pantallaCarga();
                        window.setTimeout(function(){
                            document.body.style.overflowY = 'scroll';
                            document.querySelector('.container').style.opacity = '1';
                            document.querySelector('.pantallaCarga').style.display = 'none';
                            window.location.href = 'juego.html';
                        },3000);
                    }else{
                        document.querySelector('.form').style.display = 'flex';
                        validarFormulario();
                    }
                }

                if(item.id=='puntuacion'){
                    if(document.querySelector('.topJugadores').style.display == 'block'){
                        document.querySelector('.topJugadores').style.display = 'none';
                    }else{
                        document.querySelector('.topJugadores').style.display = 'block';
                    }
                        
                }

            }else if(item.id!='sound'){
                item.id = 'sound';
                document.querySelector('i').textContent = 'volume_off';
                document.getElementById('introAudio').muted = true;
            }else{
                item.id = 'mute';
                document.querySelector('i').textContent = 'volume_up';
                document.getElementById('introAudio').muted = false;
            }
        })
    });
}

const pantallaCarga = ()=>{
    document.body.style.overflowY = 'hidden';
    document.querySelector('.pantallaCarga').style.display = 'block';
    document.querySelector('.container').style.opacity = '0';
    
}
