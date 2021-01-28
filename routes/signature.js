var express = require('express');
var fs = require('fs');
var path = require('path');
const { spawn } = require('child_process');
var router = express.Router();
var errorhanlder; 
var signerMiddleware = require("../middleware/signatureValidation");



router.post('/',signerMiddleware.vaildEnvoice, function(req, res, next) { // change it to post request .
    
      if(!Object.keys(req.body).length){res.json({ message :"please use json data the body is empty"})}
      
       // of sure is a josn data
      var jsondata = JSON.stringify(req.body,null,4);
     
   
     
    // take data and put it into file nameing confinataion  
    
    fs.writeFile("../SourceDocumentJson.json",jsondata,function(err){
        
        if(err){
            console.log(err);
         }
        
    });
 
    // Run batach       
    const bat = spawn('cmd.exe', ['/c',"SubmitInvoices.bat"],{cwd: 'D:\\EInvoicing'});
   
    bat.stdout.on('data', (data) => {
      console.log(data.toString());
      if(data.toString().includes('Press any key to continue')){
            
          bat.stdin.write("F");
      }
    });
    
    bat.stderr.on('data', (data) => {
      console.error(data.toString());
      errorhanlder+=data;
    });
    
    bat.on('exit', (code) => {
         console.log(`Child exited with code ${code}`);
          
         if(errorhanlder){
           res.json({
             err:errorhanlder,
             message :"Please make sure that your Envoice is correct"
           })
         }else{
        
           // make sure that the file exist 
         fs.readFile('../FullSignedDocument.json', 'utf8', function (err,data) {
          if (err) {
            return res.json({
              error : err 
            });
          }
          res.json(JSON.parse(data));
        });

      }
           
         // delete the following files with following names  CanonicalString.txt , Cades.txt , FullSignedDocument.json , SourceDocumentJson.json
         // console log the deletion in th console. 

    });

 
 
   
});

module.exports = router;
