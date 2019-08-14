export const getWindowWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

export const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

export const enableBodyScroll = () => {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
};
