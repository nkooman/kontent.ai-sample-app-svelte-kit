<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import Metadata from '$lib/components/Metadata.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container">
  {#if data.brewerDetail}
    <Metadata {...data.brewerDetail.metadata} />
    <article class="product-detail">
      <div class="row">
        <div class="col-md-12">
          <header>
            <h2>
              {data.brewerDetail.brewer.name ?? $t('Brewer.noNameValue')}
            </h2>
          </header>
        </div>
      </div>
      <div class="row-fluid">
        <div class="col-lg-7 col-md-6">
          <figure class="image">
            {#if data.brewerDetail.brewer.imageLink}
              <img
                src={data.brewerDetail.brewer.imageLink}
                alt={data.brewerDetail.brewer.name}
                title={data.brewerDetail.brewer.name}
              />
            {:else}
              <div class="placeholder-image">
                {$t('Brewer.noTeaserValue')}
              </div>
            {/if}
          </figure>
          <div class="description">
            {#if data.brewerDetail?.brewer.longDescription.value}
              {#key data.brewerDetail.brewer.longDescription.value}
                <RichText element={data.brewerDetail.brewer.longDescription} />
              {/key}
            {:else}
              <p>{$t('noDescriptionValue')}</p>
            {/if}
          </div>
        </div>
      </div>
    </article>
  {/if}
</div>
