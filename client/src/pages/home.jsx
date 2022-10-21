import AddBlogModal from "../components/AddBlogModal";
import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddBlogModal />
      </div>
      <Blogs />
    </>
  );
};

export default Home;
