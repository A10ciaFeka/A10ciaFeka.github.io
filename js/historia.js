window.onload = ()=>{
            
    document.querySelector('h2').style.visibility = 'visible';
    document.querySelector('h2').style.animationName = 'efectoBlur';
    document.querySelector('h2').style.animationDuration = '5s';

    let par = document.querySelectorAll('p');
    let contador = 0;

    const timer = setInterval(()=>{
        if(contador==par.length){
            clearInterval(timer);
        }else{
            par[contador].style.visibility = 'visible';
            par[contador].style.animationName = 'efectoBlur';
            par[contador].style.animationDuration = '5s';
            contador++;
        }
    },4500)

    document.querySelector('#menu').addEventListener('click',(e)=>{
        let sonido = document.createElement('audio');
        sonido.src = 'assets/sounds/btpress.mp3';
        sonido.autoplay = true;
        sonido.hidden = true;

        document.body.appendChild(sonido);

        window.setTimeout(function(){
            document.body.removeChild(sonido);
            window.location.href = 'index.html';
        },1800);
    })

    document.querySelector('#mute').addEventListener('click',(e)=>{
        let cancion = document.querySelector('#cancion');
        if(cancion.muted){
            cancion.muted = false;
            document.querySelector('#mute').firstChild.textContent = 'volume_up';
        }else{
            cancion.muted = true;
            document.querySelector('#mute').firstChild.textContent = 'volume_off';
        }
    });
}