const expect = require("expect");
const request = require("supertest");

const app = require("./server");
const URL = require("./models/Url");

beforeEach(done => {
  URL.remove().then(() => done());
});
describe("GET /new/URL", () => {
  let url = "https://www.google.com";

  it("should get url back", done => {
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

  it("should save url to db", done => {
    let url = "https://www.google.com";

    request(app)
      .get(`/new/${url}`)
      .expect(200)
      .expect(res => {
        expect(res.body.url).toBe(url);
        URL.findById(res.body._id)
          .then(doc => {
            expect(res.body._id).toInclude(doc._id);
            expect(res.body.url).toBe(url);
          })
          .catch(err => done(err));
      })
      .end(done);
  });
});
