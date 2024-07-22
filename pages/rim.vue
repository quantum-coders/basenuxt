<template>
	<div :style="styles" class="section-wrapper">
		<header class="general-header d-flex align-items-center p-3">
			<platform-theme-switcher class="ms-auto" />
		</header>
		<div class="rim-experience">
			<aside class="general-sidebar"></aside>
			<main class="chat">
				<!--<a href="#" class="btn btn-primary" @click.prevent="toggle">Toggle Sidebar</a>-->
				<chat-thread />
				<div class="chat-controls">
					<chat-input />
				</div>
			</main>
			<aside :class="{ 'is-open': !!openedWis }" class="wis"></aside>
		</div>
	</div>
</template>

<script setup>

	const styles = {
		'--inner-wrapper-width': '1000px',
	};

	const openedWis = ref(false);

	const toggle = () => {
		openedWis.value = !openedWis.value;
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.section-wrapper
		display: flex
		flex-grow: 1
		flex-direction: column
		background: var(--bs-body-bg)

	.general-header
		height: 60px
		border-bottom: 1px solid var(--bs-border-color)

	.rim-experience
		display: flex
		flex-grow: 1

	.general-sidebar
		width: 60px
		background: var(--bs-dark-bg-subtle)

	.chat
		flex-grow: 1
		display: flex
		flex-direction: column

		.chat-controls
			padding: 0 1rem 1rem

	.wis
		width: 60px
		border-left: 1px solid var(--bs-border-color)
		transition: all 500ms ease-in-out

		&.is-open
			width: 600px
			background: var(--bs-dark-bg-subtle)
</style>