var joi = require('joi');
var middlewareObj = {};

const schema = joi.object().keys({

     issuer:joi.object({

        address:joi.object({
            branchID:joi.string().required(),
            country:joi.string().required(),
            governate: joi.string().required(),
            regionCity: joi.string().required(),
            street:joi.string().required(),
            buildingNumber: joi.string().required(),
            postalCode:joi.string().required(),
            floor:joi.string().required(),
            room:joi.string().required(),
            landmark: joi.string().required(),
            additionalInformation: joi.string().required(),
        }).required(), 

        type:joi.string().required(),
        id:joi.string().required(),
        name:joi.string().required(),

    }).required(),

    documentType:joi.string().required(),
    documentTypeVersion:joi.string().required(),
    dateTimeIssued: joi.string().required(), //date
    taxpayerActivityCode:joi.string().required(),

    invoiceLines:joi.array().items(
        joi.object({
            description: joi.string().required(),
            itemType:joi.string().required(),
            itemCode:joi.string().required(),
            unitType:joi.string().required(),
            quantity: joi.number().required(),
            internalCode: joi.string().required(),
            salesTotal:joi.number().required(),
            total:joi.number().required(),
            valueDifference: joi.number().required(),
            totalTaxableFees: joi.number().required(),
            netTotal:joi.number().required(),
            itemsDiscount: joi.number().required(),
            
        }).unknown(true)
     
    )

}).unknown(true); 

middlewareObj.vaildEnvoice = function(req, res , next){
    
        // check if json conatains values 
      /* if(!Object.keys(req.body).length){ 
        res.json({ message :"please use json data the body is empty"})}*/
    
     const { error, value } = schema.validate(req.body);
    
     if(error){
         res.json(error.details[0]);
     }else{
         next();
     }


}
 


module.exports = middlewareObj;