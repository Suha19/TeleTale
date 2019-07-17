const express = require('express');
const connectDB = require("./config/db")
const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send("API running"))
//Define routs
app.use('/api/users', require('./routes/api/user'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/porfile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));