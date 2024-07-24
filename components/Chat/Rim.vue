<template>
	<div class="rim-wrapper">
		<div class="avatar"></div>
		<div class="rim">
			<!-- bootstrap loading spinner -->
			<div class="rim-loading" v-if="!!message.loading">
				<div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>

			<div class="rim-audio" v-if="!!message.audio">
				<audio controls>
					<source :src="message.audio" type="audio/mpeg">
					Your browser does not support the audio element.
				</audio>
			</div>

			<div class="rim-rich-content" v-if="message.rims">
				<template v-for="r in message.rims">
					<div class="rim-image" v-if="r.rimType === 'image'">
						<img alt="" :src="r.parameters.imageUrl">
					</div>

					<div class="rim-youtube-video" v-else-if="r.rimType === 'video'">
						<!-- youtube video -->
						<div class="ratio ratio-16x9">
							<iframe
								:src="`https://www.youtube.com/embed/${ r.parameters.videoId }`"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							/>
						</div>
					</div>

					<div v-else>
						<pre>{{ r }}</pre>
					</div>
				</template>
			</div>
			<div class="rim-textual-content">
				<div v-html="html" />
			</div>
			<div class="rim-actions">
				<span class="timestamp">{{ formattedTime }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { marked } from 'marked';

	const props = defineProps({
		message: {
			type: Object,
			required: true,
		},
	});

	// compute the html from the markdown
	const html = computed(() => marked.parse(props.message.text));

	// parse timestamp to get the time
	const formattedTime = computed(() => {
		const date = new Date(props.message.timestamp);
		return date.toLocaleTimeString();
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.ratio > *
		position: absolute

	.rim-image
		img
			width: 400px

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
			overflow: hidden

			&:has(.rim-image)
				width: min-content

			.rim-loading
				padding: 1rem
				display: flex
				justify-content: center

			.rim-rich-content
				text-align: center

			.rim-textual-content
				padding: 0.5rem 1rem

				& > div *:last-child
					margin-bottom: 0

			.rim-actions
				padding: 0.2rem 0.5rem
				display: flex
				border-top: 1px solid var(--bs-border-color)

				.timestamp
					margin-left: auto
					font-size: 0.8rem
					color: var(--bs-text-muted)

</style>