const express = require('express'); 
const db = require('./db'); 
const app = express(); 
const PORT = 3000; 

app.use(express.json()); 

// GET /products with optional filters 
app.get('/products', (req, res) => { 
const { category, minPrice, maxPrice, sort } = req.query; 
  
  let query = 'SELECT * FROM products WHERE 1=1';  // 1=1 lets us append AND easily 
  const params = []; 
  
  if (category) { 
    query += ' AND category = ?'; 
    params.push(category); 
  } 
  if (minPrice) { 
    query += ' AND price >= ?'; 
    params.push(Number(minPrice)); 
  } 
  if (maxPrice) { 
    query += ' AND price <= ?'; 
    params.push(Number(maxPrice)); 
  } 
  if (sort === 'price') { 
    query += ' ORDER BY price ASC'; 
  } else if (sort === 'name') { 
    query += ' ORDER BY name ASC'; 
  } 
  
  console.log('SQL:', query, 'Params:', params); // Debug: print the SQL 
  
const products = db.prepare(query).all(...params); 
res.json({ count: products.length, products }); 
}); 

app.listen(PORT, () => console.log(`Server on port http://localhost:${PORT}`)); 