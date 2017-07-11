'use strict';
const students = require('../../../repository/student-repo')
console.log(students);

module.exports = {
  collect: (req,res,next)=>{
    var fields=['id','fname','lname','email','phone','interest'];
    var reqdata = new req.collect(req,fields)

    req.session_records = reqdata.collect(req,res)
    console.log(req.session_records);
    next();
  },
  add: (req,res,next)=>{
    // console.log("I am Here");
    if(req.session_records.id) return next(new Error("ID should not be provided"));
    else{
      var options = {
        data:req.session_records
      }
      students.create(options,success,error)
      function success(result){
        if(!result.$options.isNewRecord) return next(new Error("Record Not Added"))
        else{
          req.cdata = {
            success:1,
            message:"Student Record Added Successfully",
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err)
      }
    }
  },
  retrieve: (req,res,next)=>{
    var options ={
      where:{
        is_deleted:0
      }
    }
    students.retrieve(options,success,error)
    function success(result){
      console.log(result);
      if(result && !result.length){
        req.cdata={
          success:1,
          message:"No Student Records in the Database"
        }
        next();
      }
      else{
        req.cdata={
          success:1,
          message:"Student Records retrieved Successfully",
          data: result
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err);
    }
  },
  update: (req,res,next)=>{
    if(!req.session_records.id) return next(new Error("ID not provided"))
    var options={
      data: req.session_records,
      where:{
        id:req.session_records.id
      }
    }
    students.update(options,success,error)
    function success(result){
      if(result && result.length){
        req.cdata={
          success:1,
          message:"Student Record Updated Successfully",
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err);
    }
  },

  findById: (req,res,next)=>{
    if(!req.session_records.id) return next(new Error("Id not provided"))
    var options = {
      where:{
        id:req.session_records.id,
        is_deleted:false
      }
    }
    students.retrieve(options,success,error)
    function success(result){
      if(!result && result.length) return next(new Error("The user doesn't exists"))
      else{
        req.cdata={
          success:1,
          messages:"user retrieved successfully",
          data:result
        }
      }
    }
    function error(err){
      if(err) return next(err)
    }
  },
  delete: (req,res,next)=>{
    console.log(req.session_records);
    // if(!req.session_records.id) return next(new Error("ID not provided"))
    var options = {
      data:{
        is_deleted:1
      },
      where:{
        id:req.session_records.id
      }
    }
    console.log(options);
    students.update(options,success,error)
    function success(result){
      if(result && result.length){
        req.cdata = {
          success:1,
          message:"User removed Successfully",
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err)
    }
  },
  findByInterest:(req,res,next)=>{
    console.log(req.session_records.interest);
    if(!req.session_records.interest) return(nex(new Error("Interest not Provided")))
    else{
      var options={
        where:{
          interest:req.session_records.interest
        }
      }
      students.retrieve(options,success,error)
      function success(result){
        if(result && !result.length){
          req.cdata = {
            success:1,
            message:"No Records in the Database"
          }
          next();
        }
        else{
          req.cdata={
            success:1,
            message:"Records retrieved successfully",
            data:result
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err)
      }
    }
  }
}
