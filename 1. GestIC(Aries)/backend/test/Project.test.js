const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let coordId = null
let projectId = null;

describe('Testing project routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer ' + res.body.token;
        coordId = res.body.id
    })

    afterAll(() => {
        sequelize.close();
    })

    it('Should get all projects', async () => {
        const res = await request(app)
            .get('/project/all');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a project', async () => {
        const res = await request(app)
            .post('/project')
            .send({
                name: "proj exemplo4",
                description: "uma descrição",
                type: 'PIBIT',
                })
            .set('Authorization', coordToken);
        console.log(res.body)
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'owner', 'type');
        projectId = res.body.id
    })

    it('Should update a project', async () => {
        const res = await request(app)
            .put('/project')
            .send({
                id: projectId,
                name: 'projeto',
                description: 'descrição',
                type: 'PIBIC',
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'uerId', 'type');
        expect(res.body.name).toEqual('projeto');
        expect(res.body.description).toEqual('descrição');
        expect(res.body.type).toEqual('PIBIC');
    })

    it('Should get a project', async () => {
        const res = await request(app)
            .get('/project/' + projectId);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'owner', 'type', 'members');
        expect(res.body.id).toEqual(projectId);
    })

    it('Should add a member', async () => {
        const res = await request(app)
            .post('/project/members')
            .set('Authorization', coordToken)
            .send({
                id: projectId,
                userId: coordId,
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('members');
        expect(res.body.members[0].id).toEqual(coordId);
    })

    it('Should delete a member', async () => {
        const res = await request(app)
            .delete('/project/members')
            .set('Authorization', coordToken)
            .send({
                id: projectId,
                userId: coordId,
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('members');
        expect(res.body.members).toEqual([]);
    })

    it('Should delete a project', async () => {
        const res = await request(app)
            .delete('/project/' + projectId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body.id).toEqual(projectId);

        const resGet = await request(app)
            .get('/project/' + projectId);
        expect(resGet.ok).toBeFalsy();
        })
})
