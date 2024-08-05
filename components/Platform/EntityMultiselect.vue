<template>
	<platform-base-multiselect
		ref="baseSelect"
		:multiple="multiple"
		v-model="componentValue"
		:entity="entity"
		:label="label"
		:query-params="queryParams"
		:disabled="disabled"
		:taggable="taggable"
		:placeholder="placeholder"
		:tag-placeholder="tagPlaceholder"
		@tag="emit('tag', $event)"
		@object-returned="emit('objectReturned', $event)"
	>
		<template #option="props">
			<slot name="option" v-bind="props" />
		</template>
		<template #placeholder>
			<slot name="placeholder">
				{{ placeholder }}
			</slot>
		</template>

		<template #singleLabel="props">
			<slot name="singleLabel" v-bind="props" />
		</template>
	</platform-base-multiselect>
</template>

<script setup>
	const baseSelect = ref(null);
	const emit = defineEmits([ 'update:modelValue', 'tag', 'objectReturned' ]);

	// receive the users as a prop
	const props = defineProps({
		modelValue: {
			type: [ Array, Number, String ],
			required: true,
		},
		multiple: {
			type: Boolean,
			default: true,
		},
		entity: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: 'Select an element...',
		},
		tagPlaceholder: {
			type: String,
			default: 'Press enter to create a tag',
		},
		queryParams: {
			type: Object,
			default: () => {},
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		taggable: {
			type: Boolean,
			default: false,
		},
	});

	const componentValue = computed({
		get: () => props.modelValue,
		set: (value) => emit('update:modelValue', value),
	});

	const reload = () => {
		baseSelect.value.getBase();
	};

	defineExpose({
		reload,
	});

</script>