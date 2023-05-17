import { authentication } from './authentication';
import { CTX } from '../types/context';

describe('authentication', () => {
    test('lanza un error si no está autenticado', () => {
        const ctx = {};

        expect(() => {
            authentication(ctx as CTX);
        }).toThrowError('Not authorized.');
    });

    test('no lanza un error si está autenticado', () => {
        const ctx = {
            user: {
                isAuthenticated: true,
            },
        };

        expect(() => {
            authentication(ctx as CTX);
        }).not.toThrow();
    });
});