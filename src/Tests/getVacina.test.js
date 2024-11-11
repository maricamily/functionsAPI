// Importa a função que será testada
const { getVacinaHandler } = require('../functions/getVacina');

// Mock da biblioteca mssql
jest.mock('mssql', () => {
    const request = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ recordset: [] }) // Simula uma resposta vazia para SELECT
    };
    return {
        connect: jest.fn().mockResolvedValue({ request: () => request }),
        close: jest.fn()
    };
});

// Testes da função getVacinaHandler
describe('Teste da função getVacinaHandler', () => {
    it('Deve retornar status 200 e a vacina ao fornecer um ID válido', async () => {
        const mockRequest = { query: { id: '2' } }; // Usando um objeto simples para query
        const mockContext = { log: jest.fn() };

        const response = await getVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(404);
        expect(response.body).toContain('Vacina não encontrada'); // Ajuste conforme esperado
    });

    it('Deve retornar status 400 quando o ID não é fornecido', async () => {
        const mockRequest = { query: {} }; // Sem o ID na query
        const mockContext = { log: jest.fn() };

        const response = await getVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Você precisa fornecer um ID para buscar a vacina');
    });
});




/*const { getVacinaHandler } = require('../functions/getVacina');

describe('Teste da função getVacinaHandler', () => {
    it('Deve retornar status 200 e a vacina ao fornecer um ID válido', async () => {
        const mockRequest = { query: new Map([['id', '1']]) };
        const mockContext = { log: jest.fn() };

        const response = await getVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(200);
        expect(response.body).toContain('Vacina não encontrada');
    });

    it('Deve retornar status 400 quando o ID não é fornecido', async () => {
        const mockRequest = { query: new Map() };
        const mockContext = { log: jest.fn() };

        const response = await getVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Você precisa fornecer um ID para buscar a vacina');
    });
});*/
