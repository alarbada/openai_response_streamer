# openai response streamer

I just got tired of writing the same code again and again, so here it is.

This thing streams a response coming from the nodejs openai package.

# Usage

```typescript
const res = await openai.createChatCompletion({
    // ...
})

await streamResponse(res, (data: string) => {
    // do something with the data chunk
})
```
