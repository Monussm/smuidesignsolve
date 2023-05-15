const express=require("express");
const app=express();
const port=process.env.port || 3000
const path=require("path");
const hbs=require("hbs")
const mypublic=path.join(__dirname,"../public");
const mypartials=path.join(__dirname,"../partials");
app.use(express.urlencoded({extended:false}));
app.use(express.static(mypublic));
app.set("view engine","hbs")
hbs.registerPartials(mypartials);
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
await mongoose.connect('mongodb+srv://monug1513:monu123@mangement.4fzmmsn.mongodb.net/');
}
const teacherSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    emailid:String,
    mobilenumber:Number,
    password:String,
    confirmpassword:String,
    newpassword:String
});
const Teacher = mongoose.model('Teacher',teacherSchema);





// studentinfo

const studentSchema = new mongoose.Schema({
  name:String,
  rollno:Number,
  class:String

});
const Student = mongoose.model('Student',studentSchema);


// studentattendance


const attenSchema = new mongoose.Schema({
  name:String,
  rollno:Number,
  class:String,
  radio:String

});
const Atten = mongoose.model('Atten',attenSchema);




app.get("/",(req,res)=>{

res.render("index")

})
app.get("/about",(req,res)=>{
res.render("about")


})
app.get("/contact",(req,res)=>{

res.render("contact")

})
app.get("/teachersign",(req,res)=>{
res.render("teachersign")
})
app.post("/teachersign",async(req,res)=>{ 
const emailid=req.body.emailid
const password=req.body.password
const check=await Teacher.findOne({emailid})
if(check==null){

const founderror="Emailid Not Found Please Create Account First."
res.render("teachersign",{founderror})

}
else{

  if(check.emailid===emailid){
    if(check.password==password){
    
    res.send("login")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    
    
    }
    else{
    
    const passerror="Emailid either Password Not Match"
    res.render("teachersign",{passerror})
    
    
    
    }}
   
}

})
app.get("/teachersignup",(req,res)=>{
res.render("teachersignup")
})

app.post("/teachersignup",async(req,res)=>{
const password=req.body.password
const confirmpassword=req.body.confirmpassword
if(password===confirmpassword){
res.render("teachersign")
}
else{
  const passntmatch="Password And Confirmpassword Not Match"
  res.render("teachersignup",{passntmatch})
}


const teacherinfo = new Teacher({ 
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  emailid:req.body.emailid,
  mobilenumber:req.body.mobilenumber,
  password:req.body.password,
  confirmpassword:req.body.confirmpassword,
  newpassword:req.body.newpassword
});
teacherinfo.save()
})

app.get("/teacherforget",(req,res)=>{

res.render("teacherforget")


})
app.post("/teacherforget",async(req,res)=>{
  const emailid=req.body.emailid
  const newpassword=req.body.newpassword
  const data=await Teacher.findOne({emailid})
  if(data==null){

    res.send("Emailid Not Found Please Create Account First.")

  }
  else
  {
    if(data.emailid==emailid){
    const update=await Teacher.findOneAndUpdate({emailid},{$set:{password:newpassword}})
  
    }
  }
  
})


// addstundent\
app.get("/addstudent",(req,res)=>{
res.render("addstudent")

})
app.post("/addstudent",async(req,res)=>{
  const studentinfo = new Student({ 
    name:req.body.name,
    rollno:req.body.rollno,
    class:req.body.class,
    
  });
  await studentinfo.save()

})




























// classinformation
app.get("/attendance",async(req,res)=>{
const data=await Student.find()
res.render("attendance",{data})
})

app.post("/attendance",async(req,res)=>{
const studentatten=new Atten({
name:req.body.name,
class:req.body.class,
radio:req.body.radio,
rollno:req.body.rollno

})
await studentatten.save()



})
















// adminimformation here
app.get("/adminsignup",(req,res)=>{
res.render("adminsignup")
})

app.get("/adminlogin",(req,res)=>{

res.render("adminlogin")

})
app.post("/adminlogin",async(req,res)=>{
  const emailid=req.body.emailid
  const password=req.body.password
  const check=await Teacher.findOne({emailid})
  if(check==null){
  
  const founderror="Emailid Not Found. Please Create Account First."
  res.render("teachersign",{founderror})
  
  }
  else{
  
    if(check.emailid===emailid){
      if(check.password==password){
      
      res.send("login")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      
      
      }
      else{
      
      const passerror="Emailid either Password Not Match"
      res.render("adminlogin",{passerror})
      
      
      
      }}
     
  }
  



})
app.get("/adminforget",(req,res)=>{

res.render("adminforget")

})

app.post("/adminlogin",async(req,res)=>{
  
  const emailid=req.body.emailid
  const newpassword=req.body.newpassword
  const data=await Teacher.findOne({emailid})
  if(data==null){
   const signup="Emailid not found Please signup"
    res.render("adminlogin",{signup})

  }
  else
  {
    if(data.emailid==emailid){
    const update=await Teacher.findOneAndUpdate({emailid},{$set:{password:newpassword}})

  
    }

  }
  
  
})








app.listen(port,(req,res)=>{

console.log("Running on Port 3000")



})