import { type Action, type Procedure } from './procedure';

export type BaseAction = Record<string, Action<any>>;
export type BaseProcedure = Procedure<any, BaseAction>;
export type BaseRouter = Record<string, BaseProcedure>;

/**
 * Infer type from a procedure
 */
export type ProcedureInfer<Proc extends BaseProcedure> = {
    [K in keyof Proc['actions']]: Proc['actions'][K]['fn'];
}

/**
 * Infer type from a router
 */
export type Infer<Router extends BaseRouter> = {
    [K in keyof Router]: ProcedureInfer<Router[K]>;
}
