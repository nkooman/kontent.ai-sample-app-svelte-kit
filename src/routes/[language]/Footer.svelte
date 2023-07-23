<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import FacebookLogo from '$lib/assets/facebook-icon.png';
  import TwitterLogo from '$lib/assets/twitter-icon.png';
</script>

<div class="footer-wrapper">
  <footer class="contentinfo">
    <div class="footer-container">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-4 footer-col">
            <h3 class="contact-title">
              {$t('Footer.contact')}
            </h3>
            <p>
              (+0) 000-000-0000
              <br />
              <a href="mailto:dancinggoat@localhost.local">
                dancinggoat@localhost.local
              </a>
              <br />
              <br /> Dancing Goat Ltd
              <br /> 62 E Lake St Chicago,
              <br />
              {$t('Footer.cityStateZip')}
            </p>
          </div>
          <div class="col-md-4 col-lg-4 footer-col">
            <h3>{$t('Footer.followUs')}</h3>
            <a
              href="https://www.facebook.com/Dancing.Goat"
              target="_blank"
              class="followus-link"
            >
              <img
                src={FacebookLogo}
                alt="Follow us on Facebook"
                title={$t('Footer.followUsOnFacebook')}
              />
            </a>
            <a
              href="https://twitter.com/DancingGoat78"
              target="_blank"
              class="followus-link"
            >
              <img
                src={TwitterLogo}
                alt="Follow us on Twitter"
                title={$t('Footer.followUsOnTwitter')}
              />
            </a>
          </div>
          <div class="col-md-4 col-lg-4 footer-col" />
        </div>
      </div>
    </div>
    <div class="container copyright">
      Copyright &copy; 2016 Dancing Goat. {$t('Footer.allRightsReserved')}
    </div>
  </footer>
</div>
