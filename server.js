const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/User');
require('./config/db');
require('./config/redis');
require('./services/notificationService');

const subscribeRouter = require('./routes/subscribe');
const verifyPaymentRouter = require('./routes/verifyPayment');

const app = express();
app.use(bodyParser.json());
app.use('/api', subscribeRouter);
app.use('/api', verifyPaymentRouter);
app.use()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const job = new cron.CronJob('0 0 * * *', async () => {
    try {
        console.log('Running newsletter sending job...');
        await sendNewsletters(); // Call your function to send newsletters
        console.log('Newsletter sending job completed.');
    } catch (error) {
        console.error('Error running newsletter job:', error);
    }
}, null, true, 'Asia/Kolkata'); 

// Start the cron job
job.start();