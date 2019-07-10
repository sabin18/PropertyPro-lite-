import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);

// Create a user
describe('user routes test', () => {
  it('it should allow signup of the user', (done) => {
    const users = {
      id: 1,
      email: 'ben0@gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      PhoneNumber:'0789765444',
      status: 'Not login',
      isadmin: 'false',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('user registered successfully');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not allow signup of the user with existing email', (done) => {
    const users = {
      id: 1,
      email: 'ben0@gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      PhoneNumber:'0789765444',
      status: 'Not login',
      isadmin: 'false',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email already exist please use another email!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not allow signup of the user with feck  email', (done) => {
    const users = {
      id: 1,
      email: 'ben0gmail.com',
      firstname: 'kwizera',
      lastname: 'kivin',
      password: '5858949',
      address: 'kigali',
      PhoneNumber:'0789765444',
      status: 'Not login',
      isadmin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  describe('It should be able to get all users', () => {
    it('It should return the list of all user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('It should return a particular user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('It should not get  a particular user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/145')
        .end((error, res) => {
          if (error) done(error);
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    describe('Test a user logged in successfully', () => {
      before('Create a user in a database', (done) => {
        const users = {
          id: 1,
          email: 'ake30@gmail.com',
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
            res.body.should.have.property('message').eql('user registered successfully');
            res.body.should.be.a('object');
            done();
          });
      });

      it('It should test a successful log in', (done) => {
        const user = {
          email: 'ake30@gmail.com',
          password: '5858949',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Logged in successfully');
            res.body.should.have.property('token');
            done();
          });
      });
      it('It should test a not matching password', (done) => {
        const users = {
          email: 'ake30@gmail.com',
          password: 'adafdafdafeae',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('incorrect Password !');
            done();
          });
      });
      it('It should test a non existing record', (done) => {
        const users = {
          email: 'iruwaraivos@gmail.com',
          password: 'adafdafdafeae',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('No user with that email !');
            done();
          });
      });
      
      it('it should be able to resetpassword', (done) => {
        const users = {
          id: 1,
          email: 'ake30@gmail.com',
          newpassword: 'ggfffddd',
        
        };
        chai.request(app)
          .patch('/api/v1/user/resetpassword')
          .send(users)
          .end((err, res) => {
            res.should.have.property('status').eql(201);
            res.body.should.have.property('message').eql('password updated  succesfully');
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should not be able to resetpassword with invalid email', (done) => {
        const users = {
          id: 1,
          email: '',
          newpassword: 'ggfffddd',
        
        };
        chai.request(app)
          .patch('/api/v1/user/resetpassword')
          .send(users)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
          });
        });

      it('it should  not be able reset password with wrong email', (done) => {
        const users = {
          id: 1,
          email: 'ake54@gmail.com',
          newpassword: '5858949',
          
        };
        chai.request(app)
          .patch('/api/v1/user/resetpassword')
          .send(users)
          .end((err, res) => {
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error').eql("can't find user with that email");
            res.body.should.be.a('object');
            done();
          });

         
      });
    });
  });
});
