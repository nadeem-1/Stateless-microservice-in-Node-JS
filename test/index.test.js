var  index = require('../index.js'),
     assert = require('assert'),
      request = require('supertest'),
      expect = require('expect.js');

describe('Server',()=>{
  it('should pass the test',(done)=>{
      request(app)
      .get('/api/login')
      .expect(200)
      .end(done);
  });
  it('should pass the test',(done)=>{
      request(app)
      .get('/api/images')
      .expect(404)
      .end(done);
  });
});
