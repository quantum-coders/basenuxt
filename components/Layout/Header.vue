<template>
	<header class="layout-header d-flex align-items-center">

		<div class="logo-wrapper">
			<svgo-luna-logo class="logo" />
		</div>

		<div class="header-tools d-flex ms-auto align-items-center justify-content-end gap-2">
			<platform-theme-switcher />
			<solana-wallet-connect />
		</div>

	</header>
</template>

<script setup>
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.blink-header
		padding: 1rem

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
</style>