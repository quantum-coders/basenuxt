<template>
	<div
		@click="loading = !loading"
		class="bg-success text-white base-nuxt-wrapper d-flex flex-grow-1 flex-column align-items-center justify-content-center"
	>
		<div class="border rounded-2 p-4 d-flex flex-column align-items-center justify-content-center text-center">
			<icon class="fs-1 mb-2" name="solar:sticker-smile-circle-linear" />
			<p>
				<strong>Quantum BaseNuxt</strong> rocks and it's {{ def.foo }}! <br>
			</p>
			<p>Click anywhere to toggle the loading and check that components are working</p>

			<platform-loading :active="loading" />
		</div>
	</div>
</template>

<script setup>
	const def = useDefaultStore();
	def.foo = 'working';
	const loading = ref(false);
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
</style>