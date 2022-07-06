import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.yellow('Server running on port ' + process.env.PORT));
})