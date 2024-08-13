async function connect(){

    if(global.connection)
        return global.connection.connect();

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
    
    const client = await pool.connect();
    console.log("Criou o pool de connexão!");

    const res = await client.query("select now()");
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;

    return pool.connect();
}

connect();

async function selectCustomers(){
    const client = await connect();
    const res = await client.query("SELECT * FROM materiais");
    return res.rows;
}

async function selectCustomer(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM materiais WHERE ID=$1", [id]);
    return res.rows;
}


async function insertCustomer(custumer){
    const client = await connect();
    const sql = "INSERT INTO materiais(nome, descricao) VALUES ($1,$2)";
    const values = [custumer.nome, custumer.descricao];
    await client.query(sql,values);
}

async function updateCustomer(id,custumer){
    const client = await connect();
    const sql = "UPDATE materiais SET nome=$1, descricao=$2, WHERE id=$4";
    const values = [custumer.nome, custumer.descricao, id];
    await client.query(sql,values);
}


async function deleteCustomer(id){
    const client = await connect();
    const sql = "DELETE FROM materiais WHERE id=$1";
    const values = [id];
    await client.query(sql,values);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
     
}