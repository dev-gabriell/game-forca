import getWord from "./words.js";

const contentBtns = document.querySelector(".btns");
const contentGuessWord = document.querySelector(".guess-word");
const img = document.querySelector("img");
const contentClue = document.querySelector(".clue");
const btnNew = document.querySelector(".new");
let vic = document.querySelector(".num-vic");
let der = document.querySelector(".num-der");
btnNew.onclick = () =>{
    vic.textContent = '0'
    der.textContent = '0'
    init();
} 
let indexImg;

init();
function init(){
    indexImg = 1;
    img.src = `./img/img1.png`//aqui vai a imagem

    generateGuessSection();
    genereteButtons();
}
function generateGuessSection(){ //Nesta função, trocamos a "_" da tela, pela letra escondida atras dela
    contentGuessWord.textContent = "";

    const {word, clue} = getWord();
    const wordWithoutAccent = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    Array.from(wordWithoutAccent).forEach((letter) =>{
        const span = document.createElement("span");
        span.textContent = "_"
        span.setAttribute("word", letter.toUpperCase());
        contentGuessWord.appendChild(span)
    });
    contentClue.textContent = `Dica: ${clue}`
}

function wrongAnswer(){ //Realiza a troca da imagem assim que o jogador errar uma letra
    indexImg++;
    img.src = `./img/img${indexImg}.png`;

    if(indexImg === 7){
        setTimeout(() => {
            alert("Perdeu :/");
            init()
        }, 100);
        der.textContent = parseInt(der.textContent) + 1
    }
}
function verifyLetter(letter){
    const arr = document.querySelectorAll(`[word ="${letter}"]`);

    if(!arr.length) wrongAnswer()
        arr.forEach((e) => {
    e.textContent = letter;
});

const span = document.querySelectorAll(`.guess-word span`);
const won = !Array.from(span).find((span) => span.textContent === "_")

if(won){
    setTimeout(() => {
        alert("Ganhou!!!");
            init();
         }, 100);
         vic.textContent = parseInt(vic.textContent) + 1
    }
}
function genereteButtons(){
    contentBtns.textContent = ""
    for(let i = 97; i < 123; i++){
        const btn = document.createElement("button");
        const letter = String.fromCharCode(i).toUpperCase();
        btn.textContent = letter;
        btn.onclick = () => {
            btn.disabled = true;
            btn.style.background = "gray";
            verifyLetter(letter);
        }
    contentBtns.appendChild(btn)
    }
}



