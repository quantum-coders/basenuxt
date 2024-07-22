import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {

	const messages = ref([]);

	const addMessage = (message) => {
		messages.value.push(message);
	}

	return {
		messages,
		addMessage
	};
});