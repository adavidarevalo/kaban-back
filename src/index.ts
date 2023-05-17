import fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import _ from 'lodash';
import pino from 'pino'
const mercurius = require('mercurius')

import { dashboardResolver } from './resolver/index.ts'
import { dashboardSchema } from './schema/index'
import { validateToken } from './middleware/validate_token';

require('dotenv').config();
require('./utils/db_connection');
require('./utils/aws_config.ts')

export const logger = pino();

const server: FastifyInstance = fastify({ logger })

server.register(require('fastify-cors'), {
    origin: true,
})

server.addHook('preValidation', validateToken);

server.register(mercurius, {
    schema: dashboardSchema,
    resolvers: dashboardResolver,
    graphiql: 'playground',
    context: (request: FastifyRequest) => {
        return {
            ..._.get(request, "user", {}),
        };
    },
})

const port = process.env.SERVER_PORT || 4000

server.listen({ port: +port }, (err, address) => {
    if (err) {
        logger.error(err);
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
