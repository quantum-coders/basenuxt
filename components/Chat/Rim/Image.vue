<template>
	<!-- youtube video -->
	<div class="ratio ratio-16x9">
		<img alt="" :src="rim.parameters.imageUrl">
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