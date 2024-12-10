const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', authorRoutes);

app.get("/api" ,(req, res) => {
    res.send("bem vindo a api de livros")
})


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
