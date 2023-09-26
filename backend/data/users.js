import bcrypt from 'bcrypt';

const users = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jenny Doe',
    email: 'jennydoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
