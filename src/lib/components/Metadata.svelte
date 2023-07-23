<script lang="ts">
  import type { Elements } from '@kontent-ai/delivery-sdk';

  export let title: Elements.TextElement | undefined = undefined;
  export let description: Elements.TextElement | undefined = undefined;
  export let ogTitle: Elements.TextElement | undefined = undefined;
  export let ogDescription: Elements.TextElement | undefined = undefined;
  export let ogImage: Elements.AssetsElement | undefined = undefined;
  export let twitterTitle: Elements.TextElement | undefined = undefined;
  export let twitterSite: Elements.TextElement | undefined = undefined;
  export let twitterImage: Elements.AssetsElement | undefined = undefined;
  export let twitterCreator: Elements.TextElement | undefined = undefined;
  export let twitterDescription: Elements.TextElement | undefined = undefined;

  let location: Location | undefined = undefined;

  const handleLoad = () => {
    location = window.location;
  }
</script>

<svelte:window on:load={handleLoad} />

<svelte:head>
  <title>{title?.value.trim() ?? 'Dancing Goat'}</title>

  {#if description?.value.trim()}
    <meta name="description" content={description.value.trim()} />
  {/if}

  {#if ogTitle?.value.trim()}
    <meta property="og:title" content={ogTitle.value.trim()} />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:url" content={location?.href ?? ''} />

  {#if ogImage?.value[0].url}
    <meta property="og:image" content={ogImage?.value[0].url} />
  {/if}

  {#if ogDescription?.value.trim()}
    <meta property="og:description" content={ogDescription?.value.trim()} />
  {/if}

  {#if twitterTitle?.value.trim()}
    <meta property="twitter:title" content={twitterTitle?.value.trim()} />
    <meta property="twitter:card" content="summary_large_image" />
  {/if}

  {#if twitterSite?.value.trim()}
    <meta property="twitter:site" content={twitterSite?.value.trim()} />
  {/if}
  
  {#if twitterCreator?.value.trim()}
    <meta property="twitter:creator" content={twitterCreator?.value.trim()} />
  {/if}
  
  {#if twitterDescription?.value.trim()}
    <meta
      property="twitter:description"
      content={twitterDescription?.value.trim()}
    />
  {/if}

  {#if twitterImage?.value[0].url}
    <meta property="twitter:image" content={twitterImage?.value[0].url} />
  {/if}
</svelte:head>
