import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import _ from 'lodash';

import { logger } from '../index';

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_COGNITO_POOL_ID as string,
    tokenUse: "id",
    clientId: process.env.COGNITO_CLIENT_ID,
});



export const validateToken = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) throw new Error('Token is required');

        const payload = await verifier.verify(token, null as any);

        _.set(req, "user", {
            userId: payload.sub,
            isAuthenticated: true,
        })
    } catch (error) {
        _.set(req, "user", {
            userId: "",
            isAuthenticated: false,
        })
        logger.error(error)

    }
}