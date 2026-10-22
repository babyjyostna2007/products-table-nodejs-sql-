const Database = require('better-sqlite3'); 
const db = new Database('products.db'); 

db.exec(` 
    CREATE TABLE IF NOT EXISTS products ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name     TEXT    NOT NULL, 
        category TEXT    NOT NULL, 
        price    REAL    NOT NULL, 
        year     INTEGER NOT NULL 
    ) 
`); 

// Seed only if empty 
const count = db.prepare('SELECT COUNT(*) as n FROM products').get(); 
if (count.n === 0) { 
    const insert = db.prepare('INSERT INTO products (name, category, price, year) VALUES (?, ?, ?, ?)'); 
    insert.run('Laptop','Electronics', 999.99, 2023);      
    insert.run('Phone','Electronics', 999.99, 2023);      
    insert.run('Desk','Furniture',   249.99, 2021);        
    insert.run('Headphones','Electronics', 149.99, 2023); 
    insert.run('Chair','Furniture',   399.00, 2022); 
} 

module.exports = db;