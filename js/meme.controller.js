"use strict"

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  gElCanvas.addEventListener("click", onCanvasClick)
  document.addEventListener("keydown", onEdit)
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

    getMeme().lines.forEach((line) => {
      if (!line.y) {
        if (line.Pos === "top") line.y = 50
        else if (line.Pos === "bottom") line.y = gElCanvas.height - 40
        else line.y = gElCanvas.height / 2
      }

      createSentence(line, line.y)
    })
    highlightSelectedLine()
  }
}

function onCanvasClick(event) {
  const x = event.offsetX
  const y = event.offsetY

  const clickedLine = getMeme().lines.find((line) => {
    let xStart, xEnd

    if (line.align === "left") {
      xStart = line.x 
      xEnd = line.x + line.width 
    } else if (line.align === "right") {
      xStart = gElCanvas.width - line.width - 10 
      xEnd = gElCanvas.width - 10 
    } else {
      xStart = line.x - line.width
      xEnd = line.x + line.width
    }

    return x >= xStart && x <= xEnd && y >= line.y - line.height && y <= line.y
  })

  if (clickedLine) {
    const lineIndex = getMeme().lines.indexOf(clickedLine)
    getMeme().selectedLineIdx = lineIndex
    updateCanvas()
  }
}

function onAddLine() {
  getMeme().lines.push({
    txt: "Insert your text here",
    Size: 30,
    Color: "white",
    Pos: "center", // Default position
    y: gElCanvas.height / 2, // Initial Y position for center lines
  })
  updateCanvas()
}

function onMoveUp() {
  moveUp()
  updateCanvas()
}

function onMoveDown() {
  moveDown()
  updateCanvas()
}

function onDeleteLine() {
  deleteLine()
  updateCanvas()
}

function onSetLineText() {
  const inputText = document.querySelector("[name=memeText]").value
  updateLineText(null, inputText)
  updateCanvas()
}

function onEdit(event) {
  updateLineText(event)
}

function onFillStyle() {
  fillStyle()
  updateCanvas()
}

function onFontUp() {
  fontUp()
  updateCanvas()
}

function onFontDown() {
  fontDown()
  updateCanvas()
}

function onDownload() {
  const dataURL = gElCanvas.toDataURL("image/png")
  const link = document.querySelector(".download-link")
  link.href = dataURL
}

function onSwitchLine() {
  switchLine()
  updateCanvas()
}

function onFontStyleChange(event) {
  fontStyleChange(event)
  updateCanvas()
}

function onAlign(pos) {
  align(pos)
  updateCanvas()
}
