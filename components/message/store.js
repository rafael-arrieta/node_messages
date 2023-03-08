const db = require('mongoose');
const Model = require('./model');

const uri = 'mongodb://user:user1234@ac-2uprzrt-shard-00-00.rysf5at.mongodb.net:27017,ac-2uprzrt-shard-00-01.rysf5at.mongodb.net:27017,ac-2uprzrt-shard-00-02.rysf5at.mongodb.net:27017/?ssl=true&replicaSet=atlas-my5t56-shard-0&authSource=admin&retryWrites=true&w=majority';

db.Promise = global.Promise;

db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[db] Conectada con éxito'))
  .catch(err => console.error('[db]', err));

async function addMessage(message){
    //list.push(message);
    const myMessage = new Model (message)
    await myMessage.save();
}

async function getMessages(){
    //return list
    const messages = await Model.find()
    return messages
}

async function updateMessage(id, message){
    const foundMessage = await Model.findOne({
        _id: id,
    })

    foundMessage.message = message;
    const newMessage = await foundMessage.save();

    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateMessage: updateMessage,
    // get
    // update
    // delete
}