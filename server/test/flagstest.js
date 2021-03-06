import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import authentication from '../helpers/authentication';

chai.should();
chai.use(chaiHttp);

// Test the route of flags
let userToken;
before('Create a user who will create property ', (done) => {
  const users = {
    id: 3,
    email: 'ake330@gmail.com',
    firstname: 'kwizera',
    lastname: 'kivin',
    password: '5858949',
    address: 'kigali',
    phonenumber:'0789765444',
    status: 'login',
    isadmin: 'false',
  };
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(users)
    .end((error, res) => {
      if (error) done(error);
      userToken = authentication.encodeToken(users);
      done();
    });
});

before('it should be able to  create a third property', (done) => {
  chai.request(app)
    .post('/api/v1/property')
    .field("id","4")
      .field("createdon", "12-06-2019 10:43:46")
      .field("owner", "3")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "mini flat")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .field("description", "onestreet")
      .attach('image','server/image/passion.jpg','passion.jpg','passion.jpg')
    .set({token:userToken})
    .end((err, res) => {
      res.should.have.property('status').eql(201);
      res.body.should.have.property('message').eql('property created successfully');
      res.body.should.be.a('object');

      done();
    });        

});

describe('flags routes test', () => {
  it('it should GET all flags', (done) => {
    chai.request(app)
      .get('/api/v1/flags')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should be able to  create a second property', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .field("id","2")
        .field("created_On", "12-06-2019 10:43:46")
        .field("owner", "1")
        .field("ownerPhoneNumber", "078865544")
        .field("ownerEmail", "benmugabe@gmail.com")
        .field("status", "sold")
        .field("type", "mini flat")
        .field("city", "kigali")
        .field("address", "kimironko")
        .field("price", "700")
        .field("description", "10street")
        .attach('image','server/image/passion.jpg','passion.jpg','passion.jpg')
      .set({token:userToken})
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('property created successfully');
        res.body.should.be.a('object');
  
        done();
      });        

  });
  it('it should be able to  create a second property', (done) => {
    chai.request(app)
      .post('/api/v1/property')
      .field("id","3")
        .field("created_On", "12-06-2019 10:43:46")
        .field("owner", "1")
        .field("ownerPhoneNumber", "078865544")
        .field("ownerEmail", "benmugabe@gmail.com")
        .field("status", "sold")
        .field("type", "mini flat")
        .field("city", "kigali")
        .field("address", "kimironko")
        .field("price", "700")
        .field("description", "101sreet")
        .attach('image','server/image/passion.jpg','passion.jpg','passion.jpg')
      .set({token:userToken})
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('property created successfully');
        res.body.should.be.a('object');
  
        done();
      });        

  });
  
it('it should be able to record a flag', (done) => {
    const flag = {
      id: 1,
      createdon: "17-07-2019 17:07:61",
      property_id: 3,
      reason: "weird demands",
      description: "the price is too expensive"
  };

    chai.request(app)
      .post('/api/v1/3/flags')
      .send(flag)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('your flag have submit successfully ');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not be able to record a flag with invalid id', (done) => {
    const flag = {
      id: 1,
      createdon: "17-07-2019 17:07:61",
      property_id: 3,
      reason: "weird demands",
      description: "the price is too expensive"
  };

    chai.request(app)
      .post('/api/v1/trtr/flags')
      .send(flag)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

 
  it('reason must be required to record flags', (done) => {
    const flags = {
     reason: " ",
    };

    chai.request(app)
      .post('/api/v1/1/flags')
      .send(flags)
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('errors');
        done();
      });
  });


  it('it should not be able to record flag with wrong property id', (done) => {
    const flags = {
      id: 1,
        createdOn: "13-06-2019 09:06:09",
        property_id: 1,
        reason: "pricing",
        description: "the price is too high"

    };

    chai.request(app)
      .post('/api/v1/5666/flags')
      .send(flags)
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("that property doesn't exist");
        done();
      });
  });
 
 it('it should GET a single flag', (done) => {
    chai.request(app)
      .get('/api/v1/flags/1')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET a single flag with invalid id', (done) => {
    chai.request(app)
      .get('/api/v1/flags/tryr')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

it('it should not GET a single flag', (done) => {
  chai.request(app)
    .get('/api/v1/flags/11667')
    .end((err, res) => {
      res.should.have.property('status').eql(404);
      res.body.should.be.a('object');
      done();
    });
});

it('it should GET a single property flag', (done) => {
  chai.request(app)
    .get('/api/v1/property/3/flags')
    .end((err, res) => {
      res.should.have.property('status').eql(200);
      res.body.should.be.a('object');
      done();
    });
});
it('it should not GET a single property flag with invalid id', (done) => {
  chai.request(app)
    .get('/api/v1/property/ret/flags')
    .end((err, res) => {
      res.should.have.property('status').eql(400);
      res.body.should.be.a('object');
      done();
    });
});
 
  it('it should not GET a single property flag', (done) => {
    chai.request(app)
    .get('/api/v1/property/133/flags')
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        res.body.should.be.a('object');
        done();
      });
  });

});
