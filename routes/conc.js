var express = require('express');
var CryptoJS  = require('crypto-js');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  
    var serialized = canonicalize(req.body)

    let hash   = CryptoJS.SHA256(serialized);
    let buffer = Buffer.from(hash.toString(CryptoJS.enc.Hex), 'hex');
    let array = Array.from( new Uint8Array(buffer) );

   /* let utf16le = CryptoJS.enc.Utf16LE.parse(serialized);
    let utf16Sha256 = CryptoJS.SHA256(utf16le);
    return utf16Sha256.toString(CryptoJS.enc.Hex); */
   
    console.log(hash.toString());
    console.log(serialized);

});



var canonicalizeedit=function(object){

    var buffer = '';
  //  var parentBuffer='';
    serialize(object);
    return buffer;


function serialize(object,parentBuffer=null){

    if (object === null || typeof object !== 'object' ||
       object.toJSON != null) {
    
        // if primtive type 
      buffer += JSON.stringify(object);
    }
     else if (Array.isArray(object)) {
          
        // buffer += '[';
           object.forEach((element) => {
            
              buffer=+JSON.stringify(parentBuffer);
             return serialize(element);

         });
         
     } else {
    
    Object.keys(object).forEach((property) => {
          buffer += JSON.stringify(property.toUpperCase());  
          
          if(Array.isArray(object[property])){ // if elemennt parnet of array 
            parentBuffer = property.toUpperCase();     
           }else{
            parentBuffer = null;
           }

          return serialize(object[property],parentBuffer);

        });

    }

}


function arrayobejct (object,parent){
    
    var data ='';
    data+=parent;

     object.forEach((element) => {
        data=+JSON.stringify(parnet);
       return serialize(element);

   });

   return data ;
    
}

}

module.exports = router