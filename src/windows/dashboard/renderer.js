
// setting menu area to hide it

let aside = document.querySelector('aside')
let bottonBar = document.createElement('div')

bottonBar.setAttribute('class', 'botton-bar')
aside.appendChild(bottonBar)

// setting button menu toggle

let [...btnDrop] = document.getElementsByClassName('drop')

btnDrop.map( btn => {
    btn.onclick = () => {
        let list = btn.querySelector('.menu-drop')
        list.classList.toggle("drop-show")
    } 
})

bottonBar.onclick = hideMenu
document.querySelector('main').onclick = hideMenu
document.querySelector('header').onclick = hideMenu

function hideMenu(){
    btnDrop.map(btn => {
        let list = btn.querySelector('.menu-drop')
        list.classList.remove("drop-show") 
    }) 
}
