import _ from 'lodash';
import { CTX } from '../types/context';

export const authentication = (ctx: CTX) => {
    const { isAuthenticated } = _.get(ctx, "user", { isAuthenticated: false })

    if (!isAuthenticated) {
        throw new Error("Not authorized.")
    }
}