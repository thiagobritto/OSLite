
-- Querys of SQLite3
CREATE TABLE IF NOT EXISTS users(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(150) UNIQUE NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT 0,
    `super` BOOLEAN NOT NULL DEFAULT 0,
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `fone` VARCHAR(150) NOT NULL,
    `andress` VARCHAR(150) NOT NULL,
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carro(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_client` int(11) NOT NULL,
    `marca` VARCHAR(80),
    `modelo` VARCHAR(100),
    `ano` VARCHAR(45),
    `placa` VARCHAR(80) NOT NULL,
    `descricao_defeito` VARCHAR(250) NOT NULL,
    `data` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_clientObjects FOREIGN KEY (id_client) REFERENCES client(id)
);

CREATE TABLE IF NOT EXISTS os(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_client` int(11) NOT NULL,
    `id_users` int(11) NOT NULL,
    `service` VARCHAR(150) NOT NULL,
    `status` smallint(11) NOT NULL DEFAULT 1,
    `price` decimal(10,2),
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_osObjects FOREIGN KEY (id_client) REFERENCES client(id),
    CONSTRAINT FK_osObjects FOREIGN KEY (id_users) REFERENCES users(id)
);

insert into users(`name`, `pass`) values("admin", "adm123");