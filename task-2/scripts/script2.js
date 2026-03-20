//Блок для заповнення юзера
const container = document.getElementById('container');

//Виатяггування ID юзера з URL
const url = new URL(location.href)
const userID = url.searchParams.get('user')

//Витягування інфи про юзера та створення DOM структури
fetch('https://jsonplaceholder.typicode.com/users/' + userID)
    .then(response => response.json())
    .then(userData => {
        console.log(userData)
        const user = userData

        const h4 = document.createElement('h4');
        h4.innerText = `Ім'я - ${user.name}, номер в спику - ${user.id}`;

        const h5 = document.createElement('h5');
        h5.innerText = 'Контактні данні:';

        const p1 = document.createElement('p');
        p1.innerText = `Пошта - ${user.email}`

        const p2 = document.createElement('p');
        p2.innerText = `Номер телефона - ${user.phone}`

        const p3 = document.createElement('p');
        p3.innerText = `Username - ${user.username}`

        const a = document.createElement('a');
        a.innerText = `Сайт`
        a.href = `http://${user.website}`

        const p4 = document.createElement('p');
        p4.innerText = 'Адреса'
        const ul = document.createElement('ul');

        //Ітерую адресу юзера
        const address = user.address
        for (const key in address) {
            const li = document.createElement('li');
            if (typeof address[key] === 'object') {
                li.innerText = `${key}`;
                const innerUl = document.createElement('ul');

                const geo = address[key];
                for (const key in geo) {

                    const innerLi = document.createElement('li');
                    innerLi.innerText = `${key} - ${geo[key]}`;
                    innerUl.appendChild(innerLi);
                }
                li.appendChild(innerUl);

            } else {
                li.innerText = `${key} - ${address[key]}`
            }
            ul.appendChild(li);
        }


        const p5 = document.createElement('p');
        p5.innerText = 'Компанія'
        const companyUl = document.createElement('ul');

        //Ітерую компанію юзера
        const company = user.company;
        for (const key in company) {
            const li = document.createElement('li');
            li.innerText = `${key} - ${company[key]}`

            companyUl.appendChild(li);
        }

        //Добавив кнопку для постів
        const buttonPosts = document.createElement('button');
        buttonPosts.classList.add('buttonPost');
        buttonPosts.innerText = 'Post of current user'

        //Створив div для відображення постів
        const postsDiv = document.createElement('div')
        postsDiv.classList.add('posts');

        //Функціонал кнопки
        buttonPosts.onclick = function () {
            fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`)
                .then(response => response.json())
                .then(userPosts => {
                    //Вимкнув кнопку щоб уникнути дублювання інформації
                    buttonPosts.disabled = true

                    console.log(userPosts);

                    for (const userPost of userPosts) {
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('post');
                        const h2 = document.createElement('h2');
                        h2.innerText = `${userPost.title}`;

                        const postLink = document.createElement('a');
                        postLink.innerText = 'Go to post';
                        postLink.href = `post-details.html?posts=${userPost.id}`;

                        postDiv.append(h2, postLink);
                        postsDiv.appendChild(postDiv);
                    }
                })
        }


        container.append(h4, h5, p1, p2, p3, a, p4, ul, p5, companyUl, buttonPosts, postsDiv);
    })
