const mongoose = require('mongoose');

// mongoose.connect(
//    'mongodb://localhost/sahiNotes_development', 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// ); 

mongoose.connect("mongodb://127.0.0.1:27017/sahinotes_devlopment", );

mongoose.connection.once('open',function(){
    console.log('connected to mongodb database')
})

  