let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector("canvas")
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

    createSentence("top", 50)
    createSentence("bottom", gElCanvas.height - 40)
  }
}

function createSentence(position, vertPos) {
  const line = getMeme().lines.find((line) => line.Pos === position)
  if (line) {
    gCtx.fillStyle = line.Color
    gCtx.font = `${line.Size}px Impact`
    gCtx.textAlign = "center"
    gCtx.fillText(line.txt, gElCanvas.width / 2, vertPos)
  }
}

function onSetLineText(Pos) {
  const inputName = Pos === "top" ? "topLine" : "bottomLine"
  const txt = document.querySelector(`[name=${inputName}]`).value
  const line = getMeme().lines.find((line) => line.Pos === Pos)
  if (line) {
    line.txt = txt
  }
  renderMeme()
}

// Change text color
function onFillStyle() {
  const fillColor = document.querySelector("[name=fill-color]").value
  getMeme().lines.forEach((line) => (line.Color = fillColor))
}

function onFontUp() {
  getMeme().lines.forEach((line) => (line.Size += 5))
  renderMeme()
}

function onFontDown() {
  getMeme().lines.forEach((line) => (line.Size -= 5)) 
  renderMeme()
}
function onDownload() {
  const dataURL = gElCanvas.toDataURL("image/png")
  const link = document.querySelector(".download-link")
  link.href = dataURL
}
