const { app } = require('@azure/functions');
const sql = require("mssql");
require('dotenv').config();

app.http('createVacina', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
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

            const insertedId = result.recordset[0].id;  // O ID da vacina recém-criada

            return { 
                status: 201, 
                body: `Vacina ${nomeVacina} criada com sucesso! ID da vacina: ${insertedId}`,
                id: insertedId  // Retorna o ID para facilitar operações futuras
            };

        } catch (err) {
            context.log(`Erro ao criar a vacina: ${err.message}`);
            return { status: 500, body: `Erro ao criar a vacina: ${err.message}` };
        }
    }
});