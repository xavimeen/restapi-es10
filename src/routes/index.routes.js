import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('hola de nuevo');
});

export default router;