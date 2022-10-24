import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../queries/blogQueries";
import BlogCard from "./BlogCard";

const Blogs = () => {
  // const [imageIds, setImageIds] = useState("");

  // const loadImages = async () => {
  //   try {
  //     fetch("http://localhost:5000/api/images")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setImageIds(data);
  //         // console.log(data)
  //       });

  //     // console.log("second data: ",data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadImages();
  // }, []);

  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-danger">An error occurred</p>;
  }

  return (
    <>
      <div className="row mt-4">
          {
            !loading ? data.blogs.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />
            }) : <p>No Blog Posts</p>
          }
      </div>
    </>
  );
};

export default Blogs;
