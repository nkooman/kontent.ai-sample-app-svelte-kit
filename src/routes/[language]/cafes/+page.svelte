<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import type { Cafe } from '$lib/mapping/models/cafe';
  import type { PageData } from './$types';
  import { toBackgroundImage } from "$lib/utils/image";

  export let data: PageData;

  const reduceToLocations = (cafes: Cafe[]) =>
    cafes
      .map(cafe => cafe.location)
      .reduce((locations, location) => {
        if (locations.indexOf(location) < 0) {
          locations.push(location);
        }
        return locations;
      }, [] as string[])
      .sort()
      .map(
        location =>
          [location, cafes.filter(cafe => cafe.location === location)] as const
      );
</script>

  {#if data.cafes}
    {@const cafes = data.cafes}
    {@const companyCafes = cafes.filter(cafe => cafe.country === 'USA')}
    {@const partnerCafes = cafes.filter(cafe => cafe.country !== 'USA')}
    {@const partnerCafeLocations = reduceToLocations(partnerCafes)}

    <div class="container">
      <h2>{$t('Cafes.ourCafesTitle')}</h2>
      <div class="row">
        {#each companyCafes as cafe}
          <div class="col-md-6">
            <div
              class="cafe-image-tile js-scroll-to-map"
              data-address={cafe.dataAddress}
            >
              <div
                class="cafe-image-tile-image-wrapper"
                style:background-image={toBackgroundImage(cafe.imageUrl)}
                style:background-size="cover"
                style:background-position="right"
              />
              <div class="cafe-image-tile-content">
                <h3 class="cafe-image-tile-name">{cafe.name}</h3>
                <address class="cafe-tile-address">
                  <span class="cafe-tile-address-anchor">
                    {cafe.street}, {cafe.city}
                    <br />
                    {cafe.zipCode}, {cafe.countryWithState}
                  </span>
                </address>
                <p>{cafe.phone}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <h2>{$t('Cafes.partnerCafesTitle')}</h2>
      <div class="row">
        {#each partnerCafeLocations as [location, cafes] (location)}
          <div>
            <h3>{location}</h3>
            {#each cafes as cafe}
              <p>
                {cafe.name}, {cafe.street}, {cafe.phone}
              </p>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
