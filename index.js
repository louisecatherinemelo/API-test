require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());


//ROTA TESTE

app.get("/", (req,res) => {
    res.json({
        message: "Funcionando!"
    })
})


//ROTA PESQUISAR UM ITEM

app.get("/itens/:id", async(req, res) => {
    const item = await db.selectCustomer(req.params.id);
    res.json(item);
})


//ROTA PESQUISAR TODOS OS ITENS

app.get("/itens", async(req, res) => {
    const itens = await db.selectCustomers();
    res.json(itens);
})

app.post("/itens", async (req,res) => {
    console.log(req.body)
    await db.insertCustomer(req.body);
    res.sendStatus(201);
})

app.patch("/itens/:id", async (req,res) => {
    console.log(req.body)
    await db.updateCustomer(req.params.id, req.body);
    res.sendStatus(200);
})


app.delete("/itens/:id", async (req,res) => {
    await db.deleteCustomer(req.params.id, req.body);
    res.sendStatus(204);
})


app.listen(port);

console.log("Backend rodando");
