const FormUser = require ("../Models/FormSchema")
const nodemailer=require('nodemailer')


const findWord = (address,age,email) =>{
    let guadalajaraCheck = address.toLowerCase(),
    zapopanCheck = address.toLowerCase(),
    tlaquepaqueCheck = address.toLowerCase(),
    tonalaCheck = address.toLowerCase(),
    saltoCheck = address.toLowerCase(),
    tlajomulcoCheck = address.toLowerCase();

    guadalajaraCheck = RegExp('\\b'+ 'guadalajara' +'\\b').test(guadalajaraCheck);
    zapopanCheck = RegExp('\\b'+ 'zapopan' +'\\b').test(zapopanCheck);
    tlaquepaqueCheck = RegExp('\\b'+ 'tlaquepaque' +'\\b').test(tlaquepaqueCheck);
    tonalaCheck = RegExp('\\b'+ 'tonala' +'\\b').test(tonalaCheck);
    saltoCheck = RegExp('\\b'+ 'salto' +'\\b').test(saltoCheck);
    tlajomulcoCheck = RegExp('\\b'+ 'tlajomulco' +'\\b').test(tlajomulcoCheck);


    let ageCheck = age > 30 && age <= 120;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MESSAGEEMAIL,
          pass: process.env.PASSEMAIL
        }
      });

    if(!guadalajaraCheck && !zapopanCheck && !tlaquepaqueCheck && !tonalaCheck && !saltoCheck && !tlajomulcoCheck || !ageCheck){
        let mailOptions = {
            from: process.env.MESSAGEEMAIL,
            to: email,
            subject: 'Thank you :C',
            text: 'Thank you to respond the form but you dont coincides with our requeriments',
        };

        transporter.sendMail(mailOptions, function(error, info){ 
            if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
        }); 

    } else {
            mailOptions = {
            from: process.env.MESSAGEEMAIL,
            to: email,
            subject: 'Congratulations :D',
            text: ' you are eligible for a promotion.',
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {console.log(error); } else { console.log('Email sent: ' + info.response); }
        }); 
    } 

    
    return guadalajaraCheck && zapopanCheck && tlaquepaqueCheck && tonalaCheck &&saltoCheck && tlajomulcoCheck || ageCheck
}
const controller = {
    postForm: async (req,res,next)=>{
        let {name,email,rcfe,address,age} = req.body

        if (!name || !email || !rcfe || !address || !age ) return res.status(302).json({msg:"Complete all data"}) 
        if (!findWord(address,age,email)) return res.status(302).json({msg:"We have sent you a email"})  
        age = parseInt(age)
    
        const newForm = new FormUser({ name,email,rcfe,address,age })
        await newForm.save().then(()=>{
            res.json({msg:"Saved"})
        }).catch(next) 
    },

    getForm : async (req,res)=>{
        await FormUser.find().then(result=>{
             res.json(result)
        })
    }
}

module.exports = controller

