import { expect } from "chai";
import request from "supertest";
import express from 'express';
import sinon from 'sinon';
import routes from '../src/routers/usersRouter.mjs';
import UserModel from "../src/models/auth/usersModel.mjs";
import { redisClient } from "../src/utils/db/redisSetUp.mjs";
describe('GET /api/users', () => {
    let app;

    before(() => {
        app = express();
        app.use('/', routes);
    });

    afterEach(() => {
        // Restore the original method after each test to avoid side effects
        sinon.restore();
    });

    it('should return a 200 status and a list of users', async () => {
        // Mock UserModel.find to return an array of users
        const mockUsers = [
            { _id: '1', email: 'user1@example.com' },
            { _id: '2', email: 'user2@example.com' }
        ];
        sinon.stub(UserModel, 'find').returns(Promise.resolve(mockUsers));

        const response = await request(app).get('/api/users');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(2);
        expect(response.body[0]).to.have.property('email', 'user1@example.com');
    });

    it('should return a 404 status if no users are found', async () => {
        // Mock UserModel.find to return an empty array
        sinon.stub(UserModel, 'find').returns(Promise.resolve([]));

        const response = await request(app).get('/api/users');
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('message', 'No users found');
    });

    it('should return a 500 status if there is a server error', async () => {
        // Mock UserModel.find to throw an error
        sinon.stub(UserModel, 'find').throws(new Error('Database error'));

        const response = await request(app).get('/api/users');
        expect(response.status).to.equal(500);
        expect(response.body).to.have.property('message', 'Database error');
    });
});

describe('GET /api/users/:id', () => {
    let app;
    
    before(() => {
        app = express()
        app.use('/', routes)
    }),

    afterEach(() => {
        sinon.restore()
    })

    it('should return a 200 status and an userObject', async () => {
        const mockUser = { _id: '507f1f77bcf86cd799439011', email: 'exemple@.gmail.com', username: 'Asan', password: '123' };
        sinon.stub(UserModel, 'findById').returns(Promise.resolve(mockUser))
        sinon.stub(redisClient, 'get').returns(Promise.resolve(JSON.stringify(mockUser)));

        const response = await request(app).get('/api/users/507f1f77bcf86cd799439011')

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('email', 'exemple@.gmail.com')
    })

    it('should return a 404 status if no user found', async () => {
        
        sinon.stub(UserModel, 'findById').returns(Promise.resolve(null))
        sinon.stub(redisClient, 'get').returns(Promise.resolve(null));

        const response = await request(app).get('/api/users/507f1f77bcf86cd799439011')

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('message', 'Not found')
    })

    it('should return a 500 status if there is a server error', async () => {
        sinon.stub(UserModel, 'findById').throws(new Error('Server error'))
        sinon.stub(redisClient, 'get').throws(new Error('Server error'))


        const response = await request(app).get('/api/users/507f1f77bcf86cd799439011')

        expect(response.status).to.equal(500)
        expect(response.body).to.have.property('message', 'Server error')
    })

})

describe('DELETE /api/users/:id', () => {
    let app;

    before(() => {
        app = express();
        app.use('/', routes);
    });

    afterEach(() => {
        // Restore the original method after each test to avoid side effects
        sinon.restore();
    });

    it('should return a 200 status if user was deleted', async () => {
        const mockUser = { _id: '507f1f77bcf86cd799439011', email: 'exemple@.gmail.com', username: 'Asan', password: '123' };

        sinon.stub(UserModel, 'findByIdAndDelete').returns(Promise.resolve(mockUser));
    
        const response = await request(app).delete('/api/users/507f1f77bcf86cd799439011');
    
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'User was deleted' );
    });

    it('should return a 404 status if user wasn\'t defined', async () => {
        sinon.stub(UserModel, 'findByIdAndDelete').returns(Promise.resolve(null))
        const response = await request(app).delete('/api/users/507f1f77bcf86cd799439011');
    
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('message', 'Not found' );
    })

    it('should return a 500 status if there is a server error', async () => {
        sinon.stub(UserModel, 'findByIdAndDelete').throws(new Error('Database error'))
        const response = await request(app).delete('/api/users/507f1f77bcf86cd799439011')

        expect(response.status).to.equal(500)
        expect(response.body).to.have.property('message', 'Database error')
    })

})



