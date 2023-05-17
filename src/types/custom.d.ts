import { FastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest<
        RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
        RawServer extends RawServerBase = RawServerDefault,
        RawRequest extends IncomingMessage = RawRequestDefaultExpression,
        ContextConfig = unknown,
        Logger = FastifyLoggerInstance
    > {
        user: {
            userId: string;
            isAuthenticated: boolean;
        };
    }
}