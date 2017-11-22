const expect = require("expect");
const request = require("supertest");

const app = require("./server");

describe("GET /new/URL", () => {
  it("should get url back", done => {
    let url = "https://www.google.com";
    request(app)
      .get(`/new/${url}`)
      .expect(200)
      .expect(res => {
        expect(res.body.url).toBe(url);
      })
      .end(done);
  });

  it("should return error on invalid url", done => {
    let url = "www.google.com";
    request(app)
      .get(`/new/${url}`)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toBe("Invalid url");
      })
      .end(done);
  });
});
