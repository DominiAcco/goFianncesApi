const db = require('../db'); // Importação CORRETA do módulo db

exports.criarTransacao = async (req, res) => {
  const { titulo, preco, categoria, data, tipo } = req.body;

  // Validação básica
  if (!titulo || !preco || !categoria || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando!' });
  }

  try {
    const resultado = await db.query(
      'INSERT INTO transacao (titulo, preco, categoria, data, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, preco, categoria, data || new Date().toISOString(), tipo]
    );
    
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro no banco de dados:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
};

exports.listarTransacao = async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM transacao ORDER BY data DESC');
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro no banco de dados:', err);
    res.status(500).json({ erro: 'Erro ao listar transações' });
  }
};