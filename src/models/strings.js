
/**
 * Cria um manipulador de strings
 * @class
 */
class Strings{
  
    /**
     * formata strings com a primeira letra em UpperCase
     * @param {string} str string a ser formatada
     * @returns {string} retorna a string formatada
     */
    strFirstUpper(str){
        return str[0].toUpperCase() + str.substr(1);
    }

}

module.exports = () => new Strings();
