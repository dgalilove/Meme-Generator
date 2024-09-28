"use strict"
let isGallery = true 

function renderGallery(images = gImgs) {
  const elGallery = document.querySelector(".gallery")

  if (images.length === 0) {
    elGallery.innerHTML = `<div class="no-images-found">No images were found</div>`
    return
  }

  const strHTML = images
    .map((image) => {
      return `<div class="gallery-img">
                <img src="${image.url}" id="img${image.id}" class='meme' onclick="onImgSelect(this)">
              </div>`
    })
    .join("")

  elGallery.innerHTML = strHTML


  document.body.style.gridTemplateRows = "0.35fr 0.55fr 5fr 3fr 1fr"
  elGallery.style.display = "grid"
  const elEditor = document.querySelector(".editor")
  elEditor.style.display = "none"
}
function onSearch() {
  const searchTerm = document.querySelector("[name=search]").value.toLowerCase()
  const filteredImgs = gImgs.filter((img) =>
    img.keywords.some((keyword) => keyword.includes(searchTerm))
  )
  renderGallery(filteredImgs)
}

function onImgSelect(elImg) {
  setImg(elImg) 
  renderMeme() 

  const elGallery = document.querySelector(".gallery")
  const elEditor = document.querySelector(".editor")
  const elSearch = document.querySelector(".search")
  const elBio = document.querySelector(".bio")

  elGallery.style.display = elSearch.style.display = elBio.style.display = "none"

  elEditor.style.display = "grid" 

  isGallery = false

  document.body.style.gridTemplateRows = "1fr 5fr 2fr"
}

function toggleGallery() {
  const elGallery = document.querySelector(".gallery")
  const elEditor = document.querySelector(".editor")
  const elSearch = document.querySelector(".search")
  const elBio = document.querySelector(".bio")


  elGallery.style.display = "grid" 
  elSearch.style.display = "flex" 
  elBio.style.display = "grid" 

  elEditor.style.display = "none"

  // Update the state to reflect we're back in the gallery
  isGallery = true

  // Adjust grid layout if necessary
  document.body.style.gridTemplateRows = "0.35fr 0.55fr 5fr 3fr 1fr" // For gallery
}
