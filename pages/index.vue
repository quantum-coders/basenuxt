<template>
	<div :style="styles" class="section-wrapper">
		<header class="general-header d-flex align-items-center">

			<div class="logo-wrapper">
				<div class="header-icon">
					<icon name="material-symbols:dark-mode-outline-rounded" />
				</div>
				<svgo-luna-logo class="logo" />
			</div>

			<div class="header-tools d-flex ms-auto align-items-center justify-content-end gap-2">
				<platform-theme-switcher />
				<solana-wallet-connect />
			</div>

		</header>
		<div class="rim-experience">
			<aside class="general-sidebar"></aside>

			<main class="connect" v-if="!solana.wallet">

			</main>
			<main v-else class="chat">
				<!--<a href="#" class="btn btn-primary" @click.prevent="toggle">Toggle Sidebar</a>-->
				<chat-thread />
				<div class="chat-controls">
					<chat-input />
				</div>
			</main>

			<aside :class="{ 'is-open': !!chat.wisMessage }" class="wis">
				<chat-wis />
			</aside>
		</div>
	</div>
</template>

<script setup>

	const solana = useSolanaStore();

	const styles = {
		'--inner-wrapper-width': '1000px',
	};

	const chat = useChatStore();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.section-wrapper
		display: flex
		flex-grow: 1
		flex-direction: column

	.general-header
		height: 60px
		border-bottom: 1px solid var(--bs-border-color)

		.logo-wrapper
			display: flex
			align-items: center
			gap: 1rem

			.header-icon
				background: var(--bs-dark-bg-subtle)
				width: 60px
				height: 59px
				display: flex
				justify-content: center
				align-items: center

				font-size: 1.5rem

			.logo
				width: auto
				height: 40px

		.header-tools
			width: 200px

			padding-right: 1rem

	.rim-experience
		display: flex
		flex-grow: 1

	.general-sidebar
		width: 60px
		background: var(--bs-dark-bg-subtle)

	.connect
		flex-grow: 1
		display: flex
		justify-content: center
		align-items: center

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