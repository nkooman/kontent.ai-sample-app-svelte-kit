<script lang="ts">
  import { init, addMessages, getLocaleFromPathname } from 'svelte-intl-precompile';
  // @ts-expect-error TypeScript is not recognizing JSON imports
  import en from '$locales/en-US.json';
  // @ts-expect-error TypeScript is not recognizing JSON imports
  import es from '$locales/es-ES.json';

  addMessages('en-US', en);
  addMessages('es-ES', es);

  init({ initialLocale: getLocaleFromPathname(/((es|en)(-\w\w)?)/) ?? undefined, fallbackLocale: 'en-US' });
</script>

<slot />

<style>
  @import 'src/index.css';
</style>
