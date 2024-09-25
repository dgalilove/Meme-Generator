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

    getMeme().lines.forEach((line, idx) => {
      let vertPos // vertical position

      if (line.Pos === "") {
        vertPos = gElCanvas.height / 2 // all the new lines will be placed at the center
      } else {
        vertPos = idx === 0 ? 50 : gElCanvas.height - 40 // if the index is 0 top line is 50 else......
      }

      // Measure the text width and height
      gCtx.font = `${line.Size}px Impact`
      const textWidth = gCtx.measureText(line.txt).width
      const textHeight = line.Size

      if (idx === getMeme().selectedLineIdx) {
        // highlight the selected line
        gCtx.strokeStyle = "red"
        gCtx.lineWidth = 2
        gCtx.strokeRect(
          // method of the Canvas 2D draws a rectangle that is stroked (outlined)
          gElCanvas.width / 2 - textWidth / 2 - 10, //x
          vertPos - textHeight, // y
          textWidth + 20, // width
          textHeight + 10 // height
        )
      }

      gCtx.fillStyle = line.Color // draw the text itself
      gCtx.textAlign = "center"
      gCtx.fillText(line.txt, gElCanvas.width / 2, vertPos)
    })
  }
}

function createSentence(position, vertPos) {
  const line = getMeme().lines.find((line) => line.Pos === position)
  if (line) {
    //if the line really exists
    gCtx.fillStyle = line.Color
    gCtx.font = `${line.Size}px Impact`
    gCtx.textAlign = "center"
    gCtx.fillText(line.txt, gElCanvas.width / 2, vertPos)
  }
}

function onSetLineText(Pos) {
  const inputName = Pos === "top" ? "topLine" : "bottomLine" // if the postion is top change the top text, else change the bottom text
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
  getMeme().lines[getMeme().selectedLineIdx].Color = fillColor
  renderMeme()
}

function onFontUp() {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]
  selectedLine.Size += 5
  renderMeme()
}

function onFontDown() {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]
  selectedLine.Size -= 5
  renderMeme()
}

function onDownload() {
  const dataURL = gElCanvas.toDataURL("image/png")
  const link = document.querySelector(".download-link")
  link.href = dataURL
}

function onAddLine() {
  getMeme().lines.push({
    txt: "Insert your text here",
    Size: 30,
    Color: "white",
    Pos: "",
  })
  renderMeme()
}

function onSwitchLine() {
  getMeme().selectedLineIdx++
  if (getMeme().selectedLineIdx >= getMeme().lines.length) {
    getMeme().selectedLineIdx = 0
  }
  renderMeme()
}
