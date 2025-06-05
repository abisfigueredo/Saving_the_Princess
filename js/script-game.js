let soundTenebrousPlayed = false;
let gameResetting = false; //variable para definir cuando el juego este en reinicio, no permita realizar ninguna acción
let princessBubble = document.querySelector(".princess-bubble-image");
let princess = document.querySelector(".princess-image");
let heroHealthBar = document.querySelector(".healt-hero");
let villainHealthBar = document.querySelector(".healt-villain");
let heroScoreDisplay = document.getElementById("heroScore");
let villainScoreDisplay = document.getElementById("villainScore");
let heroLose = document.getElementById("heroImage");
let villainLose = document.getElementById("villainImage");

/*Aquí inicia actions---------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

function actions() {
    if (gameResetting) return;
    const hero = document.querySelector(".hero-image");
    const block = document.querySelector(".block"); // Selecciona el bloque
    const villain = document.querySelector(".villain-image");
    const powerHero = document.querySelector(".power-hero");
    const powerVillain = document.querySelector(".power-villain");
    const powerWinner = document.querySelector(".power-winner")
    const soundJumpHero = new Audio (src="/Saving_the_Princess/sound/jump-hero.mp3");

    if (hero) {

        //Iniciar audio en el 0.1 segundo
        soundJumpHero.currentTime = 0.1;
        soundJumpHero.play();

        
        villain.classList.add("moveVillain");
        powerHero.classList.add("movePowerHero");
        powerVillain.classList.add("movePowerVillain");
        
        setTimeout (() => {
            hero.classList.add("jump");
        }, 100);
        // Activa el efecto de inclinación del bloque cuando el héroe llega a 60% de la animación
        setTimeout(() => {
            block.classList.add("knockblock");
        }, 300); // Esto es el 60% del tiempo total colocado de retraso a la animación de Hero

        // Cuando el bloque termina su inclinación, hace que power-hero aparezca desde el bloque
        setTimeout(() => {
            powerHero.classList.add("movePowerHero");
            powerVillain.classList.add("movePowerVillain");
        }, 900);

        // Esperamos a que termine la animación para quitar la clase en la imagen hero-image y block y poder reutilizarla
        setTimeout(() => {
            hero.classList.remove("jump");
            block.classList.remove("knockblock");
            villain.classList.remove("moveVillain");
            powerHero.classList.remove("movePowerHero");
            powerVillain.classList.remove("movePowerVillain");
        }, 1100);

        setTimeout(() =>{
          powerWinner.classList.add("visible");
        }, 1300);        

        setTimeout(() => {
            powerWinner.classList.remove("visible");
        }, 1400);

        setTimeout(() =>{
          powerWinner.classList.add("visible");
        }, 1500);        

        setTimeout(() => {
            powerWinner.classList.remove("visible");
        }, 1600);
    }
}

// Agregar evento de clic para que el héroe salte
document.addEventListener("click", actions);

/*Aquí termina actions---------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/*Aquí inicia updateScore------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

let scoreHero = 100;  // Puntaje del héroe
let scoreVillain = 100; // Puntaje del villano

function updateScore() {
    if (gameResetting) return;
    const soundWinnerHero = new Audio (src="/Saving_the_Princess/sound/hero-winner.mp3");
    const soundVoiceHero = new Audio (src="/Saving_the_Princess/sound/yeah-winner.mp3");
    const soundWinnerVillain = new Audio (src="/Saving_the_Princess/sound/villain-winner.mp3")
    const mainGame = document.querySelector(".main-game");

    //Cambiar el valor de la salud de cada personaje
    heroScoreDisplay.textContent = `${scoreHero}%`;
    villainScoreDisplay.textContent = `${scoreVillain}%`;

    // Ajustar el ancho de las barras de salud dinámicamente
    heroHealthBar.style.width = `${scoreHero}%`;
    villainHealthBar.style.width = `${scoreVillain}%`;

    // Cambio de color de las barras según el nivel de vida
    if (scoreHero > 60) {
        heroHealthBar.style.backgroundColor = "#00FF00"; // Verde
    } else if (scoreHero > 30) {
        heroHealthBar.style.backgroundColor = "#FFFF00"; // Amarillo
    } else {
        heroHealthBar.style.backgroundColor = "#FF2400"; // Rojo
    }

    if (scoreVillain > 60) {
        villainHealthBar.style.backgroundColor = "#00FF00"; // Verde fuerte
    } else if (scoreVillain > 30) {
        villainHealthBar.style.backgroundColor = "#FFFF00"; // Amarillo
    } else {
        villainHealthBar.style.backgroundColor = "#FF2400"; // Rojo
    }
    

     // Verificar si alguien llegó a 100 puntos
    if (scoreHero <= 0) {
        gameResetting = true;
        soundWinnerVillain.play();
        mainGame.classList.add("background-tenebrous");
        heroLose.src = ("/Saving_the_Princess/img/hero-lose.png");
        heroLose.style.width ="30%";
        heroLose.style.height = "80%";
        setTimeout(() => {
            resetGame();
            mainGame.classList.remove("background-tenebrous");
            gameResetting = false; // Permitir que los puntajes vuelvan a sumarse
        }, 6000);
    } else if (scoreVillain <= 0) {
        gameResetting = true;
        soundVoiceHero.play();
        soundWinnerHero.currentTime = 1;
        soundWinnerHero.play();

        //Matener el tamaño del villano
        villainLose.style.width = "40%";
        villainLose.style.height = "100%";


        //Se cambia la imagen de la princesa encerrada en una burbuja por la princesa flotando con el vestido
        princessBubble.src = "/Saving_the_Princess/img/princess-float.png";

        // Se agrega la clase en css con el movimiento y desaparación de la imagen
        princessBubble.classList.add("princess-bubble-move");

         // Se oculta la imagen de la princesa flotando con el vestido y se coloca visible la de la princesa en el suelo
        setTimeout(() => {
            princessBubble.style.opacity = "0"; // Ocultamos la burbuja
            princess.classList.add("princess-visible"); // Mostramos a la princesa
        }, 2000);

        setTimeout(() => {
            resetGame();
            gameResetting = false; // Permitir que los puntajes vuelvan a sumarse
        }, 6000);
    }

}

/*Aquí termina updateScore------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/*Aquí inicia changeImage------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

// Variable que contiene la ruta de cada una de las imagenes que van a cambiar
const imagesHero = ["/Saving_the_Princess/img/star.png", "/Saving_the_Princess/img/flower.png", "/Saving_the_Princess/img/moshroom.png"];
const imagesVillain = ["/Saving_the_Princess/img/hammer.png", "/Saving_the_Princess/img/bomb.png", "/Saving_the_Princess/img/Thwomp.png"];
const imagesDraw =["/Saving_the_Princess/img/draw.png"];

// Función para cambiar la imagen aleatoriamente
function changeImage() {
    if (gameResetting) return;
    const powerHero = document.getElementById("powerHeroImage"); // Variable para llamar a la imagen Power Hero
    const powerVillain = document.getElementById("powerVillainImage"); // Variable para llamar a la imagen Power Villain
    const powerWinner = document.getElementById("powerWinerImage"); // Variable para llamar a la imagen Power Winner
    const randomIndexHero = Math.floor(Math.random() * imagesHero.length); // Variable para realizar la aletoriedad de Power Hero
    const randomIndexVillain = Math.floor(Math.random() * imagesVillain.length); // Variable para realizar la aletoriedad de Power Villain
    const mainGame = document.querySelector(".main-game");
    const soundWarning = new Audio (src="/Saving_the_Princess/sound/warning-villain.mp3");
    const soundMushroom = new Audio (src="/Saving_the_Princess/sound/mushroom-winner.mp3");
    const soundThwomp = new Audio (src="/Saving_the_Princess/sound/thwomp-winner.mp3");

    powerHero.src = imagesHero[randomIndexHero];
    powerVillain.src = imagesVillain[randomIndexVillain]; 

    // Comparar los índices para determinar el resultado
    if (randomIndexHero === randomIndexVillain) {
        powerWinner.src = imagesDraw[0];
    } else if (
        (randomIndexHero === 0 && randomIndexVillain === 1) || // Star vs Bomb (gana Hero)
        (randomIndexHero === 1 && randomIndexVillain === 2) || // Flower vs Thwomp (gana Hero)
        (randomIndexHero === 2 && randomIndexVillain === 0)    // Moshroom vs Hammer (gana Hero)
    ) {
        scoreVillain -= 20;
        powerWinner.src = imagesHero[randomIndexHero]; //muestra la imagen escogida aleatoriamente si gana el heroe
        soundMushroom.play();
    } else {
        scoreHero -= 20;
        powerWinner.src = imagesVillain[randomIndexVillain]; //muestra la imagen escogida aleatoriamente si gana el heroe
        soundThwomp.play();
    }

     //Activación de modo tenebroso
    if (scoreHero === 20 && !soundTenebrousPlayed) {
        mainGame.classList.add("tenebrous");
        soundWarning.play();
        soundTenebrousPlayed = true;
        }else if (scoreHero > 20 || scoreHero <= 100) {
        mainGame.classList.remove("tenebrous");
        soundPlayed = false; // Restablece la variable para reproducir en el futuro si el puntaje llega a 80
    }

    updateScore(); // Actualizar la pantalla con los nuevos puntajes
  
}

// Agregar evento de clic a toda la página
document.addEventListener("click", changeImage);


/*Aquí inicia changeImage------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/*Aquí inicia resetGame--------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

//Resetear el juego
function resetGame() {
    scoreHero = 100;
    scoreVillain = 100;

    // Restablecer la barra de salud
    heroHealthBar.style.width = "100%";
    heroHealthBar.style.backgroundColor = "#00FF00";
    villainHealthBar.style.width = "100%";
    villainHealthBar.style.backgroundColor = "#00FF00";

    // Restablecer los puntajes en la pantalla
    heroScoreDisplay.textContent = "100%";
    villainScoreDisplay.textContent = "100%";

    //Restablecer imagen de Princess
    princessBubble.classList.remove("princess-bubble-move");
    princessBubble.style.opacity = "1";
    princessBubble.src = "/Saving_the_Princess/img/princess-bubble.png";
    princess.classList.remove("princess-visible");

    //Restablecer imagen del Heroe
    heroLose.src = ("/Saving_the_Princess/img/hero.png");
    heroLose.style.width ="32%";
    heroLose.style.height = "100%";

    updateScore();
}

/*Aquí termina resetGame--------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

const audios = [];
const soundWarning = new Audio (src="/Saving_the_Princess/sound/warning-villain.mp3");
const soundMushroom = new Audio (src="/Saving_the_Princess/sound/mushroom-winner.mp3");
const soundThwomp = new Audio (src="/Saving_the_Princess/sound/thwomp-winner.mp3");  

document.getElementById("soundOff").addEventListener("click", function() {

    // Agregar los audios al arreglo
    audios.push(soundWarning);
    audios.push(soundMushroom);
    audios.push(soundThwomp);

    for (let i = 0; i < audios.length; i++){
        audios.muted=true;
        audios[i].muted();
    }
});
