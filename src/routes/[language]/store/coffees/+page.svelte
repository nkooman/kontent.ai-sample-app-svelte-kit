<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import CheckboxFilter from '$lib/components/CheckboxFilter.svelte';
  import type { PageData } from './$types';
  import CoffeeStoreListing from './CoffeeStoreListing.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

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
      {#if data.processings}
        <h4>{$t('CoffeeStoreContainer.coffeeProcessingTitle')}</h4>
        <CheckboxFilter
          on:change={toggleFilter('processing')}
          options={data.processings}
        />
      {/if}
      <h4>{$t('CoffeeStoreContainer.statusTitle')}</h4>
      {#if data.productStatuses}
        <CheckboxFilter
          on:change={toggleFilter('productStatus')}
          options={data.productStatuses}
        />
      {/if}
    </aside>
    {#if data.coffees}
      <CoffeeStoreListing coffees={data.coffees} />
    {/if}
  </div>
</div>
