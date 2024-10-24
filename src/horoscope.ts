import { Elysia, t } from 'elysia'
import HoroscopeController from './controllers/HoroscopeController';
import { MongoClient } from 'mongodb';
import { dbName, mongodbUrl } from '../config';
import UserRepo from './repos/UserRepo';

const client = new MongoClient(mongodbUrl);
const db = client.db(dbName);

const userRepo = new UserRepo(db);

const horoscope = new Elysia({ prefix: '/horoscope' })
  .decorate('horoscopeController', new HoroscopeController(userRepo))
  .get('', ({ horoscopeController }) => horoscopeController.getAll())
  .post('', ({ horoscopeController, body: { name, birthDate, location, timezone } }) => horoscopeController.add(name, birthDate, location, timezone), {
    body: t.Object({
      name: t.String(),
      birthDate: t.String({ format: 'date-time' }),
      location: t.Object({
        latitude: t.Number(),
        longitude: t.Number()
      }),
      timezone: t.Optional(t.Number())
    })
  })
  .put('', ({ horoscopeController }) => horoscopeController.updateAll())

export default horoscope;