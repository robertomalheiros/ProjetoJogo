

//CRIANDO ELEMENTOS

function novoElemento(tagName, className, src = false){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem}
//CRIANDO Asteroides A PARTIR DOS ELEMENTOS CRIANDO DA FUNÇÃO "novoElemento()"
function Asteroide(reversa = false){
    //LISTA ALEATORIA
    const images = ['./assets/1.png', './assets/2.png', './assets/3.png',
     './assets/4.png', './assets/5.png', './assets/6.png']
    let ind = parseInt(Math.random() * images.length)
    //DEFININDO A DIV ASTEROIDE
    this.elemento = novoElemento('div', 'asteroide')
    //DEFININDO A IMG DENTRO DE ASTEROIDE
    const imagem = novoElemento('img', 'asteroideIMG')
    imagem.src = images[ind]
    //INSERINDO A IMG DENTRO DA DIV 
    this.elemento.appendChild(imagem)
    this.setAltura = altura => imagem.style.top = `${altura}px`

}


  //DEFININDO OS GRUPO DE ASTEROIDES
function GrupoAsteroides(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-asteroides')
//Criando asteroide
    this.meio = new Asteroide()

//Adcionando elementos dentro de par-asteroides
    this.elemento.appendChild(this.meio.elemento)
//Função para sortear a abertura entre os asteroides
    this.sortearAbertura = () => {
        const posicao = Math.random() * (altura - abertura)
        this.meio.setAltura(posicao)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth
    this.sortearAbertura()
    this.setX(x)
  }


function Asteroides(altura, largura, abertura, espaco, notificarPonto){

    this.grupo = [
        new GrupoAsteroides(altura, abertura, largura),
        new GrupoAsteroides(altura, abertura, largura + espaco),
        new GrupoAsteroides(altura, abertura, largura + espaco * 2),
        new GrupoAsteroides(altura, abertura, largura + espaco * 3 )
    ]

    const deslocamento = 3
    this.animar = () => {
        this.grupo.forEach(ast => {
            ast.setX(ast.getX() - deslocamento)

            //elemento saindo da tela
            if(ast.getX() < -ast.getLargura()){
                ast.setX(ast.getX() + espaco * this.grupo.length)
                ast.sortearAbertura()
            }

            const cmeio = largura / 2 
            const cruzou = ast.getX() + deslocamento >= cmeio &&
            ast.getX() < cmeio
            if(cruzou) notificarPonto()
        })
    }

}


/*RECEBENDO TECLAS
document.addEventListener("keyup", (e) => {
	console.log(e.code)
});
*/

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
    this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)

}

function IronNave(){

    let pontos = 0
    const area = document.querySelector('#telagame')
    const altura = area.clientHeight
    const largura = area.clientLeft
    const progresso = new Progresso()
    const asteroides = new Asteroides(altura, largura, 200, 400, 
        () => progresso.atualizarPontos(++pontos)   )
    
    const nave = new Nave(altura)

    area.appendChild(nave.elemento)
    area.appendChild(progresso.elemento)
    asteroides.grupo.forEach(ast => area.appendChild(ast.elemento))
    
    this.start = () => {
        const temp = setInterval(() => {

            asteroides.animar()
            nave.animar()
            }, 20)
    }

}

new IronNave().start()

