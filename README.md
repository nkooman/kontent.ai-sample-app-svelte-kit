# Kontent.ai sample SvelteKit application

This is a sample website written in Svelte with TypeScript utilizing the Kontent.ai Delivery API to retrieve content from Kontent.ai. You can register your developer account at <https://app.kontent.ai>.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm run dev` to start a development server.

### Connecting to your sample project

At the first run of the app, you'll be presented with a configuration page. It will allow you to connect the app to your Kontent.ai project or create a new one. You'll also be able to start a trial and convert to a free plan when the trial expires.

Alternatively, you can connect your project manually as per the chapter below.

#### Connecting to your project manually

If you want to change the source Kontent.ai project, follow these steps:

1. In Kontent.ai, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Environemnt ID.
4. Open `.env.example` in the root directory.
5. Replace `your_environment_id` with your Environment ID and remove `PUBLIC_PREVIEW_API_KEY` entry.
6. Save and rename the file `.env`.

When you now run the sample application, the application retrieves content from your project.

## Previewing content from your project

If you already have a Kontent.ai account and you want to connect the sample application to a project of your own, you need to provide your Environment ID and your Preview API key to authorize requests to the Delivery Preview API. For example, you can connect the application to your modified version of the sample project.

To preview content in the sample application, follow these steps:

1. In Kontent.ai, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Environemnt ID and Preview API key.
4. Open `.env.example` in the root directory .
5. Replace `your_environment_id` and `your_api_key` with your Environment ID and Preview API key.
6. Save and rename the file `.env`.

When you now run the application, you will see all project content including the unpublished version of content items.

## Content administration

1. Navigate to <https://app.kontent.ai> in your browser.
2. Sign in with your credentials.
3. Manage content in the content administration interface of your sample project.

You can learn more about content editing in our tutorials at [Kontent.ai Learn](https://kontent.ai/learn/tutorials/write-and-collaborate/create-content/introducing-content-items).

## Content delivery

You can retrieve content either through the Kontent.ai Delivery SDKs or the Kontent.ai Delivery API:

- For published content, use `https://deliver.kontent.ai/ENVIRONMENT_ID/items`.
- For unpublished content, use `https://preview-deliver.kontent.ai/ENVIRONMENT_ID/items`.

For more info about the API, see the [API reference](https://kontent.ai/learn/reference).

You can find the Delivery and other SDKs at <https://github.com/kontent-ai>.

## Used toolchain

This application is based on [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Model mapping and data fetching

There are two types of model mapping in this application:

### Content Type DTOs

Content type definitions are being generated from content types via [Kontent.ai model generator](https://github.com/kontent-ai/model-generator-js) tool. All generated types can be found in the `src/lib/models` folder. The `_project.ts` contains information about the project structure such as project languages as well as other structure information like codenames about content types.

### View Models

Models displayed in views might require an adjustment from content types. For example, the `Cafe` content type contains fields for `city` and `street` and we would like to have a model containing an address in the format `city, street`. An example of such a view model is in `src/lib/mapping/models/cafe.ts`. To convert `Cafe` into `CafeModel` there are mapper functions built with [`morphism`](https://github.com/nobrainr/morphism) located in `src/lib/mapping/mapper.ts` that can be used.

### Data fetching

This solution fetches data using the [Delivery client](https://github.com/kontent-ai/delivery-sdk-js). For more implementation detail to set up the client see `src/lib/client.ts`. The data is fetched in server files. Then, they are passed to the page. For a better understanding see the code example below.

**`+page.server.ts`**

```ts
const response = deliveryClient
  .items<GeneratedDTO>()
  .type(projectModel.contentTypes.generatedDTO.codename)
  ...

return ({
  data: await response,
});
```

**`+page.svelte`**

```svelte
<script lang="ts">
  export let data: PageData;
</script>

{#each data as item (item.id)}
  <DisplayItem dto={item} />
{/each}
```

## Filtering by taxonomy

Filters in Kontent.ai are implemented using taxonomies. Filtering examples can be found in `src/routes/[language]/store/coffees/+page.server.ts` or `src/routes/[language]/store/coffees/+page.svelte`. Firstly, the taxonomies groups that contain possible values for filters are loaded on the server and passed to the page. Selected values for filtering are stored in the query string for the server to consume. Items to be displayed are then selected using filters from the [Delivery client](https://github.com/kontent-ai/delivery-sdk-js), such as `anyFilter`.

**`+page.server.ts`**

```ts
const processingTerms = url.searchParams.get('processing')?.split(',') ?? [];

let query = deliveryClient.items<Coffee>().type(contentTypes.coffee.codename);

if (processingTerms.length) {
  query = query.anyFilter('elements.processing', processingTerms);
}

const coffeesResponse = query
  .orderByAscending('elements.product_name')
  .languageParameter(language)
  .toPromise();

const processingTaxonomyResponse = deliveryClient
  .taxonomy(contentTypes.coffee.elements.processing.codename)
  .toPromise();

return {
  coffees: await coffeesResponse,
  processings: await processingTaxonomyResponse
};
```

**`+page.svelte`**

```svelte
<script lang="ts">
  export let data: PageData;

  $: newSearchParams = new URLSearchParams($page.url.searchParams);

  const toggleFilter =
    (key: string) =>
    (event: Event): void => {
      const termId = (event.target as HTMLInputElement).id;
      const terms = newSearchParams.get(key)?.split(',') ?? [];
      const newTerms = terms.includes(termId)
        ? terms.filter(term => term !== termId)
        : [...terms, termId];

      if (newTerms.length) {
        newSearchParams.set(key, newTerms.join(','));
      } else {
        newSearchParams.delete(key);
      }

      goto(`?${newSearchParams}`);
    };
</script>

<CheckboxFilter
  on:change={toggleFilter('processing')}
  options={data.processings}
/>
```

## Localization

In Kontent.ai each language is identified by codename, in case of this project, it is `en-US` and `es-ES`.

### Resource strings

Not every text of the application must be stored in Kontent.ai. Some strings, such as button texts, navigation texts, and so on, can be stored directly in the application. For those texts [svelte-intl-precompile](https://svelte-intl-precompile.com/) is used. For every language, there is a JSON file in the `locales` folder.

```jsonc
// en-US.json
{
  "LatestArticles.title": "Latest articles",
  "LatestArticles.noTitleValue": "(Article has no title)",
  "LatestArticles.noTeaserValue": "(Article has no teaser image)",
  "LatestArticles.noSummaryValue": "No summary filled"
  // ...
}
```

### Language prefixes

The language prefix is obtained from the URL in `src/routes/[language]/+layout.server.ts` and then it is propagated via cookies to the whole application. Content language is then adjusted by using the `languageParameter()` method on the [Delivery client](https://github.com/kontent-ai/delivery-sdk-js) to obtain items in a specific language. By default it uses [language fallbacks](https://kontent.ai/learn/tutorials/manage-kontent/projects/set-up-languages/#a-language-fallbacks) set up in the project.

```ts
const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

const response = deliveryClient
  .items<HomeType>()
  .type(contentTypes.home.codename)
  .languageParameter(language);
```

### Language fallbacks

To deal with content that is not available in current language, this project uses method called language fallbacks. It will fetch the content in the language which set as fallback language in the Kontent.ai project and redirect the website to the URL with prefix of the given language. However, it is possible to disable language fallbacks by adding a filter of `system.language` to your query. For more information about getting localized content check this [`link.`](https://kontent.ai/learn/tutorials/develop-apps/get-content/localized-content-items/?tech=javascript)

```ts
const response = deliveryClient
  .items<HomeType>()
  .type(contentTypes.home.codename)
  .languageParameter(language)
  .equalsFilter('system.language', 'es-ES');
```

## Handling 404

The 404 page is handled in `+error.svelte` and uses localization. As the content on one page should be in one language, this approach might help you to optimize SEO. If language is not set in the URL the application uses the last used language, which is set in cookies.
