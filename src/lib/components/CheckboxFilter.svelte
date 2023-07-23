<script lang="ts">
  type OptionsType = {
    id: string;
    checked: boolean;
    label: string;
  }

  export let options: OptionsType[];
</script>

{#each options as option (option.id)}
  <span class="checkbox js-postback">
    <input
      id={option.id}
      type="checkbox"
      checked={option.checked}
      on:change
    />
    <label for={option.id}>{option.label}</label>
  </span>
{/each}