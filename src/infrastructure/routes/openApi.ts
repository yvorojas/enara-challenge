import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const router = Router();

const swaggerDocument = YAML.load('./src/infrastructure/openApi/spec.yaml');

router.use('/api-explorer', swaggerUi.serve);
router.get('/api-explorer', swaggerUi.setup(swaggerDocument));

export default router;
