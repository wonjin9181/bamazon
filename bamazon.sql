DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(100) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Purified Drinking Water", "food", "1.00", "5000");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("CyberPowerPC", "electronics", "500.00", "1000");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Furbo", "electronics", "200.00", "500");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Zuke's", "food", "20.00", "250");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Yonex Raquet", "sports", "500.00", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Champion Hat", "clothing", "50.00", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Apple Watch", "electronics", "200.00", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Nike shirt", "clothing", "20.00", "1000");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Nike air", "clothing", "100.00", "2400");

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Wilson tennis ball", "sports", "3.00", "5000");

SELECT * FROM products

