const store = require('./store');

function addMessage(user, message){
    //
    return new Promise  ((resolve, reject) => {
        if (!user || !message) {
            console.error('[messageController] No hay usuario o mensaje')
            reject('datos incorrectos')
            return false
            }
            const fullMessage = {
                user: user,
                message: message,
                date: new Date(),
            }
        
        store.add(fullMessage)
        resolve(fullMessage)
    })
}

function getMessages(filterUser){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    });
}

 function updateMessage(id, message){
    return new Promise( async (resolve, reject) => {
        if (!id || !message) {
            reject('data invalida')
            return false
        }
        
        const result = await store.updateMessage(id, message)

        resolve(result)
    })
}
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
}