import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    postText: "",
    username: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    if (!formData.title || !formData.postText || !formData.username) return;
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/post/", formData);
      navigate("/");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Link
        to="/"
        className=" text-blue-400 hover:text-blue-600 hover:underline"
      >
        Home
      </Link>
      <form action="" onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          className="border"
        />
        <input
          type="text"
          placeholder="Write your post idea"
          name="postText"
          onChange={handleChange}
          className="border"
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          className="border"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
