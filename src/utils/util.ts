/**
 * @desc assets静态资源动态导入
 */
export function getAssetsPath(fileName: string | number) {
  return new URL(`../assets/${fileName}`, import.meta.url).href;
}
