<script lang="ts">
  // TODO: Upgrade to use svelte-portabletext.
  // https://github.com/portabletext/svelte-portabletext/pull/32

  import {
    type Elements,
    type ElementModels,
    type IContentItemElements,
    type IContentItem,
    createAsyncRichTextHtmlResolver
  } from '@kontent-ai/delivery-sdk';
  import { resolveContentLink } from '$lib/utils/content-links';

  export let element: Elements.RichTextElement;
  let className = '';
  export { className as class };

  const resolveContentItem = (
    contentItem: IContentItem<IContentItemElements>
  ) => {
    const contentItemType = contentItem?.system.type ?? '';

    switch (contentItemType) {
      case 'tweet': {
        const tweetLink = contentItem?.elements.tweetLink.value;
        const tweetId = tweetLink.match('^.*twitter.com/.*/(\\d+)/?.*$')[1];

        let selectedTheme = contentItem?.elements.theme.value[0].codename;
        selectedTheme = selectedTheme ? selectedTheme : 'light';

        setTimeout(() => {
          // @ts-expect-error twttr is not a part of the global namespace by default
          window.twttr.widgets.createTweet(
            tweetId,
            document.getElementById(`tweet${tweetId}`),
            {
              theme: selectedTheme
            }
          );
        }, 100);

        return `<div id="tweet${tweetId}"></div>`;
      }

      case 'hosted_video': {
        if (
          contentItem?.elements.videoHost.value.find(
            (item: ElementModels.MultipleChoiceOption) =>
              item.codename === 'vimeo'
          )
        ) {
          return `<iframe
                className="hosted-video__wrapper"
                src=""https://player.vimeo.com/video/${contentItem.elements.videoId.value}?title=0&byline=0&portrait=0"
                width="640"
                height="360"
                frameBorder="0"
                allowFullScreen
                title="Vimeo video ${contentItem.elements.videoId.value}"
              ></iframe>`;
        } else if (
          contentItem?.elements.videoHost.value.find(
            (item: ElementModels.MultipleChoiceOption) =>
              item.codename === 'youtube'
          )
        ) {
          return `<iframe
                className="hosted-video__wrapper"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/${contentItem.elements.videoId.value}"
                frameBorder="0"
                allowFullScreen
                title="Youtube video ${contentItem.elements.videoId.value}"
              ></iframe>`;
        } else {
          return `<div>Content item not supported</div>`;
        }
      }
      default:
        `<div>Unsupported type ${contentItemType}</div>`;
    }
  };

  const resolvedRichText =
    createAsyncRichTextHtmlResolver().resolveRichTextAsync({
      // Gives the resolver the contents of your rich text
      element: element,
      // Points the resolver to the content items and components that might be used in the rich text element
      linkedItems: element.linkedItems,
      contentItemResolverAsync: async (itemId, contentItem) => {
        if (!contentItem) {
          return {
            contentItemHtml: '<div>Content item not supported</div>'
          };
        }

        const resolvedItem = resolveContentItem(contentItem);

        return {
          contentItemHtml: resolvedItem
        };
      },
      urlResolverAsync: async (linkId, linkText, link) => {
        if (!link) {
          return {
            linkHtml: '<div>Link not supported</div>'
          };
        }

        const path = resolveContentLink(link);

        return {
          linkHtml: `<a href="${path}" id="${linkId}">${linkText}</a>`,
          linkUrl: path
        };
      },
      imageResolverAsync: async (imageId, image) => {
        if (!image) {
          return {
            imageHtml: '<div>Image not supported</div>'
          };
        }

        return {
          imageHtml: `
          <img
            className="xImage"
            id="${imageId}"
            src="${image.url}"
            alt="${image.description || `image with id: ${image.imageId}`}"
          />
          `
        };
      }
    });
</script>

{#await resolvedRichText then richText}
  <div class={className}>
    {@html richText.html}
  </div>
{/await}
