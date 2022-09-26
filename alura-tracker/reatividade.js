const projeto = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}


const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor) {
        console.log(`Alguem pediu a ${chave} do projeto`)
        return Reflect.get(objetoOriginal, chave, receptor)
    },
    set(objetoOriginal, chave, valor) {
        console.log(`Alguem alterou a ${chave} do projeto para o valor ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = "Reatividade é legal"

console.log(proxy.descricao)