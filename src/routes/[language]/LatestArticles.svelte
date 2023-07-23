<script lang="ts">
  import { t, locale } from 'svelte-intl-precompile';
  import type { Article } from '$lib/mapping/models/article';
  import { formatDate } from '$lib/utils/format';

  export let articles: Article[] = [];

  $: article = articles[0];
  $: otherArticles = articles.slice(1);
  $: title = article.title ?? $t('LatestArticles.noTitleValue');
  $: summary = article.summary ?? $t('LatestArticles.noSummaryValue');
  $: link = `/${$locale.toLocaleLowerCase()}/articles/${article.id}`;
</script>

{#if !articles.length}
  <div class="row" />
{/if}

<div class="row">
  <h1 class="title-tab">{$t('LatestArticles.title')}</h1>
  <div class="article-tile article-tile-large">
    <div class="col-md-12 col-lg-6">
      <a href={link}>
        {#if article.imageLink}
          <img
            alt={'Article ' + title}
            class="article-tile-image"
            src={article.imageLink}
            title={'Article ' + title}
          />
        {:else}
          <div class="article-tile-image placeholder-tile-image">
            {$t('LatestArticles.noTeaserValue')}
          </div>
        {/if}
      </a>
    </div>
    <div class="col-md-12 col-lg-6">
      <div class="article-tile-date">
        {formatDate(article.postDate, $locale)}
      </div>
      <div class="article-tile-content">
        <h2>
          <a href={link}>{title}</a>
        </h2>
        <p class="article-tile-text lead-paragraph">{summary}</p>
      </div>
    </div>
  </div>
  {#each otherArticles as article (article.id)}
    {@const link = `/${$locale.toLocaleLowerCase()}/articles/${article.id}`}
    {@const title = article.title ?? $t('LatestArticles.noTitleValue')}
    {@const summary = article.summary ?? $t('LatestArticles.noSummaryValue')}
    <div class="col-md-3">
      <div class="article-tile">
        <a href={link}>
          {#if article.imageLink}
            <img
              alt={'Article ' + title}
              class="article-tile-image"
              src={article.imageLink}
              title={'Article ' + title}
            />
          {:else}
            <div class="article-tile-image placeholder-tile-image">
              {$t('LatestArticles.noTeaserValue')}
            </div>
          {/if}
        </a>
        <div class="article-tile-date">
          {formatDate(article.postDate, $locale)}
        </div>
        <div class="article-tile-content">
          <h2 class="h4">
            <a href={link}>{title}</a>
          </h2>
          <p class="article-tile-text">{summary}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
