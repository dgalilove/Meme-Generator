"use strict"

let gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "trump"] },
  { id: 2, url: "img/2.jpg", keywords: ["cute", "dogs"] },
]

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Insert your top text here",
      Size: 30,
      Color: "white",
      Pos: "top",
    },
    {
      txt: "Insert your bottom text here",
      Size: 30,
      Color: "white",
      Pos: "bottom",
    },
  ],
}

let gKeywordSearchCountMap = { funny: 12, cute: 8, dogs: 15 }

function createSentence(line, vertPos) {
  gCtx.font = `${line.Size}px Impact` // font size and font style
  const textWidth = gCtx.measureText(line.txt).width // method returns a TextMetrics object that contains information about the measured text(MDN)
  const textHeight = line.Size 

  line.x = gElCanvas.width / 2 - textWidth / 2 - 10 // text pos in canvas horizontallyy
  line.y = vertPos - textHeight //text pos in canvas verticaly
  line.width = textWidth + 20 
  line.height = textHeight + 10

  gCtx.fillStyle = line.Color
  gCtx.textAlign = "center"
  gCtx.fillText(line.txt, gElCanvas.width / 2, vertPos)

  if (line === getMeme().lines[getMeme().selectedLineIdx]) {
    highlightText(line)
  }
}

function setImg(elImg) {
  const id = parseInt(elImg.id.substring(3)) // removes the 'img' and gets the id as a number
  gMeme.selectedImgId = id
}

function getMeme() {
  return gMeme
}

function highlightText(line) {
  gCtx.strokeStyle = "white"
  gCtx.lineWidth = 2
  gCtx.strokeRect(line.x, line.y, line.width, line.height)
}

function setLineText(Pos) {
  const inputName = Pos === "top" ? "topLine" : "bottomLine" // if the postion is top change the top text, else change the bottom text
  const txt = document.querySelector(`[name=${inputName}]`).value
  const line = getMeme().lines.find((line) => line.Pos === Pos)
  if (line) {
    line.txt = txt
  }
}

function fillStyle() {
  const fillColor = document.querySelector("[name=fill-color]").value
  getMeme().lines[getMeme().selectedLineIdx].Color = fillColor
}

function fontUp() {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]
  selectedLine.Size += 5
}

function fontDown() {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]
  selectedLine.Size -= 5
}
