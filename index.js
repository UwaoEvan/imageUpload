import express  from "express";
import usersRoutes from './routes/users.js';
import fileUpload from "express-fileupload";
import path from 'path';
import { errorHandler } from "./error/error.js";

const app = express();
const PORT = 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).send('Hello');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})