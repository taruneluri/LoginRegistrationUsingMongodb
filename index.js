const express=require('express');
const mongoose=require('mongoose');
const Newuser=require('./router/model');
const session=require('express-session');
const app=express()
app.use(session({secret:'FuckYouBitch'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//mongoose connection
const uri = "mongodb+srv://taruneluri:taruneluri@cluster0.gkezw.mongodb.net/ProjectZero?retryWrites=true&w=majority";
mongoose.connect(uri).then(()=>{console.log("mongodb connected")});
const connection=mongoose.connection;
app.get('/',function(req,res){
    req.session.visited=false;
    res.sendFile(__dirname+'/pages/index.html');
});
app.get('/logout',function(req,res){
    req.session.visited=false;
    res.sendFile(__dirname+'/pages/index.html');
});
app.get('/invalid'  ,function(req,res){
    res.sendFile(__dirname+'/pages/index.html');
});
app.get('/wrong'  ,function(req,res){
    res.sendFile(__dirname+'/pages/invalid.html');
});
app.get('/home',function(req,res){
    if(req.session.visited==true)
    {
        res.sendFile(__dirname+'/pages/home.html');
    }
    else{
        res.sendFile(__dirname+'/pages/invalid.html');
    }
});
app.get('/register',function(req,res){
    res.sendFile(__dirname+'/pages/register.html');
});
app.get('/update',function(req,res){
    if(req.session.visited==true){
        res.sendFile(__dirname+'/pages/update.html');
    }
    else{
        res.sendFile(__dirname+'/pages/invalid.html');
    }
})
app.post('/login',function(req,res){
    const a=req.body.mail;
    const b=req.body.pass;
    Newuser.findOne({usermail:a,userpassword:b},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else{
            if(result==null)
            {
                res.redirect('/wrong');
            }
            else{
                req.session.visited=true;
                console.log(result);
                res.redirect('/home');
            } 
        }
    })
});
app.post('/register',function(req,res){
    const a=req.body.fname;
    const b=req.body.lname;
    const c=req.body.location;
    const d=req.body.contact;
    const e=req.body.nemail;
    const f=req.body.npass;
    
    Newuser.findOne({usermail:e},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else{
            if(result==null)
            {
                Newuser.create({
                    firstName:a,
                    lastName:b,
                    location:c,
                    contactNumber:d,
                    usermail:e,
                    userpassword:f
                },function(err){
                    if(err){
                        console.log(err)
                    }
                    else{
                        req.session.visited=false;
                        console.log("Data inserted");
                        res.redirect('/')
                    }
                });

            }
            else{
                res.redirect('/wrong');
            }
        }
    })
    
});
app.post('/update',function(req,res){
    const current=req.body.cpass;
    const newpass=req.body.npass;
    Newuser.updateOne({usermail:current},{userpassword:newpass},function(err,result){
        if(err){
            console.log(err)
            
        }
        else{
            if(result==null)
            {
                res.redirect('/home');
            }
            else{
                console.log(result);
                req.session.visited=false;
                res.redirect('/');
            } 
            
        }
    })
})
app.listen(3000,()=>{console.log("server started")})