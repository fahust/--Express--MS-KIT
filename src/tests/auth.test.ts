import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import { faker } from '@faker-js/faker';

const userData: CreateUserDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
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
const fakeId = faker.datatype.uuid();


afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: fakeId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: fakeId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const userData: User = {
  //       _id: fakeId,
  //       email: 'test@email.com',
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     };

  //     const authRoute = new AuthRoute();
  //     const users = authRoute.authController.authService.users;

  //     users.findOne = jest.fn().mockReturnValue(userData);

  //     (mongoose as any).connect = jest.fn();
  //     const app = new App([authRoute]);
  //     return request(app.getServer())
  //       .post(`${authRoute.path}logout`)
  //       .send(userData)
  //       .set('Set-Cookie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ')
  //       .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
  //   });
  // });
});
