
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
    clearElements(elements) {
        elements.forEach(element => element.parentNode.removeChild(element));
    }

    /**
     * Percorre a coleção HTMLCollection inserindo o texo
     * @param {HTMLCollection} elements ex: document.getElementsByClassName('class') 
     * @param {string} text
     */
    setInElements(elements, text) {
        [...elements].forEach(element => element.innerText = str.strFirstUpper(text));
    }

    setClick(elements, callback) {
        elements.onclick = callback
    }

    setClickInCollection(elements, callback) {
        [...elements].forEach(element => element.onclick = callback);
    }

    getAttributeData(element, nameAttrData) {
        return element.getAttribute(`data-${nameAttrData}`)
    }

    setElementCheck(element, nameAttrData) {
        if (element.innerText == 'check') {
            element.innerText = 'check_box_outline_blank'
            element.setAttribute(`data-${nameAttrData}`, 1)
        } else {
            element.innerText = 'check'
            element.setAttribute(`data-${nameAttrData}`, 0)
        }
    }

    msg(element, msg, color) {
        element.innerText = msg
        element.style.color = color
        element.classList.add('errorShow')
        setTimeout(this.msgClear, 3000, element)
    }

    msgError(element, msg) {
        this.msg(element, msg, 'red')
    }

    msgSucess(element, msg) {
        this.msg(element, msg, 'blue')
    }

    msgClear(element) {
        element.classList.remove('errorShow')
    }

}

module.exports = () => new ElementsDOM()
