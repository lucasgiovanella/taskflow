const supportedMimes = ["image/png", "image/jpg", "image/jpeg"];

export const imageValidator = (size, mime) => {
  if (bytesToMb(size) > 2) {
    return 'O tamanho da imagem não deve ultrapassar 2 MB.';
  } else if (!supportedMimes.includes(mime)) {
    return 'Tipo de imagem não suportado.';
  }
  return null;
};

export const bytesToMb = (bytes) => {
  return bytes / (1024 * 1024);
};
