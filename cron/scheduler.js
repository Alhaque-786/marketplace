const cron = require('cron');
const { sendNewsletters } = require('../services/newsletterService'); 

// Define cron job schedule (runs at midnight)
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

// Optionally log job start
console.log('Cron job scheduled to run newsletters daily at midnight.');
