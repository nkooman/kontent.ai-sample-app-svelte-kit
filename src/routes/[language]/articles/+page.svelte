<script lang="ts">
  import { t, locale } from 'svelte-intl-precompile';
  import { page } from '$app/stores';
  import { formatDate } from '$lib/utils/format';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.articles}
  <div class="container">
    {#each data.articles as article, index (article.id)}
      {#if index % 4 === 0}
        <div class="clear" />
      {/if}
      <div class="col-md-3">
        <div class="article-tile">
          <a href={`${$page.url}/${article.id}`}>
            {#if article.imageLink}
              <img
                class="article-tile-image"
                src={article.imageLink}
                alt={`Article ${article.title}`}
                title={`Article ${article.title}`}
              />
            {:else}
              <div class="article-tile-image placeholder-tile-image">
                {$t('Articles.noTeaserValue')}
              </div>
            {/if}
          </a>
          <div class="article-tile-date">
            {formatDate(article.postDate, $locale)}
          </div>
          <div class="article-tile-content">
            <h2 class="h4">
              <a href={`${$page.url}/${article.id}`}>
                {article.title ?? $t('Articles.noTitleValue')}
              </a>
            </h2>
            <p class="article-tile-text">
              {article.summary ?? $t('Articles.noSummaryValue')}
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
