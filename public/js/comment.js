const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_details = document.querySelector('textarea[name="comment-details"]').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    
    if (comment_details) {
        const resp = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_details
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            document.location.reload();
        }else {
            alert(resp.statusText);
        }
    }
}

document
.querySelector('.comment-deets')
.addEventListener('submit', commentFormHandler);