DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product VARCHAR(75) NOT NULL,
    department VARCHAR(75) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quanity INT NULL,
    PRIMARY KEY (id));


INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Standard Office Chair", "chairs", 80, 7);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Jumbo Office Chair", "chairs", 110, 8);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("budget uncomfortable Office Chair", "chairs", 39, 12);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Standard Desk", "not_chairs", 100, 14);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Standard Cat Poster", "not_chairs", 15, 276);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Water Cooler", "not_chairs", 99, 5);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Broken Copy Machine", "not_chairs", 289, 600);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Fake Plant", "not_chairs", 65, 19);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Sweater", "not_chairs", 25, 60);

INSERT INTO products (product, department, price, stock_quanity)
VALUES ("Boss' super nice Office Chair", "chairs", 800, 1);
