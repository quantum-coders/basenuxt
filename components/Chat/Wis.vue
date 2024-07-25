<template>

	<div class="scroll-wrapper p-3">
		<p class="text-end">
			<a href="#" class="close" @click.prevent="chat.closeWis" :class="{ 'is-hidden': !chat.wisMessage }">
				<icon name="material-symbols:right-panel-close-rounded" />
			</a>
		</p>
		<chat-rim-wallet-info :rim="chat.wisMessage.rims[0]" v-if="chat.wisMessage && !!chat.wisMessage.rims.length" />
	</div>
</template>

<script setup>

	const chat = useChatStore();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.scroll-wrapper
		overflow-x: clip

	.close
		opacity: 1
		transition: opacity 0.3s

		&.is-hidden
			opacity: 0
			pointer-events: none

</style>