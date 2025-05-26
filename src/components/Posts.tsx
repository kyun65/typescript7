import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react";


type PostTypeScript = {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
};

export const Posts = (): JSX.Element => {

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostTypeScript[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts", {method: "GET"}) //外部のjsonの読み込み
      const data = await res.json()
      setPosts(data.posts)
      console.log('情報',data)
    } finally {
      setIsLoading(false);
    }
  }
    fetcher()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!posts || posts.length === 0) {
    return <div>記事が見つかりませんでした</div>;
  }

return (
  <div>
    {posts.map((post: PostTypeScript)=> {
      return(
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <img src={post.thumbnailUrl} alt={post.title} />
        <p>{post.createdAt}</p>
        </Link>
      </div>
      )
    })}
  </div>
);
}