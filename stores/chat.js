import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = defineStore('chat', () => {

	const messages = ref([]);

	const addMessage = (message) => {
		// Add a unique ID to the message
		message.uid = uuidv4();
		messages.value.push(message);

		return message;
	};

	const sendMessage = async (message) => {
		const res = await $fetch('http://localhost:1337/ai/message', {
			method: 'POST',
			body: {
				model: 'gpt-4',
				prompt: message,
			},
			responseType: 'stream',
		});

		// Create a message for assistant
		const assistantMessage = addMessage({ role: 'assistant', text: '' });

		const reader = res.pipeThrough(new TextDecoderStream()).getReader();

		let buffer = '';

		// Read the chunk of data as we get it
		while(true) {
			const { value, done } = await reader.read();

			if(done) {
				console.log('Stream complete');
				break;
			}

			buffer += value;

			// Split the buffer on newlines to process multiple lines of data
			const lines = buffer.split('\n');

			// Keep the last line in the buffer if it's incomplete
			buffer = lines.pop();

			for(let line of lines) {
				line = line.trim();

				if(line.startsWith('data: ')) {
					line = line.substring(6).trim();
				}

				if(line.startsWith('{') && line.endsWith('}')) {
					try {
						const json = JSON.parse(line);

						if(typeof json.choices[0].delta.content === 'string') {
							const value = json.choices[0].delta.content;

							// Add the data to the message
							const index = messages.value.findIndex((m) => m.uid === assistantMessage.uid);

							if(index !== -1) {
								if(typeof value !== 'undefined' && value !== 'undefined') {
									messages.value[index].text += value;
								}
							}
						}
					} catch(e) {
						console.error('error parsing json', line, e);
					}
				}
			}
		}
	};

	return {
		messages,
		addMessage,
		sendMessage,
	};
});