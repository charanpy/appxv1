const express=require("express");

const app=express();

const bP=require("body-parser");

const ejs=require("ejs");

const alert=require("alert");
app.set('view engine', 'ejs');
app.use(bP.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

const bcrypt=require("bcrypt");

const mongoose=require("mongoose");

const depreceate={ useNewUrlParser: true , useUnifiedTopology: true };
mongoose.connect("mongodb://localhost:27017/homeusers",depreceate);

//Schema
const loginSchema={
    username:String,
    email:String,
    password:String,
    id:String,
    bio:String
 
};
//model
const Login=mongoose.model("appxuser",loginSchema);


app.get("/startup",function(req,res){
    res.render("landing");
    
})

app.get("/login",function(req,res){
    res.render("login");
})
app.get("/register",function(req,res){
    res.render("register");
})

app.get("/:id",function(req,res){
    Login.findById({_id:req.params.id},(err,foundUser)=>{
        if(!err){
            if(foundUser){
                res.render("home",{username:foundUser.username,id:foundUser._id,ids:foundUser.id,email:foundUser.email,bio:foundUser.bio});
            }
        }
    })
    
})

const saltRounds=10;
app.post("/register",function(req,res){
    const username=req.body.username;
    const email=req.body.email;
    const passport=req.body.psw;
    const confirm=req.body.pswc;
    console.log(passport,confirm);
    
    bcrypt.hash(passport, saltRounds, function(err, hash) {
        console.log(hash);
        if(err){
            console.log(err)
        }
        else{
        const user=new Login({
            username:username,
            email:email,
            password:hash
        })
        user.save();
        res.redirect("/login");
    }
    });
})

app.post("/login",function(req,res){
    const email=req.body.email;
    const psw=req.body.psw;
    
    Login.findOne({email:email},(err,foundUser)=>{
         if(err){
             console.log(err)
         }
         else if(foundUser){
            bcrypt.compare(psw,foundUser.password, function(error, result) {
               
               if(result){
                   res.redirect("/"+foundUser._id)
               }
               else{
                   alert("Enter valid email or password")
                   res.redirect("/login")
               }
                
            });
         }
         else{
             alert("User not registered");
             res.redirect("/login")
         }
    })
})
app.get("/update/:id",(req,res)=>{
    Login.findById({_id:req.params.id},function(err,foundUser){
        if(err){
            console.log(err)
        }
        res.render("update",{email:foundUser.email,username:foundUser.username,id:foundUser.id,bio:foundUser.bio})
      
        
    })
})
app.post("/update/:id",function(req,res){
    console.log(req.body.username)
    Login.findOneAndUpdate({_id:req.params.id},{$set:{username:req.body.username,id:req.body.id,bio:req.body.bio}},function(err,resu){
        if(err)
{
    console.log(err)
}
console.log(resu);
console.log(true);
alert("updated!.Check out profile");
 res.redirect("/"+req.params.id);

    })
    
})
app.listen(process.env.PORT||3000,function(){
    console.log("Lets go");
})

