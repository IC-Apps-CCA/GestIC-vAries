const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

let alunId = null;
let alunToken = null;
let coordToken = null;

describe('Testing user routes',  () => {

    afterAll(() => {
        sequelize.close();
    })

    it('Should create an user', async () => {
        const res = await request(app)
            .post('/access/register')
            .send({
                name: 'aluno3',
                email: 'aluno3@ic.ufal.br',
                password: '1234'
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'profileId',
        'name', 'email', 'password', 'status', 'profileTag');

        alunId = res.body.id;
    })

    it('Should login', async () => {
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('token');
        coordToken = 'Bearer ' + res.body.token;
    })

    it('Should logout', async () => {
        const resLogin = await request(app)
            .post('/access/login')
            .send({
                email: 'aluno3@ic.ufal.br',
                password: '1234'
            })
        alunToken = 'Bearer ' + resLogin.body.token;
        const res = await request(app)
            .get('/access/logout')
            .set('Authorization', alunToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('auth');
        expect(res.body.auth).toBeFalsy();
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeNull();
    })

    it('Should update an user', async () => {
        const res = await request(app)
            .put('/user')
            .send({
                id: alunId,
                name: 'aluno4',
                profileId: '70039c9e-5c27-41fc-bd5a-ac4f00968887',
            })
            .set('Authorization', alunToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'profileId',
        'name', 'email', 'password', 'status', 'profileTag');
        expect(res.body.name).toEqual('aluno4');
        expect(res.body.profileId).toEqual('70039c9e-5c27-41fc-bd5a-ac4f00968887');
    })

    it('Should change user password', async () => {
        const res = await request(app)
            .put('/user')
            .send({
                id: alunId,
                old_password: '1234',
                new_password: '12345',
            })
            .set('Authorization', alunToken);
        expect(res.ok).toBeTruthy();
    })
/*
    it('Should login with the new password', async() => {
        const resLogin = await request(app)
            .post('/access/login')
            .send({
                email : "aluno3@ic.ufal.br",
                password: "12345"
            });
        expect(resLogin.ok).toBeTruthy();
    })
*/

    it('Should delete an user', async () =>{
        const res = await request(app)
            .delete('/user/' + alunId)
            .set('Authorization', coordToken);
        expect(coordToken).toEqual(expect.anything());
        expect(res.ok).toBeTruthy();
        const resLogin = await request(app)
            .post('/access/login')
            .send({
                email : "aluno3@ic.ufal.br",
                password: "1234"
            });
        expect(resLogin.ok).toBeFalsy();
    })

    it('Should get an user', async () => {
        const res = await request(app)
            .get('/user/')
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'profileId',
        'name', 'email', 'status', 'profileTag');
    })

})
