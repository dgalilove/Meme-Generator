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

function setImg(elImg) {
  const id = parseInt(elImg.id.substring(3)) // removes the 'img' and gets the id as a number
  gMeme.selectedImgId = id
}

function getMeme() {
  return gMeme
}
