const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let infoId = null;

describe('Testing informatives routes', () => {

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

    it('Should get all informatives', async () => {
        const res = await request(app)
            .get('/informative');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a informative', async () => {
        const res = await request(app)
            .post('/informative')
            .send({
                "title": "teste122",
                "content": "What is Lorem Ipsum? Lorem Ipsum is \
                simply dummy text of the printing and typesetting industry."})
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'title', 'content');
        infoId = res.body.id;
    })

    it('Should updata a informative', async () => {
        const res = await request(app)
            .put('/informative')
            .send({
                id: infoId,
                title: 'title',
                content: 'content',
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'title', 'content');
        expect(res.body.content).toEqual('content');
    })

    it('Should get a informative by its id', async () => {
        const res = await request(app)
            .get('/informative/' + infoId)
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'title', 'content');
    })

    it('Should delete a informative', async () => {
        const res = await request(app)
            .delete('/informative/' + infoId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        const resGet = await request(app)
            .get('/informative/' + infoId);
        expect(resGet.ok).toBeFalsy();
    })
})
