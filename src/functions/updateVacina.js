/*const { app } = require('@azure/functions');
const sql = require("mssql");
require('dotenv').config();

app.http('updateVacina', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const { id, nomeVacina, quantidade, dataValidade } = await request.json();

        if (!id || !nomeVacina || !quantidade || !dataValidade) {
            return { status: 400, body: "Faltam dados necessários: id, nomeVacina, quantidade e dataValidade." };
        }

        try {
            const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
            await pool.request()
                .input('id', sql.Int, id)
                .input('nomeVacina', sql.NVarChar, nomeVacina)
                .input('quantidade', sql.Int, quantidade)
                .input('dataValidade', sql.Date, dataValidade)
                .query('UPDATE Vacina SET nomeVacina = @nomeVacina, quantidade = @quantidade, dataValidade = @dataValidade WHERE id = @id');

            return { status: 200, body: `Vacina ${nomeVacina} atualizada com sucesso!` };

        } catch (err) {
            context.log(`Erro ao atualizar a vacina: ${err.message}`);
            return { status: 500, body: `Erro ao atualizar a vacina: ${err.message}` };
        }
    }
});*/


const sql = require('mssql');

async function updateVacinaHandler(request, context) {
    const { id, nomeVacina, quantidade, dataValidade } = await request.json();

    if (!id || !nomeVacina || !quantidade || !dataValidade) {
        return { status: 400, body: "Faltam dados necessários: id, nomeVacina, quantidade e dataValidade." };
    }

    try {
        const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
        await pool.request()
            .input('id', sql.Int, id)
            .input('nomeVacina', sql.NVarChar, nomeVacina)
            .input('quantidade', sql.Int, quantidade)
            .input('dataValidade', sql.Date, dataValidade)
            .query('UPDATE Vacina SET nomeVacina = @nomeVacina, quantidade = @quantidade, dataValidade = @dataValidade WHERE id = @id');

        return { status: 200, body: `Vacina ${nomeVacina} atualizada com sucesso!` };

    } catch (err) {
        context.log(`Erro ao atualizar a vacina: ${err.message}`);
        console.log("Erro específico:", err); // Log para depuração
        return { status: 500, body: `Erro ao atualizar a vacina: ${err.message}` };
    }
}

const { app } = require('@azure/functions');
app.http('updateVacina', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: updateVacinaHandler
});

module.exports = { updateVacinaHandler };

