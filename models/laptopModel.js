const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
    
    name : {type : String , required : true} ,
    image : {type : String , required : true} , 
    modelNo : {type : String, required : true},
    brand : {type : String, required : true},
    processor : {type : String, required : true},
    ramCapacity : {type : String , required : true},
    romCapacity : {type : String, required : true},
    romType : {type : String, required : true},
    displaySize : {type : String, required : true},
    osType : {type : String , required : true} , 
     
    bookedTimeSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true}
        }
    ] , 

    rentPerHour : {type : Number , required : true}


}, {timestamps : true}

)
const laptopModel = mongoose.model('laptops' , laptopSchema)
module.exports = laptopModel