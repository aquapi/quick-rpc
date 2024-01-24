import type { BaseRouter } from './infer';
import { Procedure, type Validator } from './procedure';

namespace rpc {
    /**
* Create a procedure
     */
    export function proc<T>(vld: Validator<T>) {
        return new Procedure(vld);
    }

    /**
     * Create a RPC router
     */
    export function router<T extends BaseRouter>(procs: T) {
        return procs;
    }
}

export default rpc;
export * from './infer';
