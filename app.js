const express = require('express')
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', bookRoutes);

app.get("/api" ,(req, res) => {
    res.send("bem vindo a api de livros")
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
