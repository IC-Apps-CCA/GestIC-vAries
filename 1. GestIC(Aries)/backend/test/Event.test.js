const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let itemId = null;

describe('Testing event routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer ' + res.body.token;
    })

    afterAll(() => {
        sequelize.close();
    })

    it('Should get all events', async () => {
        const res = await request(app)
            .get('/event');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a event', async () => {
        const res = await request(app)
            .post('/event')
            .send({
                start: "2021-06-22T00:00:01",
                end : "2021-06-22T00:00:01",
                title: "Inicio do período",
                description: "um novo período",
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'start', 'end',
        'title', 'description');
        itemId = res.body.id;
    })

    it('Should updata a event', async () => {
        const res = await request(app)
            .put('/event')
            .send({
                id: itemId,
                end: "2021-06-22T00:59:59",
                description: "um novo período",
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'start', 'end',
        'title', 'description');
        console.log(res.body.end);
        expect(new Date(res.body.end))
            .toEqual(new Date("2021-06-22T00:59:59"));
    })

    it('Should get a event by its id', async () => {
        const res = await request(app)
            .get('/event/' + itemId)
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'start', 'end',
        'title', 'description');
    })

    it('Should delete a event', async () => {
        const res = await request(app)
            .delete('/event/' + itemId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        const resGet = await request(app)
            .get('/event/' + itemId);
        expect(resGet.ok).toBeFalsy();
    })
})
