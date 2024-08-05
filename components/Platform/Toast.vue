<template>
	<div class="toast" ref="toastRef" :class="`toast-${props.type}`">
		<p class="mb-0">{{ props.message }}</p>
		<button type="button" class="btn-close" @click="removeToast"></button>
	</div>
</template>

<script setup>
	const toastRef = ref(null);
	let removalTimeout;
	let remainingTime = 3000; // Initial duration of 3 seconds
	let pauseStartTime;

	// Define props
	const props = defineProps({
		type: {
			type: String,
			default: 'success',
		},
		message: {
			type: String,
			default: 'Success',
		},
	});

	// Remove toast function
	const removeToast = async () => {
		// Remove the .show class from the toast
		toastRef.value.classList.remove('show');

		// Wait 0.5 seconds for the fade-out effect
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Remove the toast from the DOM (removing the parent div)
		toastRef.value.remove();

		// Find empty divs inside .toast-container and remove them
		document.querySelectorAll('.toast-container > div').forEach((toast) => {
			if(!toast.children.length) {
				toast.remove();
			}
		});
	};

	// Pause timeout on hover
	const pauseTimeout = () => {
		clearTimeout(removalTimeout);
		pauseStartTime = Date.now();
	};

	// Resume timeout on mouse out
	const resumeTimeout = () => {
		const elapsedTime = Date.now() - pauseStartTime;
		remainingTime -= elapsedTime;

		removalTimeout = setTimeout(() => {
			removeToast();
		}, remainingTime);
	};

	// Set up the component lifecycle
	onMounted(() => {
		// Initial delay before showing the toast
		setTimeout(() => {
			toastRef.value.classList.add('show');
		}, 100);

		// Start the removal timeout
		removalTimeout = setTimeout(() => {
			removeToast();
		}, remainingTime);

		// Add event listeners for hover effects
		toastRef.value.addEventListener('mouseover', pauseTimeout);
		toastRef.value.addEventListener('mouseout', resumeTimeout);
	});
</script>

<style lang="sass" scoped>
	.toast
		display: flex
		align-items: center
		justify-content: space-between
		right: -1rem
		transition: all 0.5s ease
		opacity: 0
		margin-top: 0.5rem
		padding: 1rem

		&.toast-error
			background: var(--bs-danger)
			color: white

		&.toast-success
			background: var(--bs-success)
			color: white

		&.toast-warning
			background: var(--bs-warning)
			color: white

		&.show
			opacity: 1
			right: 0
</style>
