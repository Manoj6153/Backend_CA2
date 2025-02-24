const UserModel = require("../Models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const signup = async(req,res) => {
    try{
        const { name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            return res.status(400)
                .json({ message: "User already exists",success: false});
        }
        const userModel = new UserModel({ name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "User created sucessfully",
                success: true
            })
    }catch(err){
        res.status(500)
        .json({
            message: "server error",
            success: false
        })
        console.log(err)
    }
}

const login = async(req,res)=>{
    try{
        const{ email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({message: "User dosn't exists",success: false });
        }
        const isPass = await bcrypt.compare(password,user.password);
        if(!isPass){
            return res.status(403)
                .json({message: "User dosn't exists",success: false });
        }
        const jwToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({
                message: "Login sucessfull",
                success: true,
                jwToken,
                email,
                name: user.name
            })
    }catch(err){
        res.status(500)
        .json({
            message: "server error",
            success: false
        })
        console.log(err)
    }
}

module.exports = {
    signup,
    login}