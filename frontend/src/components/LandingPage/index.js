import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../store/reviews";

import "./LandingPage.scss";
import ReviewCard from "../ReviewCard";
import CategoryCard from "../CategoryCard";
import LoadingIcon from "../FormElements/LoadingIcon";

const LandingPage = () => {
  const dispatch = useDispatch();

  let reviews = useSelector((state) => state.reviews.allReviews);
  reviews = Object.values(reviews);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const randReviews = {};
  if (reviews.length) {
    while (Object.values(randReviews).length < 10) {
      const review = reviews[Math.floor(Math.random() * reviews.length)];
      if (Object.values(review.images).length === 0) continue;
      randReviews[review.id] = review;
    }
  }

  // Images for category buttons
  const ctgImages =
    Object.values(randReviews).length === 0
      ? null
      : Object.values(randReviews)
          .slice(6, 10)
          .map((review) => Object.values(review.images)[0].url_regular);

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="landing-page">
      {/* Categories */}
      <h1 className="title">Categories</h1>
      <div className="categories">
        {["automotive", "home services", "restaurant", "shopping"].map(
          (service, idx) => (
            <CategoryCard key={idx} category={service} url={ctgImages[idx]} />
          )
        )}
      </div>

      {/* Recent Activity */}
      <h1 className="title">Recent Activity</h1>
      <div className="reviews">
        {Object.values(randReviews)
          .slice(0, 6)
          .map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
      </div>
    </div>
  );
};

export default LandingPage;
