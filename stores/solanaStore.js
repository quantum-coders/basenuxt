import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useSolanaStore = defineStore('solanaStore', () => {

	const connectedWallet = ref('');
	return {
		connectedWallet,
	};
});