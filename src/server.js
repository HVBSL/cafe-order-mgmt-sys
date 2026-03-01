import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import sessionRoutes from './routes/session.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import tableRoutes from './routes/table.routes.js';
import companyDetRoutes from './routes/companyDet.routes.js';

dotenv.config();

const app = express();
// app.use(cors());
app.use(cors({
  origin: "*"
}));
app.use(express.json());

connectDB();

app.use('/api/sessions', sessionRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/companydet', companyDetRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
   
