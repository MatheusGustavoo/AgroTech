import React from "react";
import style from "../../style/postFocus.module.css";
const PostFocus = ({ post, ativo }) => {
  return (
    <div
      className={style.postFocus}
      style={{
        display: ativo ? "flex" : "none",
      }}
    >
      <div className={style.post}>
        <img src={post.post.imagem} alt="" />
        <div>
          <h1>{post.post.titulo}</h1>
          <p>{post.post.descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default PostFocus;
