const User = require ("../Models/UserSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodemailer=require('nodemailer')

const verifyPass = (pass) =>{
    let charCheck = pass.length > 7 && pass.length < 31;
    let capitalCheck = /[A-Z]/g.test(pass);
    let numberCheck = /[0-9]/g.test(pass);
    let simbolCheck = /[,?!:;.@#%]/g.test(pass)
    return charCheck && capitalCheck &&  numberCheck && simbolCheck
}
const controller = {
    register: async (req,res,next)=>{
        const {name,email,password,repeat} = req.body
        if (password != repeat) return res.status(302).json({msg:"Password doen't match"})

        const user =await User.findOne({email})
        if (user) return res.status(302).json({msg:"The Email already exist"})

        if (!verifyPass(password)) return res.status(302).json({msg:"Create a password with: 7 or more letters, using a capital letter or more, a number and any simbol like #, $, %, @"})

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            name, email, password:passwordHash
        })
            await newUser.save().then(result => {
        
            const accesstoken = createAccessToken({id:newUser._id, email:newUser.email})
            const refreshtoken = createRefreshToken({id: newUser._id, email:newUser.email})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            res.json({accesstoken})
        }).catch(next)
    },
    login: async(req,res,next) => {
        const {email, password} = req.body;
        console.log(email,password)
        const user = await User.findOne({email})

        if(!user) return res.status(302).json({msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(302).json({msg: "Incorrect password."})

        const accesstoken = createAccessToken({id: user._id, email:user.email})
        const refreshtoken = createRefreshToken({id: user._id, email:user.email})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
        res.json({accesstoken})
    },

    logout: async(req,res,next) => {
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
        return res.json({msg: "Logged out"})
    },

    refreshToken: async(req,res,next) =>{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(302).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(302).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id, email:user.email})
            console.log("acceso",accesstoken)
            res.json({accesstoken})
        })
    },
    getUser: async(req,res,next) => {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(302).json({msg: "Error to get user."})

        res.json(user)
    },

    SendEmail: async(req, res, next) => {
         const {email} = req.body;
        console.log("email",email)

         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MESSAGEEMAIL,
              pass: process.env.PASSEMAIL
            }
          });
        let mailOptions = {
            from: process.env.MESSAGEEMAIL,
            to: email,
            subject: 'Por favor llena el formulario:',
            text: 'Completa todos los datos y despues Presiona enviar',
            html: '<p>Click "https://antonioclient.herokuapp.com/form"'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
      });  

      res.json({msg:"Send"})
    }

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = controller