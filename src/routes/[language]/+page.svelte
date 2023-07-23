<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
  import Metadata from '$lib/components/Metadata.svelte';
  import Banner from './Banner.svelte';
  import LatestArticles from './LatestArticles.svelte';
  import LinkButton from './LinkButton.svelte';
  import OurStory from './OurStory.svelte';
  import TasteOurCoffee from './TasteOurCoffee.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.home}
  <div class="container">
    <Metadata {...data.home.metadata} />
    {#if data.home.heroUnit}
      <Banner heroUnit={data.home.heroUnit} />
    {/if}
    {#if data.home.articles}
      <LatestArticles articles={data.home.articles} />
    {/if}
    <LinkButton
      link={`/${$locale.toLocaleLowerCase()}/articles`}
      text={$t('Home.moreArticles')}
    />
    {#if data.home.factAboutUs}
      <OurStory factAboutUs={data.home.factAboutUs} />
      <LinkButton
        link={`/${$locale.toLocaleLowerCase()}/about-us`}
        text={$t('Home.aboutLinkText')}
      />
    {/if}
    {#if data.home.cafes}
      <TasteOurCoffee cafes={data.home.cafes} />
    {/if}
    <LinkButton
      link={`/${$locale.toLocaleLowerCase()}/cafes`}
      text={$t('Home.cafesLinkText')}
    />
  </div>
{/if}
