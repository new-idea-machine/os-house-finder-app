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
  testPref: {
    "squareFoot": {
        "min": 499,
        "max": 1500
    },
    "workLocation": {
        "street": "teststreet",
        "city": "testcity",
        "province": "testprov",
        "postalCode": "testpostal"
    },
    "schoolLocation": {
        "street": "teststreet",
        "city": "testcity",
        "province": "testprov",
        "postalCode": "testpostal"
    },
    "transportation": "string",
    "bedrooms": 2,
    "safetyScore": 2,
    "weightings": {
        "squareFoot": 1,
        "travelTime": 1,
        "bedrooms": 1,
        "safetyScore": 1
    },
    "userId": "abc123"
},
testPrefUpdate: {
  "squareFoot": {
      "min": 501,
      "max": 1500
  },
  "workLocation": {
      "street": "teststreet",
      "city": "testcity",
      "province": "testprov",
      "postalCode": "testpostal"
  },
  "schoolLocation": {
      "street": "teststreet",
      "city": "testcity",
      "province": "testprov",
      "postalCode": "testpostal"
  },
  "transportation": "string",
  "bedrooms": 2,
  "safetyScore": 2,
  "weightings": {
      "squareFoot": 1,
      "travelTime": 1,
      "bedrooms": 1,
      "safetyScore": 1
  },
  "userId": "abc123"
}
};

let userID: string = '';
let loginToken: string = '';
let newPrefId: string = '';

describe('POST /', () => {
  it('Should be able to create preference', async () => {
    const res = await request(app)
      .post('/api/preferences')
      .send(testData.testPref);

    let postResText = JSON.parse(res.text);
    newPrefId = postResText.data._id;

    expect(res.statusCode).toEqual(201);
  });

  describe('GET /:id', () => {
    it('should be able to view the newly created preference', async () => {
      const res = await request(app)
        .get(`/api/preferences/${newPrefId}`)

      let getResText = JSON.parse(res.text);

      // We want a 200 status code.
      expect(res.statusCode).toEqual(200);
      // We want the user ID
      expect(getResText.data._id).toEqual(newPrefId);
      // We want the email
      expect(getResText.data.squareFoot.min).toEqual(499);
    });

    describe('PUT /:id', () => {
      it('should be able to edit the preference', async () => {
        const res = await request(app)
          .put(`/api/preferences/${newPrefId}`)
          .send(testData.testPrefUpdate)
        let getResText = JSON.parse(res.text);
        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the correct server message.
      });

      it('should be able see reflected changes to said preference', async () => {
        const res = await request(app)
          .get(`/api/preferences/${newPrefId}`)
  
        let getResText = JSON.parse(res.text);
  
        // We want a 200 status code.
        expect(res.statusCode).toEqual(200);
        // We want the user ID
        expect(getResText.data._id).toEqual(newPrefId);
        // We want the email
        expect(getResText.data.squareFoot.min).toEqual(501);
      })

      // DELETE section is grouped with PUT to ensure the DELETE runs after the PUTs run.

      describe('DELETE /preferences/:id', () => {
        it('delete the pref', async () => {
          const res = await request(app)
            .delete(`/api/preferences/${newPrefId}`)

          let deleteText = JSON.parse(res.text);
          // We want a 200 status code.
          expect(res.statusCode).toEqual(200);
          expect(deleteText.message).toEqual(`Preference with ID ${newPrefId} deleted successfully.`);
        });
      });
    });
  });
});
