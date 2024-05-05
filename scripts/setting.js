function showSetting(){
    // console.log(document.getElementById('charMenu').children[CHAR], CHAR);
    selectChar(document.getElementById('charMenu').children[CHAR]);
}

function selectChar(event){
    var charMenu = document.getElementById('charMenu');
    for(var i = 0; i<charMenu.childElementCount; i++){
        charMenu.children[i].style.borderTop = "";
        charMenu.children[i].style.borderBottom = "";
        charMenu.children[i].classList.remove("selected");
    }
    event.style.borderTop = "5px solid blue";
    event.style.borderBottom = "5px solid blue";
    event.classList.add("selected");
    
    var t = CHAR_LIST.indexOf(event.children[0].alt);
    CHAR = t
    console.log(CHAR);
}

var cmMenuWidth = 300;

function createCarouselMenu(pos, content, val){
    var prev, next, container, cmItems, cmItem, parent;

    parent = document.querySelector(`#${pos} .carouselMenu`);
    prev = document.createElement('button');
    prev.style.display = 'block';
    prev.innerHTML = 'prev';
    parent.appendChild(prev);

    container = document.createElement('div');
    container.classList.add('cmContainer');
    parent.appendChild(container);
    
    cmItems = document.createElement('div');
    cmItems.classList.add('cmItems');
    container.appendChild(cmItems);

    for(var i = 0; i<content.length; i++){
        cmItem = document.createElement('div');
        cmItem.classList.add('cmItem');
        cmItem.innerHTML = content[i];
        cmItems.appendChild(cmItem);
    }

    next = document.createElement('button');
    next.style.display = 'block';
    next.innerHTML = 'next';
    parent.appendChild(next);

    if(val == "THEME"){
        prev.addEventListener('click', function(){
            if(THEME>0){
                THEME-=1;
                cmItems.style.transform = `translateX(-${THEME*cmMenuWidth}px)`;
                console.log(THEME);
            }
        });
        next.addEventListener('click', function(){
            if(THEME<THEME_LIST.length-1){
                THEME+=1;
                cmItems.style.transform = `translateX(-${THEME*cmMenuWidth}px)`;
                console.log(THEME);

            }
        });
    } else if(val == "BGM"){
        prev.addEventListener('click', function(){
            if(BGM>0){
                BGM-=1;
                cmItems.style.transform = `translateX(-${BGM*cmMenuWidth}px)`;
                console.log(BGM);
            }
        });
        next.addEventListener('click', function(){
            if(BGM<BGM_LIST.length-1){
                BGM+=1;
                cmItems.style.transform = `translateX(-${BGM*cmMenuWidth}px)`;
                console.log(BGM);
            }
        });
    }
}