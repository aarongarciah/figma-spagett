import { UIActionTypes, UIAction } from '../types';

import './ui.css';

async function getImage(): Promise<Uint8Array> {
  const response = await fetch('https://66.media.tumblr.com/tumblr_kud0t1WoXd1qzhy30o1_500.jpg');

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
  document.addEventListener('keydown', function(event: KeyboardEvent) {
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
  document.addEventListener('click', async function(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id === 'spagettBtn') {
      postMessage({ type: UIActionTypes.SPAGETT, payload: await getImage() });
    }
  });
}

// Initialize all the things
closeWithEscapeKey();
buttonListeners();
