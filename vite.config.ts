import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin';

export default defineConfig({
  plugins: [sveltekit(), precompileIntl('locales')],
  server: {
    fs: {
      allow: ['..']
    }
  }
});
