

/*const mssql = require('mssql');
const { deleteVacinaHandler } = require('../functions/deleteVacina');

// Mock da conexão e das operações do banco de dados
jest.mock('mssql', () => {
    const request = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn((sql) => {
            console.log(`Chamando query com SQL: ${sql}`); // Log para verificar a query SQL
            return Promise.resolve({}); // Simula uma resposta bem-sucedida para o DELETE
        })
    };
    return {
        connect: jest.fn().mockResolvedValue({ request: () => request }),
        close: jest.fn()
    };
});

describe('Teste da função deleteVacinaHandler', () => {
    it('Deve retornar status 200 ao deletar uma vacina com sucesso', async () => {
        const mockRequest = { query: { id: '5' } }; // Usando um objeto simples para query
        const mockContext = { log: jest.fn() };

        const response = await deleteVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(200);
        expect(response.body).toContain('Vacina deletada com sucesso');
    });

    it('Deve retornar status 400 quando o ID não é fornecido', async () => {
        const mockRequest = { query: {} }; // Sem o ID na query
        const mockContext = { log: jest.fn() };

        const response = await deleteVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Você precisa fornecer o ID da vacina para deletá-la');
    });
});*/


const { deleteVacinaHandler } = require('../functions/deleteVacina');

// Mock do banco de dados
jest.mock('mssql', () => {
    const request = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({}) // Simula uma resposta bem-sucedida para o DELETE
    };
    return {
        connect: jest.fn().mockResolvedValue({ request: () => request }),
        close: jest.fn()
    };
});

describe('Teste da função deleteVacinaHandler', () => {
    it('Deve retornar status 200 ao deletar uma vacina com sucesso', async () => {
        const mockRequest = { query: { id: '1' } }; // Usando um objeto simples para query
        const mockContext = { log: jest.fn() };

        const response = await deleteVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(200);
        expect(response.body).toContain('Vacina deletada com sucesso');
    });

    it('Deve retornar status 400 quando o ID não é fornecido', async () => {
        const mockRequest = { query: {} }; // Sem o ID na query
        const mockContext = { log: jest.fn() };

        const response = await deleteVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Você precisa fornecer o ID da vacina para deletá-la');
    });
});

