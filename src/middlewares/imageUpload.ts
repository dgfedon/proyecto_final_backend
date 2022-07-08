import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

export function isFileImg(fileName: string) {
  const VALID_EXT = ['.jpg', '.jpeg', '.png'];
  const extension = path.extname(fileName);

  if (VALID_EXT.includes(extension)) {
    return true;
  }

  return false;
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    let folder = path.join(__dirname, '../../public/images');

    callback(null, folder);
  },
  filename(req, file, callback) {
    let imageName = Date.now() + path.extname(file.originalname);

    callback(null, imageName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (!file) {
    callback(null, false);
    return;
  }

  if (!isFileImg(file.originalname)) {
    req.file = file;

    callback(null, false);
  }

  callback(null, true);
};

const fileUpload = multer({ fileFilter, storage });
export default fileUpload;
