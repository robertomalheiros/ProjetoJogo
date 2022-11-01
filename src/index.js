

//CRIANDO ELEMENTOS

function novoElemento(tagName, className, src = false){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem}
//CRIANDO BARREIRAS A PARTIR DOS ELEMENTOS CRIANDO DA FUNÇÃO "novoElemento()"
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
    //INSERINDO A IMG DENTRO DA DIV BARREIRA
    this.elemento.appendChild(imagem)
    this.setAltura = altura => imagem.style.top = `${altura}px`

}

//CHAMANDO TESTE DE ELEMENTOS
  //const b = new Asteroide()
  //document.querySelector('#telagame').appendChild(b.elemento)

  //DEFININDO OS PARES DE ASTEROIDES
function ParDeAsteroides(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-asteroides')
//Criando asteroide superior e inferior
    //this.superior = new Asteroide()
    //this.inferior = new Asteroide()
    this.meio = new Asteroide()

//Adcionando elementos dentro de par-asteroides
    //this.elemento.appendChild(this.superior.elemento)
    //this.elemento.appendChild(this.inferior.elemento)
    this.elemento.appendChild(this.meio.elemento)
//Função para sortear a abertura entre os asteroides
    this.sortearAbertura = () => {
        //const alturaSuperior = Math.random() * (altura - abertura)
        //const alturaInferior = altura - abertura - alturaSuperior
        //this.superior.setAltura(alturaSuperior)
        //this.inferior.setAltura(alturaInferior)
        const posicao = Math.random() * (altura - abertura)
        this.meio.setAltura(posicao)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth
    this.sortearAbertura()
    this.setX(x)
  }

//TESTANDO PARES DE ASTEROIDES
//const b = new ParDeAsteroides(700, 300, 600)
//console.log(b.elemento)
//document.querySelector('#telagame').appendChild(b.elemento)
function Barreiras(altura, largura, abertura, espaco, notificarPonto){

    this.grupo = [
        new ParDeAsteroides(altura, abertura, largura),
        new ParDeAsteroides(altura, abertura, largura + espaco),
        new ParDeAsteroides(altura, abertura, largura + espaco * 2),
        new ParDeAsteroides(altura, abertura, largura + espaco * 3 )
    ]

    const deslocamento = 3
    this.animar = () => {
        this.grupo.forEach(bar => {
            bar.setX(bar.getX() - deslocamento)

            //elemento saindo da tela
            if(bar.getX() < -bar.getLargura()){
                bar.setX(bar.getX() + espaco * this.grupo.length)
                bar.sortearAbertura()
            }

            const cmeio = largura / 2 
            const cruzou = bar.getX() + deslocamento >= cmeio &&
            bar.getX() < cmeio
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
//TESTANDO MOVIMENTO
const barreiras = new Barreiras(700, 1200, 200, 400)
const area = document.querySelector('#telagame')
barreiras.grupo.forEach(bar => area.appendChild(bar.elemento))
const nave = new Nave(700)
area.appendChild(nave.elemento)


setInterval(() => {
    barreiras.animar()
    nave.animar()
}, 20)