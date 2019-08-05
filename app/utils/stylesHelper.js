export const getWindowHeight = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

export const disableBodyScroll = () => {
  document.body.style.overflowY = 'scroll';
  document.body.style.position = 'fixed';
};

export const enableBodyScroll = () => {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
};
