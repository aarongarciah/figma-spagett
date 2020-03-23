import { UIActionTypes, UIAction } from '../types';

import './ui.css';

const imageUrls = ['https://i.imgur.com/j6ZG1FY.jpg', 'https://i.ibb.co/k8GX9vp/spagett.jpg'];

async function getImage(): Promise<Uint8Array> {
  let response;
  let i = 0;

  while ((!response || response.status !== 200) && i < imageUrls.length) {
    const imageUrl = imageUrls[i];

    try {
      response = await fetch(imageUrl);
    } catch {}

    i++;
  }

  if (!response || response.status !== 200) {
    throw new Error("Couldn't get the video cover image. Is the video URL correct?");
  }

  const buffer = await response.arrayBuffer();

  return new Uint8Array(buffer);
}

// Sends a message to the plugin worker
function postMessage({ type, payload }: UIAction): void {
  parent.postMessage({ pluginMessage: { type, payload } }, '*');
}

// Close the plugin if pressing Esc key when the input is not focused
function closeWithEscapeKey(): void {
  document.addEventListener('keydown', function (event: KeyboardEvent) {
    try {
      if (event.code.toString().toLowerCase() === 'escape') {
        postMessage({ type: UIActionTypes.CLOSE });
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// Attach event listeners
function buttonListeners(): void {
  document.addEventListener('click', async function (event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id === 'spagettBtn') {
      postMessage({ type: UIActionTypes.SPAGETT, payload: await getImage() });
    }
  });
}

// Initialize all the things
closeWithEscapeKey();
buttonListeners();
