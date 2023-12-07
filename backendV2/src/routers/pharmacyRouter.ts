import { updatePharmacy } from '@controllers/pharmacyController';
import { Router } from 'express';

const router = Router();

router.post('/', updatePharmacy);

export default router;
