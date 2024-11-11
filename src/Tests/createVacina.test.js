const { createVacinaHandler } = require('../functions/createVacina');

describe('Teste da função createVacinaHandler', () => {
    it('Deve retornar status 201 e ID para uma vacina criada com sucesso', async () => {
        const mockRequest = {
            json: async () => ({
                nomeVacina: 'VacinaTeste13',
                quantidade: 10,
                dataValidade: '2025-12-31'
            }),
            url: '/api/vacina'
        };

        const mockContext = {
            log: jest.fn()
        };

        const response = await createVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(201);
        expect(response.body).toContain('Vacina VacinaTeste13 criada com sucesso');
        expect(response).toHaveProperty('id');
    });

    it('Deve retornar status 400 quando dados estão faltando', async () => {
        const mockRequest = {
            json: async () => ({
                nomeVacina: 'VacinaTeste1',
                quantidade: 10,
                dataValidade: ''
            }),
            url: '/api/vacina'
        };

        const mockContext = {
            log: jest.fn()
        };

        const response = await createVacinaHandler(mockRequest, mockContext);

        expect(response.status).toBe(400);
        expect(response.body).toContain('Faltam dados necessários');
    });
});
