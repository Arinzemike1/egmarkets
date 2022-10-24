import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_BLOGPOSTS } from "../queries/blogQueries";
import { UPDATE_BLOG } from "../mutations/blogMutations";
import { useNavigate } from "react-router-dom";

const EditBlogForm = ({ blogPost }) => {
  const [name, setName] = useState(blogPost.name);
  const [description, setDescription] = useState(blogPost.description);
  const [body, setBody] = useState(blogPost.body);

  const navigate = useNavigate();

  const [updateBlog] = useMutation(UPDATE_BLOG, {
    variables: {
      id: blogPost.id,
      name: name,
      description: description,
      body: body,
    },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_BLOGPOSTS }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name || description || body) {
      updateBlog();
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="mt-5">
      <h3>Update Blog details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            type="text"
            name="body"
            cols="30"
            rows="10"
            className="form-control"
            id="body"
            value={body || ""}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-primary"
        >
          Publish Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlogForm;
