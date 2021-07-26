const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let coordId = null
let researchId = null;


describe('Testing research group routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer ' + res.body.token;
        coordId = res.body.id;
    })

    afterAll(() => {
        sequelize.close();
    })

    it('Should get all research groups', async () => {
        const res = await request(app)
            .get('/research');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a research group', async () => {
        const res = await request(app)
            .post('/research')
            .send({
                name: "grupo de pesquisa 1",
                description: "grupo grupo grupo",
                activities: 'atividades diversas',
                })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'activities', 'members');
        researchId = res.body.id
    })

    it('Should update a research group info', async () => {
        const res = await request(app)
            .put('/research')
            .send({
                id: researchId,
                name: 'grupo2',
                description: 'algo',
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'activities', 'members');
        expect(res.body.name).toEqual('grupo2');
        expect(res.body.description).toEqual('algo');
    })

    it('Should get a research group', async () => {
        const res = await request(app)
            .get('/research/' + researchId);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'activities', 'members');
        expect(res.body.id).toEqual(researchId);
    })

    it('Should add a member', async () => {
        const res = await request(app)
            .post('/research/members')
            .set('Authorization', coordToken)
            .send({
                id: researchId,
                userId: coordId,
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('members');
        expect(res.body.members[0].id).toEqual(coordId);
    })

    it('Should delete a member', async () => {
        const res = await request(app)
            .delete('/research/members')
            .set('Authorization', coordToken)
            .send({
                id: researchId,
                userId: coordId,
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('members');
        expect(res.body.members).toEqual([]);
    })

    it('Should delete a research group', async () => {
        const res = await request(app)
            .delete('/research/' + researchId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body.id).toEqual(researchId);

        const resGet = await request(app)
            .get('/research/' + researchId);
        expect(resGet.ok).toBeFalsy();
    })
    
})
