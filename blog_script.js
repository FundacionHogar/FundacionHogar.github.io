document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        //const likeBtn = post.querySelector('.like-btn');
        //const likeCount = post.querySelector('.like-count');
        const shareBtn = post.querySelector('.share-btn');
        const postId = post.getAttribute('data-id');

        // Manejar el clic en el botón "Me gusta"
        //likeBtn.addEventListener('click', () => {
        //    let count = parseInt(likeCount.textContent);
        //    count++;
        //    likeCount.textContent = count;
        //});

        // Manejar el clic en el botón "Compartir"
        shareBtn.addEventListener('click', () => {
            const postTitle = post.querySelector('h2').textContent;
            const postUrl = `${window.location.origin}?post=${postId}`;

            if (navigator.share) {
                navigator.share({
                    title: postTitle,
                    url: postUrl
                }).then(() => {
                    console.log('Compartido con éxito');
                }).catch((error) => {
                    console.error('Error al compartir', error);
                });
            } else {
                // Copiar el enlace al portapapeles si no está disponible la API de compartir
                navigator.clipboard.writeText(postUrl).then(() => {
                    alert('Enlace copiado al portapapeles');
                }).catch((error) => {
                    console.error('Error al copiar el enlace', error);
                });
            }
        });
    });
});