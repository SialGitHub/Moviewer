import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const mongoDB = mongoose.connect(process.env.mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoDB
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("err", err);
    });

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/', (req, res) => res.send('Hello World!'));
export {app};