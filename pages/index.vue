<template>
	<div :style="styles" class="section-wrapper">
		<img class="background" src="/images/background.jpg" alt="">

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

				<div class="connect-card">
					<img src="/images/lunita.png" alt="">
					<div class="copy p-3">
						<h2>Connect Your Wallet to Unlock Luna AI's Full Potential</h2>
						<p>Discover the future of AI-driven solutions with Luna AI! By connecting your wallet, you gain access to a revolutionary platform that harnesses the power of artificial intelligence to elevate your business strategies and operations</p>
						<p class="text-end mb-0">
							<a href="#" class="btn btn-primary" @click.prevent="connectWallet">
								<icon name="material-symbols:account-balance-wallet-outline" />
								Connect Wallet
							</a>
						</p>
					</div>
				</div>

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

	const connectWallet = () => {
		// click .swv-button-trigger
		document.querySelector('.swv-button-trigger').click();
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.section-wrapper
		display: flex
		flex-grow: 1
		flex-direction: column

		.background
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			object-fit: cover
			z-index: 0
			opacity: 0.025

			[data-bs-theme="light"] &
				filter: invert(1)

	.general-header
		height: 60px
		border-bottom: 1px solid var(--bs-border-color)

		.logo-wrapper
			display: flex
			align-items: center
			gap: 1rem
			padding-left: 1rem

			@media (min-width: $sm)
				padding-left: 0

			.header-icon
				background: var(--bs-dark-bg-subtle)
				width: 60px
				height: 59px
				justify-content: center
				align-items: center
				font-size: 1.5rem
				display: none

				@media (min-width: $sm)
					display: flex

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
		display: none

		@media (min-width: $sm)
			display: block

	.connect
		flex-grow: 1
		display: flex
		justify-content: center
		align-items: center

		.connect-card
			overflow: hidden
			max-width: 800px
			width: 80%
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.25)
			border-radius: 1rem
			display: flex
			align-items: center
			flex-direction: column

			@media (min-width: $sm)
				flex-direction: row

			img
				width: 100%

				@media (min-width: $sm)
					width: 300px

			h2
				font-size: 1.5rem
				margin-bottom: 1rem
				color: $primary

	.chat
		flex-grow: 1
		display: flex
		flex-direction: column
		z-index: 1

		.chat-controls
			padding: 0 1rem 1rem

	.wis
		border-left: 1px solid var(--bs-border-color)
		transition: all 500ms ease-in-out
		position: fixed
		width: 90vw
		height: calc(100dvh - 60px)
		right: -100vw
		z-index: 100

		@media (min-width: $sm)
			width: 60px
			position: relative
			right: auto
			height: auto

		&.is-open
			background: var(--bs-dark-bg-subtle)
			right: 0

			@media (min-width: $sm)
				width: 600px
				right: auto
</style>