<script lang="ts">
  import type { Cafe } from "$lib/mapping/models/cafe";

  export let cafe: Cafe;
</script>

<div class="col-md-6 col-lg-3">
  <div class="cafe-tile js-scroll-to-map" data-address={cafe.dataAddress}>
    <div class="cafe-tile-content">
      <h3 class="cafe-tile-name">{cafe.name}</h3>
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