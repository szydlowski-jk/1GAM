'use strict'

const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

let ww
let wh
let wox
let woy
let ts

const TILES_PER_VIEW = 16
const FPS = 60
const DT = 1000 / FPS

let lvl
let focused = true

window.setInterval(
    loop,
    DT
)
window.addEventListener('resize', resize)
resize()

document.addEventListener('visibilitychange', function(){
    document.title = document.hidden; // change tab text for demo
})

window.addEventListener('blur', (e) => console.log(e))
// window.onfocus = function() {
//     console.log('got focus')
// }

function rngtest (range, cycles, seed) {
    let results = []
    let rng = new Random(seed)
    for(let i = 0; i < cycles; i++) {
        let r = rng.next() % range
        results[r] = (results[r] + 1) || 1
    }

    for ( let i = 0; i < range; i++ ) {
        console.log(`${i}: ${results[i]} - ${(results[i] / cycles) * 100}%`)
    }
}
// rngtest(7, 100000, 1)

function loop () {
    // ctx.fillStyle = "#000000"
    // ctx.fillRect(0,0, ww, wh)
    ctx.clearRect(0, 0, ww, wh)


    // guarantee view rect
    ctx.fillStyle = "#ffffff20"
    ctx.fillRect(0 + wox, 0 + woy, ts*(TILES_PER_VIEW), ts*(TILES_PER_VIEW))

    lvl.update()
    lvl.draw()

    ctx.strokeStyle = "#ffff0020"
    ctx.moveTo(0, 0)
    ctx.lineTo(ww, wh)
//    ctx.stroke()

    ctx.moveTo(ww, 0)
    ctx.lineTo(0, wh)
    ctx.stroke()

}

function resize () {
    ww = gc.clientWidth
    wh = gc.clientHeight

    ts = Math.min( (ww / TILES_PER_VIEW), (wh / TILES_PER_VIEW) )

    wox = (ww - (ts * TILES_PER_VIEW)) / 2
    woy = (wh - (ts * TILES_PER_VIEW)) / 2

    gc.width = ww
    gc.height = wh

    if (lvl) {
        lvl = new Level(lvl.seed+1)
    } else {
        lvl = new Level(1)
    }
    lvl.generate()
    lvl.draw()
}

