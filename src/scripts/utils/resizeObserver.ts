export const resizeObserver = (elm: Element, cb: () => void) => {
  const ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect;
      console.log("Element:", entry.target);
      console.log(`Element size: ${cr.width}px x ${cr.height}px`);
      console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
      cb();
    }
  });

  // Observe one or multiple elements
  ro.observe(elm);
};
