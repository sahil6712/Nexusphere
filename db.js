const mongoose = require('mongoose');
// async and await time required to connect mongodb
// mongoose return promise
const connectMongo = async()=>{ 
    try{
        await mongoose.connect(`mongodb://0.0.0.0:27017/forgingknowledge`) //no callback accepted backticks used error handling
        console.log('connected')
        const userdata = await mongoose.connection.db.collection('Assessment');
        userdata.find({}).toArray((err,data)=>{
            if(err) console.log(err);
            else console.log(data);
        })
    }
    catch(error){
        console.log(error.message);
    }
    
}


module.exports = connectMongo; // we dont need to call it here so we are not using parenthesis