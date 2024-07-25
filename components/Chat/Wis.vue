<template>

	<div class="scroll-wrapper p-3">
		<p class="text-end">
			<a href="#" class="btn btn-primary" @click.prevent="chat.closeWis">Close</a>
		</p>
		<chat-rim-wallet-info :rim="chat.wisMessage.rims[0]" v-if="chat.wisMessage && !!chat.wisMessage.rims.length" />
	</div>
</template>

<script setup>

	const chat = useChatStore();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

</style>