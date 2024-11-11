const sql = require("mssql");
require('dotenv').config();

async function createVacinaHandler(request, context) {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const { nomeVacina, quantidade, dataValidade } = await request.json();

        if (!nomeVacina || !quantidade || !dataValidade) {
            return { status: 400, body: "Faltam dados necessários: nomeVacina, quantidade e dataValidade." };
        }

        const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
        const result = await pool.request()
            .input('nomeVacina', sql.NVarChar, nomeVacina)
            .input('quantidade', sql.Int, quantidade)
            .input('dataValidade', sql.Date, dataValidade)
            .query('INSERT INTO Vacina (nomeVacina, quantidade, dataValidade) OUTPUT INSERTED.id VALUES (@nomeVacina, @quantidade, @dataValidade)');

        const insertedId = result.recordset[0].id;

        return { 
            status: 201, 
            body: `Vacina ${nomeVacina} criada com sucesso! ID da vacina: ${insertedId}`,
            id: insertedId
        };

    } catch (err) {
        context.log(`Erro ao criar a vacina: ${err.message}`);
        return { status: 500, body: `Erro ao criar a vacina: ${err.message}` };
    }
}
// Define a função HTTP da Azure Function
const { app } = require('@azure/functions');
app.http('createVacina', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: createVacinaHandler
});

module.exports = { createVacinaHandler };
