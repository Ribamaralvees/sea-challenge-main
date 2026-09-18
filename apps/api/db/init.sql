CREATE TABLE IF NOT EXISTS employees (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  cpf                TEXT NOT NULL,
  rg                 TEXT NOT NULL,
  birth_date         TEXT NOT NULL,
  gender             TEXT NOT NULL CHECK (gender IN ('masculino', 'feminino')),
  role               TEXT NOT NULL,
  active             BOOLEAN NOT NULL DEFAULT TRUE,
  epi_activities     JSONB NOT NULL DEFAULT '[]'::jsonb,
  health_certificate TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS steps (
  id        TEXT PRIMARY KEY,
  label     TEXT NOT NULL,
  position  INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO employees (name, cpf, rg, birth_date, gender, role, active, epi_activities, health_certificate, created_at) VALUES
  ('Daniel Alves da Silva', '000.000.000-99', '12.345.678-9', '1990-03-15', 'masculino', 'Cargo 1', TRUE,
   '[{"activity":"Atividade 1","epis":[{"name":"Calçado de segurança","ca":"9356"}]}]'::jsonb, NULL, now() - interval '1 second'),
  ('Giselle Torres Lopes', '000.000.000-88', '23.456.789-0', '1988-07-22', 'feminino', 'Cargo 2', FALSE,
   '[]'::jsonb, NULL, now() - interval '2 seconds'),
  ('Ana Bispo dos Santos', '000.000.000-99', '34.567.890-1', '1995-11-02', 'feminino', 'Cargo 1', FALSE,
   '[]'::jsonb, NULL, now() - interval '3 seconds'),
  ('Regina Elisa Souza', '000.000.000-99', '45.678.901-2', '1992-01-30', 'feminino', 'Cargo 3', TRUE,
   '[]'::jsonb, NULL, now() - interval '4 seconds');

INSERT INTO steps (id, label, position, completed) VALUES
  ('1', 'Item 1', 1, FALSE),
  ('2', 'Item 2', 2, FALSE),
  ('3', 'Item 3', 3, FALSE),
  ('4', 'Item 4', 4, FALSE),
  ('5', 'Item 5', 5, FALSE),
  ('6', 'Item 6', 6, FALSE),
  ('7', 'Item 7', 7, FALSE),
  ('8', 'Item 8', 8, FALSE),
  ('9', 'Item 9', 9, FALSE);
