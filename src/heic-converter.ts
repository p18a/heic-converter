const getImgs = () =>
  Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter((img) => img.src.endsWith(".heic"));

const fetchBlob = async (src: string): Promise<Blob> => (await fetch(src)).blob();

const convertBlob = async (blob: Blob): Promise<Blob> => {
  const { default: heic2any } = await import("heic2any");
  const newBlob = heic2any({ blob });

  return Array.isArray(newBlob) ? newBlob[0] : newBlob;
};

const updateSrc = (el: HTMLImageElement, blob: Blob) => {
  el.src = window.URL.createObjectURL(blob);
};

const convertHeicImages = async () =>
  (
    await Promise.all(
      getImgs().map(
        async (img): Promise<[HTMLImageElement, Blob]> => [img, await convertBlob(await fetchBlob(img.src))]
      )
    )
  ).forEach(([el, blob]) => updateSrc(el, blob));

addEventListener("DOMContentLoaded", convertHeicImages);

export {};
