import AWS from 'aws-sdk'
import { FastifyReply } from 'fastify'
import _ from 'lodash'

const cognito = new AWS.CognitoIdentityServiceProvider()

export const registerNewUser = async ({ body }: any, reply: FastifyReply) => {
  try {
    const { email, password, username } = body
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'nickname',
          Value: username,
        },
      ],
    }

    await cognito
      .signUp(params as AWS.CognitoIdentityServiceProvider.SignUpRequest)
      .promise()
    reply.status(200).send()
  } catch (error: any) {
    reply.status(error.statusCode || 500).send({ message: error.message })
  }
}

export const confirmSignUpCode = async ({ body }: any, reply: FastifyReply) => {
  try {
    const { email, code } = body
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    }

    await cognito
      .confirmSignUp(
        params as AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest
      )
      .promise()

    reply.status(200).send()
  } catch (error: any) {
    reply.status(error.statusCode || 500).send({ message: error.message })
  }
}

export const resendConfirmationCode = async (
  { body }: any,
  reply: FastifyReply
) => {
  try {
    const { email } = body

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
    }

    await cognito
      .resendConfirmationCode(
        params as AWS.CognitoIdentityServiceProvider.ResendConfirmationCodeRequest
      )
      .promise()

    reply.status(200).send()
  } catch (error: any) {
    reply.status(error.statusCode || 500).send({ message: error.message })
  }
}

export const signIn = async (req: any, reply: any) => {
  try {
    const { email, password } = req.body

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    }

    const data = await cognito
      .initiateAuth(
        params as AWS.CognitoIdentityServiceProvider.InitiateAuthRequest
      )
      .promise()

    const token = _.get(data, 'AuthenticationResult.IdToken')
    const refreshToken = _.get(data, 'AuthenticationResult.RefreshToken')

    if (!token || !refreshToken) throw new Error('no token')
    reply.cookie('refreshToken', `${refreshToken}`, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    })
    reply.cookie('refreshToken', `${refreshToken}`, {
      maxAge: 900000,
      httpOnly: false,
    })
    reply
      .setCookie('refresh_token', 'hola', {
        path: '/api',
        domain: 'http://localhost:4000',
        secure: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error: any) {
    reply.status(error.statusCode || 500).send({ message: error.message })
  }
}

// export const refreshToken = async (
//   _: MercuriusContext,
//   reply: FastifyReply & { refreshToken: string }
// ) => {
//   try {
//     const params = {
//       AuthFlow: 'REFRESH_TOKEN_AUTH',
//       ClientId: process.env.COGNITO_CLIENT_ID,
//       UserPoolId: process.env.AWS_COGNITO_POOL_ID,
//       AuthParameters: {
//         REFRESH_TOKEN: refreshToken,
//       },
//     }

//     const response = await cognito.adminInitiateAuth(params as AWS.CognitoIdentityServiceProvider.AdminInitiateAuthRequest).promise()
//     const newIdToken = response.AuthenticationResult.IdToken
//     return newIdToken
//   } catch (error: any) {
//     reply.status(error.statusCode || 500).send({ message: error.message })
//   }
// }

// export const signOut = () => {}
