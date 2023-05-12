# openai response streamer

I just got tired of writing the same code again and again, so here it is.

This thing streams a response coming from the nodejs openai package.

# Usage

```typescript
import streamResponse from 'https://deno.land/x/openai_response_streamer@0.0.2/mod.ts'

const res = await openai.createChatCompletion({
    // ...
}, { responseType: 'stream' })

await streamResponse(res, (data: string) => {
    // do something with the data chunk
})
```
