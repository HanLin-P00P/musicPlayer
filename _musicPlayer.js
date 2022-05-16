const tableBody = document.getElementsByClassName("tableBody")[0];
const audio = document.getElementsByTagName("audio")[0];
const currentProgressTag = document.getElementById("currentProgress");
const tableBody1 = document.getElementsByClassName("tableBody1")[0];
const allBtn = document.getElementsByClassName("allBtn")[0];
const favBtn = document.getElementsByClassName("favBtn")[0];
const allTable = document.getElementsByClassName("table0")[0];
const favTable = document.getElementsByClassName("table1")[0];

const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

favBtn.addEventListener("click", () => {   //swap to fav tab
    allTable.classList.add("d-none");
    favTable.classList.remove("d-none")
})

const track = [                                                                         
    {  trackId: "music/hotel.m4a" , title: "Hotel California"},           //Music
    {  trackId: "music/heart.m4a" , title: "My Heart will go on"},        //Source
    {  trackId: "music/guitar.m4a" , title: "World Best Guitar"},         //array
    {  trackId: "music/rain.m4a" , title: "Kiss the rain"},               
    {  trackId: "music/river.m4a" , title: "river flow into you"},        
]

for (let i=0; i<track.length; i++) {
        const tableRow = document.createElement("tr");
        const tableCol1 = document.createElement("td");             //First Column
        tableCol1.classList.add("col-1")
        const tableCol2 = document.createElement("td");             //Second Column
        tableCol2.classList.add("col-9");
        const tableCol3 = document.createElement("td");
        tableCol3.classList.add("col-2");
        const likes = document.createElement("i");
        likes.classList.add("far","fa-heart");
        tableCol3.append(likes)

        let j= i + 1;
        const songNo = j + ". ";
        const trackNo = songNo;
        tableCol1.textContent = trackNo;
        const trackTitle = track[i].title;
        tableCol2.textContent = trackTitle;

        tableRow.append(tableCol1,tableCol2,tableCol3);  // all track list
        tableBody.append(tableRow);
       
        allBtn.addEventListener("click", () => {    //swap to all tab
            allTable.classList.remove("d-none");
            favTable.classList.add("d-none")
            tableRow.append(tableCol1,tableCol2,tableCol3);  // all track list
            tableBody.append(tableRow);
        })        
        

        tableCol3.addEventListener ("click", () => {            //add or remove favourite
            const likesClass = likes.classList.contains("far");
            if (likesClass) {
                likes.classList.remove("far");
                likes.classList.add("fas");
            } else {
                likes.classList.remove("fas");
                likes.classList.add("far")
            }
        })

        favBtn.addEventListener("click", () => {
            const favTracks = likes.classList.contains("fas");      // favourite track list
            allTable.classList.add("d-none");
            favTable.classList.remove("d-none")
            if (favTracks === true) {
                tableRow.append(tableCol1,tableCol2,tableCol3);
                tableBody1.append(tableRow)
            }
        })
        

        tableCol2.addEventListener("click", () => {             //playing track
        const trackId = track[i].trackId;
        audio.src = trackId;
        audio.play();
        isPlaying = true ;
        updatePlayAndPause();
        currentPlayingIndex = i;
        })

        

    } 

const createMinAndSec = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = times % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds; 
        return minuteText + ":" + secondText;
}

const currentProgressUpdate = (currentTime) => {
    const currentProgressWidth = (500/duration)* currentTime;
    currentProgressTag.style.width = currentProgressWidth + "px"; //eg. 50px
}

let duration;
let durationTime = "--:--"
let progressTime = "--:--"
audio.addEventListener("loadeddata", () => {
    duration = Math.floor(audio.duration);
    durationTime = createMinAndSec(duration);
})

audio.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audio.currentTime);
    progressTime = createMinAndSec(currentTime);
    const pBar = progressTime + " / " + durationTime;
    const currentAndTotalTime = document.getElementsByClassName("currentAndTotalTime")[0];
    currentAndTotalTime.textContent = pBar;
    currentProgressUpdate(currentTime);
})

let currentPlayingIndex = 0;
let isPlaying = false;
let songIdToPlay;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audio.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
    playFun();
    updatePlayAndPause();
    } else {
        audio.play();
        updatePlayAndPause();
    }
    
})

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audio.pause();
    updatePlayAndPause();
})

previousButtonTag.addEventListener("click", () => {
    isPlaying = true;
    if (currentPlayingIndex === 0) {
        currentPlayingIndex = track.length -1 ;
        playFun();
    } else {
        currentPlayingIndex -= 1;
        playFun();
    }
    updatePlayAndPause();
})

nextButtonTag.addEventListener("click", () => {
    isPlaying = true;
    if (currentPlayingIndex === track.length - 1 ) {
        currentPlayingIndex = 0;
        playFun();
    } else {
        currentPlayingIndex += 1;
        playFun();
    }
    updatePlayAndPause();
})

const updatePlayAndPause =() => {
    if (isPlaying) {
    playButtonTag.classList.add("d-none");
    pauseButtonTag.classList.remove("d-none");
    } else {
        playButtonTag.classList.remove("d-none");
    pauseButtonTag.classList.add("d-none");
    }
}

const playFun =() => {
    songIdToPlay = track[currentPlayingIndex].trackId;
    audio.src = songIdToPlay;
    audio.play();
}