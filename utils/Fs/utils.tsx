export const readFileName = (uri: string): string =>
  decodeURI(uri)?.split("%2F").pop() || "";

export const checkIfFolder = (uri: string): boolean =>
  !readFileName(uri).includes(".");
