const AWS = require('aws-sdk');

import { MercuriusContext } from 'mercurius';
import { logger } from '../index';

interface User {
    username: string;
    password: string;
    email: string;
}

const cognito = new AWS.CognitoIdentityServiceProvider();

export const registerNewUser = async (_: MercuriusContext, { user }: { user: User }) => {
    try {

        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: user.email,
            Password: user.password,
            UserAttributes: [
                {
                    Name: 'nickname',
                    Value: user.username,
                },
            ],
        };

        await cognito.signUp(params).promise();

        return { status: 'ok' };
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const confirmSignUpCode = async (_: MercuriusContext, { user }: { user: { email: string, confirmationCode: string } }) => {
    try {
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: user.email,
            ConfirmationCode: user.confirmationCode,
        };

        await cognito.confirmSignUp(params).promise();

        return { status: 'ok' };
    } catch (error) {
        logger.error(error)
        throw error;
    }
};


export const resendConfirmationCode = async (_: MercuriusContext, { email }: { email: string }) => {
    try {
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
        };

        await cognito.resendConfirmationCode(params).promise();

        return { status: 'ok' };
    } catch (error) {
        logger.error(error)
        throw error;
    }
};

export const signIn = async (_: MercuriusContext, { user }: {
    user: {
        email: string,
        password: string,
    }
}) => {
    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: user.email,
                PASSWORD: user.password,
            },
        };

        const data = await cognito.initiateAuth(params).promise();

        return {
            token: data.IdToken,
            refreshToken: data.RefreshToken
        };

    } catch (error) {
        logger.error(error)
        throw error;
    }
};

export const refreshToken = async (_: MercuriusContext, { refreshToken }: { refreshToken: string }) => {
    const params = {
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.AWS_COGNITO_POOL_ID,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
        },
    };

    try {
        const response = await cognito.adminInitiateAuth(params).promise();
        console.log("🚀 ~ file: authentication.controller.ts:113 ~ refreshToken ~ response:", response)
        const newIdToken = response.AuthenticationResult.IdToken;
        return newIdToken;
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export const signOut = () => {

}