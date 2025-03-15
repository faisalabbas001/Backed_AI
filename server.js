require('dotenv').config();
const app = require('./src/app');
const serverless = require('serverless-http');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
module.exports = app;

module.exports.handler = serverless(app);
