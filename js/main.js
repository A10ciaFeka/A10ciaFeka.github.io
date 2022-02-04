async function comprobarNombre(nombre){
    const url = "https://darktestapi.herokuapp.com/user/'"+nombre+"'";
    let resultado = await fetch(url);
    resultado = await resultado.json();
    
    return resultado.length==0;
}

const insertarUsuario = (objUsuario)=>{
    const url = "https://darktestapi.herokuapp.com/user";
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
            window.setTimeout(function(){
                document.querySelector('form').submit();
            },3000);

        }else{
            document.querySelector('.mensaje').style.visibility = 'visible';

            window.setTimeout(function(){
                document.querySelector('.mensaje').style.visibility = 'hidden';
            },3000);
        }

    });
}

window.onload = ()=>{
    document.querySelectorAll('button').forEach(item =>{
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
                    window.setTimeout(function(){
                        window.location.href = 'historia.html';
                    },1800);
                }

                if(item.id=='btRegla'){
                    let reglas = document.querySelector('.reglas');
                    console.log(reglas.style.display)
                    if(reglas.style.display=='none'){
                        reglas.style.display = 'block';
                    }else{
                        reglas.style.display = 'none';
                    }
                }

                if(item.id=='jugar'){
                    if(localStorage.getItem('usuario')){
                
                        window.setTimeout(function(){
                            window.location.href = 'juego.html';
                        },1800);
                    }else{
                        document.querySelector('.form').style.display = 'flex';
                        validarFormulario();
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