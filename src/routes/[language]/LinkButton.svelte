<script lang="ts">
  export let link: string;
  export let text: string;
</script>

<div class="row">
  <div class="clear center-text">
    <a href={link.toLowerCase()} class="btn btn-more">{text}</a>
  </div>
</div>