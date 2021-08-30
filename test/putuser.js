//importing packages 
import supertest from "supertest"
import chai from "chai"
import { expect } from "chai"
import jsonschema from "../test_data/jsonschema/putuser.json"
import inputdata from "../inputdata"
import Api from "../Api"

chai.use(require('chai-json-schema'));

//variables
const url = supertest(Api.baseurl);

describe('Put/user', () => {
  it('PUT/update details in id', async () => {
    const response = await url.put(Api.putuser)
      .type('application/json')
      .send({
        'name': inputdata.put0,
        'job': inputdata.put1,
      })
      .expect(200)
      .expect((res) => {
        // console.log(res)
        expect(res.body).to.be.jsonSchema(jsonschema.valid_schema)
      })
  })

  it('update details in invalid id', async () => {
    const response = await url.put(Api.putuser)
      .type('application/json')
      .send({
        'name': inputdata.put2,
        'role': inputdata.put3,
      })
      .expect(200)
      .expect((res) => {
        // console.log(res)
        expect(res.body).to.be.jsonSchema(jsonschema.invalid_schema)
      })
  })
})