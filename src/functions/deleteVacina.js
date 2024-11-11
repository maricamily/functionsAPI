/*async function deleteVacinaHandler(request, context) {
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

const { app } = require('@azure/functions');
app.http('createVacina', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: deleteVacinaHandler
});*/

/*async function deleteVacinaHandler(request, context) {
    const vacinaId = request.query.id; // Acesse diretamente como uma propriedade

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
        console.log("Erro específico:", err); // Log do erro para depuração
        return { status: 500, body: `Erro ao deletar a vacina: ${err.message}` };
    }
}*/

const sql = require('mssql');

async function deleteVacinaHandler(request, context) {
    const vacinaId = request.query.id; // Acessando diretamente como uma propriedade

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
        console.log("Erro específico:", err); // Log do erro para depuração
        return { status: 500, body: `Erro ao deletar a vacina: ${err.message}` };
    }
}

const { app } = require('@azure/functions');
app.http('deleteVacina', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: deleteVacinaHandler
});

module.exports = { deleteVacinaHandler };
