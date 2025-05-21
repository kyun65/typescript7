// import { useState } from "react"

import { Link } from "react-router-dom";


import { PostsData,PostTypeScript } from "../data/PostsData";
import { JSX } from "react";

export const Posts = (): JSX.Element => {


return (

    <div>
      {PostsData.map((post: PostTypeScript)=> {
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