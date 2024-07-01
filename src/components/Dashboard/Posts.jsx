import React from "react";
import api from "../../utils/api.jsx";
// import apiImg from "../../utils/apiImg.jsx";
import styles from "../../style/posts.module.css";
import { Contexto } from "../../Hooks/UserContext.jsx";
import { useState } from "react";
import useForms from "../../Hooks/useForm";
import { Avatar } from "@mui/material";

import Error from "../../utils/Error.jsx";

export function Posts() {
  const titulo = useForms();
  const descricao = useForms();
  const [posts, setPosts] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const data = React.useContext(Contexto);

  const previewImagem = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(e.target.files[0]);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function carregarPostsGet() {
    try {
      const fetch = await api.get("/post").then(res => res.data);
      setPosts(fetch);
    } catch (error) {
      console.log(error);
    }
  }

  async function mandarPost(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", "file");
    formData.append("titulo", titulo.valor);
    formData.append("descricao", descricao.valor);

    try {
      const data = await api
        .post("/post/novoPost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => res.data);
      carregarPostsGet();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    carregarPostsGet();
  }, []);

  if (data.erro) return <Error error={`${data.erro}`} />;

  return (
    <main className={styles.main}>
      <div className={styles.newPost}>
        <div className={styles.userPost}>
          <Avatar
            className={styles.avatar}
            // src="https://avatars.githubusercontent.com/u/56611686?v=4"
            sx={{ fontSize: 16, width: 32, height: 32 }}
          >
            {data.user?.nome[0]}
          </Avatar>
          <div className={styles.userPostInfo}>
            <h2>
              {data.user.nome} <span>Agritcultor</span>
            </h2>
            <p>São Paulo</p>
          </div>
        </div>
        <div>
          <form onSubmit={mandarPost} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Titulo"
              className={styles.titulo}
              onChange={titulo.carregar}
              onBlur={titulo.validar}
            />
            {titulo.error && <p className={styles.error}>{titulo.error}</p>}
            <textarea
              name="publicar"
              id="publicar"
              placeholder="Digite um comentario para sua publicação"
              className={styles.descricao}
              onChange={descricao.carregar}
              onBlur={descricao.validar}
            />
            {titulo.error && <p className={styles.error}>{descricao.error}</p>}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={previewImagem}
                placeholder="Selecione uma imagem"
              />
              {imagePreview && (
                <div>
                  <h2>Preview:</h2>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "50vw",
                      maxHeight: "50vh",
                      margin: "0 auto",
                    }}
                  />
                </div>
              )}
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
      {posts &&
        posts.map(post => (
          <div className={styles.post} key={post._id}>
            <div className={styles.userPost}>
              <Avatar
                className={styles.avatar}
                // src="https://avatars.githubusercontent.com/u/56611686?v=4"
                sx={{ fontSize: 32, width: 32, height: 32 }}
              >
                {post?.nome[0]}
              </Avatar>
              <div className={styles.userPostInfo}>
                <h2>
                  {post.nome} <span>Agritcultor</span>
                </h2>
                <p>Publicado em {post.updatedAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className={styles.contentPost}>
              <h1>{post.titulo}</h1>
              <img src={`${post.imagem}`} alt="" />
              <p className={styles.descricao}>{post.descricao}</p>
            </div>
          </div>
        ))}
    </main>
  );
}
