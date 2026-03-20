//Блок для заповнення юзерів
const container = document.getElementById('container');

//Беру юзерів та ітерую їх
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let users = data
        for (const user of users) {
            const div = document.createElement('div');
            div.classList.add('user');
            container.appendChild(div);

            const h2 = document.createElement('h2');
            div.appendChild(h2)
            h2.innerText = `${user.id} ${user.name}`

            const a = document.createElement('a');
            div.appendChild(a)
            a.innerText = 'More info'
            a.href = `user-details.html?user=${user.id}`;
        }
    })
