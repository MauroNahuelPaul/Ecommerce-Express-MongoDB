import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker"

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de E-Commerce', () => {
    describe('Test de Products', () => {
        let idNewProduct = ''
        it('El Endpoint POST /api/products debe registrar un producto', async () => {
            const productMock = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.string.nanoid(8),
                price: faker.commerce.price({ min: 100 }),
                status: faker.datatype.boolean(),
                stock: faker.string.numeric(2),
                category: faker.commerce.department()
            }

            const response = await requester.post('/api/products').send(productMock)
            const { status, ok, _body } = response
            idNewProduct = _body.payload._id
            expect(_body.payload).to.have.property('_id')
        })

        it('El endpoint POST /api/products no debe registrar un producto con datos vacíos', async () => {
            const productMock = {}
            const response = await requester.post('/api/products').send(productMock)
            const { status, ok, _body } = response
            expect(ok).to.be.eq(false)
        })

        it('El endpoint DELETE /api/products debe borrar un producto especifico', async () => {
            const response = await requester.delete(`/api/products/${idNewProduct}`).send()
            const { status, ok, _body } = response
            expect(_body.payload._id).to.be.eq(idNewProduct)
        })

    })
})