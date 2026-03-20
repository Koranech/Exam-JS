//Блок для заповнення поста
const container = document.getElementById('container');

//Виатяггування ID юзера з URL
const url = new URL(location.href)
const postID = url.searchParams.get('posts')

fetch('https://jsonplaceholder.typicode.com/posts/' + postID)
    .then(response => response.json())
    .then(postData => {
        // console.log(postData)
        const post = postData

        const postBlock = document.createElement('div')
        postBlock.classList.add('postBlock')

        const hTitle = document.createElement('h1')
        hTitle.innerText = post.title

        const pAbout = document.createElement('p')
        pAbout.innerText = `Автор поста: User ID: ${post.userId}, Post ID: ${post.id}`

        const hText = document.createElement('h3')
        hText.innerText = post.body
        postBlock.append(hTitle, pAbout, hText)

        const hCommentTitle = document.createElement('h3')
        hCommentTitle.innerText = 'Comments'

        const commentsBlock = document.createElement('div')
        commentsBlock.classList.add('commentsBlock')

        fetch('https://jsonplaceholder.typicode.com/posts/' + postID + '/comments')
            .then(response => response.json())
            .then(commentsData => {
                const comments = commentsData
                // console.log(comments)

                for (const comment of comments) {
                    const commentDiv = document.createElement('div')
                    commentDiv.classList.add('comment')


                    const hCommentTitle = document.createElement('h4')
                    hCommentTitle.innerText = comment.name

                    const pCommentText = document.createElement('p')
                    pCommentText.innerText = comment.body

                    commentDiv.append(hCommentTitle, pCommentText)
                    commentsBlock.append(commentDiv)
                }
            })

        container.append(postBlock, commentsBlock)
    })
