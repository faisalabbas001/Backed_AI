require('dotenv').config();
const app = require('./src/app');

// ❌ REMOVE app.listen(3000) for Vercel
module.exports = app;  // ✅ Correct way for Vercel
