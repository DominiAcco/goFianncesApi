-- Database: goFinances

-- DROP DATABASE IF EXISTS "goFinances";
CREATE TABLE IF NOT EXISTS public.transacao (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    data TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida'))
);



INSERT INTO transacao (titulo, preco, categoria, data, tipo)
VALUES (
  'Teste Antigo',
  250.00,
  'Categoria Teste',
  '2025-04-11 12:00:00',
  'entrada'
);
INSERT INTO transacao (titulo, preco, categoria, data, tipo)
VALUES (
  'Saída Antiga',
  75.00,
  'Teste Período',
  '2025-06-20 15:30:00',
  'saida'
);