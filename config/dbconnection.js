// const mongoose = require('mongoose');

// async function connect2(req, res, next) {
//     mongoose.connect(url).then(()=>{
//         console.log('MongoDB Connected...');
//     }).catch((err)=>{
//         console.log('Error while creating MongoDB connection ',err);
//     })
// };

// module.exports = connect2;


const mongoose = require('mongoose');
// const url = process.env.MONGO_URL;

// const encodedPassword = encodeURIComponent();
async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/practicedb", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connect };