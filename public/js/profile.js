const newFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  console.log(name, description);
  if (name && description) {
    const response = await fetch(`/newPost`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  let binky = event.target;
  for(let i = 0; i < 1 ; i =0)
  {
    


    if (binky.hasAttribute('data-index-number'))
    {
      break;

    }
    binky = binky.parentElement;
    
  }
  let id = binky.getAttribute('data-index-number');
    if(confirm("Would you like to to update or delete this post?"))
    {
      if(confirm("Would you like to delete this post?"))
      {
        if(confirm("Are you sure?"))
        {

        
        const response = await fetch(`/post/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          document.location.replace('/dashboard');
          
        } else {
          alert('Failed to delete post');
        }


        }
      }
      else{
        let description = window.prompt('What would you like your updated post to say?');

        console.log(id);
        const response = await fetch(`/post/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            description,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
          
        } else {
          alert('Failed to update post');
        }


      }
        
    
  
      }
    

  
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
