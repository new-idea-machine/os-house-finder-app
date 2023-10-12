import { config } from "dotenv";
import 'jest';
import * as request from 'supertest'

let testUser = {
    'email': 'test@jest.com',
    'password': 'jestTest123'
}

let putUserData1 = {
    'email': 'test1@jest.com',

}
let putUserData2 = {
    'password': 'jestTest234'
}
let putUserData3 = {
    'email': 'test2@jest.com',
    'password': 'jestTest2345'
}

let userID: string = "";
let loginToken: string = "";

describe("POST /register", () => {

    it("Should be able to create user", async () => {
        const res = await request("http://localhost:5000")
            .post("/api/users/register")
            .send(testUser);

        let registerText = JSON.parse(res.text);
        let registerToken = registerText.token;

        expect(res.statusCode).toEqual(201);

    });



    describe("POST /login", () => {
        it("should be able to login to the newly created user", async () => {
            const res = await request("http://localhost:5000")
                .post("/api/users/login")
                .send(testUser);

            let loginText = JSON.parse(res.text);

            let split = res.header['set-cookie'][0].substring(4).split(" ");
            loginToken = split[0].slice(0, -1);
            userID = loginText._id;
            let userEmail = loginText.email;


            // We want a 200 status code.
            expect(res.statusCode).toEqual(200);
            // We want the user ID
            expect(userID).toEqual(expect.any(String));
            // We want the email
            expect(userEmail).toEqual(expect.any(String));

        });



        describe("PUT /users/:id", () => {
            it("should be able to login to the user with only the email changing", async () => {
                const res = await request("http://localhost:5000")
                    .put(`/api/users/${userID}`)
                    .send(putUserData1)
                    .set('Cookie', [`jwt=${loginToken}`]);
                let putText = JSON.parse(res.text);
                // We want a 200 status code.
                expect(res.statusCode).toEqual(200);
                // We want the correct server message.
                expect(putText.message).toEqual('User updated successfully');


            });

            it("should be able to login to the user with only the password changing", async () => {
                const res = await request("http://localhost:5000")
                    .put(`/api/users/${userID}`)
                    .send(putUserData2)
                    .set('Cookie', [`jwt=${loginToken}`]);

                let putText = JSON.parse(res.text);
                // We want a 200 status code.
                expect(res.statusCode).toEqual(200);
                // We want the correct server message.
                expect(putText.message).toEqual('User updated successfully');
            });

            it("should be able to login to the user with both email and password changing", async () => {
                const res = await request("http://localhost:5000")
                    .put(`/api/users/${userID}`)
                    .send(putUserData3)
                    .set('Cookie', [`jwt=${loginToken}`]);

                let putText = JSON.parse(res.text);
                // We want a 200 status code.
                expect(res.statusCode).toEqual(200);
                // We want the correct server message.
                expect(putText.message).toEqual('User updated successfully');
            });

            // DELETE section is grouped with PUT to ensure the DELETE runs after the PUTs run.

            describe("DELETE /users/:id", () => {
                it("delete the user", async () => {
                    const res = await request("http://localhost:5000")
                        .delete(`/api/users/${userID}`)
                        .set('Cookie', [`jwt=${loginToken}`]);

                    let deleteText = JSON.parse(res.text);

                    // We want a 200 status code.
                    expect(res.statusCode).toEqual(200);
                    // We want the message
                    expect(deleteText.message).toEqual('User deleted successfully');

                });
            })
        })
    })
})