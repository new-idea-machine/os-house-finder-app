import 'jest';
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

let Mongo_TEST_DB_URI: string = process.env.MONGODB_TEST_URI!;

beforeAll(() => {
  mongoose
    .connect(Mongo_TEST_DB_URI)
    .then(() => {
      console.log('MongoDB connected to TEST DB');
    })
    .catch((err) => {
      console.log(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
    });
});

afterAll(() => {
  mongoose.connection.close();
});

let testData = {
  testUser: {
    email: 'test@jest.com',
    password: 'jestTest123',
  },
  firstUserPut: {
    email: 'test1@jest.com',
  },
  loginFirstUserPut: {
    email: 'test1@jest.com',
    password: 'jestTest123',
  },
  secondUserPut: {
    password: 'jestTest234',
  },
  loginSecondUserPut: {
    email: 'test1@jest.com',
    password: 'jestTest234',
  },
  thirdUserPut: {
    email: 'test2@jest.com',
    password: 'jestTest2345',
  },
  loginThirdUserPut: {
    email: 'test2@jest.com',
    password: 'jestTest2345',
  },
};

let userID: string = '';
let loginToken: string = '';

describe('POST /register', () => {
  it('Should be able to create user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(testData.testUser);

    let registerText = JSON.parse(res.text);
    let registerEmail = registerText.data.email;

    expect(res.statusCode).toEqual(201);
    expect(registerEmail).toEqual(testData.testUser.email);
  });

  describe('POST /login', () => {
    it('should be able to login to the newly created user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send(testData.testUser);

      let loginText = JSON.parse(res.text);

      let split = res.header['set-cookie'][0].substring(4).split(' ');
      loginToken = split[0].slice(0, -1);
      userID = loginText.data._id;
      let userEmail = loginText.data.email;

      // We want a 200 status code.
      expect(res.statusCode).toEqual(200);
      // We want the user ID
      expect(userID).toEqual(expect.any(String));
      // We want the email
      expect(userEmail).toEqual(expect.any(String));
    });

    describe('PUT /users/:id', () => {
      it('should be able to edit the user with only the email changing', async () => {
        const res = await request(app)
          .put(`/api/users/${userID}`)
          .send(testData.firstUserPut)
          .set('Cookie', [`jwt=${loginToken}`]);
        let putText = JSON.parse(res.text);
        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the correct server message.
        expect(putText.message).toEqual('User updated successfully');
      });

      it('should be able to login to the edited user (1)', async () => {
        const res = await request(app)
          .post('/api/users/login')
          .send(testData.loginFirstUserPut);

        let loginText = JSON.parse(res.text);

        let split = res.header['set-cookie'][0].substring(4).split(' ');
        loginToken = split[0].slice(0, -1);
        userID = loginText.data._id;
        let userEmail = loginText.data.email;

        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the user ID
        expect(userID).toEqual(expect.any(String));
        // We want the email
        expect(userEmail).toEqual(expect.any(String));
      });

      it('should be able to edit the user with only the password changing', async () => {
        const res = await request(app)
          .put(`/api/users/${userID}`)
          .send(testData.secondUserPut)
          .set('Cookie', [`jwt=${loginToken}`]);

        let putText = JSON.parse(res.text);
        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the correct server message.
        expect(putText.message).toEqual('User updated successfully');
      });

      it('should be able to login to the edited user (2)', async () => {
        const res = await request(app)
          .post('/api/users/login')
          .send(testData.loginSecondUserPut);

        let loginText = JSON.parse(res.text);

        let split = res.header['set-cookie'][0].substring(4).split(' ');
        loginToken = split[0].slice(0, -1);
        userID = loginText.data._id;
        let userEmail = loginText.data.email;

        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the user ID
        expect(userID).toEqual(expect.any(String));
        // We want the email
        expect(userEmail).toEqual(expect.any(String));
      });

      it('should be able to edit the user with both email and password changing', async () => {
        const res = await request(app)
          .put(`/api/users/${userID}`)
          .send(testData.thirdUserPut)
          .set('Cookie', [`jwt=${loginToken}`]);

        let putText = JSON.parse(res.text);
        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the correct server message.
        expect(putText.message).toEqual('User updated successfully');
      });

      it('should be able to login to the edited user (3)', async () => {
        const res = await request(app)
          .post('/api/users/login')
          .send(testData.loginThirdUserPut);

        let loginText = JSON.parse(res.text);

        let split = res.header['set-cookie'][0].substring(4).split(' ');
        loginToken = split[0].slice(0, -1);
        userID = loginText.data._id;
        let userEmail = loginText.data.email;

        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the user ID
        expect(userID).toEqual(expect.any(String));
        // We want the email
        expect(userEmail).toEqual(expect.any(String));
      });

      // DELETE section is grouped with PUT to ensure the DELETE runs after the PUTs run.

      describe('DELETE /users/:id', () => {
        it('delete the user', async () => {
          const res = await request(app)
            .delete(`/api/users/${userID}`)
            .set('Cookie', [`jwt=${loginToken}`]);

          let deleteText = JSON.parse(res.text);

          // We want a 200 status code.
          expect(res.statusCode).toEqual(200);
          // We want the message
          expect(deleteText.message).toEqual('User deleted successfully');
        });
      });
    });
  });
});
