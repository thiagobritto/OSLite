
"use strict";

module.exports = function(name,fone,andress,number,code,city,province){
    if (name&&fone&&andress&&number&&code&&city&&province){
        return {
            name : name,
            fone : fone,
            andress : andress,
            number : number,
            code : code,
            city : city,
            province : province
        }
    } else {
        throw 'Error ao momtar clientModel'
    }
}
