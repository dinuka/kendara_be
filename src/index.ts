import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import horoscope from './horoscope'

const app = new Elysia()
  .use(swagger())
  .use(horoscope)
  .listen(3000)