var SCORE_KEY = "scoreList";

function showScoreboard(){
    showPage('scoreboard', 'main');
    var child;
    var div = document.getElementById('scoreboardList');
    div.innerHTML = "";
    var scoreList = getScores();
    for(var i = 0; i<scoreList.length; i++){
        child = document.createElement('div');
        child.innerHTML = `${scoreList[i].char} ${scoreList[i].nickname} ${scoreList[i].score}`;
        div.appendChild(child);
    }
}

function resetScoreStorage(){
    localStorage.setItem(SCORE_KEY,null);
}

function appendScore(char, nickname, score) {
    try {
        // 기존에 로컬 스토리지에 저장된 데이터 불러오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        
        // 새로운 데이터 추가
        savedData.push({ char, nickname, score });

        savedData.sort((a,b) => b.score - a.score)
        if(savedData.length >10){
            // console.log("개수 조정")
            savedData = savedData.slice(0,10)
        }
        // 로컬 스토리지에 저장
        localStorage.setItem(SCORE_KEY, JSON.stringify(savedData));
        console.log("데이터가 성공적으로 저장되었습니다.");
    } catch (error) {
        console.error("데이터 저장 중 오류가 발생했습니다:", error);
    }
}

function getScores() {
    try {
        // 로컬 스토리지에서 데이터 가져오기
        let savedData = JSON.parse(localStorage.getItem(SCORE_KEY)) || [];
        console.log(savedData)
        // 가져온 데이터 반환
        return savedData;
    } catch (error) {
        console.error("데이터 불러오기 중 오류가 발생했습니다:", error);
        return []; // 오류 발생 시 빈 배열 반환
    }
}