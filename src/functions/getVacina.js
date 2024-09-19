const { app } = require('@azure/functions');
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
});