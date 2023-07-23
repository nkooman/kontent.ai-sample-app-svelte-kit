<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
  import type { Cafe } from '$lib/mapping/models/cafe';

  export let cafes: Cafe[];
</script>

<div class="row">
  <div>
    <h1 class="title-tab">
      {$t('TasteOurCoffee.title')}
    </h1>
  </div>
  {#each cafes as cafe}
    <div class="col-xs-6 col-md-3">
      <div>
        <a href={`/${$locale.toLocaleLowerCase()}/cafe`} class="ourcoffee-tile-link">
          <h2 class="ourcoffee-tile-text center-text">{cafe.name}</h2>
          <span class="cafe-overlay" />
          <img
            class="ourcoffee-tile-image"
            src={cafe.imageUrl}
            alt={cafe.name}
            title={cafe.name}
          />
        </a>
      </div>
    </div>
  {/each}
</div>
