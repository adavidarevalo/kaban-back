import { FastifyInstance } from "fastify";
import { registerNewUser, confirmSignUpCode, resendConfirmationCode, signIn } from '../controller/authentication.controller';

export const authRoutes = (fastify: FastifyInstance, _: {
    prefix: string;
}, done: () => void) => {
    fastify.post('/register-user', registerNewUser);
    fastify.post('/verify-code', confirmSignUpCode);
    fastify.post('/resent-code', resendConfirmationCode);
    fastify.post('/login', signIn);

    done();
};