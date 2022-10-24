const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const cors = require('cors');
const { cloudinary } = require('./utils/cloudinary');

//connect to database
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));


const port = process.env.PORT || 5000;

app.listen(port, console.log(`server running on port ${port}`));

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'egmarkets',
            folder: 'egmarkets',
        })
        console.log(uploadedResponse);
        res.json({ message: 'Success' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search.expression
    ('folder: egmarkets')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

    const publicIds = resources.map(file => file.public_id);
    res.send(publicIds);
})