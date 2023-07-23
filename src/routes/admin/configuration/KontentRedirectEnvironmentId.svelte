<script lang="ts">
  import { setNewEnvironmentId } from '$lib/client';

  const getWindowCenterPosition = (
    windowWidth: number,
    windowHeight: number
  ) => {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;
    const screenWidth = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const screenHeight = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;
    const left = screenWidth / 2 - windowWidth / 2 + dualScreenLeft;
    const top = screenHeight / 2 - windowHeight / 2 + dualScreenTop;

    return { left, top } as const;
  };

  const openKontentRedirect = () => {
    const windowWidth = 800;
    const windowHeight = 800;
    const { left, top } = getWindowCenterPosition(windowWidth, windowHeight);

    window.open(
      'https://app.kontent.ai/sample-site-configuration',
      'Kontent-ai',
      `status=no,width=${windowWidth},height=${windowHeight},resizable=yes,left=${left},top=${top},toolbar=no,menubar=no,location=no,directories=no`
    );
  };

  const receiveMessage = (event: MessageEvent) => {
    if (event.origin.toLowerCase() !== 'https://app.kontent.ai') return;

    if (!event.data.projectGuid) {
      return;
    }

    setNewEnvironmentId(
      event.data.projectGuid,
      event.data.newlyGeneratedProject
    );
  };
</script>

<svelte:window on:message={receiveMessage} />

<button
  type="button"
  class="button button-primary margin-top-xl"
  on:click={openKontentRedirect}
>
  Get Environment ID from Kontent
</button>
