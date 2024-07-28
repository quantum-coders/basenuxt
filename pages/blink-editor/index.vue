<template>
	<section class="blink-editor">

		<div class="connect" v-if="!solana.wallet">
			<div class="copy">
				<h3 class="text-primary">
					<icon name="solar:moon-broken" />
					Blink Editor
					<small class="fs-7">Powered by Solana Blinks</small>
				</h3>
				<p>Connect your wallet and start creating <strong class="text-primary">Luna Blinks</strong>.</p>
				<p>Using
					<icon name="token-branded:solana" />
					Solana Actions, you can turn any transaction into a blockchain link that can be shared anywhere on the internet — no third party application required. Request a payment in a text message. Vote on governance in a chatroom. Buy an NFT on social media.
					<strong class="text-primary">It’s all possible</strong>.
				</p>
			</div>
		</div>

		<div class="editor-wrapper" v-else>

			<div class="editor">
				<p>Select your poison:</p>

				<div class="blink-types mb-3">
					<div class="row">
						<div class="col-4 flex-column d-flex">
							<article
								class="blink-type"
								@click="selectedType = 'memo'"
								:class="{ 'is-selected': selectedType === 'memo' }"
							>
								<h4>Send a Memo</h4>
								<p>Send sweet, sweet memos to the blockchain.</p>
							</article>
						</div>
						<div class="col-4 flex-column d-flex">
							<article
								class="blink-type"
								@click="selectedType = 'transfer-sol'"
								:class="{ 'is-selected': selectedType === 'transfer-sol' }"
							>
								<h4>Transfer SOL</h4>
								<p>Send SOL to your friends and family.</p>
							</article>
						</div>
					</div>
				</div>

				<div class="blink-form" v-if="blink">
					<h5>Card Branding</h5>

					<!-- input for title -->
					<div class="form-group mb-3">
						<label for="title" class="form-label">Title</label>
						<input type="text" id="title" class="form-control" v-model="blink.title" />
					</div>

					<!-- description -->
					<div class="form-group mb-3">
						<label for="description" class="form-label">Description</label>
						<textarea id="description" class="form-control" v-model="blink.description"></textarea>
					</div>

					<template v-if="!!blink.links && !!blink.links.actions && !!blink.links.actions.length && !!blink.links.actions[0].parameters">
						<h5>Actions</h5>
						<div class="form-group mb-3">
							<label for="description" class="form-label">Call to action text</label>
							<input
								type="text"
								id="description"
								class="form-control"
								v-model="blink.links.actions[0].label"
							/>
						</div>

						<h5>Actions Parameters</h5>
						<div class="row">
							<template v-for="p in blink.links.actions[0].parameters">
								<div class="col-6">
									<div class="form-group mb-3">
										<label for="description" class="form-label">Placeholder for
											<code>{{ p.name }}</code></label>
										<input type="text" id="description" class="form-control" v-model="p.label" />
									</div>
								</div>
							</template>
						</div>
					</template>
				</div>
			</div>

			<div class="blink-preview">
				<solana-blink
					:key="selectedType + keyNum"
					v-if="selectedType && blink"
					:blink-object="blink"
				/>
			</div>
		</div>

	</section>
</template>

<script setup>
	definePageMeta({ layout: 'luna' });
	const keyNum = ref(0);

	const selectedType = ref('');

	const loading = ref(false);

	const solana = useSolanaStore();
	const blink = ref(null);

	const blinkLink = computed(() => {

		return selectedType.value ? `http://localhost:1337/blinks/${ selectedType.value }` : null;
	});

	const fetchBlink = async (url) => {
		const res = await useFetch(url);
		blink.value = res.data.value;
		keyNum.value++;
	};

	watch(blinkLink, async (value) => {
		if(value) {
			loading.value = true;
			await fetchBlink(blinkLink.value);
			loading.value = false;
		}
	});

	watch(selectedType, async (value) => {
		if(value) {
			loading.value = true;
			await fetchBlink(blinkLink.value);
			loading.value = false;
		}
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.blink-editor
		display: flex
		flex-grow: 1
		background: url('/images/starry-night.png') no-repeat right top

		.connect
			padding: 5rem
			flex-grow: 1
			display: flex
			align-items: center

			.copy
				font-size: 1.5rem
				width: 50%

				h3
					font-size: 2.5rem
					margin-bottom: 1rem

	.editor-wrapper
		display: flex
		flex-grow: 1

		.editor
			flex-grow: 1
			padding: 2rem

			.blink-type
				flex-grow: 1
				border: 1px solid var(--bs-border-color)
				border-radius: 0.5rem
				padding: 3rem
				cursor: pointer

				&.is-selected,
				&:hover
					border-color: var(--bs-primary)

				h4
					font-size: 0.75rem
					color: var(--bs-primary)
					text-transform: uppercase
					letter-spacing: 0.1rem
					margin-bottom: 0

				p
					margin-bottom: 0

			.blink-form
				h5
					color: var(--bs-primary)
					font-size: 1rem
					text-transform: uppercase
					letter-spacing: 0.1rem

		.blink-preview
			min-width: 650px
			flex-grow: 1
			display: flex
			justify-content: center
			align-items: center

</style>