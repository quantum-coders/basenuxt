<template>
	<div class="thread-area">
		<div class="scroll-wrapper pretty-scrolls">
			<div class="thread-wrapper">
				<template v-for="m in chat.messages">
					<chat-rim class="mb-3" :class="`is-${ m.type }`" :message="m" />
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	const chat = useChatStore();
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.thread-area
		flex-grow: 1
		padding: 1rem

		.thread-wrapper
			min-height: 100px
			max-width: 1000px
			margin: 0 auto
			padding: 1rem
</style>