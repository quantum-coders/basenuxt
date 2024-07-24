<template>
	<wallet-multi-button />
</template>

<script setup>
	import { useWallet, initWallet } from 'solana-wallets-vue';
	import { WalletMultiButton } from 'solana-wallets-vue';
	const solanaStore = useSolanaStore();
	const config = useRuntimeConfig();

	initWallet({ autoConnect: true });

	const connectedWallet = computed(() => {
		const { publicKey, sendTransaction } = useWallet();

		if(publicKey && publicKey.value) {
			solanaStore.connectedWallet = publicKey.value.toBase58();
			return publicKey.value.toBase58();
		}

		solanaStore.connectedWallet = null;
		return null;
	});

	watch(connectedWallet, async (currentValue) => {
		if(currentValue) {

		} else {
			localStorage.removeItem('accessToken');
		}
	});
</script>

<style lang="sass" scoped>
</style>