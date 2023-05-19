import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import _ from 'lodash';
import { logger } from '../server';

const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-1_GirJEPnTW",
    tokenUse: "id",
    clientId: process.env.COGNITO_CLIENT_ID,
});



export const validateToken = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (token) {

            
            const payload = await verifier.verify(token || "", null as any);
            
            _.set(req, "user", {
                userId: payload.sub,
                isAuthenticated: true,
            })
        }
    } catch (error) {
        _.set(req, "user", {
            userId: "",
            isAuthenticated: false,
        })
        logger.error(error)
    }
}