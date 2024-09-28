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
  { id: 18, url: "img/18.jpg", keywords: ["pointing", "toy"] }
]

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    { txt: "Insert your top text here", Size: 25, Color: "white", Pos: "top" },
    {
      txt: "Insert your bottom text here",
      Size: 25,
      Color: "white",
      Pos: "bottom",
    },
  ]
}


function getMeme() {
  return gMeme
}

function setImg(elImg) {
  const id = parseInt(elImg.id.substring(3))
  gMeme.selectedImgId = id
  return id
}

function updateCanvas() {
  renderMeme()
  if (getMeme().lines.length > 0) {
    highlightSelectedLine() 
  }
  updateLineText() 
}







function createSentence(line, vertPos) {
  gCtx.font = `${line.Size}px ${line.font || "Impact"}`
  const textWidth = gCtx.measureText(line.txt).width

  line.x = _textPos(line.align, textWidth) 
  line.y = vertPos

  gCtx.fillStyle = line.Color
  gCtx.strokeStyle = "black"
  gCtx.lineWidth = 1
  gCtx.fillText(line.txt, line.x, line.y)
  gCtx.strokeText(line.txt, line.x, line.y)

  line.width = textWidth
  line.height = line.Size
}

function _textPos(align, textWidth) {
  if (align === "left") return 10
  if (align === "right") return gElCanvas.width - textWidth - 10
  return (gElCanvas.width - textWidth) / 2 
}


function highlightSelectedLine() {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]

  gCtx.strokeStyle = "lightgreen"
  gCtx.lineWidth = 2

  gCtx.strokeRect(
    selectedLine.x - 5,
    selectedLine.y - selectedLine.Size, 
    selectedLine.width + 10,
    selectedLine.Size + 5
  )
}



function updateLineText(event, inputText = null ) {
  const selectedLine = getMeme().lines[getMeme().selectedLineIdx]
  const input = document.querySelector("[name=memeText]")

  if (event) {
    if (event.key === "Backspace")
      selectedLine.txt = selectedLine.txt.slice(0, -1)
    else if (event.key.length === 1) selectedLine.txt += event.key
  }

  if (inputText !== null) selectedLine.txt = inputText

  input.value = selectedLine.txt
  renderMeme()
}







function switchLine(){
  if (getMeme().lines.length === 0) return
  getMeme().selectedLineIdx = (getMeme().selectedLineIdx + 1) % getMeme().lines.length
}

function fontUp() {
  getMeme().lines[getMeme().selectedLineIdx].Size += 5
}

function fontDown() {
  getMeme().lines[getMeme().selectedLineIdx].Size -= 5
}

function moveUp(){
  getMeme().lines[getMeme().selectedLineIdx].y -= 10
}
function moveDown(){
  getMeme().lines[getMeme().selectedLineIdx].y += 10

}
function fillStyle() {
  getMeme().lines[getMeme().selectedLineIdx].Color =
    document.querySelector("[name=fill-color]").value
}

function fontStyleChange(event) {
  getMeme().lines[getMeme().selectedLineIdx].font = event.target.value
}

function align(pos) {
  getMeme().lines[getMeme().selectedLineIdx].align = pos
}

function deleteLine(){
  if (getMeme().lines.length === 0) return 

  getMeme().lines.splice(getMeme().selectedLineIdx, 1)

  if (getMeme().lines.length > 0) {
    getMeme().selectedLineIdx = Math.min(getMeme().selectedLineIdx, getMeme().lines.length - 1)
  } else {
    getMeme().selectedLineIdx = 0
  }
}

