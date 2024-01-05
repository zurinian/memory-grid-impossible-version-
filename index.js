let impossible = true;
let time = 5000;
let grid = 4;
let order = false;
let shuffle = false;
let started = false;
let remainGrid = [];
let point = 0;
let startedFr = 0;
let currentNumber = 0;

if (impossible) {
    time = 3000;
    grid = 8;
    order = true;
    shuffle = true;
}
//list of all grid to avoid overalp picking

for (let i = 0; i < grid * grid; i++) {
    remainGrid.push(i);
}


for (let i = 0; i < grid*grid; i++) {
    $("div").css("grid-template", `repeat(${grid}, 1fr) / repeat(${grid}, 1fr)`).append(`<a${i} class="grid"></a${i}>`)
}
$("change").click(() => {
    if (!started) {
        started = true
        let timer = time/1000
        for (let i = 0; i < grid * (grid/2); i++) {
            let random = Math.floor(Math.random() * remainGrid.length)
            $(".grid").eq(remainGrid[random]).addClass("yes")            
            if (order) {
                $(".grid").eq(remainGrid[random]).text(i)
            }            

            remainGrid.splice(random, 1)
        }
        $("change").text(`0${time/1000}`)
        interval = setInterval(() => {
            timer -= 1
            $("change").text(`0${timer}`)
            if (timer < 1) {
                startedFr = true;
                clearInterval(interval)
            }
        }, 1000)
        setTimeout(() => {
            $("change").animate({height: 'toggle'})
            $("div").css("transform", "translate(0, -5vh)")
            $(".yes").css("background-color", "#BC13FE").css("color", "#00000000")
        }, time)
    }
})
for (let i = 0; i < grid * grid; i++) {
    $(`a${i}`).click(() => {
        if (startedFr) {
            if (!order) {
                if ($(`a${i}`).hasClass("yes")){
                    point += 1
                    $(`a${i}`).removeClass("yes").addClass("correct")
                } else {
                    $(`a${i}`).addClass("wrong")
                    point = -1
                }
            } else {
                if ($(`a${i}`).hasClass("yes") & $(`a${i}`).text() == currentNumber){
                    point += 1
                    $(`a${i}`).removeClass("yes").addClass("correct")
                    currentNumber += 1
                } else {
                    $(`a${i}`).addClass("wrong")
                    point = -1
                }
            }
        }
        if (point >= grid * (grid/2)) {
            $("blur").addClass("blur")
            $("losewin").addClass("losewin")
            setTimeout(() => {$("losewin").css("height", "0")}, 3000)
            //setTimeout(() => {$("img").css("height", "100%").css("width", "100%")}, 4000)
            setTimeout(() => {location.reload()}, 4000)
            $("text").addClass("text")
        }
        if (point < 0) {
            $("text").text("LOSER BOO!")
            $("blur").addClass("blur")
            $("losewin").addClass("losewin")
            setTimeout(() => {$("losewin").css("height", "0")}, 3500)
            setTimeout(() => {location.reload()}, 4000)
            $("text").addClass("text")
        }
    })
}
