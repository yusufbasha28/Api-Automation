//importing packages 
import supertest from "supertest"
import chai from "chai"
import { expect } from "chai"
import jsonschema1 from "../test_data/jsonschema/getuser.json"
import Api from "../Api"

chai.use(require('chai-json-schema'));

//variables
const url = supertest(Api.baseurl);

describe('GET/user', () => {
  it('GET/get details in id', async () => {
    const response = await url.get(Api.getuser)

      .expect(200)
      .expect((res) => {
        //console.log(res)
        expect(res.body).to.be.jsonSchema(jsonschema1.valid_schema)
      })
  });

  it('get details of invalid id', async () => {
    const response = await url.get(Api.invalidgetuser)

      .expect(404)
      .expect((res) => {
        // console.log(res)
        expect(res.body).to.be.jsonSchema(jsonschema1.invalid_schema)
      })

  });
});
