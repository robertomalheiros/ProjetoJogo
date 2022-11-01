

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
    console.log(this.setAltura())
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
        console.log(posicao)

        this.meio.setAltura(posicao)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth
    this.sortearAbertura()
    this.setX(x)
  }

//TESTANDO PARES DE ASTEROIDES
const b = new ParDeAsteroides(700, 300, 600)
console.log(b.elemento)
document.querySelector('#telagame').appendChild(b.elemento)
