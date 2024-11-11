/*const { app } = require('@azure/functions');
const sql = require("mssql");
require('dotenv').config();

app.http('getVacina', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const vacinaId = request.query.get('id');

        if (!vacinaId) {
            return { status: 400, body: "Você precisa fornecer um ID para buscar a vacina." };
        }

        try {
            const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
            const result = await pool.request()
                .input('id', sql.Int, vacinaId)
                .query('SELECT * FROM Vacina WHERE id = @id');

            if (result.recordset.length > 0) {
                // Retornando o objeto em formato JSON
                return { status: 200, body: JSON.stringify(result.recordset[0]) };
            } else {
                return { status: 404, body: "Vacina não encontrada." };
            }

        } catch (err) {
            context.log(`Erro ao buscar a vacina: ${err.message}`);
            return { status: 500, body: `Erro ao buscar a vacina: ${err.message}` };
        }
    }
});*/


/*async function getVacinaHandler(request, context) {
    const vacinaId = request.query.get('id');

    if (!vacinaId) {
        return { status: 400, body: "Você precisa fornecer um ID para buscar a vacina." };
    }

    try {
        const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
        const result = await pool.request()
            .input('id', sql.Int, vacinaId)
            .query('SELECT * FROM Vacina WHERE id = @id');

        if (result.recordset.length > 0) {
            return { status: 200, body: JSON.stringify(result.recordset[0]) };
        } else {
            return { status: 404, body: "Vacina não encontrada." };
        }

    } catch (err) {
        context.log(`Erro ao buscar a vacina: ${err.message}`);
        return { status: 500, body: `Erro ao buscar a vacina: ${err.message}` };
    }
}


const { app } = require('@azure/functions');
app.http('createVacina', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getVacinaHandler
});
module.exports = { getVacinaHandler };*/

const sql = require('mssql');

async function getVacinaHandler(request, context) {
    const vacinaId = request.query.id;

    if (!vacinaId) {
        return { status: 400, body: "Você precisa fornecer um ID para buscar a vacina." };
    }

    try {
        const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
        const result = await pool.request()
            .input('id', sql.Int, vacinaId)
            .query('SELECT * FROM Vacina WHERE id = @id');

        if (result.recordset.length > 0) {
            return { status: 200, body: JSON.stringify(result.recordset[0]) };
        } else {
            return { status: 404, body: "Vacina não encontrada." };
        }

    } catch (err) {
        context.log(`Erro ao buscar a vacina: ${err.message}`);
        console.log("Erro específico:", err); // Log para depuração
        return { status: 500, body: `Erro ao buscar a vacina: ${err.message}` };
    }
}

const { app } = require('@azure/functions');
app.http('getVacina', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getVacinaHandler
});

module.exports = { getVacinaHandler }; // Certifique-se de que esta linha esteja presente
