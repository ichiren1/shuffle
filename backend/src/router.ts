import express from 'express';
import { shuffleHandler, chooseOneHandler, rpsHandler } from './handlers/shuffle';

export const router = express.Router();

router.get('/shuffle/shuffle', shuffleHandler);
router.get('/shuffle/chooseOne', chooseOneHandler);
router.get('/shuffle/rps', rpsHandler);
