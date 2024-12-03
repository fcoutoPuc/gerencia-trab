import request from 'supertest';

describe('GET /teste/products', () => {
    it('should return a JSON response with name "Hello"', async () => {
        const response = await request('http://localhost:3000')
            .get('/teste/products')
            .expect(200);

        expect(response.body).toEqual({
            name: 'Hello'
        });
    });
});
