import { expect } from "chai";
import request from "supertest";
import sinon from 'sinon'
import express from 'express'
import ProductModel from "../src/models/products/ProductModel.mjs";
import { redisClient } from "../src/utils/db/redisSetUp.mjs";
import routes from '../src/routers/productRouter.mjs'

describe('GET api/products', () => {
    let app;

    before(() => {
        app = express()
        app.use('/', routes)
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should return a 200 status and a list of products', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com' },
            { _id: '2', email: 'user2@example.com' }
        ];
        sinon.stub(ProductModel, 'find').returns(Promise.resolve(mockUsers))

        const response = await request(app).get('/api/products')

        expect(response.status).to.equal(200)
        expect(response.body).to.be.an('array')

    })

    it('should return 404 if no products are found', async () => {
        sinon.stub(ProductModel, 'find').returns(Promise.resolve([]))

        const response = await request(app).get('/api/products')

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('message', 'Not found')
    })

})