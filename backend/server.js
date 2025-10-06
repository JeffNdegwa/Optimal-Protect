import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import logger from './config/logger.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});