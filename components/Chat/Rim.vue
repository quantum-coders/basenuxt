<template>
	<div class="rim-wrapper">
		<div class="avatar"></div>
		<div class="rim">
			<div class="rim-textual-content">
				<p class="mb-0">{{ message.text }}</p>
			</div>
			<div class="rim-actions">
			</div>
		</div>
	</div>
</template>

<script setup>

	const props = defineProps({
		message: {
			type: Object,
			required: true,
		},
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.rim-wrapper
		display: flex
		gap: 1rem
		align-items: flex-start

		&.is-assistant
			justify-content: flex-start

			.rim
				border-top-left-radius: 0

		&.is-user
			flex-direction: row-reverse

			.rim
				border-top-right-radius: 0

		.avatar
			width: 45px
			aspect-ratio: 1
			background: var(--bs-dark-bg-subtle)
			border-radius: 50%

		.rim
			border: 1px solid var(--bs-border-color)
			background: var(--bs-body-bg)
			border-radius: 0.5rem
			width: fit-content
			max-width: 80%

			.rim-textual-content
				padding: 0.5rem 1rem

			.rim-actions
				padding: 0.5rem
				border-top: 1px solid var(--bs-border-color)

</style>