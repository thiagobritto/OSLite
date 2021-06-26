
class ElementsDOM {
    clearElements(elements){
        elements.forEach(element => element.parentNode.removeChild(element));
    }    
}

module.exports = () => new ElementsDOM()
