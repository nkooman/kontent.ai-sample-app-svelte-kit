<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
  import { resolveContentLink } from '$lib/utils/content-links';
  import { formatPrice } from '$lib/utils/format';
  import type { Brewer } from '$lib/mapping/models/brewer';

  export let brewers: Brewer[];
</script>

<div id="product-list" class="col-md-8 col-lg-9 product-list">
  {#each brewers as brewer (brewer.id)}
    {@const link = resolveContentLink({ type: 'brewer', urlSlug: brewer.urlPattern }, $locale)}
    <div class="col-md-6 col-lg-4">
      <article class="product-tile">
        <a href={link}>
          <h1 class="product-heading">{brewer.name ?? $t('BrewerStoreListing.noNameValue')}</h1>
          {#if brewer.productStatus.value.length}
            <span class="product-tile-status">
              {brewer.productStatus.value.map((x) => x.name).join(', ')}
            </span>
          {:else}
            <span />
          {/if}
          <figure class="product-tile-image">
            {#if brewer.imageLink}
              <img alt={brewer.name} src={brewer.imageLink} title={brewer.name} />
            {:else}
              <div style:height="257.15px" class="product-tile-image placeholder-tile-image">
                {$t('BrewerStoreListing.noTeaserValue')}
              </div>
            {/if}
          </figure>
          <div class="product-tile-info">
            <span class="product-tile-price">
              {#if brewer.price}
                {formatPrice(brewer.price, $locale)}
              {:else}
                {$t('BrewerStoreListing.noPriceValue')}
              {/if}
            </span>
          </div>
        </a>
      </article>
    </div>
  {/each}
</div>
