document.querySelector(".button-start").addEventListener("click", function() {
    const mainNext = document.querySelector(".main");
    const soundGo = new Audio (src="/sound/go-lets-go.mp3");
    
    
    // Agregar clase para el efecto de desvanecimiento
    mainNext.classList.add("fade-out-main");  

    //Iniciar audio
    soundGo.play();

    
    // Esperar el tiempo de la animación antes de redirigir
    setTimeout(() => {
        window.location.href = "/game/game.html"; // Redirigir a la pagina del juego, sin cambiar de pestaña
    }, 1900); //Tiempo de retraso para cargar la pagina del juego
});