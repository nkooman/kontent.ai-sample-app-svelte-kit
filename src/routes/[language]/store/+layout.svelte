<script lang="ts">
  import { t } from 'svelte-intl-precompile';
</script>

<div class="container">
  <div class="container product-page-container">
    <nav class="sub-menu row">
      <div class="store-menu-list row">
        <ul>
          <li>
            <a href="coffees">
              {$t('Store.coffeesLinkTitle')}
            </a>
          </li>
          <li>
            <a href="brewers">
              {$t('Store.brewersLinkTitle')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <slot />
  </div>
</div>