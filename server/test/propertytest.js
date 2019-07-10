import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import authentication from '../helpers/authentication';

chai.should();
chai.use(chaiHttp);

let userToken;
let userToken2;
let aunthorizedToken;
// Test the route of property
before('Create a user who will create a property', (done) => {
  const users = {
    id: 1,
    email: 'ake0@gmail.com',
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
before('Create a user who will  create a property', (done) => {
  const users = {
    id: 2,
    email: 'ake120@gmail.com',
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
      userToken2 = authentication.encodeToken(users);
      done();
    });
});

before('Create an unkown user', (done) => {
  const unknown = {
    id: 2,
    email: 'ak0@gmail.com',
    firstname: 'kwize',
    lastname: 'kiin',
    password: '558949',
    address: 'kigali',
    PhoneNumber:'0789765444',
    status: 'Not login',
    isadmin: 'false',


  };
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(unknown)
    .end((error, res) => {
      if (error) done(error);
      aunthorizedToken = authentication.encodeToken(unknown);
      done();
    });
});

describe('property routes test', () => {
  it('it should GET all property', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  

  it('it should not GET all property of specific type', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=2 bedroom')
      .set({type:'2 bedroom'})
      .end((err, res) => {
        res.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql("can't find any property");
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET all property of wrong type', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=')
      .set({type:''})
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should be able to  create a property', (done) => {
   
    chai.request(app)
      .post('/api/v1/property')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "2")
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

  it('it should GET all property of specific type', (done) => {
    chai.request(app)
      .get('/api/v1/property?type=mini flat')
      .set({type:'mini flat'})
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });
 

   it('it should not be able to create property without valid Token ', (done) => {
    
     const property = {
        id: 1,
        created_On: "12-06-2019 10:43:46",
        owner: 2,
        ownerPhoneNumber: "078865544",
        ownerEmail: "benmugabe@gmail.com",
        status: "available",
        type: "mini flat",
        city: "kigali",
        address: "kimironko",
        price: "700",
        image_url: "images/imageshjf/.jpg"
    };

    chai.request(app)
      .post('/api/v1/property')
      .send(property)
      .set({  })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Token needed to get access to this page');

        done();
      });
  });


  it('it should not be able to create property without  Token ', (done) => {
    const property = {
        id: 1,
        created_On: "12-06-2019 10:43:46",
        owner: 2,
        ownerPhoneNumber: "078865544",
        ownerEmail: "benmugabe@gmail.com",
        status: "available",
        type: "mini flat",
        city: "kigali",
        address: "kimironko",
        price: "700",
        image_url: "images/imageshjf/.jpg"
    };

    chai.request(app)
      .post('/api/v1/property')
      .send(property)
      .set({ token: '' })
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Token needed to get access to this page');

        done();
      });
  });
  it('it should not be able to create a property with user who is not login  ', (done) => {
    const property = {
        id: 1,
        created_On: "12-06-2019 10:43:46",
        owner: 2,
        ownerPhoneNumber: "078865544",
        ownerEmail: "benmugabe@gmail.com",
        status: "available",
        type: "mini flat",
        city: "kigali",
        address: "kimironko",
        price: "700",
        image_url: "images/imageshjf/.jpg"
    };

    chai.request(app)
      .post('/api/v1/property')
      .send(property)
      .set({ token:aunthorizedToken})
      .end((err, res) => {
        res.should.have.property('status').eql(403);
        res.body.should.have.property('message').eql('Not authorized to this page you must be login before accessing to this page');

        done();
      });
  });
  
  
  it('type must be required to create a property', (done) => {

    chai.request(app)
      .post('/api/v1/property')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "2")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .attach('image','server/image/passion.jpg','passion.jpg')
      .set({token:userToken})
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(errors);
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should GET a single property', (done) => {
    chai.request(app)
      .get('/api/v1/property/1')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not GET a single property', (done) => {
    chai.request(app)
      .get('/api/v1/property/11')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should be able to update a property', (done) => {
    
    chai.request(app)
      .patch('/api/v1/property/1')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "2")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "2 bedroom")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .attach('image','server/image/passion.jpg','passion.jpg')
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should  not be able to update a property', (done) => {
    chai.request(app)
      .patch('/api/v1/property/12')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "2")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "2 bedroom")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .attach('image','server/image/passion.jpg','passion.jpg')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should  not be able to update a property with wrong type', (done) => {
  
    chai.request(app)
      .patch('/api/v1/property/12')
      .field("id","1")
      .field("created_On", "12-06-2019 10:43:46")
      .field("owner", "2")
      .field("ownerPhoneNumber", "078865544")
      .field("ownerEmail", "benmugabe@gmail.com")
      .field("status", "available")
      .field("type", "mini fla")
      .field("city", "kigali")
      .field("address", "kimironko")
      .field("price", "700")
      .attach('image','server/image/passion.jpg','passion.jpg')
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should be able to mark a property as sold', (done) => {
   const property = {
        id: 1,
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
      .patch('/api/v1/property/1/sold')
      .send(property)
      .end((err, res) => {
        res.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should be not able to mark a property as sold', (done) => {
   const property = {
        id: 1,
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
      .patch('/api/v1/property/166/sold')
      .send(property)
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('status must be {sold} to allow to mark a property', (done) => {
    const property = {

      status: 'apdddhd',
    };
    chai.request(app)
      .patch('/api/v1/property/12/sold')
      .send(property)
      .end((error, res) => {
        res.should.have.property('status').eql(400);
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
  });
  
 
  it('it should be able to Delete a property', (done) => {
    chai.request(app)
      .delete('/api/v1/property/1')
      .end((err, res) => {
        res.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not be able to Delete a property', (done) => {
    chai.request(app)
      .delete('/api/v1/property/21')
      .end((err, res) => {
        res.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
