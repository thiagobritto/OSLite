
/**
 * Cria um verificador de valores vazios
 * @class
 */
class Empty{
  
    /**
     * Verifica se os valores do object estão vazios
     * @param {object} obj 
     * @returns {boolean}
     */
    isEmptyValuesObj(obj){
        for (let k in obj) if (obj[k] == '') return true;
        return false;
    }

    /**
     * Verifica se o objeto esta vazio
     * @param {object} obj 
     * @returns {boolean}
     */
    isEmptyObj(obj) {
        for( let prop in obj ) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return JSON.stringify(obj) === JSON.stringify({});
      }
}

module.exports = () => new Empty();
