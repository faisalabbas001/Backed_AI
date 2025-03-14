const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const codeController = require('./controllers/code.controller');
const serverless = require('serverless-http');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

app.post('/ai/execute-code', codeController.executeCode);

module.exports = app;
module.exports.handler = serverless(app);