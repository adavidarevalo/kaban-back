import _ from 'lodash';
import { FastifyRequest } from 'fastify';
import { dashboardSchema } from '../schema/index';
import { dashboardResolver } from '../resolver/index';

export const graphqlConfig = {
    schema: dashboardSchema,
    resolvers: dashboardResolver,
    graphiql: 'playground',
    context: (request: FastifyRequest) => {
        return {
            ..._.get(request, 'user', {}),
        };
    },
}