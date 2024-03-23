const UserModel = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// ---------------create a new user---------------
 const  registerUser = async(req, res)=>{
    const userModel = new UserModel(req.body);
    userModel.password  = await bcrypt.hash(req.body.password, 10);
    try{
        const response = await userModel.save();
        response.password = undefined;
        return response.status(201).json({message:'success', data:response});
    }catch(err){
        return res.status(500).json({message:'error', err});
     }
 }

// ---------------login a user---------------

const loginUser = async(req, res)=>{
try{
    const user = await UserModel.findOne({email:req.body.email});
    if(!user){
        return res.status(401).json({message:'Auth failed, invaled username/password'});
    }

    const isPassEqual = await bcrypt.compare(req.body.password, user.password);
    if(!isPassEqual){
        return res.status(401).json({message:'Auth failed, Invalid password'});
    }

    const tokenObject = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn:'1h'});
    return res.status(200).cookie("jsontoken",jwtToken).json({jwtToken, tokenObject});
    }catch(err){
        return res.status(500).json({message:'error', err});
    }   
}

// ---------------get all users---------------

const getAllUsers = async(req, res)=>{
    try{
        const users = await UserModel.find();
        return res.status(200).json({message:'success', data:users});
    }catch(err){
        return res.status(500).json({message:'error', err});
    }
}

module.exports = { registerUser, loginUser , getAllUsers };


