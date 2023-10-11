var express = require('express');
var router = express.Router();
const fs=require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
   fs.readdir("./files",{withFileTypes:true},function(error,files){
     res.render('index', {files});
   });
});
// delete file logic 
router.get('/file/delete/:filename', function(req, res, next) {
  fs.unlink(`./files/${req.params.filename}`,function(error,){
    res.redirect('/');
  });
});

// delete folder logic 
router.get('/folder/delete/:filename', function(req, res, next) {
  fs.rmdir(`./files/${req.params.filename}`,function(error,){
    res.redirect('/');
  });
});




// file create logic code
router.get('/filecreate', function(req, res, next) {
  fs.writeFile(`./files/${req.query.filename}`,"",function(error){
    if(error) throw error;
    res.redirect("/");
  });
});
// // Rename filename rendring logic code 
router.post('/change/:oldname', function(req, res, next) {
  // console.log(req.body.filename)
 fs.rename(`./files/${req.params.oldname}`,`./files/${req.body.filename}`,function(error){
    res.redirect("/");
 })
  
});
// folder create logic code

router.get('/foldercreate', function(req, res, next) {
  fs.mkdir(`./files/${req.query.foldername}`,function(error){
    if(error) throw error;
    res.redirect("/");
  });
});

// data pdate in file
router.post('/savedata/:filename', function(req, res, next) {
  console.log(req.body.content)
  fs.writeFile(`./files/${req.params.filename}`,`${req.body.content}`,function(error){
    if(error) throw error;
    res.redirect("back");
  });
});

//content (second) page rendring logic code 
router.get('/file/:filename', function(req, res, next,) {
  fs.readdir("./files",{withFileTypes:true},function(error,files,data){
fs.readFile(`files/${req.params.filename}`,function(error,data){
  res.render('showfile', {files,filename:req.params.filename,data});

})  
// console.log(req.query.filename);
  });
});



module.exports = router;
