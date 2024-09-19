const { app } = require('@azure/functions');
const sql = require("mssql");
require('dotenv').config();

app.http('deleteVacina', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const vacinaId = request.query.get('id');

        if (!vacinaId) {
            return { status: 400, body: "Você precisa fornecer o ID da vacina para deletá-la." };
        }

        try {
            const pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
            await pool.request()
                .input('id', sql.Int, vacinaId)
                .query('DELETE FROM Vacina WHERE id = @id');

            return { status: 200, body: `Vacina deletada com sucesso.` };

        } catch (err) {
            context.log(`Erro ao deletar a vacina: ${err.message}`);
            return { status: 500, body: `Erro ao deletar a vacina: ${err.message}` };
        }
    }
});
