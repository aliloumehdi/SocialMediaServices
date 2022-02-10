const mongoose = require('mongoose')
 
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?readPreference=primary&directConnection=true&ssl=false`).then(() => {
    console.log("Connected"); 
}).catch((err) => {
    console.error(err);
})
console.log('conn');