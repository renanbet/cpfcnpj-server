class Cnpj {
  constructor(value) {
    this.value = value
  }
  validate = () => {
    var regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
    let formated = this.value.match(regex)
    if (formated == null) {
      return false
    }
    let verifyingDigit = this.value.split('-')[1]
    // somente os 12 primeiros dígitos para cálculo e invertidos
    let arrValue = this.value
      .split('-')[0]
      .replace('-', '')
      .replace('/', '')
      .split('.')
      .join('')
      .split('')
      .reverse()
    /*
     * Cáculo do primeiro dígito verificador
     * Somatório dos 12 primeiros dígitos multiplicandos pela sequência decrescente de 2 à 9
     * O primeiro dígito é igual a 11 menos o módulo da divisão do Somatório por 11
     * Caso maior que 9, atribui 0
     */
    let count = 0
    let sum = 0
    for (let i = 2; i <= 13; i++) {
      let mult = i < 10 ? i : i - 8 // se maior que 9 então inicia em 2 novamente
      sum = mult * arrValue[count] + sum
      count++
    }
    let first = 11 - (sum % 11) < 10 ? 11 - (sum % 11) : 0
    /*
     * Cáculo do segundo dígito verificador
     * Adiciona o primeiro digito ao array
     * Somatório dos 13 primeiros dígitos multiplicandos pela sequência decrescente de 2 à 9
     * O segundo dígito é igual a 11 menos o módulo da divisão do Somatório por 11
     * Caso maior que 9, atribui 0
     */
    arrValue = [first].concat(arrValue)
    count = 0
    sum = 0
    for (let i = 2; i <= 14; i++) {
      let mult = i < 10 ? i : i - 8 // se maior que 9 então inicia em 2 novamente
      sum = mult * arrValue[count] + sum
      count++
    }
    let second = 11 - (sum % 11) < 10 ? 11 - (sum % 11) : 0
    return parseInt(verifyingDigit) === parseInt(`${first}${second}`)
  }
}

module.exports = Cnpj
