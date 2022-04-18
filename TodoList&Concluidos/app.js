/* seleciona a div mais externa - a que vamos mudar o background */
const container = document.querySelector(".container")
/* acessar a lista de atividades */
const listaAtividades = document.querySelector(".lista_atividades")
/* acessar a lista de Concluidos */
const listaConcluidos = document.querySelector(".listaConcluidos")
/* input de atividades */
const input = document.querySelector(".input")
/* erro */
const erro = document.querySelector(".erro")
/* botão de cadastrar que aciona a função cadastrarAtividade() */
const botaoCadastra = document.querySelector(".botao_adc")
/* botão Limpar Lista */
const botaoLimparLista = document.querySelector(".botao_del_todos")
/* acessa as paletas */
const paleta1= document.getElementById('paleta1'); 
const paleta2= document.getElementById('paleta2');
const paleta3= document.getElementById('paleta3');


/* Arrays */
const arrayToDoList = []
const arrayConcluidos = []


//botão de mudar cores
paleta1.addEventListener('click', () => definePaleta('seagreen') )
paleta2.addEventListener('click', () => definePaleta('slateblue'))
paleta3.addEventListener('click', () => definePaleta('tomato'))

//botão (+) de adicionar atividade
botaoCadastra.addEventListener('click', ()=> cadastraAtividade())
//limpar lista
botaoLimparLista.addEventListener('click',()=> removeAtividades())
/* botao limpar linha individual */



function definePaleta(cor){
    alert('vai alterar para '+ cor)
    container.style.background = cor
    listaAtividades.style.background= cor
}

/* Criar as Atividades na Lista */

function criaAtividade(){
    const atividade = document.createElement("div")
    atividade.classList.add('atividade')
    const nomeAtividade = document.createElement('p')
    atividade.textContent = input.value //define o texto do elemento - guardar o valor inserido pelo usuário
    arrayToDoList.push(atividade.textContent)
    
    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmaAtividade(atividade))

    const botaoConcluir = document.createElement('button')
    botaoConcluir.textContent = 'OK'
    botaoConcluir.classList.add('botao_concluir')
    botaoConcluir.addEventListener('click', ()=> concluiAtividade(atividade))

    
    listaAtividades.appendChild(atividade)
    atividade.appendChild(nomeAtividade)
    atividade.appendChild(botaoLimpar)
    atividade.appendChild(botaoConcluir)
    

}


function cadastraAtividade(){
    if(input.value.length > 3){
        erro.style.display = "none";
        criaAtividade();

    }else{
        erro.style.display = "grid";
        erro.innerHTML = `${input.value} não é uma atividade válida!`
    }
    limpaInput();
}



window.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        cadastraAtividade();
    }
});

function limpaInput(){
    input.value = "";
}


console.log(arrayToDoList)
console.log(arrayConcluidos)

/* Conclui atividades */

function concluiAtividade(atividade){
    const itemConcluido = atividade.textContent.substring(0, atividade.textContent.length -8)  //remove o texto 'limparOk' no final
    

    const concluido = document.createElement("div")
    concluido.classList.add('concluido')
    concluido.textContent = itemConcluido

    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmConcluido(concluido))


    listaConcluidos.appendChild(concluido)
    concluido.appendChild(botaoLimpar)
    arrayConcluidos.push(concluido.textContent.substring(0, concluido.textContent.length -6)) //remove o 'limpar' do final
}



/* Limpar as atividades e concluidos */

function removeUmConcluido(concluido){
    listaConcluidos.removeChild(concluido)
}


function removeUmaAtividade(atividade){
    listaAtividades.removeChild(atividade)

}

function removeAtividades(){
    while(listaAtividades.firstElementChild){ //enquanto houver elementos filhos
        listaAtividades.removeChild(listaAtividades.firstElementChild)
    }
}








