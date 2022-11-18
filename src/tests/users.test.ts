import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import UsersRoute from '@routes/users.route';
import { faker } from '@faker-js/faker';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const fakeUsers = [
  {
    _id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  {
    _id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  {
    _id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
];

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          ...fakeUsers[0],
          password: await bcrypt.hash(fakeUsers[0].password, 10),
        },
        {
          ...fakeUsers[1],
          password: await bcrypt.hash(fakeUsers[1].password, 10),
        },
        {
          ...fakeUsers[2],
          password: await bcrypt.hash(fakeUsers[2].password, 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = fakeUsers[0]._id;

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        ...fakeUsers[0],
        password: await bcrypt.hash(fakeUsers[0].password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`/user/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
        product: '',
        locale: '',
        thumbnail: '',
        firstName: '',
        lastName: '',
        userName: '',
        phones: [''],
        hasNewsletter: false,
        permissions: [''],
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
        product: '',
        locale: '',
        thumbnail: '',
        firstName: '',
        lastName: '',
        userName: '',
        phones: [''],
        hasNewsletter: false,
        permissions: [''],
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      if (userData.email) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
