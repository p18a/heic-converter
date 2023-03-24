const getImgs = () =>
  Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter((img) => img.src.endsWith(".heic"));

const fetchBlob = async (src: string): Promise<Blob> => (await fetch(src)).blob();

const convertBlob = async (blob: Blob): Promise<Blob> => {
  const { default: heic2any } = await import("heic2any");
  const newBlob = await heic2any({ blob });

  return Array.isArray(newBlob) ? newBlob[0] : newBlob;
};

const updateSrc = (img: HTMLImageElement, blob: Blob) => {
  img.src = window.URL.createObjectURL(blob);
};

const convertHeicImages = async () =>
  getImgs()
    .map(async (img): Promise<[HTMLImageElement, Blob]> => [img, await convertBlob(await fetchBlob(img.src))])
    .forEach(async (imgAndBlob) => updateSrc(...(await imgAndBlob)));

addEventListener("DOMContentLoaded", convertHeicImages);

export {};
