import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOGPOSTS, GET_BLOGS } from "../queries/blogQueries";
import { DELETE_BLOG } from "../mutations/blogMutations";
import EditBlogForm from "../components/EditBlogForm";
import { FaTrash } from "react-icons/fa";

const BlogDetail = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_BLOGPOSTS, {
    variables: {
      id,
    },
  });

  const navigate = useNavigate();

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    variables: {
      id,
    },
    onCompleted: () => navigate("/"),

    refetchQueries: [{ query: GET_BLOGS }],
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-danger">An error occurred</p>;
  }
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5 blog-detail">
          <Link
            to="/"
            className="btn btn-light btn-sm w-25 mb-5 d-inline ms-auto"
          >
            Back
          </Link>

          <h1>{data.blogPost.name}</h1>
          <p>{data.blogPost.description}</p>

          <EditBlogForm blogPost={data.blogPost} />

          <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteBlog}>
              <FaTrash className="icon" />
              Delete Blog
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
