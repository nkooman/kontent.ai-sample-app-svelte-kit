<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import Metadata from '$lib/components/Metadata.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.aboutUs}
  <div class="container">
    <Metadata {...data.aboutUs.metadata} />
    {#each data.aboutUs.facts as fact, index (fact.id)}
      {@const isOdd = index % 2 !== 0}
      <section class="row text-and-image">
        <h2 class="col-lg-12">{fact.title}</h2>
        <div class="col-md-6" class:col-md-push-6={isOdd}>
          {#if fact.description}
            {#key fact.title}
              <RichText
                class="text-and-image-text"
                element={fact.description}
              />
            {/key}
          {:else}
            <p class="text-and-image-text">
              {$t('About.noDescriptionValue')}
            </p>
          {/if}
        </div>
        <div class="col-md-6" class:col-md-pull-6={isOdd}>
          {#if fact.imageUrl}
            <img
              src={fact.imageUrl}
              alt={fact.title}
              title={fact.title}
              class="img-responsive"
            />
          {:else}
            <div class="img-responsive placeholder-tile-image">
              {$t('About.noTeaserValue')}
            </div>
          {/if}
        </div>
      </section>
    {/each}
  </div>
{/if}
