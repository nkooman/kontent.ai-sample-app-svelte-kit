<script lang="ts">
  import InfoImage from '$lib/assets/admin/info.svg';

  export let message: string;
</script>

<div id="message-box" class="container message">
  <section class="messages">
    <table class="user-message message-info">
      <tbody>
        <tr>
          <td class="message-icon">
            <img src={InfoImage} height="44" width="44" alt="info icon" />
          </td>
          <td class="message-content">
            <p>{message}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</div>