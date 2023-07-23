<script lang="ts">
  import type { HeroUnit } from '$lib/mapping/models/hero-unit';
  import RichText from '$lib/components/RichText.svelte';
  import { toBackgroundImage } from '$lib/utils/image';

  export let heroUnit: HeroUnit;
</script>

<section
  class="banner-section"
  style:background-image={toBackgroundImage(heroUnit.backgroundImage)}
>
  <h2 class="banner-heading">{heroUnit.title}</h2>
  {#if heroUnit.marketingMessage}
    {#key heroUnit.marketingMessage}
      <RichText element={heroUnit.marketingMessage} class="banner-text" />
    {/key}
  {/if}
</section>
