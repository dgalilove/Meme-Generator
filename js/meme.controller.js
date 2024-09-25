let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector("canvas")
  console.log(gElCanvas)
  gCtx = gElCanvas.getContext("2d")
  renderMeme()
  renderGallery()
}



function renderMeme() {
  const elMeme = new Image()
  elMeme.src = `img/${getMeme().selectedImgId}.jpg`
  elMeme.onload = () => {
    gElCanvas.height =
      (elMeme.naturalHeight / elMeme.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elMeme, 0, 0, gElCanvas.width, gElCanvas.height)
    createSentence(20, 30, gElCanvas.width - 20, 30)
  }
}



function setLineText(){
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    const txt = document.querySelector('[name=TopLine]').value
    selectedLine.txt = txt
    renderMeme()
}

function getMeme() {
    return gMeme
}


