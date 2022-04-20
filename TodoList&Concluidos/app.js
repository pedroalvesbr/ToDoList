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
const botaoLimparListaConcluidos = document.querySelector(".botao_del_todos_concluidos")
/* acessa as paletas */
const paleta1= document.getElementById('paleta1');
const paleta2= document.getElementById('paleta2');
const paleta3= document.getElementById('paleta3');


var contador=0;

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
botaoLimparListaConcluidos.addEventListener('click', ()=> removeConcluidos())



function definePaleta(cor){
    alert('vai alterar para '+ cor)
    container.style.background = cor
    listaAtividades.style.background= cor
}

/* Criar as Atividades na Lista */

function criaAtividade(){
    contador=contador+1;

    const atividade = document.createElement("div")
    atividade.classList.add('atividade')
   

    const atividade_texto = document.createElement("div")
    atividade_texto.classList.add('texto_atividade')
    atividade_texto.setAttribute('id','atividade_'+contador)
    atividade_texto.textContent = input.value //define o texto do elemento - guardar o valor inserido pelo usuário
   
   
    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmaAtividade(atividade, atividade_texto))

    const botaoConcluir = document.createElement('button')
    botaoConcluir.textContent = 'OK'
    botaoConcluir.classList.add('botao_concluir')
    botaoConcluir.addEventListener('click', ()=> concluiAtividade(atividade))

   
    listaAtividades.appendChild(atividade)
    atividade.appendChild(atividade_texto)
    atividade.appendChild(botaoLimpar)
    atividade.appendChild(botaoConcluir)
    arrayToDoList.push(atividade_texto.textContent)
   

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
    contador += 1
    const itemConcluido = atividade.textContent.substring(0, atividade.textContent.length -8)  //remove o texto 'limparOk' no final
    if(arrayConcluidos.indexOf(itemConcluido) !== -1){
        alert("Voce ja concluiu essa atividade")
    }else{
    const concluido = document.createElement("div")
    concluido.classList.add('concluido')
    //concluido.setAttribute('id','concluido_'+contador)
   // concluido.textContent = itemConcluido

    const concluido_texto = document.createElement("div")
    concluido_texto.classList.add('texto_concluido')
    concluido_texto.setAttribute('id','concluido_'+contador)
    concluido_texto.textContent = itemConcluido

    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmConcluido(concluido, concluido_texto))


    listaConcluidos.appendChild(concluido)
    concluido.appendChild(botaoLimpar)
    concluido.appendChild(concluido_texto)
    arrayConcluidos.push(concluido_texto.textContent)
    }
}


/* Limpar as atividades e concluidos */

function removeUmConcluido(concluido, concluido_texto){
    let apagarNoArray = concluido_texto.innerHTML
    let indice = arrayConcluidos.indexOf(apagarNoArray)
    arrayConcluidos.splice(indice, 1)

    listaConcluidos.removeChild(concluido)

}

function removeUmaAtividade(atividade,atividade_texto ){
    let apagarNoArray = atividade_texto.innerHTML
    let indice = arrayToDoList.indexOf(apagarNoArray)
    arrayToDoList.splice(indice, 1)
    
    listaAtividades.removeChild(atividade)

}

function removeConcluidos(){
    while(listaConcluidos.firstElementChild){ //enquanto houver elementos filhos
        arrayConcluidos.pop()
        listaConcluidos.removeChild(listaConcluidos.firstElementChild)
    }
}

function removeAtividades(){
    while(listaAtividades.firstElementChild){ //enquanto houver elementos filhos
        arrayToDoList.pop()
        listaAtividades.removeChild(listaAtividades.firstElementChild)
    }
}
