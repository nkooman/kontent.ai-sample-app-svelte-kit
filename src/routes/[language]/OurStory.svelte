<script lang="ts">
  import type { FactAboutUs } from "$lib/mapping/models/fact-about-us";
  import RichText from "$lib/components/RichText.svelte";
  import { toBackgroundImage } from "$lib/utils/image";

  export let factAboutUs: FactAboutUs;
</script>

<div class="row">
  <h1 class="title-tab">
    {factAboutUs.title}
  </h1>
  <div class="col-sm-12">
    <div class="ourstory-section center-text" style:background-image={toBackgroundImage(factAboutUs.imageUrl)}>
      {#if factAboutUs.description}
        {#key factAboutUs.description}
          <RichText element={factAboutUs.description} />
        {/key}
      {/if}
    </div>
  </div>
</div>