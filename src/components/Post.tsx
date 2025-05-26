import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type PostType = {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  content: string;
  categories: string[];
};

export const Post: React.FC = () => {
  const { id } = useParams() as { id: string };

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const data = await res.json();
        setPosts(data.post);
      } catch (error) {
        console.error("取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (!id) return <div>IDが指定されていません。</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (!posts) return <div>記事が見つかりませんでした。</div>;

  return (
    <div className="detail_container">
      <div className="detail_title">{posts.title}</div>
      <img src={posts.thumbnailUrl} alt={posts.title} />
      <div className="detail_info">
        <span className="detail_date">
          {posts.createdAt.replace(/-/g, "/").slice(0, 10)}
        </span>
        <div className="detail_cat_wrap">
          {posts.categories.map((category) => (
            <div className="detail_cat" key={category}>
              {category}
            </div>
          ))}
        </div>
      </div>
      <p
        className="detail_content"
        dangerouslySetInnerHTML={{ __html: posts.content }}
      />
    </div>
  );
};
