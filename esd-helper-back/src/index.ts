import express from 'express';
import applicationRoutes from './routes/applicationRoutes';
import cors from 'cors';


const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use('/api', applicationRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})