<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import type { LayoutData } from './$types';
  import { locale } from 'svelte-intl-precompile';
  
  export let data: LayoutData;

  console.log(data.language, 'test');
  $: locale.set(data.language);
</script>

<div class="application-content">
  <Metadata />
  <Header message={data.infoMessage} />
  {#if data.environmentId === null}
    <div>
      Your environment id given in your environment variables is not a valid GUID.
    </div>
  {:else}
    <slot />
  {/if}
  <Footer />
</div>
