

//LILSTA DE IMAGENS

function novoElemento(tagName, className, src = false){
    const elem = document.createElement(tagName)
    elem.className = className
    /*if(src = true){
        const elem = document.createElement(tagName)
        elem.className = className
        elem.src = src
        return elem
    } */
    return elem}

function Barreira(reversa = false){
    const images = ['./assets/1.png', './assets/2.png', './assets/3.png']
    let ind = parseInt(Math.random() * images.length)
    this.elemento = novoElemento('div', 'barreira')
    const imagem = novoElemento('img', 'barreiraIMG')
    imagem.src = images[ind]
    this.elemento.appendChild(imagem)
}

//CRIANDO BARREIRAS A PARTIR DOS ELEMENTOS CRIANDO DA FUNÇÃO "novoElemento()"

  const b = new Barreira()
  document.querySelector('#telagame').appendChild(b.elemento)