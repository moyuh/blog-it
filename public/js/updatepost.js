const updatePostHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="post-name"]').value.trim();
    const post_details = document.querySelector('textarea[name="post-details"]').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
    
    const resp = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            post_details
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
        if (resp.ok) {
            document.location.replace('/dashboard');
        }else {
            alert(resp.statusText);
        }
    }


document
    .querySelector('.update-blogpost')
    .addEventListener('submit', updatePostHandler);