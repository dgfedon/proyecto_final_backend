import { check } from 'express-validator';
import { isFileImg } from './imageUpload';

export const signUpValidation = [
  check('name').notEmpty().withMessage('Por favor completa tu nombre'),
  check('email')
    .notEmpty()
    .withMessage('Por favor completa tu email')
    .bail()
    .isEmail()
    .withMessage('Por favor ingresa un email valido'),
  check('password').notEmpty().withMessage('Por favor ingresa una contraseña'),
  check('tel')
    .notEmpty()
    .withMessage('Por favor ingresa un telefono celular')
    .bail()
    .isMobilePhone('any', {})
    .withMessage('Por favor ingresa un telefono valido'),
  check('address').notEmpty().withMessage('Por favor ingresa tu dirección'),
  check('age')
    .notEmpty()
    .withMessage('Por favor ingresa tu edad')
    .bail()
    .isNumeric()
    .withMessage('Por favor ingresa un numero'),
  check('picture').custom((value, { req }) => {
    const { file } = req;

    if (!file) {
      throw new error('Por favor ingresa una imagen');
    }

    if (!isFileImg(file.originalname)) {
      throw new error('Por favor ingresa un archivo valido');
    }

    return true;
  }),
];
