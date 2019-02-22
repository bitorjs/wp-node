export function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

export function getUploadDirName() {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}
// http://www.ptbird.cn/koa-body-diy-upload-dir-and-filename.html