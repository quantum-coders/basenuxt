<template>
	<div class="scroll-wrapper p-3">
		<p class="text-end">
			<a
				href="#"
				class="close"
				@click.prevent="chat.closeWis"
				:class="{ 'is-hidden': !chat.wisMessage || !solana.wallet }"
			>
				<icon name="material-symbols:right-panel-close-rounded" />
			</a>
		</p>
		<template v-if="chat.wisMessage && !!chat.wisMessage.rims.length && solana.wallet">

			<template v-if="chat.wisMessage.rims[0].rimType === 'image'">
				<chat-rim-image :rim="chat.wisMessage.rims[0]" />
			</template>

			<template v-if="chat.wisMessage.rims[0].rimType === 'video'">
				<chat-rim-youtube-video :rim="chat.wisMessage.rims[0]" />
			</template>

			<template v-if="chat.wisMessage.rims[0].rimType === 'wallet'">
				<chat-rim-wallet-info :rim="chat.wisMessage.rims[0]" />
			</template>

			<template v-if="chat.wisMessage.rims[0].rimType === 'blink'">
				<chat-rim-blink mode="card" :rim="chat.wisMessage.rims[0]" />
			</template>
		</template>
	</div>
</template>

<script setup>

	const chat = useChatStore();
	const solana = useSolanaStore();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	img
		max-width: 100%

	.scroll-wrapper
		overflow-x: clip

	.close
		opacity: 1
		transition: opacity 0.3s

		&.is-hidden
			opacity: 0
			pointer-events: none

</style>