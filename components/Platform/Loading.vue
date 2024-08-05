<template>
	<loading
		:active="active"
		:is-full-page="isFullPage"
		:color="color"
		:background-color="backgroundColor"
		:loader="loader"
		:z-index="zIndex"
	>
		<template #default>
			<slot name="default" />
		</template>

		<template #before>
			<slot name="before" />
		</template>

		<template #after>
			<slot name="after" />
		</template>
	</loading>
</template>

<script setup>
	import Loading from 'vue3-loading-overlay';
	import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

	// receive active via props
	const props = defineProps({
		active: {
			type: Boolean,
			default: false,
		},
		isFullPage: {
			type: Boolean,
			default: false,
		},
		loader: {
			type: String,
			default: 'spinner',
		},
		color: {
			type: String,
			default: 'var(--bs-primary)',
		},
		backgroundColor: {
			type: String,
			default: 'var(--bs-body-bg)',
		},
		zIndex: {
			type: Number,
			default: 999,
		},
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.vld-overlay
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%

		.vld-background
			opacity: 0.75

		:deep(.vld-icon)
			text-align: center

</style>