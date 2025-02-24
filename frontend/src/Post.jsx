import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [data, setData] = useState([]);
  let { id } = useParams();

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
  return <div>{data.title}</div>;
}

export default Post;
