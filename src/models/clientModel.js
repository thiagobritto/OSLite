
class ClientModel{

    setName (name){
        this.name = name 
    }
    getName (){
        return this.name 
    }
    setFone(fone){
        this.fone = fone
    }
    getFone(){
        return this.fone
    }

    setAndress(andress){
        this.andress = andress
    }
    getAndress(){
        return this.andress
    }

    setNumber(number){
        this.number = number
    }
    getNumber(){
        return this.number
    }

    setCode(code){
        this.code = code
    }
    getCode(){
        return this.code
    }

    setCity(city){
        this.city = city
    }
    getCity(){
        return this.city
    }

    setProvince(province){
        this.province = province
    }
    getProvince(){
        return this.province
    }

}

module.exports = () => new ClientModel()
