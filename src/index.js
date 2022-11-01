

//CRIANDO ELEMENTOS

function novoElemento(tagName, className, src = false){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem}
//CRIANDO BARREIRAS A PARTIR DOS ELEMENTOS CRIANDO DA FUNÇÃO "novoElemento()"
function Asteroide(reversa = false){
    //LISTA ALEATORIA
    const images = ['./assets/1.png', './assets/2.png', './assets/3.png']
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
        new ParDeAsteroides(altura, abertura, largura + abertura * 2),
        new ParDeAsteroides(altura, abertura, largura + abertura * 3 )
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
const barreiras = new Barreiras(700, 1200, 200, 400)
const area = document.querySelector('#telagame')
console.log(barreiras)
barreiras.grupo.forEach(bar => area.appendChild(bar.elemento))

setInterval(() => {
    barreiras.animar()
}, 20)
