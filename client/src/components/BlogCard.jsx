// import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <Link to={`/blog/${blog.id}`}>
            <img
              src="https://www.eisneramper.com/globalassets/services/center-for-transformation/cryptocurrency-og.jpg"
              style={{ maxWidth: "100%" }}
              className="img-fluid"
              alt=""
            />
            <div className="d-flex justify-content-between align-items-center p-3">
              <h5 className="card-title">{blog.name}</h5>
            </div>
            <p className="ps-3 pe-3 card-description">{blog.description}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
