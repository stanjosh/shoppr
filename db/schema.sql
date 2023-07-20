-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE `Category` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category_name` varchar(30) DEFAULT NULL
  
)

CREATE TABLE `Product` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_name` varchar(30) NOT NULL,
  `price` int(10) NOT NULL,
  `stock` int(10) DEFAULT 10,
  `category_id` int(10) REFERENCES Category(id)
)

CREATE TABLE `Tag` (
    `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tag_name` varchar(30) NOT NULL
)   

CREATE TABLE `ProductTag` (
    `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` int(10) REFERENCES Product(id),
    `tag_id` int(10) REFERENCES Tag(id)

)
