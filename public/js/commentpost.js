
const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#Comment').value.trim();
    const rump = document.querySelector('.smokem');
    let bump = rump.getAttribute('data-index');
    console.log(bump);

    if (comment) {
      const response = await fetch(`/post/:id/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        
        document.location.replace(`/post/${bump}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.cool-form')
  .addEventListener('submit', newCommentHandler);