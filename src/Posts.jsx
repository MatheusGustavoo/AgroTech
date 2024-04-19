import styles from "./style/posts.module.css";
export function Posts() {
  return (
    <main className={styles.main}>
      <h1>Posts</h1>
      <div className={styles.post}>
        <div className={styles.userPost}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <div className={styles.userPostInfo}>
            <h2>
              Matheus <span>Estado: SP</span>
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
