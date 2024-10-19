import { Elysia, t } from 'elysia'
import { edenFetch } from '@elysiajs/eden'
import { astrologyApi } from '../config';

type App = Elysia<"", false, {
  decorator: {};
  store: {};
  derive: {};
  resolve: {};
}, {
  type: {};
  error: {};
}, {
  schema: {};
  macro: {};
  macroFn: {};
}, {
  planets: {
    post: {
      body: unknown;
      params: {};
      query: unknown;
      headers: unknown;
      response: {

      };
    }
  }
}>

class Horoscope {
  private horoscopes: {
    name: string,
    birthDate: Date,
    location: {
      lan: number, lon: number
    }
  }[] = [];

  async add(name: string, birthDate: string, location: { lan: number, lon: number }) {
    const fetch = edenFetch<App>(astrologyApi)

    const { data } = await fetch('/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'RkcF0p7dqU5i4EGeZ3m901bM84tV156da1s7vdu4'
      },
      body: {
        year: 1987,
        month: 4,
        date: 24,
        hours: 23,
        minutes: 54,
        seconds: 0,
        latitude: 6.8868,
        longitude: 79.9187,
        timezone: 5.5,
        settings: {
          observation_point: "topocentric",
          ayanamsha: "lahiri"
        }
      }
    })

    console.log(data)

    this.horoscopes.push({ name, birthDate: new Date(birthDate), location })
  }

  getAll() {
    return this.horoscopes;
  }
}

const horoscope = new Elysia({ prefix: '/horoscope' })
  .decorate('horoscope', new Horoscope())
  .get('', ({ horoscope }) => horoscope.getAll())
  .post('', ({ horoscope, body: { name, birthDate, location } }) => horoscope.add(name, birthDate, location), {
    body: t.Object({
      name: t.String(),
      birthDate: t.String({ format: 'date-time' }),
      location: t.Object({
        lan: t.Number(),
        lon: t.Number()
      })
    })
  })

export default horoscope;