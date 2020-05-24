var  mid = require('../middlewares/middleware.js'),
     token=require('../index.js'),
     request = require('supertest'),
     expect = require('expect.js'),
     localStorage = require('../middlewares/middleware.js').localStorage;
     validity = require('../middlewares/middleware.js').validity;

describe('MiddleWare',()=>{
  it('LocalStorage Storage Should Contain token',(done)=>{
         expect(localStorage.length).to.be.greaterThan(0);
         done();
      });
});

describe('Validity',()=>{
 it('checking the validity that it should work',(done)=>{
   expect(localStorage.getItem('jwtoken')).not.to.be('90e9rreuf08e');
   done();
 });

 it('token checking ',(done)=>{
   var token = validity.token;
   var token2 = '90e9rreuf08e';
   expect(token).to.be(token);
   expect(token).not.to.be(token2);
   request(validity)
   done();
 });
});
