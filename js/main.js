'use strict' 

let gImgs = [{id:1 , utl : 'img/1.jpg', keywords: ['funny', 'trump']} , {id:2 , utl : 'img/2.jpg', keywords: ['cute', 'dogs']} ];
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines : [
        {
            txt: 'Hello World!',
            Size: 30,
            Color: 'blue',
        }
    ]
}
let gKeywordSearchCountMap = { 'funny': 12 , 'cute': 8 , 'dogs': 15 };  
