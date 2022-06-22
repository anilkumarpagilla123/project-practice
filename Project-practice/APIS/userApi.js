//create router to handle user api reqs
const exp=require('express');
const userApp=exp.Router()

require('dotenv').config()

//import bcryptjs for password hashing
const bcryptjs=require('bcryptjs');

//import jsonwebtoken to create token
const jwt=require('jsonwebtoken');

//to handle aysnchronous errors
const expressAsyncHandler=require('express-async-handler')

//to extract body of request object
userApp.use(exp.json());
  




//USER API Routes

//create route to handle '/getusers' path
userApp.get("/getusers",expressAsyncHandler(async (request, response) => {
  //get userCollectionObject
  let userCollectionObject=request.app.get("userCollectionObject");
  //get all users
  let users=await userCollectionObject.find().toArray()
  //send response
  response.send({message:"Users List",payload:users})

}));




//create route to user login
userApp.post("/login",expressAsyncHandler(async (request, response) => {

//get userCollectionObject
let userCollectionObject=request.app.get("userCollectionObject");
//get user credentials obj from client
let userCredObj=request.body;
//search for user by username
let userOfDB=await userCollectionObject.findOne({username:userCredObj.username});

//if username not existed
if(userOfDB==null){
  response.send({message:"Invalid username"})
}
//if username existed
else{
  //compare passwords
  let status=await bcryptjs.compare(userCredObj.password,userOfDB.password);
  //if passwords not matched
  if(status==false){
    response.send({message:"Invalid password"})
  }
  //if passwords are matched
  else{
    //create token
    let token=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
    //send token
    response.send({message:"login success",payload:token,userObj:userOfDB})
  }
}

}));





//ContactUs feedback form
userApp.post("/contact-us",expressAsyncHandler(async(request, response) => {
  let feedbackObject=request.app.get("feedbackObject");
  let newUserObj=request.body;
  await feedbackObject.insertOne(newUserObj);
  response.send({message:"Messsage sent successfully"})
}));


//create a route to 'create-user'
userApp.post("/create-user",expressAsyncHandler(async(request,response) => {
  //get userCollectionObject
  let userCollectionObject=request.app.get("userCollectionObject");
  //get userObj from client
  let newUserObj=request.body;
  //search for user by username
  let userOfDB=await userCollectionObject.findOne({username:newUserObj.username})
  //if user existed
  if(userOfDB!==null){
    response.send({message:"Username has already token..plz choose another"})
  }
  //if user not existed
  else{
    //hash password
    let hashedPassword=await bcryptjs.hash(newUserObj.password,6)
    //replace plain password with hashed password in newUserObj
    newUserObj.password=hashedPassword;
    //insert user
    await userCollectionObject.insertOne(newUserObj);
    //send response
    response.send({message:"New User Created"})
  }
}));


//create a route to modify user data
userApp.put("/update-user", expressAsyncHandler(async(request, response) => {
//get userCollectionObject
let userCollectionObject=request.app.get("userCollectionObject");
////get modified user obj
let modifiedUser=request.body;
//update user
await userCollectionObject.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}});
//send response
response.send({message:"User details modified"});
}));




//create a route to delete user by username
userApp.delete("/remove-user/:id", expressAsyncHandler(async(request, response) => {
  
//get userCollectionObject
let userCollectionObject=request.app.get("userCollectionObject");
//get productid from url param
let pid=(request.params.id);
//get all users
let users=await userCollectionObject.findOne({username:pid});

//if user not existed with given username
if(users==null){
  response.send({message:"user not existed"})
}
//if user existed
else{
  //get user by username
  let users=await userCollectionObject.deleteOne({username:pid})
  response.send({message:"user is deleted"})
}

}));



//export userApp
module.exports=userApp;
