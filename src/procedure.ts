export interface Validator<T> {
    (data: any): data is T;
}

export type Serializable = string | Buffer | ArrayBuffer | TypedArray;

export interface Serializer<T> {
    (data: Awaited<T>): Serializable;
}

/**
 * A procedure for storing actions
 */
export interface Procedure<Input, Actions extends Record<string, Action<Input>>> {
    /**
     * Store actions
     */
    actions: Actions;
};

export class Procedure<Input, Actions = {}> {
    constructor(public readonly vld: Validator<Input>) { }

    fn<
        Name extends string, Output
    >(name: Name, serializer: Serializer<Output>, fn: (input: Input) => Output): Procedure<Input, Actions & {
        [key in Name]: Action<Input, Output>
    }>;

    fn<
        Name extends string, Output,
    >(name: Name, fn: (input: Input) => Output): Procedure<Input, Actions & {
        [key in Name]: Action<Input, Output>
    }>;

    fn(...args: any[]) {
        if (args.length < 2)
            throw new Error(`This function expects 2 or more arguments, instead got ${args}.`);

        switch (args.length) {
            case 2:
                // @ts-ignore
                this.actions[args[0]] = { fn: args[1] };
                break;
            case 3:
                // @ts-ignore
                this.actions[args[0]] = { fn: args[2], parse: args[1] };
                break;
        }

        return this;
    }
}

export interface Action<Input, Output = any> {
    fn(input: Input): Output;

    /**
     * Convert output to string or buffer for response
     */
    parse?(result: Output): Serializable;

    // Infer action type
    infer: {
        input: Input;
        output: Awaited<Output>;
    }
}

