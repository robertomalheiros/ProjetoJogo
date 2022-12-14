//CRIANDO ELEMENTOS

function novoElemento(tagName, className, src = false){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem}
//CRIANDO Asteroides A PARTIR DOS ELEMENTOS CRIANDO DA FUNÇÃO "novoElemento()"
function Asteroide(reversa = false){
    //LISTA ALEATORIA
    const images = ['./assets/1.png', './assets/2.png', './assets/3.png',
     './assets/4.png', './assets/5.png', './assets/7.png', './assets/8.png', 
     './assets/9.png', './assets/10.png']
    let ind = parseInt(Math.random() * images.length)
    //DEFININDO A DIV ASTEROIDE
    this.elemento = novoElemento('img', 'asteroide')
    this.elemento.src = images[ind]
    this.setPosicao = posicao => this.elemento.style.top = `${posicao}px`

}

  //DEFININDO OS GRUPO DE ASTEROIDES
function GrupoAsteroides(altura, abertura, x){
    this.elemento = novoElemento('div', 'asteroides')
//Criando asteroide
    this.meio = new Asteroide()

//Adcionando elementos dentro da class .asteroides
    this.elemento.appendChild(this.meio.elemento)
//Função para sortear a abertura entre os asteroides
    this.sortearAbertura = () => {
        const posicao = Math.random() * (altura - abertura)
        this.meio.setPosicao(posicao)
    }

    // PEGANDO A POSIÇÃO DE X
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]) 
    //SETANDO A POSIÇÃO DO ELEMENTO 
    this.setX = x => this.elemento.style.left = `${x}px`
    //BUSCANDO O A LARGURA DA TELA
    this.getLargura = () => this.elemento.clientWidth
    //SORTEANDO A ABERTURA INICIAL DOS ASTEROIDES
    this.sortearAbertura()
    //SETANDO A POSIÇÃO DE X
    this.setX(x)
  }

function Asteroides(altura, largura, abertura, espaco, notificarPonto){

    this.grupo = [
        new GrupoAsteroides(altura, abertura, largura),
        new GrupoAsteroides(altura, abertura, largura + espaco),
        new GrupoAsteroides(altura, abertura, largura + espaco * 2),
        new GrupoAsteroides(altura, abertura, largura + espaco * 3),
        new GrupoAsteroides(altura, abertura, largura + espaco * 4),
        new GrupoAsteroides(altura, abertura, largura + espaco * 5),
        new GrupoAsteroides(altura, abertura, largura + espaco * 6),
        new GrupoAsteroides(altura, abertura, largura + espaco * 7),
        new GrupoAsteroides(altura, abertura, largura + espaco * 8),
    ]

    const deslocamento = 4
//ANIMANDO OS ASTEROIDES
    this.animar = () => {
        //FAZENDO UM FOR NAS INSTÂNCIAS 
        this.grupo.forEach(ast => {
//SETANDO UMA NOVA POSIÇÃO PARA CADA INSTÂNCIA(ASTEROIDE)
//POSIÇÃO ATUAL MENOS O DESLOCAMENTO 
            ast.setX(ast.getX() - deslocamento)
            
            //MOVENDO O ASTEROIDE QUE SAIU
            if(ast.getX() < -ast.getLargura()){
// JOGANDO O ASTEROIDE PARA O INICIO X + ESPAÇO(EM PIXELS) * O NÚMERO DE ELEMENTOS DO GRUPO
                ast.setX(ast.getX() + espaco * this.grupo.length)
                //SORTEANDO A NOVA ORDEM DOS ASTEROIDES
                ast.sortearAbertura()
            }
//CALCULA SE O ASTEROIDE CRUZOU O MEIO
            const cmeio = largura / 2 
            const cruzou = ast.getX() + deslocamento >= cmeio &&
            ast.getX() < cmeio
            if(cruzou) notificarPonto()  
        })
    }
}

function Nave(alturaJogo){

    let voando = false
    this.elemento = novoElemento('img', 'nave')
    this.elemento.src = "./assets/nave1.gif" 

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.elemento.clientHeight

        if(novoY <= 0){
            this.setY(0)    
        }else if (novoY >= alturaMaxima){

            this.setY(alturaMaxima)    
        }else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

function Progresso(){

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
    this.elemento.innerHTML = pontos}
    this.atualizarPontos(0)

}

function Sobreposicao(elemA, elemB){
    //BUSCANDO A CAIXA RETANGULAR DOS DOIS ELEMENTOS
    const caixaA = elemA.getBoundingClientRect()
    const caixaB = elemB.getBoundingClientRect()

    //DEFININDO DISTANCIA A DIREITA, LARGURA E ALTURA DE A E B 
    const aEsquerdaA = caixaA.left
    const laguraCaixaA = caixaA.width
    const aEsquerdaB = caixaB.left
    const larguraCaixaB = caixaB.width
    const aCimaA = caixaA.top
    const alturaCaixaA = caixaA.height
    const aCimaB = caixaB.top
    const alturaCaixaB = caixaB.height


    //DEFININDO SOBREPOSICAO
    const horizontal = aEsquerdaA + laguraCaixaA >= aEsquerdaB &&
        aEsquerdaB + larguraCaixaB >= aEsquerdaA
    const vertical = aCimaA + alturaCaixaA >= aCimaB &&
        aCimaB + alturaCaixaB >= aCimaA
    return horizontal && vertical        
}

function colisao(nave, asteroides){

    let colidiu = false

    asteroides.grupo.forEach(asteroides => {
        //SE NÃO COLIDIU AINDA     
        if(!colidiu){
            const asteroideA = asteroides.meio.elemento
            colidiu = Sobreposicao(nave.elemento, asteroideA)
        }
    })
    return colidiu
}

function IronNave(){

    let pontos = 0
    const area = document.querySelector('#telagame')
    const altura = area.clientHeight
    const largura = area.clientWidth
    const progresso = new Progresso()
    const asteroides = new Asteroides(altura, largura, 50, 300, 
        () => progresso.atualizarPontos(++pontos)   )
    
    const nave = new Nave(altura)

    area.appendChild(nave.elemento)
    area.appendChild(progresso.elemento)
    asteroides.grupo.forEach(ast => area.appendChild(ast.elemento))
    const audio = new Audio('./assets/batida.mp3')
    this.start = () => {
        const temp = setInterval(() => {

            asteroides.animar()
            nave.animar()
            //PARANDO TEMPORIZADOR
            if(colisao(nave, asteroides)){
                clearInterval(temp)
                audio.play()
                setTimeout(() => {
                    alert('Game Over!!')
                    
                }, 200)
                setTimeout(() => {
                    document.location.reload(true);
                    
                }, 1000)
                
            }

            }, 20)
    }

}


let playgame = document.querySelector("#play")

playgame.addEventListener("click", () => {
    new IronNave().start()
    playgame.style.display = "none";

});


const trilha = new Audio('./assets/trilha.mp3')

let playmusic = document.querySelector("#playmusic")
let stopmusic = document.querySelector("#stopmusic")

playmusic.addEventListener("click", () => {
    clearInterval()
    trilha.play()
    setTimeout(trilha.play(), 240000)
    stopmusic.style.display = "flex";
    playmusic.style.display = "none";
});
stopmusic.addEventListener("click", () => {
    trilha.pause()
    playmusic.style.display = "flex";
    stopmusic.style.display = "none";
});

