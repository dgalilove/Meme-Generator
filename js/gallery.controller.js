"use strict"

function renderGallery() {
  const elGallery = document.querySelector(".gallery")

  const strHTML = gImgs
    .map((image) => {
      return `<div class="gallery-img">
                <img src="${image.url}" id="img${image.id}" class='meme' onclick="onImgSelect(this)">
              </div>`
    })
    .join("")

  elGallery.innerHTML = strHTML
}

function onImgSelect(elImg) {
  setImg(elImg)
  renderMeme()
}
