import supertest from "supertest"
import chai from "chai"
import { expect } from "chai"
import jsonschema from "../test_data/jsonschema/postuser.json"
import inputdata from "../inputdata"
import Api from "../Api"

chai.use(require('chai-json-schema'));
//variables
const url = supertest(Api.baseurl);


describe('POST/user', () => {
    it('POST/create details in page', async () => {
        const response = await url.post(Api.postuser)
            .type('application/json')
            .send({
                'name': inputdata.post0,
                'job': inputdata.post1,
            })
            .expect(201)
            .expect((res) => {
                //console.log(res)
                expect(res.body).to.be.jsonSchema(jsonschema.valid_schema)
            })
    });

    it('POST/create  invalid details in page', async () => {
        const response = await url.post(Api.postuser)
            .type('application/json')
            .send({
                'email': inputdata.post2,
                'job': inputdata.post3,

            })
            .expect(201)
            .expect((res) => {
               // console.log(res)
                expect(res.body).to.be.jsonSchema(jsonschema.invalid_schema)
            })


    });
});