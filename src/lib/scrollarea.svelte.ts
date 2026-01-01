// scrollarea.svelte.ts
import { useResizeObserver } from 'runed';

interface ScrollAreaState {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  isDragging: boolean;
}

export function scrollarea(node: HTMLElement) {
  const viewport = node.querySelector('[data-scrollarea-viewport]') as HTMLDivElement;
  const scrollbar = node.querySelector('[data-scrollarea-scrollbar]') as HTMLDivElement;
  const thumb = node.querySelector('[data-scrollarea-thumb]') as HTMLDivElement;
  const content = viewport?.firstElementChild as HTMLElement;

  if (!viewport || !scrollbar || !thumb || !content) {
    $inspect('scrollarea: missing required elements');
    return;
  }

  let state = $state<ScrollAreaState>({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    isDragging: false
  });

  let dragStart = { y: 0, scrollTop: 0 };

  function updateDimensions() {
    state.scrollHeight = viewport.scrollHeight;
    state.clientHeight = viewport.clientHeight;
    updateScrollbar();
  }

  function updateScrollbar() {
    const showScrollbar = state.scrollHeight > state.clientHeight;
    scrollbar.style.display = showScrollbar ? 'block' : 'none';

    if (!showScrollbar) return;

    const thumbHeight = Math.max((state.clientHeight / state.scrollHeight) * state.clientHeight, 20);
    const maxScroll = state.scrollHeight - state.clientHeight;
    const maxThumbPos = state.clientHeight - thumbHeight;
    const thumbTop = (state.scrollTop / maxScroll) * maxThumbPos;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
  }

  function handleScroll() {
    state.scrollTop = viewport.scrollTop;
    updateScrollbar();
  }

  function handleThumbMouseDown(e: MouseEvent) {
    e.preventDefault();
    state.isDragging = true;
    dragStart = { y: e.clientY, scrollTop: state.scrollTop };
    thumb.classList.add('dragging');
  }

  function handleMouseMove(e: MouseEvent) {
    if (!state.isDragging) return;

    const deltaY = e.clientY - dragStart.y;
    const maxScroll = state.scrollHeight - state.clientHeight;
    const thumbHeight = parseFloat(thumb.style.height);
    const maxThumbPos = state.clientHeight - thumbHeight;

    const scrollDelta = (deltaY / maxThumbPos) * maxScroll;
    viewport.scrollTop = Math.max(0, Math.min(maxScroll, dragStart.scrollTop + scrollDelta));
  }

  function handleMouseUp() {
    state.isDragging = false;
    thumb.classList.remove('dragging');
  }

  function handleTrackClick(e: MouseEvent) {
    if (e.target === thumb) return;

    const rect = scrollbar.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const maxScroll = state.scrollHeight - state.clientHeight;
    viewport.scrollTop = (clickY / state.clientHeight) * maxScroll;
  }

  // Setup
  useResizeObserver(() => content, updateDimensions);
  viewport.addEventListener('scroll', handleScroll);
  thumb.addEventListener('mousedown', handleThumbMouseDown);
  scrollbar.addEventListener('click', handleTrackClick);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  updateDimensions();

  return {
    destroy() {
      viewport.removeEventListener('scroll', handleScroll);
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      scrollbar.removeEventListener('click', handleTrackClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };
}