
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
});

// setting menu area to hide it

let aside = document.querySelector('aside')
let bottonBar = document.createElement('div')

bottonBar.setAttribute('class', 'botton-bar')
aside.appendChild(bottonBar)

// setting button menu toggle

let [...list] = document.querySelectorAll('.menu li')

list.map(li => {
    if (!(li.classList.value.indexOf('drop') > -1)) {
        li.onclick = hideMenu
    } else {
        li.onclick = () => {
            let lista = li.querySelector('.menu-drop')
            lista.classList.toggle("drop-show")
            lista.onclick = () => lista.classList.toggle("drop-show")
        }
    }
})

bottonBar.onclick = hideMenu
document.querySelector('main').onclick = hideMenu
document.querySelector('header').onclick = hideMenu

function hideMenu(){
    list.map(btn => {
        let lista = btn.querySelector('.menu-drop')
        if (lista != null) lista.classList.remove("drop-show") 
    }) 
}
