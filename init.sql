CREATE DATABASE IF NOT EXISTS wanderlust_db;
USE wanderlust_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE customer_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    social_security_number VARCHAR(11),
    credit_card_number VARCHAR(16),
    credit_card_cvv VARCHAR(4),
    credit_card_expiry DATE
);

INSERT INTO users (username, password) VALUES
('admin', 'admin123'),
('john_doe', 'password123');

INSERT INTO customer_data (first_name, last_name, email, phone, address, social_security_number, credit_card_number, credit_card_cvv, credit_card_expiry) VALUES
('John', 'Doe', 'john.doe@example.com', '555-123-4567', '123 Main St, Anytown, USA', '123-45-6789', '4111111111111111', '123', '2025-12-31'),
('Jane', 'Smith', 'jane.smith@example.com', '555-987-6543', '456 Elm St, Othertown, USA', '987-65-4321', '5555555555554444', '456', '2024-06-30'),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-246-8135', '789 Oak St, Somewhere, USA', '456-78-9012', '3782822463100005', '789', '2023-09-30'),
('Bob', 'Williams', 'bob.williams@example.com', '555-369-2580', '321 Pine St, Nowhere, USA', '789-01-2345', '6011111111111117', '012', '2026-03-31');