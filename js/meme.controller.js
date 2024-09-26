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

    getMeme().lines.forEach((line, idx) => {
      let vertPos
      if (line.Pos === "top") {
        vertPos = 50 // top for the first line
      } else if (line.Pos === "bottom") {
        vertPos = gElCanvas.height - 40 // bottom for the second line
      } else {
        vertPos = gElCanvas.height / 2 // center for new lines
      }

      createSentence(line, vertPos)
    })
  }
}

function onCanvasClick(event) {
  const x = event.offsetX
  const y = event.offsetY

  const clickedLine = getMeme().lines.find((line) => {
    return (
      x >= line.x &&
      x <= line.x + line.width &&
      y >= line.y &&
      y <= line.y + line.height
    )
  })

  if (clickedLine) {
    const lineIndex = getMeme().lines.indexOf(clickedLine)
    getMeme().selectedLineIdx = lineIndex

    // Update the input fields with the selected line's text
    if (clickedLine.Pos === "top") {
      document.querySelector(`[name=topLine]`).value = clickedLine.txt
    } else if (clickedLine.Pos === "bottom") {
      document.querySelector(`[name=bottomLine]`).value = clickedLine.txt
    } else {
      // If new line (without Pos set), add logic for other lines if needed
    }

    renderMeme() // Re-render the meme with the selected line highlighted
  }
}

function onSetLineText(Pos) {
  // put text based on its position
  setLineText(Pos)
  renderMeme()
}

function onFillStyle() {
  // change color
  fillStyle()
  renderMeme()
}

function onFontUp() {
  // font increase
  fontUp()
  renderMeme()
}

function onFontDown() {
  // font decrease
  fontDown()
  renderMeme()
}

function onDownload() {
  // download MEME
  const dataURL = gElCanvas.toDataURL("image/png")
  const link = document.querySelector(".download-link")
  link.href = dataURL
}

function onAddLine() {
  // add new line to the MEME
  getMeme().lines.push({
    txt: "Insert your text here",
    Size: 30,
    Color: "white",
    Pos: "",
  })
  renderMeme()
}

function onSwitchLine() {
  // switch between lines
  getMeme().selectedLineIdx++
  if (getMeme().selectedLineIdx >= getMeme().lines.length) {
    getMeme().selectedLineIdx = 0
  }
  renderMeme()
}

function onEdit(event) {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]

  if (event.key === "Backspace") {
    selectedLine.txt = selectedLine.txt.slice(0, -1)
  } else if (event.key.length === 1) {
    selectedLine.txt += event.key
  }

  renderMeme() // Re-render the canvas
}

function onFontStyleChange(event) {
  fontStyleChange(event)
  renderMeme()
}

function onAlign(pos) {
  align(pos)
  renderMeme()
}
