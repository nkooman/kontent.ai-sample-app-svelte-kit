<script lang="ts">
  import { setNewEnvironmentId } from '$lib/client';

  export let environmentId = '';
</script>

<section class="col paper margin-top-xl">
  <h2 class="headline-medium">Set A Environment ID Manually</h2>
  <p class="margin-top-l">
    Alternatively, you can configure your app manually by submitting a
    Environment ID below.
  </p>
  <div class="project-id-form margin-top-xl">
    <input
      aria-label="Project ID"
      autoComplete="off"
      placeholder="Project ID"
      type="text"
      bind:value={environmentId}
      class="project-id-form__input text-box single-line"
    />
    <button
      type="button"
      class="button button-primary project-id-form__submit-button"
      on:click={() => setNewEnvironmentId(environmentId)}
    >
      Submit
    </button>
  </div>
</section>
