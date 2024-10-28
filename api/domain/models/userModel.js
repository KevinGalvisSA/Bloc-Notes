const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class User{
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }

    async findByPassportId (passportId) {
        console.log(passportId)
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const [res] = await collection.find({id: passportId}).toArray();
        return res;
    }

    async getNickByNickname(nickname){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const [res] = await collection.find({nick: nickname}).toArray();
        return res;
    }

    async findByNickAndPassword(nickname, password){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const [res] = await collection.find({nick: nickname, password: password}).toArray();
        return res;
    }

    async insert(userData){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.insertOne(userData);
        return res;
    }

    async findPassByIdandUpdate(nickname, hashpassword, upsert){
        let obj =ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario')
        const res = await collection.updateOne({ nick: nickname }, { $set: {password: hashpassword} }, upsert);
        return res;
    }

    async findByIdAndUpdate(id, updateData, upsert){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuario');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }
}

module.exports = User;