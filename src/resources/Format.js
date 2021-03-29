
class Format {
    constructor() {

    }
    setData(params) {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        let data = new Date(params)
        let dataFormatada = ((data.getDate() + " " + meses[(data.getMonth())] + " " + data.getFullYear()))
        return dataFormatada
        //saída: 31 Dez 2019
    }

    formatMoeda(moeda) {
        moeda = parseFloat(moeda)
        //com R$
        //let moedaformatR$ = moeda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        //sem R$
        let moedaformat = moeda.toLocaleString('pt-br', { minimumFractionDigits: 2 })
        return moedaformat
    }

    firstUp(str) {
        let newStr
        for (let x in str) {
            if (x <= 0) {
                newStr = str[x].toUpperCase()
            } else {
                newStr += str[x]
            }
        }
        return newStr
    }
}

// Factury
function format(){
    return new Format
} 

module.exports = { format, Format }