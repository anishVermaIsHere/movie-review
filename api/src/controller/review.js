
import { ReviewModel } from "../db/models/review.js";

export const reviewController={
    async get(req, res) {
        try {
          const id=req.params.id||{};
          const review = await ReviewModel.findById({_id:id});
          if (!review) {
            res.status(404).json({ error: "No Review" });
            return;
          }
          res.json(review);
        } catch (error) {
            console.log(`API Error occured:, ${error}`);
            res.status(500).json({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
          let movieId =parseInt(req.params.id)||{};
          let reviews = await ReviewModel.find({movieId:movieId});
          if (!reviews||reviews.length==0) {
            res.status(404).json({ error: "No Reviews" });
            return;
          }
          res.json(reviews);
        } catch (error) {
          console.log(`API Error occured:, ${error}`);
          res.status(500).json({ error: error });
        }
    },
    async add(req, res) {
        try {
          const {movieId,review,user}=req.body;
          const reviewResponse = await ReviewModel.create({
            movieId:parseInt(movieId),
            user,
            review
          });
          console.log('response',reviewResponse)
          res.json({ status: "success",message:"Review posted successfully" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },
    async remove(req, res) {
      try {
        const reviewId = req.params.id;
        const isDeleted = await ReviewModel.deleteOne({_id:reviewId});
        if(isDeleted.acknowledged){
          res.json({ status: "success",message:"Review deleted successfully" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    async update(req, res) {
        try {
          const {review,user,movieId}=req.body;
          const reviewId = req.params.id;    
          console.log('id',reviewId);
          await ReviewModel.findByIdAndUpdate(
            { _id: reviewId },
            { user, review, movieId},
            {new:true}
          )
          res.json({status:"success",message:"Review updated successfully"});
        } catch (error) {
            console.error(`Review updation failed: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }
    
}

