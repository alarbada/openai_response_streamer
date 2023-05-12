export function* getJsonFromDataChunk(chunk: string): Generator<string> {
	const lines = chunk.split('data: ')
	for (let line of lines) {
		line = line.trim()
		if (line.includes('[DONE]')) break
		if (line.trim() === '') continue

		yield line
	}
}

export default function streamResponse(
	res: unknown,
	onData: (data: string) => void,
): Promise<void> {
	return new Promise((resolve, reject) => {
		// @ts-ignore: This is not directly supported by the client yet
		res.data.on('data', (buff: NodeBuffer) => {
			const chunk: string = buff.toString()

			for (const jsonMsg of getJsonFromDataChunk(chunk)) {
				let content = ''
				try {
					const parsed = JSON.parse(jsonMsg)
					content = parsed?.choices?.[0]?.delta?.content ?? ''
				} catch (error) {
					console.error(
						'Could not JSON parse stream message',
						jsonMsg,
						error,
					)
				}

				onData(content)
			}
		})

		// @ts-ignore: This is not directly supported by the client yet
		res.data.on('end', resolve)
		// @ts-ignore: This is not directly supported by the client yet
		res.data.on('error', reject)
	})
}

