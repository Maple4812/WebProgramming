function handleMouseMovement(container, overlay) {
    overlay.style = 'filter : opacity(0)';
    
    container.addEventListener('mousemove', function(e){
        var x = e.offsetX;
        var y = e.offsetY;
        rotateY = -1/5 * x + 20;
        rotateX = 4/30 * y -20;
        
        overlay.style = `background-position : ${x/5 + y/5}%`;
        
        container.style = `transform : perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    container.addEventListener('mouseover', function(){
        overlay.style = 'filter : opacity(0.1)';
    });
    container.addEventListener('mouseout', function(){
        overlay.style = 'filter : opacity(0)';
        container.style = 'transform: perspective(400px) rotateX(0) rotateY(0)';
    });
}

function createCards(name, dec, imgUrl, have = true) {
    var title_card = document.createElement('div');
    title_card.classList.add('title-card');
    
    var container = document.createElement('div');
    container.classList.add('container');
    title_card.appendChild(container);
    
    if(have){
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        container.appendChild(overlay);
    }
    
    var card = document.createElement('div')
    var title = document.createElement('h1');
    title.style="position: absolute; bottom: 60px; font-size: 15px; text-align: center; width: 210px;";
    title.innerHTML = name;
    card.appendChild(title);
    card.classList.add('card');
    card.style.backgroundImage = `url(img/${imgUrl})`;
    if(!have)
        card.style.filter = "grayscale(100%)";
    card.style.position = "relative";
    container.appendChild(card);
    
    if(have){
        var nameP = document.createElement('p');
        nameP.textContent = dec;
        title_card.appendChild(nameP);
    }
    
    document.querySelector('#cards').appendChild(title_card);
    if(have)
        handleMouseMovement(container, overlay);
}

var tasks = ["Clear 1 Stage", "Clear 2 Stage", "Clear 3 Stage", "Clear All Stage"];
var taskDescrptions = ["첫번째 스테이지를 클리어하라!", "두번째 스테이지를 클리어하라!", "세번째 스테이지를 클리어하라!", "모든 스테이지를 클리어하라!"]
var challengeState;
const TASK_KEY = 'challenge';

function changeState(achieve){
    if(tasks.indexOf(achieve) == -1){
        console.log(`도전과제 ${achieve}를 찾을 수 없습니다.`);
    } else {
        var t = tasks.indexOf(achieve);
        challengeState = challengeState.substring(0, t) + '1' + challengeState.substring(t+1, challengeState.length);
        localStorage.setItem(TASK_KEY, challengeState);
    }
}

function load_chellenge(){
    var get = localStorage.getItem(TASK_KEY);
    if(get == null){
        challengeState = '0'.repeat(tasks.length);
        localStorage.setItem(TASK_KEY, challengeState);
        get = localStorage.getItem(TASK_KEY);
    }
    
    var container = document.querySelector('#cards');
    container.innerHTML = "";

    for(i = 0; i<get.length; i++){
        if(get[i] == '1'){
            // createCards(tasks[i],"chellenge/"+String(i+1).padStart(3, "0")+'.png');
            createCards(tasks[i],taskDescrptions[i],"chellenge/001"+'.png');
            // console.log(`${tasks[i]} Card is created from ${String(i+1).padStart(3,"0")}!`);
        } else {
            createCards(tasks[i],taskDescrptions[i],"chellenge/001"+'.png', false);
        }
    }
}