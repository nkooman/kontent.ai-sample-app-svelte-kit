<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CheckboxFilter from '$lib/components/CheckboxFilter.svelte';
  import BrewerStoreListing from './BrewerStoreListing.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: newSearchParams = new URLSearchParams($page.url.searchParams);

  const toggleFilter =
    (key: string) =>
    (event: Event): void => {
      const termId = (event.target as HTMLInputElement).id;
      const terms = newSearchParams.get(key)?.split(',') ?? [];
      const newTerms = terms.includes(termId)
        ? terms.filter(term => term !== termId)
        : [...terms, termId];

      if (newTerms.length) {
        newSearchParams.set(key, newTerms.join(','));
      } else {
        newSearchParams.delete(key);
      }

      goto(`?${newSearchParams}`);
    };
</script>

<div class="product-page row">
  <div class="flex">
    <aside class="col-md-4 col-lg-3 product-filter">
      {#if data.manufacturers}
        <h4>{$t('BrewerStoreContainer.manufacturerTitle')}</h4>
        <CheckboxFilter
          options={data.manufacturers}
          on:change={toggleFilter('manufacturer')}
        />
      {/if}
      <h4>{$t('BrewerStoreContainer.priceTitle')}</h4>
      <CheckboxFilter
        options={data.priceRanges}
        on:change={toggleFilter('priceRange')}
      />
      {#if data.productStatuses}
        <h4>{$t('BrewerStoreContainer.statusTitle')}</h4>
        <CheckboxFilter
          options={data.productStatuses}
          on:change={toggleFilter('productStatus')}
        />
      {/if}
    </aside>
    {#if data.brewers}
      <BrewerStoreListing brewers={data.brewers} />
    {/if}
  </div>
</div>
