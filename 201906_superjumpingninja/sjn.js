'use strict'

const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

let ww
let wh
let wox
let woy
let ts

const TILES_PER_VIEW = 16
const FPS = 10
const DT = 1000 / FPS

window.setInterval(
    loop,
    DT
)
window.addEventListener('resize', resize)
resize()

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
    ctx.fillStyle = "#995533"
    ctx.fillRect(0,0, gc.clientWidth, gc.clientHeight)
    // guarantee view rect
    ctx.fillStyle = "#00000020"
    ctx.fillRect(0 + wox, 0 + woy, ts*(TILES_PER_VIEW), ts*(TILES_PER_VIEW))

    for(let x = 0; x < Math.ceil(ww / ts); x++) {
        for (let y = 0; y < Math.ceil(wh / ts); y++) {
            ctx.strokeStyle = "#00000040"
            ctx.strokeRect((x * ts), (y * ts), ts, ts)
        }
    }
}

function resize () {
    ww = gc.clientWidth
    wh = gc.clientHeight

    ts = Math.min( (ww / TILES_PER_VIEW), (wh / TILES_PER_VIEW) )

    wox = (ww - (ts * TILES_PER_VIEW)) / 2
    woy = (wh - (ts * TILES_PER_VIEW)) / 2

    gc.width = ww
    gc.height = wh
}

