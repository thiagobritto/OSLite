
class Strings{
  
    strFirstUpper(str){
        return str[0].toUpperCase() + str.substr(1);
    }

}


module.exports = () => new Strings();
