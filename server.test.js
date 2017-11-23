const expect = require("expect");
const request = require("supertest");

const app = require("./server");
const URL = require("./models/Url");

beforeEach(done => {
  URL.remove()
    .then(() => {
      return URL.create({ url: "https://www.google.com" });
    })
    .then(() => done());
});
describe("GET /new/URL", () => {
  let url = "https://www.google.com";

  it("should get url back", done => {
    request(app)
      .get(`/new/${url}`)
      .expect(200)
      .expect(res => {
        expect(res.body.orginal_url).toBe(url);
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
        expect(res.body.orginal_url).toBe(url);
        const id = res.body.short_url.split("/")[3];
        URL.findById(id)
          .then(doc => {
            expect(res.body.short_url).toInclude(doc._id);
            expect(res.body.orginal_url).toBe(url);
          })
          .catch(err => done(err));
      })
      .end(done);
  });
  it("should redirect on valid shorturl", done => {
    URL.findOne().then(doc => {
      const id = doc._id;
      request(app)
        .get(`/${id}`)
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          //console.log("header loc", res.header["location"]);
          expect(res.header["location"]).toContain("google.com");
          done();
        });
    });
  });
});
