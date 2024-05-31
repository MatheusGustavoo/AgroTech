import React from "react";
import api from "../../utils/api.jsx";
import styles from "../../style/posts.module.css";
import { Contexto } from "../../Hooks/UserContext.jsx";
import { useState } from "react";
import Error from "../../utils/Error.jsx";

export function Posts() {
  const [posts, setPosts] = useState();
  const [image, setImage] = useState(null);
  const data = React.useContext(Contexto);
  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function carregarPosts() {
    const fetch = await api.get("/post").then(res => res.data);
    try {
      setPosts(fetch);
      return fetch;
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    carregarPosts();
  }, []);

  if (data.erro) return <Error error={`${data.erro}`} />;
  return (
    <main className={styles.main}>
      <div className={styles.newPost}>
        <div className={styles.userPost}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <div className={styles.userPostInfo}>
            <h2>
              {data.user.nome} <span>Agritcultor</span>
            </h2>
            <p>São Paulo</p>
          </div>
        </div>
        <div>
          <form>
            <input type="text" placeholder="Titulo" />
            <textarea
              name="publicar"
              id="publicar"
              placeholder="Digite um comentario para sua publicação"
              className={styles.descricao}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Selecione uma imagem"
              />
              {image && (
                <div>
                  <h2>Preview:</h2>
                  <img src={image} alt="Preview" style={{ maxWidth: "100%" }} />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      {posts &&
        posts.map(post => (
          <div className={styles.post} key={post._id}>
            <div className={styles.userPost}>
              <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
              <div className={styles.userPostInfo}>
                <h2>
                  {post.nome} <span>Agritcultor</span>
                </h2>
                <p>Publicado há{post.updatedAt}</p>
              </div>
            </div>
            <div className={styles.contentPost}>
              <img
                src="https://i.pinimg.com/originals/bd/a5/be/bda5be61177acdb5fd46c3219f8b81a0.jpg"
                alt=""
              />
              <p className={styles.descricao}>{post.descricao}</p>
            </div>
          </div>
        ))}
    </main>
  );
}
