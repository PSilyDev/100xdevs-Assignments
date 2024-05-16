// <!-- Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM) -->

let h = 0
let m = 0
let s = 0
let time = 'AM'
function clock(){
    s += 1
    if(s === 60){
        s = 0
        m += 1

    }
    if(m === 60){
        m = 0
        h += 1
    }
    if(h === 24){
        h = 0
    }
    if(h === 12){
        time = 'PM'
    }
    console.log(h, " : ", m, " : ", s, " ", time);
}
setInterval(clock, 1000)