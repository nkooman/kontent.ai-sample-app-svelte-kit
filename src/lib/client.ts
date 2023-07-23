import packageInfo from 'package.json';
import Cookies from 'universal-cookie';
import validator from 'validator';
import {
  DeliveryClient,
  camelCasePropertyNameResolver
} from '@kontent-ai/delivery-sdk';
import { goto } from '$app/navigation';
import {
  DEFAULT_ENVIRONMENT_ID,
  SELECTED_ENVIRONMENT_COOKIE_NAME
} from '$lib/const';
import { getSampleProjectItems } from '$lib/utils/selected-project';
import { PUBLIC_PREVIEW_API_KEY, PUBLIC_ENVIRONMENT_ID } from '$env/static/public';

type GlobalHeadersType = {
  header: string;
  value: string;
};

const sourceTrackingHeaderName = 'X-KC-SOURCE' as const;
const previewApiKey = PUBLIC_PREVIEW_API_KEY.trim();

const isPreview = (): boolean => previewApiKey !== '';

export const createDeliveryClient = (
  environmentId: string
): DeliveryClient =>
  new DeliveryClient({
    environmentId: PUBLIC_ENVIRONMENT_ID.trim() || environmentId,
    previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: isPreview()
    },
    globalHeaders: (): GlobalHeadersType[] => [
      {
        header: sourceTrackingHeaderName,
        value: `${packageInfo.name};${packageInfo.version}`
      }
    ],
    propertyNameResolver: camelCasePropertyNameResolver
  });

const redirectToHome = (newEnvironmentId: string): void => {
  const infoMessage =
    newEnvironmentId === DEFAULT_ENVIRONMENT_ID
      ? `You've configured your app to with a environment ID of a shared Kontent.ai project.`
      : `You've configured your app with a environment ID "${newEnvironmentId}". You can edit its contents at https://kontent.ai/.`;

  goto(`/?infoMessage=${infoMessage}`);
};

export const setNewEnvironmentId = (
  newEnvironmentId: string,
  newlyGeneratedProject?: boolean
): void => {
  const cookies = new Cookies(document.cookie);

  if (!validator.isUUID(newEnvironmentId)) {
    const message = `Selected environment ID (${newEnvironmentId}) is not a valid GUID`;
    console.error(message);
    alert(message);

    return;
  }

  cookies.set(SELECTED_ENVIRONMENT_COOKIE_NAME, newEnvironmentId, {
    path: '/',
    sameSite: 'none',
    secure: true
  });

  if (newlyGeneratedProject) {
    waitUntilProjectAccessible(newEnvironmentId);
    // spinnerService.show('apiSpinner');
    return;
  }

  redirectToHome(newEnvironmentId);
};

const waitUntilProjectAccessible = async (
  newEnvironmentId: string
): Promise<void> => {
  const sampleProjectClientResult = await getSampleProjectItems();

  const intervalId = setInterval(() => {
    createDeliveryClient(newEnvironmentId)
      .items()
      .elementsParameter(['id'])
      .depthParameter(0)
      .toPromise()
      .then(response => {
        if (
          response.data.items.length >=
          sampleProjectClientResult.data.items.length
        ) {
          clearInterval(intervalId);
          redirectToHome(newEnvironmentId);
        }
      });
  }, 2000);
};
