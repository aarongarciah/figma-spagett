import { UIActionTypes, UIAction } from '../types';

function nodeHasSpagettFill(node: SceneNode, imageHash: Image['hash']): boolean {
  if (!('fills' in node) || !Array.isArray(node.fills)) {
    return false;
  }

  return node.fills.some(x => x.imageHash === imageHash);
}

function sortFills(fills: ReadonlyArray<Paint>, imageHash: Image['hash']): ReadonlyArray<Paint> {
  const fillsCopy = fills.slice();

  return fillsCopy.sort(x => ('imageHash' in x && x.imageHash === imageHash ? 1 : 0));
}

function spagett(imageBytes: Uint8Array): void {
  try {
    const image = figma.createImage(imageBytes);
    const imageHash = image.hash;
    const spagettFill: ImagePaint = {
      type: 'IMAGE',
      imageHash: imageHash,
      scaleMode: 'FILL',
    };
    const nodesSelected = figma.currentPage.selection;

    // If nodes ares selected add a Spagett fill to every selected node
    if (Array.isArray(nodesSelected) && nodesSelected.length > 0) {
      nodesSelected.forEach(node => {
        if (!Array.isArray(node.fills)) {
          return;
        }

        if (nodeHasSpagettFill(node, imageHash)) {
          node.fills = sortFills(node.fills, imageHash);
        } else {
          node.fills = [...node.fills, spagettFill];
        }
      });
    }
    // If no nodes are selected, add a Spagett image fill to every node that has an image fill
    else {
      figma.currentPage.findAll(node => {
        if ('fills' in node && Array.isArray(node.fills) && node.fills.length) {
          if (nodeHasSpagettFill(node, imageHash)) {
            node.fills = sortFills(node.fills, imageHash);
          } else {
            node.fills = [...node.fills, spagettFill];
          }
        }

        return false;
      });
    }

    figma.closePlugin("🤗 You've been spooked by Spagett!");
  } catch {
    figma.closePlugin("Something went wront while Spagettin' 😕");
  }
}

// Listen to messages received from the plugin UI
figma.ui.onmessage = function({ type, payload }: UIAction): void {
  switch (type) {
    case UIActionTypes.NOTIFY:
      payload && figma.notify(payload);
      break;
    case UIActionTypes.CLOSE:
      figma.closePlugin();
      break;
    case UIActionTypes.SPAGETT:
      spagett(payload);
      break;
  }
};

// Show plugin modal
figma.showUI(__html__, { width: 300, height: 430 });
