import express from 'express';
import cors from 'cors';
import {initDB} from "@db";
import {initApiRouter} from "@router";
import {dotEnvInit} from "@utils/dotenv";

dotEnvInit()
const port = process.env.PORT;
const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(initApiRouter())
initDB()

app.listen(port, () => {
    console.log('Api Server started at ' + port);
})