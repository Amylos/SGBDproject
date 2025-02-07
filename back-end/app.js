require('dotenv').config();
const express = require('express');
const app = express();
const connectMYSQL = require('./config/mysqldb');
const cors = require('cors');

app.use(cors()); // Autoriser toutes les origines
// Middleware qui permet de traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(async (req, res, next)  => {
    req.db = await connectMYSQL();
    res.on("finish", async function() {
        await req.db.end();
    });
    next();
});

// produits, fournisseurs, categories
app.use("/produits", require('./routes/produits.routes'));
app.use("/fournisseurs", require('./routes/fournisseurs.routes'));
app.use("/categories", require('./routes/categories.routes'));

app.listen(process.env.SERVER_PORT, ()=>{
    console.log('Server is running on port ',process.env.SERVER_PORT);
})