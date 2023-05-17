import { FastifyRequest } from 'fastify';
import { MercuriusContext } from 'mercurius';

export type CTX = MercuriusContext & FastifyRequest
