import React from "react";
import { useParams } from "react-router-dom";
import { PostsData, PostTypeScript } from "../data/PostsData";

export const Post = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>IDが指定されていません。</div>;

  const showPost = PostsData.find((post) => post.id === Number(id));

  if (!showPost) return <div>記事が見つかりませんでした。</div>;

  return (
    <div className="detail_container">
      <div className="detail_title">{showPost.title}</div>
      <img src={showPost.thumbnailUrl} alt={showPost.title} />
      <div className="detail_info">
        <span className="detail_date">
          {showPost.createdAt.replace(/-/g, "/").slice(0, 10)}
        </span>
        <div className="detail_cat_wrap">
          {showPost.categories.map((category) => (
            <div className="detail_cat" key={category}>
              {category}
            </div>
          ))}
        </div>
      </div>
      <p
        className="detail_content"
        dangerouslySetInnerHTML={{ __html: showPost.content }}
      />
    </div>
  );
};
