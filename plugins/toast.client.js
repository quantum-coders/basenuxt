import { defineNuxtPlugin } from '#app';
import { createApp, h } from 'vue';
import Toast from '~/components/Platform/Toast.vue';

export default defineNuxtPlugin((nuxtApp) => {
	const showToast = (message, type, options = {}) => {
		// Create an app instance for the toast
		const app = createApp({
			render() {
				return h(Toast, {
					message,
					type,
					...options,
				});
			},
		});

		console.log(options);

		const baseSelector = options.el || 'body';
		const baseElement = document.querySelector(baseSelector);
		console.log(baseElement);

		// check if the toast-container exists
		const existingContainer = baseElement.querySelector(':scope > .toast-container');
		if(existingContainer) {
			console.log(existingContainer);
			// If it does, mount the toast to it
			const toast = document.createElement('div');
			existingContainer.appendChild(toast);
			app.mount(toast);
			console.log('mounted');
		} else {
			// If it doesn't, create it
			const container = document.createElement('div');
			container.classList.add('toast-container');
			baseElement.appendChild(container);

			const toast = document.createElement('div');
			container.appendChild(toast);

			app.mount(toast);
		}
	};

	// Provide the toast functions
	nuxtApp.provide('toast', {
		success: (message, options) => showToast(message, 'success', options),
		error: (message, options) => showToast(message, 'error', options),
		warning: (message, options) => showToast(message, 'warning', options),
	});
});