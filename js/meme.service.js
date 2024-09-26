"use strict"

let gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["explain", "president"] },
  { id: 2, url: "img/2.jpg", keywords: ["cute", "dogs"] },
  { id: 3, url: "img/3.jpg", keywords: ["baby", "cute"] },
  { id: 4, url: "img/4.jpg", keywords: ["cute", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["baby", "funny"] },
  { id: 6, url: "img/6.jpg", keywords: ["history", "funny"] },
  { id: 7, url: "img/7.jpg", keywords: ["baby", "eyes"] },
  { id: 8, url: "img/8.jpg", keywords: ["willy", "funny"] },
  { id: 9, url: "img/9.jpg", keywords: ["baby", "funny"] },
  { id: 10, url: "img/10.jpg", keywords: ["president", "funny"] },
  { id: 11, url: "img/11.jpg", keywords: ["kiss", "funny"] },
  { id: 12, url: "img/12.jpg", keywords: ["point", "famous"] },
  { id: 13, url: "img/13.jpg", keywords: ["famous", "gatsbi"] },
  { id: 14, url: "img/14.jpg", keywords: ["matrix", "face"] },
  { id: 15, url: "img/15.jpg", keywords: ["game of thrones", "explain"] },
  { id: 16, url: "img/16.jpg", keywords: ["funny", "startrek"] },
  { id: 17, url: "img/17.jpg", keywords: ["point", "president"] },
  { id: 18, url: "img/18.jpg", keywords: [" pointing  ", "toy"] },
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

  line.x = gElCanvas.width / 2 - textWidth / 2 - 10 // text pos in canvas horizontally
  line.y = vertPos - textHeight // text pos in canvas vertically
  line.width = textWidth + 20
  line.height = textHeight + 10

  gCtx.fillStyle = line.Color // Set text fill color
  gCtx.strokeStyle = "black" // Set text stroke color (black outline)
  gCtx.lineWidth = 2 // Set the stroke width for the text outline
  gCtx.textAlign = "center"

  // Draw the text with a black outline and filled inside
  gCtx.fillText(line.txt, gElCanvas.width / 2, vertPos)
  gCtx.strokeText(line.txt, gElCanvas.width / 2, vertPos) // Add the black outline

  // Highlight the selected line by drawing a rectangle around it
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
  gCtx.strokeStyle = "black"
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
