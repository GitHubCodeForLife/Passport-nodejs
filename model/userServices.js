const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.register = async(firstName, lastName, email, moblie, password)=>{
    console.log('Register');
    const usersCollection = await db().collection('users');
    const user = {firsetName: firstName, lastName: lastName, email: email, moblie: moblie, password: password};
    const result = await usersCollection.insertOne(user);
    console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
} 

exports.findOne = async(user)=>{
    console.log('Find one');
    const ans =  await db().collection('users').findOne(user);
    console.dir(ans);
    return ans;
}

exports.insertOne = async(user)=>{
    console.log('Insert One');
    await db().collection('users').insertOne(user);
}