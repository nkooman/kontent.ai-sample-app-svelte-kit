<script lang="ts">
  import { DEFAULT_ENVIRONMENT_ID } from '$lib/const';
  import { setNewEnvironmentId } from '$lib/client';
</script>

<section class="col paper margin-top-xl">
  <h2 class="headline-medium">Use the Shared Project</h2>
  <p class="margin-top-l">
    Alternatively, you may wish to use the shared project (environment ID "{DEFAULT_ENVIRONMENT_ID}").
  </p>
  <p class="margin-top-l">
    <strong>Note:</strong> You cannot edit content in the shared project.
  </p>
  <button
    type="button"
    class="button button-primary margin-top-xl"
    on:click={() => setNewEnvironmentId(DEFAULT_ENVIRONMENT_ID)}
  >
    Use the shared project
  </button>
</section>
