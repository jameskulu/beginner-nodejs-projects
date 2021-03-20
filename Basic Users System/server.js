const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
require('dotenv').config()


// Database
const db = async () => {
	try {
		const success = await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected.');
	} catch (err) {
		console.log('Something is wrong in the DB connection'), err;
	}
};

// Run DB connection
db();

app.use(express.json());
app.use('/api/users',userRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

