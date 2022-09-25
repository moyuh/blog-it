const newPostFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="post-name"]').value.trim();

    const post_details = document.querySelector('textarea[name="post-details"]').value.trim();
    
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            name,
            post_details
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
        if (response.ok) {
            document.location.replace('/dashboard');
        }else {
            alert(response.statusText);
        }
    }


document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newPostFormHandler);