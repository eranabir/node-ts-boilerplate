import dotenv from 'dotenv'
import path from "path";
let envPath = path.resolve(__dirname,'../../.env');
export const dotEnvInit = () => {
    dotenv.config({path: envPath});
}