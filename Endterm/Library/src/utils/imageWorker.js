// This file is intended to be used as a Web Worker for image compression
self.onmessage = async (e) => {
  const { file } = e.data;
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = new OffscreenCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, 200, 200);
    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.7 });
    const reader = new FileReader();
    reader.onloadend = function() {
      self.postMessage({ base64: reader.result });
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
