import express,{Router,Express} from "express";
import { getAllCarriageClass, getAllCarriagePrice, getAllJourneyCarriage, seedJourneyCarriage, storeCarriagePrice, storeNewCarriageClass, storeNewjourneyCarriage } from "../controllers/carriage.controller";
import ValidateResource from "../middleware/ValidateResource";
import { storeCarriageClassSchema, storeCarriagePriceSchema, storeNewjourneyCarriageSchema } from "../Schemas/carriage.Schema";
import ChickIfAuth from '../middleware/ChickIfAuth';


const router:Express = express();

router.post('/carriage-class/store',ValidateResource(storeCarriageClassSchema),storeNewCarriageClass);
router.get('/all-carriage-class',getAllCarriageClass);


router.post('/carriage-price/store',ValidateResource(storeCarriagePriceSchema),storeCarriagePrice);
router.get('/all-carriage-price',getAllCarriagePrice);


router.post('/journey-carriage/store',ValidateResource(storeNewjourneyCarriageSchema),storeNewjourneyCarriage)
router.get('/all-journey-carriage',getAllJourneyCarriage);
router.get('/seed-journey-carriage',ChickIfAuth,seedJourneyCarriage)

export default router;