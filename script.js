
// 1.  Створив змінні для інпутів "name", "list" та кнопки "add"
const name = document.getElementById('name');
const add = document.getElementById('add');
const list = document.getElementById('list');

//2. Створив пустий масив в котрому будуть зберігатись пари (ім'я = значення)
let pairsArray = []

//3. Добавив подію, яка буде спрацьовувати при кліку на кнопку "add".
add.onclick = function () {
    //3.1 Зробив перевірки на початковий текст
    const rowValue = name.value;
    if (!rowValue) {
        console.warn("Ви нічого не написали")
        return;
    } else if (!rowValue.includes('=')) {
        console.error("Ви повинні написати '=' між ім'ям та значенням")
        return;
    }

    //3.2 Розділив рядок
    const splitValue = rowValue.split('=');

    //3.3 Прибрав пробіли за допомогою методу ".trim", він дозволяє прибрати пробіли з обох кінців стрінги
    const namePart = splitValue[0].trim();
    const valuePart = splitValue[1].trim();

    //3.4 Роблю основну перевірку умов
    const isValid = /^[a-zA-Z0-9 ]+$/; //Регулярний вираз для перевірки тексту

    if (splitValue.length < 2 || splitValue.length > 2) {
        console.error("Неправильний ввід пари")
    }

    //.test - метод регулярних виразів (regexp), який перевіряє співпадіння між регулярним виразом та вказаним рядком
    else if (!isValid.test(namePart) || !isValid.test(valuePart)) {
        console.error("Імена та значення можуть містити тільки алфавітно-цифрові символи")
    }
    else {
        // console.log(splitValue);
        const obj = {name: namePart, value: valuePart};
        pairsArray.push(obj);
        console.log(pairsArray);
        name.value = ''; //Очистка рядка після натискання на кнопку
        renderList()
    }
}

//4. Створив функцію заповнення об'єктка "list"
function renderList() {
    list.innerText = ''
    for (const pair of pairsArray) {
        const option = document.createElement('option');
        option.innerText = pair.name + '=' + pair.value;
        list.appendChild(option);
    }
}

//5. Стоврив змінні для кнопок сортування та видалення
const buttonSortByName = document.getElementById('sortByName');
const buttonSortByValue = document.getElementById('sortByValue');
const buttonDelete = document.getElementById('delete');

//6. Налаштуав функціонал кнопок
buttonSortByName.onclick = function () {
    pairsArray.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        if (a.name === b.name) {
            return 0;
        }
    })

    console.log(pairsArray)
    renderList()
}

buttonSortByValue.onclick = function () {
    pairsArray.sort((a, b) => {
        if (a.value > b.value) {
            return 1;
        }
        if (a.value < b.value) {
            return -1;
        }
        if (a.value === b.value) {
            return 0;
        }
    })

    console.log(pairsArray)
    renderList()
}

buttonDelete.onclick = function () {
    let newArr = [];

    for (let i = 0; i < pairsArray.length; i++) {
        //Перевірка опції під конкретним індексом
        //І якщо вона не вибрана, то зберігається
        if (!list.options[i].selected) {
            newArr.push(pairsArray[i]);
        }
    }
    pairsArray = newArr;
    console.log(pairsArray)
    renderList()
}
