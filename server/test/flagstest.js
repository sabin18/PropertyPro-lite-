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
    PhoneNumber:'0789765444',
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
before('Create a property', (done) => {
  
    chai.request(app)
      .post('/api/v1/property')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "3")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "mini flat")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .attach('image','server/image/passion.jpg','passion.jpg')
      .set({token:userToken})
      .end((err, res) => {
        res.should.have.property('status').eql(200);
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
      .field("id","1")
        .field("created_On", "12-06-2019 10:43:46")
        .field("owner", "3")
        .field("ownerPhoneNumber", "078865544")
        .field("ownerEmail", "benmugabe@gmail.com")
        .field("status", "sold")
        .field("type", "mini flat")
        .field("city", "kigali")
        .field("address", "kimironko")
        .field("price", "700")
        .attach('image','server/image/passion.jpg','passion.jpg','passion.jpg')
      .set({token:userToken})
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('property created successfully');
        res.body.should.be.a('object');
  
        done();
      });
  });

  it('it should be able to record a flag', (done) => {
    const flag = {
      id: 1,
      createdOn: "12-06-2019 10:43:46",
      property_id: 1,
      reason:"pricing",
      description:"price is too high"

  };

    chai.request(app)
      .post('/api/v1/1/flags')
      .send(flag)
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('your flag have submit successfully ');
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
        res.body.should.have.property('error');
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
      .post('/api/v1/5666y/flags')
      .send(flags)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("that property doesn't exist");
        done();
      });
  });
 

  it('it should be not able  mark a property as sold', (done) => {
    const property = {
         id: 2,
         created_On: "12-06-2019 10:43:46",
         owner: 2,
         ownerPhoneNumber: "078865544",
         ownerEmail: "benmugabe@gmail.com",
         status: "sold",
         type: "mini flat",
         city: "kigali",
         address: "kimironko",
         price: "700",
         image_url: "images/imageshjf/.jpg"
     }; 
 
     chai.request(app)
       .patch('/api/v1/property/2/sold')
       .send(property)
       .end((err, res) => {
         res.should.have.property('status').eql(201);
         res.body.should.be.a('object');
         done();
       });
   });

  it('it should not be able to record flags on the property that have been sold', (done) => {
    const flags = {
      
        id: 2,
        createdOn: "13-06-2019 09:06:09",
        property_id: 2,
        reason: "pricing",
        description: "the price is too high"

    };

    chai.request(app)
      .post('/api/v1/2/flags')
      .send(flags)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('this property have been sold !');
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

  it('it should not GET a single flag', (done) => {
    chai.request(app)
      .get('/api/v1/flags/11')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should GET a single property flag', (done) => {
    chai.request(app)
      .get('/api/v1/property/1/flags')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET a single property flag', (done) => {
    chai.request(app)
    .get('/api/v1/property/133/flags')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

});
