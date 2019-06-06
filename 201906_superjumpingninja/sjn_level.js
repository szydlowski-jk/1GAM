'use strict'

class Level {
    constructor (seed) {
        this.seed = seed
        this.generated = false
    }

    generate () {
        let rng = new Random(seed)
        this.sizex = 12 // todo randomize this
        this.sizey = 12 // todo randomize this
        //

    }

    draw () {

    }
}