CREATE TABLE clientes(
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    desativado BOOLEAN NOT NULL,
    criado_em TIMESTAMP NOT NULL,
    atualizado_em TIMESTAMP NOT NULL
);

CREATE TABLE produtos(
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    desativado BOOLEAN NOT NULL,
    criado_em TIMESTAMP NOT NULL,
    atualizado_em TIMESTAMP NOT NULL
);

CREATE TABLE pedidos(
    id VARCHAR(36) PRIMARY KEY,
    numero BIGINT NOT NULL,
    cpf VARCHAR(11),
    preco NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP NOT NULL,
    atualizado_em TIMESTAMP NOT NULL
);

CREATE TABLE items_pedido(
    id VARCHAR(36) PRIMARY KEY,
    id_pedido VARCHAR(36) NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    preco_produto NUMERIC(10, 2) NOT NULL,
    quantidade BIGINT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id)
);

CREATE TABLE pagamentos_pedido(
    id VARCHAR(36) PRIMARY KEY,
    id_pedido VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP NOT NULL,
    atualizado_em TIMESTAMP NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id)
);
