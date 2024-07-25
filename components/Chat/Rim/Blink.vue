<template>
	<div class="p-3">
		<solana-blink :blink-url="rim.parameters.blinkUrl" mode="compact" :parameters="rim.parameters.blinkParameters" />
	</div>
</template>

<script setup>

	const props = defineProps({
		rim: {
			type: Object,
			required: true,
		},
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
</style>