// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const display = document.getElementById("comments-display");

  // Cargar comentarios guardados en localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(({ name, comment, likes = 0 }, index) => {
    addCommentToDisplay(name, comment, likes, index);
  });

  // Manejar el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name && comment) {
      const newComment = { name, comment, likes: 0 };
      savedComments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(savedComments));
      addCommentToDisplay(name, comment, 0, savedComments.length - 1);

      nameInput.value = "";
      commentInput.value = "";
    }
  });

  // Función para agregar un comentario al display
  function addCommentToDisplay(name, comment, likes, index) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `<span>${name}:</span> ${comment}`;

    // Botón para dar "like"
    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.classList.add("like");
    likeButton.addEventListener("click", () => {
      savedComments[index].likes = (savedComments[index].likes || 0) + 1;
      localStorage.setItem("comments", JSON.stringify(savedComments));
      updateCommentsDisplay();
    });

    // Contador de "likes"
    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = `Likes: ${likes}`;

    // Botón para eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      savedComments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(savedComments));
      updateCommentsDisplay();
    });

    commentDiv.appendChild(likeButton);
    commentDiv.appendChild(likesCount);
    commentDiv.appendChild(deleteButton);
    display.appendChild(commentDiv);
  }

  // Función para actualizar la visualización de comentarios
  function updateCommentsDisplay() {
    display.innerHTML = ""; // Limpiar la visualización
    savedComments.forEach(({ name, comment, likes = 0 }, index) => {
      addCommentToDisplay(name, comment, likes, index);
    });
  }
});



