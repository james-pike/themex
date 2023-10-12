import { QRL, QwikMouseEvent } from '@builder.io/qwik';
import { FocusTrap, createFocusTrap } from 'focus-trap';

export function trapFocus(modal: HTMLDialogElement): FocusTrap {
  return createFocusTrap(modal, { escapeDeactivates: false });
}

export function activateFocusTrap(focusTrap: FocusTrap | null) {
  try {
    focusTrap?.activate();
  } catch {
    // Activating the focus trap throws if no tabbable elements are inside the container.
    // If this is the case we are fine with not activating the focus trap.
    // That's why we ignore the thrown error.
  }
}

export function deactivateFocusTrap(focusTrap: FocusTrap | null) {
  focusTrap?.deactivate();
  focusTrap = null;
}

export async function showModal(modal: HTMLDialogElement, onShow$?: QRL<() => void>) {
  modal.showModal();
  await onShow$?.();
}

export async function closeModal(modal: HTMLDialogElement, onClose$?: QRL<() => void>) {
  modal.close();
  await onClose$?.();
}

export function wasModalBackdropClicked(
  modal: HTMLDialogElement | undefined,
  clickEvent: QwikMouseEvent,
): boolean {
  if (!modal) {
    return false;
  }

  const rect = modal.getBoundingClientRect();

  const wasBackdropClicked =
    rect.left > clickEvent.clientX ||
    rect.right < clickEvent.clientX ||
    rect.top > clickEvent.clientY ||
    rect.bottom < clickEvent.clientY;

  return wasBackdropClicked;
}

export function lockScroll() {
  window.document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  window.document.body.style.overflow = '';
}

export type WidthElement = {
  width: number | null;
};

export function preventScrollbarFlickering(scrollbar: WidthElement) {
  if (scrollbar.width === null) {
    scrollbar.width = window.innerWidth - document.documentElement.clientWidth;
  }

  document.body.style.paddingRight = `${scrollbar.width}px`;
}
function isTappable(modal: HTMLDialogElement) {
  throw new Error('Function not implemented.');
}
