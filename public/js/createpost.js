const newPostHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/dashboard/new')
    }


document
    .querySelector('#create-blogpost')
    .addEventListener('submit', newPostHandler);