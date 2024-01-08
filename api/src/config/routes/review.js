import { Router } from "express";
import { reviewController } from "../../controller/review.js";

const reviewRouter=Router();

reviewRouter.get('/:id',reviewController.get);
reviewRouter.post('/',reviewController.add);
reviewRouter.put('/:id',reviewController.update);
reviewRouter.delete('/:id',reviewController.remove);
reviewRouter.get('/movie/:id',reviewController.getAll);


export default reviewRouter;