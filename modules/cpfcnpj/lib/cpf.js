class Cpf {
    constructor (value) {
        this.value = value
    }
    validate = () => {
        var regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        let formated = this.value.match(regex)
        if (formated == null) {
            return false
        }

        let verifyingDigit = this.value.split('-')[1]
        // somente os 9 primiros dígitos para cálculo
        let arrValue = this.value.replace('-', '').split('.').join('').split('')
        
        /*
        * Cáculo do primeiro dígito verificador
        * Somatório dos 9 primeiros dígitos multiplicandos pela sequência decrescente de 10 à 2
        * O primeiro dígito é igual a 11 menos o módulo da divisão do Somatório por 11
        * Caso o módulo for 10 ou maior, atribui 0
        */
        let count = 0
        let sum = 0
        for (let i = 10; i >= 2; i--) {
            sum = i * arrValue[count] + sum
            count++
        }
        let first = (11 - sum % 11) < 10 ? (11 - sum % 11) : 0
        
        /*
        * Cáculo do segundo dígito verificador
        * Adiciona o primeiro digito ao array
        * Somatório dos 10 primeiros dígitos multiplicandos pela sequência decrescente de 11 à 2
        * O segundo dígito é igual a 11 menos o módulo da divisão do Somatório por 11
        * Caso o módulo for 10 ou maior, atribui 0
        */
        arrValue.push(first)
        count = 0
        sum = 0
        for (let i = 11; i >= 2; i--) {
            sum = i * arrValue[count] + sum
            count++
        }
        let second = (11 - sum % 11) < 10 ? (11 - sum % 11) : 0
        
        return parseInt(verifyingDigit) === parseInt(`${first}${second}`)
    }
}

module.exports = Cpf