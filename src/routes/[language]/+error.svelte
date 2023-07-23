<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
</script>

<div class="container">
  <div style:text-align="center">
    <h1>404</h1>
    <h2>
      {#key $locale}
        {$t('NotFound.message')}
      {/key}
    </h2>
  </div>
</div>