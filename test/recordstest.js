// Records endpoints test

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import * as schema from '../server/db/dbschema';


chai.use(chaiHttp);

let token;
let redflagId;

describe('before testing', () => {
    before(async () => {
        await schema.createRecordsTable();
        await schema.createUserTable();
    });
    describe('Before endpoints tests', () => {
        it('sign up user and return token', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    firstname: 'Adaeze',
                    lastname: 'Eric',
                    username: 'deeEric',
                    email: 'daizyodurukwe007755@gmail.com',
                    password: 'puma',
                    phone: '08136770975',
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body.data[0]).to.have.property('token');
                    // eslint-disable-next-line prefer-destructuring
                    token = res.body.data[0].token;
                    done();
                });
        });

        /**
         * Test POST endpoints
         */
        // Test POST red flag endpoint
        describe('POST API endpoint api/v1/red-flags', () => {
            it('POST a report', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        expect(res.body.data[0]).to.have.property('id');
                        expect(res.body.data[0]).to.have.property('message').to.be.equal('Created red-flag record');
                        redflagId = res.body.data[0].id;
                        done();
                    });
            });

            it('return error when type is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when type wrong', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'record',
                        location: 'gwagwalada',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when location is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when comment is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        location: 'gwagwalada',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });
        });

        // Test POST intervention endpoint
        describe('POST API endpoint api/v1/intervention', () => {
            it('POST a report', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        expect(res.body.data[0]).to.have.property('id');
                        expect(res.body.data[0]).to.have.property('message').to.be.equal('Created intervention record');
                        redflagId = res.body.data[0].id;
                        done();
                    });
            });

            it('return error when type is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when type wrong', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'record',
                        location: 'gwagwalada',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when location is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });

            it('return error when comment is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        location: 'gwagwalada',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors').to.be.an('array');
                        done();
                    });
            });
        });

        // Test GET all endpoint
        describe('GET API endpoint /api/v1/red-flags', () => {
            it('should return all incidents', (done) => {
                chai.request(app)
                    .get('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        done();
                    });
            });
        });

        // Test GET one endpoint
        describe('GET API endpoint /api/v1/red-flags/<red-flag-id>', () => {
            it('should get one redflag', (done) => {
                chai.request(app)
                    .get(`/api/v1/red-flags/${redflagId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        done();
                    });
            });

            it('should return error with an invalid id', (done) => {
                chai.request(app)
                    .get('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        // Test PATCH location of red flag endpoint
        describe('PATCH API endpoint /red-flags/<red-flag-id>/location', () => {
            it('should update location of red flag', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/location`)
                    .set('x-access-token', token)
                    .send({
                        location: 'Lat: 500, Long: 70',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('message').to.be.equal('Updated red-flag record\'s location');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('location');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .patch('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3/location')
                    .set('x-access-token', token)
                    .send({
                        location: 'Lat: 500, Long: 70',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });

        // Test PATCH comment of red flag endpoint
        describe('PATCH API endpoint /red-flags/<red-flag-id>/comment', () => {
            it('should update comment on a red flag', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/comment/`)
                    .set('x-access-token', token)
                    .send({
                        comment: 'new comment',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equal('Updated red-flag record\'s comment');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('comment');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .patch('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3/comment')
                    .set('x-access-token', token)
                    .send({
                        comment: 'another new comment',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });

        // Test DELETE incident endpoint
        describe('DELETE API endpoint /api/v1/red-flags/<red-flag-id>', () => {
            it('should return all incidents', (done) => {
                chai.request(app)
                    .delete(`/api/v1/red-flags/${redflagId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('message').to.be.equal('red-flag record has been deleted');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .delete('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });
    });
});
