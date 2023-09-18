export const generateProductErrorInfo = product => {
    return `
    Uno o mas parametros estan incompletos o no son validos.
    Lista de properties obligatorios: 
    - title: Must be a String (${product.title}})
    - description: Must be a String (${product.description}})
    - code: Must be a String. (${product.code})
    - price: Must be a Number. (${product.price})
    - status: Must be a Boolean. (${product.status})
    - stock: Must be a Number. (${product.stock})
    - category: Must be a String. (${product.category})
    `
}
