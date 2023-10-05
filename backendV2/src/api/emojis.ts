import express from 'express';

const router = express.Router();

type EmojiResponse = string[];

router.get<Record<string, never>, EmojiResponse>('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

export default router;
