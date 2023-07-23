<script lang="ts">
  import { t, locale } from 'svelte-intl-precompile';
  import { englishCode, spanishCode } from '$lib/utils/language-codes';
  import { goto } from '$app/navigation';
  import MessageBox from './MessageBox.svelte';
  import Cookies from 'universal-cookie';
  import { LANGUAGE_COOKIE_NAME } from '$lib/const';

  export let message: string | null;

  const changeLanguage = (language: string) => {
    const cookies = new Cookies(document.cookie);
    const segments = window.location.pathname.split('/');
    const newUrl = `/${language.toLocaleLowerCase()}/${segments
      .slice(2)
      .join('/')}`;

    $locale = language;
    cookies.set(LANGUAGE_COOKIE_NAME, language, { path: '/' })

    goto(newUrl, { invalidateAll: true });
  };
  
  $: language = $locale.toLocaleLowerCase();
</script>

<header class="header">
  <div class="menu">
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href={`/${language}`}>{$t('Header.homeLinkTitle')}</a>
          </li>
          <li>
            <a href={`/${language}/store`}>
              {$t('Header.storeLinkTitle')}
            </a>
          </li>
          <li>
            <a href={`/${language}/articles`}>
              {$t('Header.articlesLinkTitle')}
            </a>
          </li>
          <!-- There is currently no easy way to have multilingual paths without code duplication. -->
          <!-- {#if language === englishCode.toLowerCase()} -->
          <li>
            <a href={`/${language}/about-us`}>
              {$t('Header.aboutLinkTitle')}
            </a>
          </li>
          <!-- {:else if language === spanishCode.toLowerCase()}
            <li>
              <a href={`/${language}/acerca-de`}>
                {$t('Header.aboutLinkTitle')}
              </a>
            </li>
          {/if} -->
          <li>
            <a href={`/${language}/cafes`}>
              {$t('Header.cafesLinkTitle')}
            </a>
          </li>
          <li>
            <a href={`/${language}/contacts`}>
              {$t('Header.contactsLinkTitle')}
            </a>
          </li>
        </ul>
      </nav>
      <div class="additional-menu-buttons user-menu">
        <nav>
          <ul class="dropdown-items-list dropdown-desktop-visible">
            <li>
              <button on:click={() => changeLanguage(englishCode)}>
                English
              </button>
            </li>
            <li>
              <button on:click={() => changeLanguage(spanishCode)}>
                Español
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {#if message}
    <MessageBox {message} />
  {/if}
  <div class="header-row">
    <div class="container">
      <div class="col-xs-8 col-md-8 col-lg-4 logo">
        <h1 class="logo">
          <a href={`/${language}`} class="logo-link">Dancing Goat</a>
        </h1>
      </div>
    </div>
  </div>
</header>
