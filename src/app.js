import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Use in developtmen mode
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: "8mb", extended: true }));
app.use(express.urlencoded({ extended: true, limit: "100mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));


export default app;