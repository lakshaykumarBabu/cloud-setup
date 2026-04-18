const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/deploy', (req, res) => {
    console.log("🚀 Deploy triggered");

    exec(`
        cd /home/ubuntu/myapp &&
        git pull origin main &&
        npm install &&
        pm2 restart app1
    `, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.send('Error');
        }
        console.log(stdout);
        res.send('Deployed');
    });
});

app.listen(9000, () => console.log("Deploy server running"));
