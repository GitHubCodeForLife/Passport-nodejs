const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { use } = require('passport');
const { ObjectId} = require('mongodb');
//Load User model 
const User = require('../model/userServices');

module.exports = (passport)=>{

    passport.use(
        new LocalStrategy({usernameField: 'email'},async (email, password, done)=>{
            //Find user
            const user = await User.findOne({email: email});
            if(!user){
                return done(null, false, {message: 'That email is not registered.'});   
            }
            //Macth password
            bcrypt.compare(password, user.password,(err, result)=>{
                if(err) throw err;
                if(result){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'Password incorrect.'});
                }
            });
        })
    );
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });
    passport.deserializeUser(async(id, done)=>{
        console.log('ID user: '+id);
        const user = await User.findOne({_id: new ObjectId(id)});
        return done(null, user);
    });
}