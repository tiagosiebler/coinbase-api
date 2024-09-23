# Examples

These samples can be executed using `ts-node` or `tsx`:

```
ts-node ./examples/ws-public.ts
```

Most examples also have minimal typescript, so if you rename them to "js" they should execute fine with just node. TypeScript is recommended but completely optional:

```
node ./examples/spot/getTickers.js
```

To find all endpoints and corresponding functions, you can use the [endpoint mapping file](../docs/endpointFunctionList.md). This file contains a pattern that matches the endpoints and corresponding functions in the SDK with the clients you can use!

Even though most of the function names are the same as the endpoint name in the official docs, some functions have slightly different names so you can search for them through the links. For more help on how to use the SDK, you can check out the Wiki page of our public repository [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).
