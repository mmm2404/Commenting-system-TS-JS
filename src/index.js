"use strict";
window.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear();
    const commentNumber = document.getElementById('comment-number');
    if (commentNumber !== null)
        commentNumber.innerHTML = localStorage.getItem('count');
    const allMassages = document.querySelector('.comment-output');
    if (allMassages !== null)
        allMassages.innerHTML = localStorage.getItem('massages');


    function changeIcon() {
        //определяем переменные иконок, используя их отрисовку
        const path1 = 'M9 15L17.6603 0H0.339746L9 15Z';
        const path2 = 'M9 0L0.339746 15L17.6603 15L9 0Z';
        //находим наши узлы
        const btn = document.querySelector(".arrow");
        const iconPath = document.querySelector(".path");
        //навешиваем обработчик на кнопку
        if (btn !== null)
            btn.addEventListener('click', () => {
                if (iconPath !== null)
                    iconPath.setAttribute("d", (btn.classList.toggle('btn-magic')) ? path1 : path2); // используем атрибут d,где записан path и тренарный оператор для переключения
            });
    }
    changeIcon();
    //подсчитываем колличество знаков в поле ввода
    const text = document.getElementById('text');
    const countDidgits = document.getElementById('count');
    const error = document.getElementById("error-msg");
    const errorMobile = document.getElementById("error-msg__mobile");
    const send = document.querySelector(".send-btn");
    if (text !== null)
        text.onkeyup = function () {
            let max = 1000;
            let countdown = `${text.value.length} /1000`;
            if (countDidgits !== null)
                countDidgits.innerHTML = countdown;
            if (text.value.length > max) {
                if (countDidgits !== null)
                    countDidgits.style.color = "#FF0000";
                if (countDidgits !== null)
                    countDidgits.style.opacity = "1";
                if (send !== null)
                    send.style.background = "#A2A2A2";
                if (error !== null)
                    error.innerText = 'Слишком длинное сообщение';
                if (errorMobile !== null)
                    errorMobile.innerText = 'Слишком длинное сообщение';
            }
            else {
                if (send !== null)
                    send.style.background = "#ABD873";
            }
        };
    // находим form и див, куда записываем колличество комментариев

    const images = ['./images/avatar_alex.png', './images/avatar_max.png', './images/avatar_junebox.png'];
    const form = document.forms.commentsReplies;

    if (form !== null)
        form.onclick = post; // клик на элементы формы запустит следующую функцию
    function post(event) {
        /* находим все <fieldset>
        (также <button>, <textarea>, и т.д.) */
        const field = event.currentTarget.elements;
        // Ссылка на фактический элемент, на который нажали
        const clicked = event.target;
        if (clicked.matches('.send-btn')) {
            /* находим элемент щелкнутого элемента, который
            прямо перед ним и получаем  его текст */
            let name = document.getElementById("name").value;
            let text = document.getElementById('text').value;
            let avatar = document.getElementById("avatar");
            let time = Date.now();
            let count = -2;
            //находим <fieldset name='comments'> и вставляем HTML
            if (avatar !== null)
                field.comments.insertAdjacentHTML('afterBegin', `<fieldset class="massage"><div>${avatar.innerHTML}</div></div><div class="name-date">
                            <p id="name-now">${name}</p>
                            <p id="time-now">${timeConvert(time)}</p></div><div id="text-now">${text}</div>
                            <div class="reply-footer">
                            <img id="reply-icon" src="./images/reply_icon.svg" alt="">
                            <button class="option-reply" type="button">Ответить</button>
                            <img class="heart-icon" width="22" height="23" src="./images/like_before.png" alt="">
                            <span class="option-favorite">В избранное</span>
                            <div class="like-dislike">
                            <img class="dislike" type="button" width="20" height="20" src="./images/dislike.png" alt="" >
                            <input title="input" id="rating" type="number" min="0" step="1" value="0" disabled>
                            <img class="like"  type="button" width="20" height="20" src="./images/like.png" alt="" ></div></div><ul></ul></fieldset>`);
            document.getElementById("name").value = "";
            document.getElementById('text').value = "";
            document.getElementById('avatar-img').src = images[1];
            setOnLocalStorage();
            function setOnLocalStorage() {
                let allMassages = document.querySelector('.comment-output');
                let rating = document.getElementById('rating');
                if (allMassages !== null)
                    localStorage.setItem('massages', allMassages.innerHTML);
                if (commentNumber !== null)
                    localStorage.setItem('count', commentNumber.innerHTML);
               
            }

            //считаем колличество сообщений
            let massageList = document.querySelectorAll('fieldset');
            
            massageList.forEach(element => {
                count++;
                if (commentNumber !== null)
                    commentNumber.innerHTML = (` (${count})`);
                setOnLocalStorage();
            });


            //меняем цвет значка сердечка при клике на него и добавляем в избранное
        }
        else if (clicked.matches(".heart-icon")) {
            let mySrc = clicked.getAttribute('src');
            let favorite = clicked.nextElementSibling;
            let chosen = document.querySelector(".massage");
            if (mySrc === './images/like_before.png') {
                clicked.setAttribute('src', './images/like_after.png');
                favorite.innerText = 'В избранном';
                if (chosen !== null)
                    chosen.setAttribute('class', 'chosen');
            }
            else {
                clicked.setAttribute('src', './images/like_before.png');
                favorite.innerText = 'В избранное';
            }
            //считаем колличество дислайков
        }
        else if (clicked.matches('.dislike')) {
            const rating = clicked.nextElementSibling;
            rating.stepDown(1);
            rating.style.color = "red";
   
           
        } //считаем колличество лайков

        else if (clicked.matches('.like')) {
            const rating = clicked.previousElementSibling;
            rating.stepUp(1);
            rating.style.color = "green";
    


            // находим кнопку ответа  и элемент перед ним (после него втавляем форму ответа)
        }
        else if (clicked.matches('.option-reply')) {
            let plus = clicked.parentElement;
            plus.insertAdjacentHTML('afterEnd', `<ul class="massage"><div class="reply-form">
        <input id="nameRep" placeholder="Ваше имя" type="text">
        <div class="text-submit">
        <textarea  id="text" class="comment-input" placeholder="Введите текст сообщения..."></textarea>  
        <button class='repTxt' type='button'>Ответить</button></div></div></ul>`);
            // находим данные заполненной выше формы и вставляем ниже
        }
        else if (clicked.matches('.repTxt')) {
            let nameWeRepliedTo = document.getElementById("name-now").innerText;
            let text = clicked.previousElementSibling.value;
            let nameInput = document.getElementById("nameRep");
            let nameReplied = document.getElementById("nameRep").value;
            let time = Date.now();
            let list = clicked.parentElement;
            list.insertAdjacentHTML('afterEnd', `<li class="massage"><div class="replyHeader"><img id="avatar-img" src="${images[2]}" alt="avatar">
            <p id="nameRep-now">${nameReplied}</p> 
            <img id="reply-icon__li" src="./images/reply_icon.svg" alt=""> 
            <p id="name-prev__li">${nameWeRepliedTo}</p><p id="time-now">${timeConvert(time)}</p></div>  
            <div class="mobile-option"><img id="reply-icon__mobile" width="26" height="25" src="./images/reply_icon.svg" alt=""> 
            <p id="name-prev__mobile">${nameWeRepliedTo}</p></div>
            <div id="text-now">${text}</div>
            <div class="second-footer">
            <img class="heart-icon" width="23" height="23" src="./images/like_before.png" alt="">
            <div class="option-favorite">В избранное  </div>
            <div class="like-dislike">
            <img class="dislike" type="button" width="20" height="20" src="./images/dislike.png" alt="" >
            <input title="input" id="rating" type="number" min="0" step="1" value="0" disabled>
            <img class="like"  type="button" src="./images/like.png" alt="" ></div></div></div></li>`);
            let avatar = document.getElementById('avatar-img');
            if (avatar !== null)
                avatar.src = images[1];
            clicked.previousElementSibling.remove();
            if (nameInput !== null)
                nameInput.remove();
            clicked.remove();
        }
        else {
            return false;
        }
        //вывод списка избранных сообщений
        let favoriteBtn = document.querySelector(".favorite");
        if (favoriteBtn !== null)
            favoriteBtn.onclick = function () {
                let massageList = document.querySelectorAll('fieldset');
                let massages = Array.from(massageList);
                massages.forEach(item => {
                    if (item.classList.contains('massage')) {
                        item.hidden = true;
                    }
                });
            };
        //возврат на страницу с полным списком
        let button = document.getElementById('comment-page');
        if (button !== null)
            button.onclick = function () {
                let massageList = document.querySelectorAll('fieldset');
                let massages = Array.from(massageList);
                massages.forEach(item => {
                    item.hidden = false;
                });
            };
        // функция конвертации времени 
        function timeConvert(UNIX_timestamp) {
            let a = new Date(UNIX_timestamp);
            let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let min = a.getMinutes();
            let time = date + '.' + month + ' ' + hour + ':' + min;
            return time;
        }
        ;
    }
});
