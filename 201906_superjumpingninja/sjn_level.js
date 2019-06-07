'use strict'

class Level {
    constructor (seed) {
        this.seed = seed

        this.generated = false
    }

    generate () {
        let rng = new Random(this.seed)
        this.sizex = 32 // TODO randomize this
        this.sizey = 32 // TODO randomize this
        this.tiles = []
        for (let y = 0; y < this.sizey; y++) {
            let r = []
            for (let x = 0; x < this.sizex; x++) {
//                let t = rng.next() % 4
                let t = 0
                if (x == 0 || y == 0 || x == this.sizex-1 || y == this.sizey-1) {
                    t = (rng.next() % 3) + 1
                }
                r.push(t)
            }
            this.tiles.push(r)
        }
//        debugger
    }

    draw () {
        console.log(this.tiles)
    }
}