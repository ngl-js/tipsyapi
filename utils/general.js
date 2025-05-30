import fs from "fs";

export const assetsToArray = (path) => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => ({ name: item.name }));
};
