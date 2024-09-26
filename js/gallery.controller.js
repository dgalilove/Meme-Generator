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

  const elGallery = document.querySelector(".gallery")
  const elSearch = document.querySelector(".search")
  const elBio = document.querySelector(".bio")
  elGallery.style.display = "none"
  elSearch.style.display = "none"
  elBio.style.display = "none"

  
  const elEditor = document.querySelector(".editor")
  elEditor.style.display = "block"
}
