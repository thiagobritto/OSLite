
class Empty{
  
    isEmptyValuesObj(values){
        for (let k in values) if (values[k] == '') return true;
        return false;
    }

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
