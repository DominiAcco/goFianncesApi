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

exports.resumoPorCategoria = async (req, res) => {
  try {
    // Obter mês e ano da query ou usar mês/ano atual
    const mes = parseInt(req.query.mes) || new Date().getMonth() + 1;
    const ano = parseInt(req.query.ano) || new Date().getFullYear();

    const query = `
      SELECT
        categoria,
        SUM(preco) AS total
      FROM transacao
      WHERE EXTRACT(MONTH FROM data) = $1
        AND EXTRACT(YEAR  FROM data) = $2
      GROUP BY categoria
      ORDER BY categoria;
    `;

    const result = await db.query(query, [mes, ano]);

    // Cores predefinidas para categorias
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    const dados = result.rows.map((row, idx) => ({
      categoria: row.categoria,
      total: Number(row.total),
      cor: colors[idx % colors.length]
    }));

    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Não foi possível gerar resumo por categoria' });
  }
};