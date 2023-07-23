<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
  import type { Coffee } from '$lib/mapping/models/coffee';
  import { resolveContentLink } from '$lib/utils/content-links';
  import { formatPrice } from '$lib/utils/format';

  export let coffees: Coffee[];
</script>

<div id="product-list" class="col-md-8 col-lg-9 product-list">
  {#each coffees as coffee (coffee.id)}
    {@const link = resolveContentLink({ type: 'coffee', urlSlug: coffee.urlPattern }, $locale)}
    <div class="col-md-6 col-lg-4">
      <article class="product-tile">
        <a href={link}>
          <h1 class="product-heading">{coffee.name ?? $t('CoffeeStoreListing.noNameValue')}</h1>
          {#if coffee.productStatus.value.length}
            <span class="product-tile-status">
              {coffee.productStatus.value.map((x) => x.name).join(', ')}
            </span>
          {:else}
            <span />
          {/if}
          <figure class="product-tile-image">
            {#if coffee.imageLink}
              <img alt={coffee.name} src={coffee.imageLink} title={coffee.name} />
            {:else}
              <div style:height="257.15px" class="product-tile-image placeholder-tile-image">
                {$t('CoffeeStoreListing.noTeaserValue')}
              </div>
            {/if}
          </figure>
          <div class="product-tile-info">
            <span class="product-tile-price">
              {#if coffee.price}
                {formatPrice(coffee.price, $locale)}
              {:else}
                {$t('CoffeeStoreListing.noPriceValue')}
              {/if}
            </span>
          </div>
        </a>
      </article>
    </div>
  {/each}
</div>
