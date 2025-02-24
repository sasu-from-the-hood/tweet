import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  let { id } = useParams();
  const [comment, setComment] = useState({ commentBody: "", PostId: id });
  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/comments", comment);
      console.log(res.data);
      setComments([...comments, res.data]);
      setComment({ commentBody: "", PostId: id });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await axios.get(`http://localhost:3000/comments/${id}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComment();
  }, [id]);
  useEffect(() => {
    async function fetchDataById() {
      try {
        const res = await axios.get(`http://localhost:3000/post/byId/${id}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataById();
  }, [id]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="shadow-lg cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 my-3 w-100 rounded-2xl">
          <div className="bg-blue-500 text-white text-center py-4 text-base">
            {data.title}
          </div>
          <div className="py-10 text-center">{data.postText}</div>
          <div className="bg-blue-500 text-white pl-5 py-4 text-base">
            {data.username}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Write your Comment on this post</h1>
          <textarea
            name="commentBody"
            placeholder="comment"
            className="border w-full"
            onChange={handleChange}
            value={comment.commentBody}
          ></textarea>
          <button
            type="submit"
            className="border p-2 bg-blue-600 text-white cursor-pointer"
          >
            Post comment
          </button>
        </form>
      </div>
      <div>
        {comments.map((comment) => (
          <div
            className="flex gap-10  items-center mb-4 border p-3 shadow-2xs"
            key={comment.id}
          >
            <span className="w-60">{comment.commentBody}</span>
            <span>{comment.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
