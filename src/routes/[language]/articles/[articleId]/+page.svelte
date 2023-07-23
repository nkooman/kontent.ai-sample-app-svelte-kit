<script lang="ts">
  import { t, locale } from 'svelte-intl-precompile';
  import { formatDate } from '$lib/utils/format';
  import Metadata from '$lib/components/Metadata.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.articleDetail}
  {@const metadata = data.articleDetail.metadata}
  {@const article = data.articleDetail.article}
  <div class="container">
    <Metadata {...metadata} />
    <article
      class="article-detail col-lg-9 col-md-12 article-detail-related-box"
    >
      <h2>{article.title ?? $t('Article.noTitleValue')}</h2>
      <div class="article-detail-datetime">
        {formatDate(article.postDate, $locale, 'cccc, MMMM dd, yyyy')}
      </div>
      <div class="row">
        <div class="article-detail-image col-md-push-2 col-md-8">
          {#if article.imageLink}
            <img
              alt={article.title}
              class="img-responsive"
              src={article.imageLink}
              title={article.title}
            />
          {:else}
            <div class="img-responsive placeholder-tile-image">
              {$t('Article.noTeaserValue')}
            </div>
          {/if}
        </div>
      </div>
      <div class="row">
        {#if article.bodyCopy.value !== '<p><br></p>'}
          {#key article.bodyCopy.value}
            <RichText class="article-detail-content" element={article.bodyCopy} />
          {/key}
        {:else}
          <p class="article-detail-content">
            {$t('Article.noBodyCopyValue')}
          </p>
        {/if}
      </div>
    </article>
  </div>
{:else}
  <div class="container" />
{/if}
