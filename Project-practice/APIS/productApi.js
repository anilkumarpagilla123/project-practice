//create a special route to handle product reqs
const { request, response } = require('express');
const exp=require('express');
const productApp=exp.Router();

//to handle the asynchronous errors
const expressAsyncHandler=require('express-async-handler')

//to extract body of request object
productApp.use(exp.json()); 

//get all products
productApp.get('/getproducts',expressAsyncHandler(async (request,response)=>{
//get productCollectionObject
let productCollectionObject=request.app.get("productCollectionObject")
//read all products
let products=await productCollectionObject.find().toArray()
//send response
response.send({message:"All products",payload:products})

}))

//get product by id
productApp.get("/getproduct/:id",expressAsyncHandler(async (request,response)=>{
//get productCollectionObject
let productCollectionObject=request.app.get("productCollectionObject")
//get productid from url param
let pid=(+request.params.id);
//get product by id
let product=await productCollectionObject.findOne({productId:pid})
//if product not existed with given id
if(product==null){
  response.send({message:"product not existed"})
}
//if product existed
else{
  response.send({message:"product existed",payload:product})
}

}))


/*//to create product
productApp.post('/create-product',(request,response)=>{
 
  //get productCollectionObject
  let productCollectionObject=request.app.get("productCollectionObject")
  //get product obj from req
  let productObj=request.body;
  //insert productObj
  productCollectionObject.insertOne(productObj,(err,result)=>{
  if(err){
    console.log("err in creating product ",err)
  }
  else{
      response.send({message:'Product created successfylly'})
  }
  })

})*/

/*//creating proudct using promise
productApp.post('/create-product',(request,response)=>{
 
  //get productCollectionObject
  let productCollectionObject=request.app.get("productCollectionObject")
  //get product obj from req
  let productObj=request.body;
  //insert productObj
  productCollectionObject.insertOne(productObj)
  .then((result)=>response.send({message:'Product created successfylly'}))
  .catch(err=> console.log("err in creating product ",err))

})*/

//create product with async n await
productApp.post('/create-product',expressAsyncHandler(async(request,response)=>{
 
  //get productCollectionObject
  let productCollectionObject=request.app.get("productCollectionObject")
  //get product obj from req
  let productObj=request.body;
  //insert productObj
  let result=await productCollectionObject.insertOne(productObj)
  //send response
  response.send({message:'Product created successfylly'})
}));


//update product
productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
 
  //get productCollectionObject
  let productCollectionObject=request.app.get("productCollectionObject")
  //get modified product obj
  let modifiedProduct=request.body;
  //update
  await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
  //send response
  response.send({message:"product modified"})
}));

//delete product by id
productApp.delete('/remove-product/:id',expressAsyncHandler(async(request,response)=>{
 
  //get productCollectionObject
  let productCollectionObject=request.app.get("productCollectionObject")
  //get productid from url param
  let pid=(+request.params.id);
  //read all products
  let product=await productCollectionObject.findOne({productId:pid})
  
  //if product not existed with given id
  if(product==null){
    response.send({message:"product not existed"})
  }
  //if product existed
  else{
    //get product by id
    let product=await productCollectionObject.deleteOne({productId:pid})
    response.send({message:"product is deleted"})
  }

}));



//export productApp
module.exports=productApp;