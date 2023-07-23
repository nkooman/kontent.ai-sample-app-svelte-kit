<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import Metadata from '$lib/components/Metadata.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container">
  {#if data.coffeeDetail}
    <Metadata {...data.coffeeDetail.metadata} />
    <article class="product-detail">
      <div class="row">
        <div class="col-md-12">
          <header>
            <h2>
              {data.coffeeDetail.coffee.name ?? $t('Coffee.noNameValue')}
            </h2>
          </header>
        </div>
      </div>
      <div class="row-fluid">
        <div class="col-lg-7 col-md-6">
          <figure class="image">
            {#if data.coffeeDetail.coffee.imageLink}
              <img
                src={data.coffeeDetail.coffee.imageLink}
                alt={data.coffeeDetail.coffee.name}
                title={data.coffeeDetail.coffee.name}
              />
            {:else}
              <div class="placeholder-image">
                {$t('Coffee.noTeaserValue')}
              </div>
            {/if}
          </figure>
          <div class="description">
            {#if data.coffeeDetail?.coffee.longDescription.value}
              {#key data.coffeeDetail.coffee.longDescription.value}
                <RichText element={data.coffeeDetail.coffee.longDescription} />
              {/key}
            {:else}
              <p>{$t('noDescriptionValue')}</p>
            {/if}
            <div class="product-detail-properties">
              <h4>Parameters</h4>
              <dl class="row">
                <dt class="col-xs-12 col-sm-4">Farm</dt>
                <dd class="col-xs-12 col-sm-8">
                  {data.coffeeDetail.coffee.farm ?? '\u00A0'}
                </dd>
                <dt class="col-xs-12 col-sm-4">Variety</dt>
                <dd class="col-xs-12 col-sm-8">
                  {data.coffeeDetail.coffee.variety ?? '\u00A0'}
                </dd>
                <dt class="col-xs-12 col-sm-4">Processing</dt>
                <dd class="col-xs-12 col-sm-8">
                  {data.coffeeDetail.coffee.processing ?? '\u00A0'}
                </dd>
                <dt class="col-xs-12 col-sm-4">Altitude</dt>
                <dd class="col-xs-12 col-sm-8">
                  {#if data.coffeeDetail.coffee.altitude}
                    {data.coffeeDetail.coffee.altitude} feet
                  {:else}
                    {'\u00A0'}
                  {/if}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </article>
  {/if}
</div>
