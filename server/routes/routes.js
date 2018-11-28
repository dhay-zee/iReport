// Routes

import express from 'express';
import Incidents from '../controller/controller';

const router = express.Router();

router.get('/', Incidents.allIncidents);
router.get('/:id', Incidents.oneIncident);
router.post('/', Incidents.createIncident);
router.patch('/:id/location', Incidents.modifyIncidentLocation);
router.patch('/:id/comment', Incidents.modifyIncidentComment);
router.delete('/:id', Incidents.deleteIncident);

export default router;
