'use strict'

const PLAYER_SIZE = 0.25
const PLAYER_HALF_SIZE = PLAYER_SIZE * 0.5

class Level {
    constructor(seed) {
        this.seed = seed

        this.generated = false

        this.player = {}
        this.player.pos = new Vector(5.5, 5.5)
        this.player.spd = new Vector(0, 0.0)
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
        this.player.pos.add(this.player.spd)
    }

    draw() {
        let ox = ((ww * 0.5) - (this.player.pos.x * ts)) || 0
        let oy = ((wh * 0.5) - (this.player.pos.y * ts)) || 0

        for (let x = 0; x < lvl.sizex; x++) {
            for (let y = 0; y < lvl.sizey; y++) {
                // let tx = (x - this.player.x + (TILES_PER_VIEW/2)) * ts
                // let ty = (y - this.player.y + (TILES_PER_VIEW/2)) * ts
                ctx.strokeStyle = "#ffffff40"
                ctx.strokeRect(Math.floor((x * ts)+ox), Math.floor((y * ts)+oy), ts, ts)
                // ctx.strokeStyle = "#ffff0060"
                // ctx.strokeRect(tx, ty, ts, ts)
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
                    ctx.fillRect((x * ts) + ox, (y * ts) + oy, ts, ts)
                }
            }
        }

        //! Player Draw
        ctx.fillStyle = "#884411"
        ctx.fillRect(
            (this.player.pos.x * ts) - (ts * PLAYER_HALF_SIZE) + ox,
            (this.player.pos.y * ts) - (ts * PLAYER_HALF_SIZE) + oy,
            ts * PLAYER_SIZE,
            ts * PLAYER_SIZE
        )
    }
}