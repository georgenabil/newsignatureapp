var joi = require('joi');
var fs = require('fs');
var middlewareObj = {};

const schema = joi.object().keys({

     issuer:joi.object({

        address:joi.object({
            branchID:joi.string().required(),
            country:joi.string().required(),
            governate: joi.string().required(),
            regionCity: joi.string().required(),
            street:joi.string().required(),
           /* buildingNumber: joi.string().required(),
            postalCode:joi.string().required(),
            floor:joi.string().required(),
            room:joi.string().required(),
            landmark: joi.string().required(),
            additionalInformation: joi.string().required(),*/
        }).unknown(true), 

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

const CompanyNamesToPin = {

    "Ready Mix" : 123456789

} 



middlewareObj.vaildEnvoice = function(req, res , next){
    
     const { error, value } = schema.validate(req.body);
    
     if(error){
         res.json(error.details[0]);
     }else{
         
        middlewareObj.ConfigCompanyPin(req.body.issuer.name);
        console.log(req.body.issuer.name);
        next();
     }


}

middlewareObj.ConfigCompanyPin = function(Companyname){
    
    let PinCode = CompanyNamesToPin[Companyname];
   
    let BatnewFormat =`D:\\EInvoicing\\publish\\EInvoicingSigner.exe  D:\\EInvoicing  ${PinCode}\r\n PAUSE`;

     if(PinCode){ 
           try{  
           fs.writeFileSync("../SubmitInvoices.bat",BatnewFormat);
          }catch(err){
            console.log(err);
          }
       
    }else{
         console.log("the company name does`n exit")
    }
 
}
 


module.exports = middlewareObj;