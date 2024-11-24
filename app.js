const express = require('express')
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/', userRoutes);

app.get("/" ,(req, res) => {
    res.send("ola mundo")
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
