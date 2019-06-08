'use strict'

class Level {
    constructor(seed) {
        this.seed = seed

        this.generated = false

        this.player = {
            x: 5.5,
            y: 5.5,
            sx: 0,
            sy: 0,
            ax: 0,
            ay: 0
        }
    }

    generate() {
        let rng = new Random(this.seed)
        this.sizex = 14 // TODO randomize this
        this.sizey = 14 // TODO randomize this
        this.tiles = []
        for (let y = 0; y < this.sizey; y++) {
            let r = []
            for (let x = 0; x < this.sizex; x++) {
                //                let t = rng.next() % 4
                let t = 0
                if (x == 0 || y == 0 || x == this.sizex - 1 || y == this.sizey - 1) {
                    t = (rng.next() % 3) + 1
                }
                r.push(t)
            }
            this.tiles.push(r)
        }
        //        debugger
    }

    update() {
        this.player.x += this.player.sx
        this.player.y += this.player.sy
    }

    draw() {
        for (let x = 0; x < Math.ceil(ww / ts); x++) {
            for (let y = 0; y < Math.ceil(wh / ts); y++) {
                ctx.strokeStyle = "#ffffff40"
                ctx.strokeRect((x * ts), (y * ts), ts, ts)
                if (lvl) {
                    ctx.fillStyle = "#00ffff60"
                    if (x >= 0 && x < lvl.sizex && y >= 0 && y < lvl.sizey) {
                        switch (lvl.tiles[x][y]) {
                            case 0: {
                                ctx.fillStyle = "#000000"
                                break
                            }
                            case 1: {
                                ctx.fillStyle = "#ffffff60"
                                break
                            }
                            case 2: {
                                ctx.fillStyle = "#00ff0060"
                                break
                            }
                            case 3: {
                                ctx.fillStyle = "#0000ff60"
                                break
                            }
                            default: {
                                ctx.fillStyle = "#ff00ff60"
                            }

                        }
                    }
                    ctx.fillRect((x * ts), (y * ts), ts, ts)
                }
            }
        }

        //! Player Draw
        ctx.fillStyle = "#884411"
        ctx.fillRect(
            this.player.x * ts - ts * 0.25,
            this.player.y * ts - ts * 0.25,
            ts * 0.5,
            ts * 0.5
        )
    }
}