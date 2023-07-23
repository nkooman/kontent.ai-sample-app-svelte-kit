<script lang="ts">
  import Logo from '$lib/assets/admin/kk-logo.svg'
  import KontentRedirectEnvironmentId from './KontentRedirectEnvironmentId.svelte';
  import ManualEnvironmentId from './ManualEnvironmentId.svelte';
  import SharedProjectEnvironmentId from './SharedProjectEnvironmentId.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: environmentId = data.currentEnvironmentId ?? '';
</script>

<div class="configuration-page">
  <div class="gradient-desk padding-bottom-xl">
    <div class="kk-container">
      <a href="/" class="logo-link">
        <img class="logo" src={Logo} alt="Kontent.ai logo" />
      </a>
    </div>
    <header>
      <div class="kk-container">
        <h1 class="headline-large">Sample Site—Configuration</h1>
        <p class="margin-top-xl">
          For your sample app to work, you should have a Kontent.ai project
          containing content. Your app should be then configured with its
          environment ID. You can either get it by signing in using your
          Kontent.ai credentials or by signing up for a trial. Later, it will be
          converted to a free plan.
        </p>
      </div>
    </header>
    <div class="kk-container">
      <section class="paper margin-top-xl">
        <h2 class="headline-medium">Get a Environment ID</h2>
        <p class="margin-top-l">
          You may wish to either select from existing projects or create a new
          sample project. The app will be configured with its environment ID.
        </p>
        <KontentRedirectEnvironmentId />
      </section>
    </div>
    <div class="kk-container">
      <div class="row-lg row-lg--align-start">
        <ManualEnvironmentId environmentId={environmentId} />
        <SharedProjectEnvironmentId />
      </div>
    </div>
  </div>
</div>

<style>
  @import './index.css';
</style>
