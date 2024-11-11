const { updateVacinaHandler } = require('../functions/updateVacina');
const sql = require('mssql');

// Mock do banco de dados
jest.mock('mssql', () => {
    const request = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({}) // Simula uma resposta de sucesso para o UPDATE
    };
    return {
        connect: jest.fn().mockResolvedValue({ request: () => request }),
        close: jest.fn()
    };
});

describe('Teste da função updateVacinaHandler', () => {
    it('Deve retornar status 200 ao atualizar uma vacina com sucesso', async () => {
        const mockRequest = {
            json: async () => ({
                id: 1,
                nomeVacina: 'Vacina XYZ',
                quantidade: 15,
                dataValidade: '2025-12-31'
            })
        };
        const mockContext = { log: jest.fn() };

        const response = await updateVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(200);
        expect(response.body).toContain('Vacina Vacina XYZ atualizada com sucesso');
    });

    it('Deve retornar status 400 quando dados estão faltando', async () => {
        const mockRequest = {
            json: async () => ({
                id: null,
                nomeVacina: '',
                quantidade: 15,
                dataValidade: ''
            })
        };
        const mockContext = { log: jest.fn() };

        const response = await updateVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Faltam dados necessários');
    });
});

