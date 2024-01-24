# quick-rpc
Implement RPC server and client with Quick RPC.

## Usage
Server-side:
```ts
import rpc from 'quick-rpc';
import { t, vld } from 'vld-ts';

const User = t.obj({
    name: t.str,
    age: t.num
}), isUser = vld(User);

const router = rpc.router({
    user: rpc.proc(isUser)
        .fn('create', input => {
            // Do something with input
            return {
                status: 200,
                message: 'User created successfully'
            }
        }, JSON.stringify) // Pass response serializer if required by underlying framework
});

export type App = typeof router;
```

Client-side (need an adapter implementation for client):
```ts
import { Infer } from 'quick-rpc';
import type { App } from '/path/to/rpc/router';

// Use this type for client implementation
type Client = Infer<App>;
```
