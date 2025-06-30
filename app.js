const express = require('express');
const cors = require('cors'); // <=== ADICIONAR
const app = express();
require('dotenv').config();

app.use(cors()); // <=== MUITO IMPORTANTE
app.use(express.json());

app.use('/api/v1', require('./routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
