<template>
	<platform-title title="Data Table"/>
	<div class="d-flex flex-grow-1 flex-column p-3">
		<platform-data-table :endpoint="`${ useRuntimeConfig().public.appURL }/data-table.json`" :fields="fields">
			<template #user="{ item }">
				<div class="d-flex align-items-center flex-nowrap">
					<img class="avatar" alt="" src="">
					<div class="text-truncate">
						<p class="mb-0 text-truncate">{{ item.nicename }}</p>
						<p class="small mb-0 text-truncate">{{ item.email }}</p>
					</div>
				</div>
			</template>
		</platform-data-table>
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'components' });

	const fields = [
		{
			text: 'Id',
			value: 'id',
			width: 50,
			minWidth: 50,
			class: 'text-center',
			sort: true,
		},
		{
			text: 'Name',
			value: 'user',
			width: 300,
		},
		{
			text: 'Type',
			value: 'type',
			sort: true,
			width: 'auto',
		},
		{
			text: 'Status',
			value: 'status',
			sort: false,
			width: 150,
		}
	];

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.avatar
		min-width: 40px
		aspect-ratio: 1
		background: #EEE
		border-radius: 50%
		margin-right: 0.5rem

</style>