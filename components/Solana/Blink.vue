<template>
	<div class="blink-card" v-if="blink" :class="mode">

		<div class="blink-image mb-2">
			<img class="w-100" :src="blink.icon" alt="Blink" />
		</div>

		<div class="blink-info">
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
							<button
								class="btn btn-lg btn-primary"
								:class="{ 'btn-loading': a.loading }"
								@click="postBlink(a)"
							>{{ a.label }}
							</button>
						</div>
					</template>
				</article>
			</div>
			<p class="powered">Powered by <icon name="token-branded:solana" /> Blinks and <icon name="bi:moon-stars-fill" />.AI</p>
		</div>

	</div>
</template>

<script setup>

	const props = defineProps({
		blinkUrl: {
			type: String,
			required: true,
		},
		mode: {
			type: String,
			default: 'card',
		},
	});

	const blink = ref(null);

	// fetch the b
	const fetchBlink = async () => {
		const res = await useFetch(props.blinkUrl);
		blink.value = res.data.value;
	};

	const postBlink = async (action) => {

		action.loading = true;
		let url = '';

		// if action.href does not start with http, use the domain from b
		if(!action.href.startsWith('http')) {
			url = new URL(action.href, props.blinkUrl).href;
		} else {
			url = action.href;
		}

		console.log(action.parameters);

		// if parameters are present
		if(action.parameters) {
			// loop through the parameters
			for(const p of action.parameters) {
				console.log(p.name, p[p.name]);
				// replace the parameter in the url
				url = url.replace(`%7B${ p.name }%7D`, p[p.name]);
				url = url.replace(`{${ p.name }}`, p[p.name]);
			}
		}

		console.log(url);
		action.loading = false;
		return;

		const res = await useFetch(url, {
			method: 'POST',
			body: JSON.stringify({
				account: useSolanaStore().wallet,
			}),
		});

		if(res.error.value) {
			console.error(res.error.value);
			action.loading = false;
			return
		}

		await useSolanaStore().signEncodedTransaction(res.data.value.transaction);

		action.loading = false;
	};

	onMounted(() => {
		fetchBlink();
	});
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
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

		p.powered
			text-align: right
			margin-bottom: 0
			font-size: 0.75rem

		&.compact
			display: flex
			gap: 1rem
			max-width: 100%

			.blink-image
				width: 130px

			.blink-info
				display: flex
				flex-grow: 1
				flex-direction: column
</style>