<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import Cafe from './Cafe.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.companyCafes}
  {@const roastery = data.companyCafes[0]}
  <div class="container">
    <div class="col-md-12">
      <h2 class="contact-title">{$t('Contacts.roasteryTitle')}</h2>
      <ul class="contact-info">
        <li>{roastery.phone}</li>
        <li>
          <a href={'mailto:' + roastery.email} target="_top">
            {roastery.email}
          </a>
        </li>
        <li>
          <p>
            {roastery.dataAddress},<br />
            {roastery.zipCode}, {roastery.countryWithState}
            <br />
          </p>
        </li>
      </ul>
    </div>
    <div>
      <h2>{$t('Contacts.ourCafesTitle')}</h2>
      <div class="row">
        {#each data.companyCafes as cafe (cafe.id)}
          <Cafe {cafe} />
        {/each}
      </div>
    </div>
  </div>
{/if}
