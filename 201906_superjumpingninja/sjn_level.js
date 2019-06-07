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
        for (let i = 0; i < this.sizey; i++) {
            let r = []
            for (let j = 0; j < this.sizex; j++) {
                let t = rng.next() % 4
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