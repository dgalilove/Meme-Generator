"use strict"

let gImgs = [
  { id: 1, utl: "img/1.jpg", keywords: ["funny", "trump"] },
  { id: 2, utl: "img/2.jpg", keywords: ["cute", "dogs"] },
]
let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Hello World!",
      Size: 30,
      Color: "white",
    },
  ],
}
let gKeywordSearchCountMap = { funny: 12, cute: 8, dogs: 15 }


function createSentence(startX, startY, endX , endY) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    gCtx.beginPath()
    gCtx.moveTo(startX, startY)
    gCtx.lineTo(endX, endY)
    gCtx.strokeStyle = 'transparent'
    gCtx.stroke()       

    gCtx.fillStyle = selectedLine.Color
    gCtx.font = `${selectedLine.Size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.fillText(selectedLine.txt , (endX - startX)/2, startY)
}

