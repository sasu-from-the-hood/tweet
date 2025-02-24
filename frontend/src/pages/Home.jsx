import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handlePostDetail(id) {
    navigate(`/post/${id}`);
  }
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/post/");
        console.log(res.data);
        setListOfPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <p>Loading....</p>;
  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <Link
          className="text-blue-400  hover:text-blue-600 hover:underline"
          to="/createpost"
        >
          Create A post
        </Link>
      </div>
      {listOfPosts.map((data) => (
        <div
          key={data.id}
          onClick={() => handlePostDetail(data.id)}
          className="shadow-lg cursor-pointer hover:shadow-2xl transition-all ease-in-out duration-300 my-3 w-100 rounded-2xl"
        >
          <div className="bg-blue-500 text-white text-center py-4 text-base">
            {data.title}
          </div>
          <div className="py-10 text-center">{data.postText}</div>
          <div className="bg-blue-500 text-white pl-5 py-4 text-base">
            {data.username}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
