import { Router } from 'express';
import passport from 'passport';
import { signIn, signOut, signUp } from '../controllers/user';
import fileUpload from '../middlewares/imageUpload';

import { roleCheck } from '../middlewares/roleCheck';
import { signUpValidation } from '../middlewares/signUpValidation';

const userroroutes = Router();

userroroutes.post('/login', passport.authenticate('local', { session: true }), signIn);
userroroutes.post('/logout', signOut);
userroroutes.post('/register', fileUpload.single('picture'), signUpValidation, signUp);

export { userroroutes };
