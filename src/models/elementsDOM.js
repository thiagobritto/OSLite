
const str = require('./strings')()

/**
 * Cria um maniulador de HTMLDOM
 * @class
 * @classdesc manipula elementos DOM
 */

class ElementsDOM {
    
    /**
     * percorre um array de elementos do DOM a serem excluidos
     * @param {[object]} elements ex: [document.getElementById('id'), document.getElementById('id')] 
     */
    clearElements(elements){
        elements.forEach(element => element.parentNode.removeChild(element));
    }

    /**
     * Percorre a coleção HTMLCollection inserindo o texo
     * @param {HTMLCollection} elements ex: document.getElementsByClassName('class') 
     * @param {string} text
     */
    setInElements(elements, text){
        [...elements].forEach(element => element.innerText = str.strFirstUpper(text));
    }
}

module.exports = () => new ElementsDOM()
