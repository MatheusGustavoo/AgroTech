import styles from "../../style/posts.module.css";
import { useState } from "react";
export function Posts() {
  const [image, setImage] = useState(null);

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
  return (
    <main className={styles.main}>
      <h1>Posts</h1>
      <div className={styles.newPost}>
        <div className={styles.userPost}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <div className={styles.userPostInfo}>
            <h2>
              Matheus <span>Agritcultor</span>
            </h2>
            <p>São Paulo</p>
          </div>
        </div>
        <div className={styles.contentPost}>
          <form>
            <textarea
              name="publicar"
              id="publicar"
              placeholder="Digite um comentario para sua publicação"
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
      <div className={styles.post}>
        <div className={styles.userPost}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <div className={styles.userPostInfo}>
            <h2>
              Matheus <span>Agritcultor</span>
            </h2>
            <p>Publicado há</p>
          </div>
        </div>
        <div className={styles.contentPost}>
          <img
            src="https://i.pinimg.com/originals/bd/a5/be/bda5be61177acdb5fd46c3219f8b81a0.jpg"
            alt=""
          />
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur quasi, labore quos animi adipisci maxime optio cum ad
            repellendus fugiat id minus sunt ut nesciunt reprehenderit
            doloremque! Perspiciatis, odit rem.
          </p>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.userPost}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <div className={styles.userPostInfo}>
            <h2>
              Matheus <span>Agritcultor</span>
            </h2>
            <p>Publicado há</p>
          </div>
        </div>
        <div className={styles.contentPost}>
          <img
            src="https://i.pinimg.com/originals/bd/a5/be/bda5be61177acdb5fd46c3219f8b81a0.jpg"
            alt=""
          />
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur quasi, labore quos animi adipisci maxime optio cum ad
            repellendus fugiat id minus sunt ut nesciunt reprehenderit
            doloremque! Perspiciatis, odit rem.
          </p>
        </div>
      </div>
    </main>
  );
}
