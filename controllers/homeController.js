const userServices = require('../model/userServices');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.index = (req, res, next)=>{
    res.render('index', { title: 'FastShop' });
}

exports.register =(req, res, next)=> {
    res.render('user/register',{title: 'Register Page'});
}

exports.login =(req, res, next)=> {
    res.render('user/login',{title: 'Login Page'});
}

exports.postRegister = async(req, res, next)=>{
  console.log(req.body);
  //Check errors valid
  let errors = [];
  let {email, password, repeatPassword, name, phoneNumber}=req.body;
  if(password==''){
      errors.push('Password is invalid');
  }
  if(password!=repeatPassword){
        errors.push('Password is not correct');
  }
  if(password.length < 6){
      errors.push('Password is at least 6 characters.');
  }
  if(errors.length>0){
    res.render('user/register',{title: 'Register Page', errors});
  }else{
      //check email exist
      let user = await userServices.findOne({email: email});
      if(user!=null){
        errors.push('Email has registered. Please use another email.')
        res.render('user/register',{title: 'Register Page', errors});
      }else{
        // save into database
        //hash password
         bcrypt.hash(password,saltRounds,async (err, hash)=>{
           if(err) throw err;
           await userServices.insertOne({email: email, password: hash, name: name, phoneNumber: phoneNumber});
          console.log('Inserted One user into database');
        });
        res.redirect('/login');
      }
  }
}
