import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../mutations/blogMutations";
import { GET_BLOGS } from "../queries/blogQueries";

const AddBlogModal = ({ imageIds }) => {
  const [blog, setBlog] = useState("");
  // const [previewSource, setPreviewSource] = useState("");

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const [addBlog] = useMutation(ADD_BLOG, {
    variables: {
      name: blog.name,
      description: blog.description,
      body: blog.body,
      // image: previewSource
    },

    //     //Refetch queries
    update(cache, { data: { addBlog } }) {
      const { blogs } = cache.readQuery({
        query: GET_BLOGS,
      });
      cache.writeQuery({
        query: GET_BLOGS,
        data: {
          blogs: [...blogs, addBlog],
        },
      });
    },
  });

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (blog.name && blog.description) {
      // uploadImage(previewSource);
      addBlog();
      setBlog("");
    } else {
      alert("All fields are required");
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setPreviewSource(reader.result);
    // };
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    previewImage(file);
    // setImage(file);
  };

  return (
    <>
      <>
        <button
          type="button"
          className="btn btn-primary mt-5"
          data-bs-toggle="modal"
          data-bs-target="#AddBlogModal"
        >
          <div className="d-flex align-items-center">
            <FaBookOpen className="icon" />
            <div>Add Post</div>
          </div>
        </button>

        <div
          className="modal fade"
          id="AddBlogModal"
          aria-labelledby="AddBlogModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AddBlogModalLabel">
                  New Blog Post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  {/* <div className="mb-3">
                    <label>Blog Cover</label><br />
                    <input type="file" name="image" onChange={handleFileInput} />
                  </div> */}

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      value={blog.name || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      className="form-control"
                      id="description"
                      value={blog.description || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Body</label>
                    <textarea
                      type="text"
                      name="body"
                      className="form-control"
                      id="body"
                      cols="30"
                      rows="10"
                      value={blog.body || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Publish
                  </button>
                </form>
                {/* {
                  previewSource && (
                  <img src={previewSource} width="200" />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default AddBlogModal;
