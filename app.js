const chooseBtn = document.querySelector('.choose-icon');
const icon = document.querySelectorAll('.icon img');
const iconBox = document.querySelector('.wow');
const preview = document.querySelector('.preview');
const iconbParent = document.querySelector('.hello');
const searchInput = document.querySelector('.search');
const loader = document.querySelector('.loader');
const addTodoBtn = document.querySelector('.add-new');
const popForm = document.querySelector('.popup-form')
const backdrop = document.querySelector('.backdrop');
const todoAddForm = document.querySelector('.todo-form')
const iconImg = document.querySelector('.icon-img')
const todos = document.querySelector('.todos');




async function getBtn(query = 'home') {

    try {
        // console.log('trying')
        const res = await fetch(`https://api.iconify.design/search?query=${query}&prefix=material-symbols&limit=5`);
        const iconsData = await res.json();
        let iconsFiles = [];
        console.log(iconsData.icons.length);
        if (iconsData.icons.length > 0) {
            iconsData.icons.forEach((item) => {
                const iconPart = item.split(':');

                iconsFiles.push(`https://api.iconify.design/${iconPart[0]}/${iconPart[1]}.svg?width=30&color=blue`)

            })


            //mapping all icons list for display
            const html = iconsFiles.map((item) => {
                return `<li class="icon"><img data-url="${item}" src="${item}" alt=""></li>`
            }).join('');

            iconBox.innerHTML = html;
        } else {
            iconBox.innerHTML = `<p>No icon found!</p>`
        }

        loader.classList.remove('active');

    } catch (error) {
        console.log(error);
    }


}

searchInput.addEventListener('input', _.debounce(function (e) {
    loader.classList.add('active')

    let val = e.target.value ? e.target.value : 'home'

    getBtn(val)
}, 500))


chooseBtn.addEventListener('click', (e) => {
    loader.classList.add('active');
    getBtn();


    iconbParent.style.display = "block";

    setTimeout(() => {
        iconbParent.classList.add('show')
    }, 10)
    // console.log(icons)

})

//hide icon box after clicking outside
document.addEventListener('click', (e) => {
    if (chooseBtn.contains(e.target)) {
        return;
    }
    if (iconbParent.classList.contains('show')) {
        console.log('hello')
        if (!iconbParent.contains(e.target)) {
            iconbParent.classList.remove('show');

            iconbParent.style.display = 'none'

        }
    }

})

//getting src
let src;

iconBox.addEventListener('click', (e) => {


    if (e.target.nodeName == 'IMG') {
        const url = e.target.dataset.url;
        preview.innerHTML = `<img class="prev-img" src="${url}" alt="">`
        src = url;
        preview.classList.add('show');

        iconbParent.classList.remove('show');

        iconbParent.style.display = 'none'

        //clear input value

        searchInput.value = '';

    }

    console.log(e)
})




// add todo

addTodoBtn.addEventListener('click', (e) => {
    console.log('clickr')
    popForm.style.display = "block"
    backdrop.style.display = "block"
})

//hiding pop up form outside form clicking

document.addEventListener('click', (e) => {

    if (addTodoBtn.contains(e.target)) {
        return;
    }

    if (!popForm.contains(e.target)) {
        popForm.style.display = "none"
        backdrop.style.display = "none"
    }

})



//

function addTodo(cat, src) {

    let html = `
<div class="content-box d-flex flex-column justify-content-center row-gap-4">
<img class="w-25 mx-auto" src="${src}" alt="">
    <h3>${cat}</h3>
    <p>1/12 Task Completed</p>
</div>
`


    let newElement = document.createElement('div');

    newElement.classList.add('col-md-3');

    newElement.innerHTML = html;

    todos.prepend(newElement);

}


todoAddForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let catName = todoAddForm.catname.value;
    addTodo(catName, src)

    popForm.style.display = "none"
    backdrop.style.display = "none"
})