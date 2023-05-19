import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import mercurius from 'mercurius'
import pino from 'pino'
import _ from 'lodash'

import { validateToken } from './middleware/validate_token'
import { authRoutes } from './routes/auth'

import { graphqlConfig } from './lib/graphql.config.ts'
import { pinoConfig } from './lib/pino.config'
import fastifyCors from 'fastify-cors'

import './lib/aws.config.ts'
import './utils/db_connection'

export const logger = pino(pinoConfig)

class Server {
  private server: FastifyInstance

  constructor() {
    this.server = fastify({ logger })
    this.setup()
  }

  private setup(): void {
    this.server.register(fastifyCors, { origin: true })

    this.server.register(fastifyCookie)
    this.server.addHook('preValidation', validateToken)

    this.server.register(mercurius, graphqlConfig)

    this.server.register(authRoutes, { prefix: '/api' })
  }

  public start(): void {
    const port = process.env.SERVER_PORT || 4000

    this.server.listen({ port: +port }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }
}

const server = new Server()

export default server
