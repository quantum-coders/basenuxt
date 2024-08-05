<template>
	<platform-title title="Dialog" />
	<div class="d-flex flex-grow-1 flex-column align-items-center justify-content-center p-3">

		<div class="d-flex align-items-center gap-2">
			<button type="button" class="btn btn-primary" @click="dialogRef.open">
				Launch demo modal
			</button>

			<button type="button" class="btn btn-primary" @click="useNuxtApp().$toast.success('Hello')">
				Launch Toast
			</button>
		</div>

		<platform-dialog ref="dialogRef" class="dialog">
			<template #default="{ close }">
				<p class="text-end mb-0">
					<button type="button" class="btn-close" @click="close"></button>
				</p>
				<h5 class="modal-title">Dialog Title</h5>
				<p>Dialog content goes here.</p>

				<button
					type="button"
					class="btn btn-primary"
					@click="useNuxtApp().$toast.success('Hello', { el: '.dialog' })"
				>
					Toast
				</button>
			</template>
		</platform-dialog>
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'components' });

	const dialogRef = ref(null);

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.dialog
		width: 800px
		height: 400px
</style>