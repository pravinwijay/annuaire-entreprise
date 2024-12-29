<template>
  <div class="accueil-container">
    <div class="main-content">
      <div class="left-side">
        <h1>Bienvenue sur notre site !</h1>
        <p>
          Découvrez nos services et explorez les différentes solutions que
          nous vous proposons. Nous avons tout ce qu'il vous faut pour
          améliorer votre entreprise et optimiser vos processus.
        </p>
      </div>
      <div class="right-side">
        <img
          src="https://ceoworld.biz/wp-content/uploads/2019/06/Apple.jpg"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accueil-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e7dfd8;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
  font-size: 1.5rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.navbar button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: #e7dfd8;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}
.navbar button:hover {
  color: #ffffff;
}
.navbar .center {
  margin-left: auto;
  margin-right: auto;
}
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
  padding: 20px;
  width: 100%;
  height: calc(100vh - 80px); 
  box-sizing: border-box;
}
.left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 20px;
}
.left-side h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}
.left-side p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}
.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.right-side img {
  max-width: 100%;
  max-height: 80%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
