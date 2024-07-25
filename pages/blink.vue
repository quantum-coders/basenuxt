<template>
	<div class="blink-wrapper d-flex flex-column flex-grow-1">
		<header class="blink-header d-flex align-items-center">

			<div class="logo-wrapper">
				<svgo-luna-logo class="logo" />
			</div>

			<div class="header-tools d-flex ms-auto align-items-center justify-content-end gap-2">
				<platform-theme-switcher />
				<solana-wallet-connect />
			</div>

		</header>
		<div class="the-blink">
			<div class="blink-card" v-if="blink">

				<div class="blink-image mb-2">
					<img class="w-100" :src="blink.icon" alt="Blink" />
				</div>

				<div class="blink-data">
					<h3 class="mb-1">{{ blink.title }}</h3>
					<p>{{ blink.description }}</p>
				</div>

				<div class="blink-actions" v-if="!blink.links?.actions">
					<button class="btn btn-lg btn-primary w-100">{{ blink.label }}</button>
				</div>

				<div class="blink-actions gap-2 d-flex flex-wrap" v-else>
					<article class="action mb-2" v-for="a in blink.links.actions">
						<template v-if="!a.parameters">
							<button
								@click.prevent="postBlink(a)"
								class="btn btn-lg btn-primary w-100 solo-action"
								:class="{ 'btn-loading': a.loading }"
							>{{ a.label }}
							</button>
						</template>

						<template v-else>
							<!-- input group -->
							<div class="input-group mb-2">
								<template v-for="p in a.parameters">
									<input
										type="text"
										class="form-control"
										:placeholder="p.label"
										v-model="p[p.name]"
										:name="p.name"
										:disabled="a.loading"
									/>
								</template>
								<button class="btn btn-lg btn-primary" :class="{ 'btn-loading': a.loading }" @click="postBlink(a)">{{ a.label }}</button>
							</div>
						</template>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

	// get the b parameter from the query string
	const { query } = useRoute();
	const b = query.b;
	const blink = ref(null);

	// fetch the b
	const fetchBlink = async () => {
		const res = await useFetch(b);
		blink.value = res.data.value;
	};

	const postBlink = async (action) => {

		action.loading = true;
		let url = '';

		// if action.href does not start with http, use the domain from b
		if(!action.href.startsWith('http')) {
			url = new URL(action.href, b).href;
		} else {
			url = action.href;
		}

		// if parameters are present
		if(action.parameters) {

			// loop through the parameters
			for(const p of action.parameters) {
				console.log(p);

				// replace the parameter in the url
				url = url.replace(`%7B${ p.name }%7D`, p[p.name]);
				console.log(url);
			}
		}

		const res = await useFetch(url, {
			method: 'POST',
			body: JSON.stringify({
				account: useSolanaStore().wallet,
			}),
		});

		action.loading = false;

		console.log(res.data);
	};

	onMounted(() => {
		fetchBlink();
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.blink-header
		padding: 1rem
		position: fixed
		top: 0
		left: 0
		width: 100%

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

	.the-blink
		display: flex
		justify-content: center
		align-items: center
		flex-grow: 1

		.blink-card
			background: white
			padding: 1rem
			border-radius: 0.5rem
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
			max-width: 500px
			width: 100%
			overflow: hidden
			overflow-y: auto
			white-space: pre-wrap
			word-wrap: break-word
			hyphens: auto
			font-size: 0.9rem
			line-height: 1.5
			color: var(--bs-dark)
			margin: 1rem
			transition: all 0.5s ease

			.blink-image
				aspect-ratio: 1
				
				img
					border-radius: 0.5rem

			.action:has(.solo-action)
				flex-grow: 1
				flex-basis: calc((100% / 3.2))

			.action:has(.input-group)
				flex-basis: 100%
</style>