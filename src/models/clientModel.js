
class ClientModel{

    setName (name){
        this.name = name 
        return this
    }
    getName (){
        return this.name 
    }

    setFone(fone){
        this.fone = fone
        return this
    }
    getFone(){
        return this.fone
    }

    setAndress(andress){
        this.andress = andress
        return this
    }
    getAndress(){
        return this.andress
    }

    setNumber(number){
        this.number = number
        return this
    }
    getNumber(){
        return this.number
    }

    setCode(code){
        this.code = code
        return this
    }
    getCode(){
        return this.code
    }

    setCity(city){
        this.city = city
        return this
    }
    getCity(){
        return this.city
    }

    setProvince(province){
        this.province = province
        return this
    }
    getProvince(){
        return this.province
    }

}

module.exports = () => new ClientModel()
