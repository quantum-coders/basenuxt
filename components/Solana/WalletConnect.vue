<template>
	<wallet-multi-button/>
</template>

<script setup>
import {useWallet, initWallet} from 'solana-wallets-vue';
import {WalletMultiButton} from 'solana-wallets-vue';

const solanaStore = useSolanaStore();
const config = useRuntimeConfig();
const authStore = useAuthStore();
initWallet({autoConnect: true});

const connectedWallet = computed(() => {
	const {publicKey, sendTransaction} = useWallet();

	if (publicKey && publicKey.value) {
		solanaStore.connectedWallet = publicKey.value.toBase58();
		return publicKey.value.toBase58();
	}

	solanaStore.connectedWallet = null;
	return null;
});

watch(connectedWallet, async (currentValue) => {
	if (currentValue) {
		const connectRes = await fetch(`${config.public.baseURL}/users/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				wallet: connectedWallet.value,
			}),
		});

		if (connectRes.ok) {
			const connectData = await connectRes.json();

			// save accessToken to localStorage
			localStorage.setItem('accessToken', connectData.accessToken);
			authStore.user = connectData.data
		}
	} else {
		localStorage.removeItem('accessToken');
	}
});
</script>

<style lang="sass" scoped>
</style>