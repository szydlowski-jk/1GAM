'use strict'

const PLAYER_SIZE = 0.25
const PLAYER_HALF_SIZE = PLAYER_SIZE * 0.5

const GRAVITY = new Vector(0, 0.2)

class Level {
    constructor(seed) {
        this.seed = seed

        this.generated = false

        this.ox = 0
        this.oy = 0

        this.player = {}
        this.player.pos = new Vector(5.5, 5.5)
        this.player.spd = new Vector()
        this.player.acc = new Vector()
    }

    generate () {
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

    isSolid (x, y) {
        if (x >= 0 &&
            x < this.sizex &&
            y >= 0 &&
            y < this.sizey) {
                switch(this.tiles[Math.floor(x)][Math.floor(y)]) {
                    case 0:
                        return false
                        break
                    case 1:
                    case 2:
                    case 3:
                        return true
                        break
                }
            }
    }


    update () {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // TODO Add acceleration to speed calculations
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // * Update Acceleration here
        let newacc = Vector.add(this.player.acc, GRAVITY)

        let newspd = Vector.add(this.player.spd, newacc)
        
        // * is on ground
        if ( this.isSolid(this.player.pos.x, this.player.pos.y + PLAYER_HALF_SIZE)) {
            newspd.y = 0
        }
        
        let newpos = Vector.add(this.player.pos, newspd)

        // * Collisions
        let down = this.isSolid(newpos.x, newpos.y + PLAYER_HALF_SIZE)
        let up = this.isSolid(newpos.x, newpos.y - PLAYER_HALF_SIZE)
        let left = this.isSolid(newpos.x - PLAYER_HALF_SIZE, newpos.y)
        let right = this.isSolid(newpos.x + PLAYER_HALF_SIZE, newpos.y)

        if (down && this.player.spd.y > 0) {
            this.player.spd.y *= -1
        }

        if (up && this.player.spd.y < 0) {
            this.player.spd.y *= -1
        }

        if (left || right) {
            this.player.spd.x *= -1
        }

        this.player.pos = newpos
        //// this.player.pos.add(this.player.spd)
    }

    drawTile (x, y) {
        ctx.strokeStyle = "#ffffff40"
        ctx.strokeRect(Math.floor((x * ts) + this.ox), Math.floor((y * ts) + this.oy), ts, ts)
        ctx.fillStyle = "#00ffff60"
        if (x >= 0 && x < this.sizex && y >= 0 && y < this.sizey) {
            switch (this.tiles[x][y]) {
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

        //! Debug player tile marking
        if (
            Math.floor(this.player.pos.x) == x &&
            Math.floor(this.player.pos.y) == y
        ) {
            ctx.fillStyle = "#ff000060"
        } else if (
            (Math.floor(this.player.pos.x + PLAYER_HALF_SIZE) == x &&
            Math.floor(this.player.pos.y + PLAYER_HALF_SIZE) == y) ||
            (Math.floor(this.player.pos.x - PLAYER_HALF_SIZE) == x &&
            Math.floor(this.player.pos.y - PLAYER_HALF_SIZE) == y)
        ) {
            ctx.fillStyle = "#ff880060"
        }

        ctx.fillRect((x * ts) + this.ox, (y * ts) + this.oy, ts, ts)
    }

    draw () {
        this.ox = ((ww * 0.5) - (this.player.pos.x * ts)) || 0
        this.oy = ((wh * 0.5) - (this.player.pos.y * ts)) || 0

        for (let x = 0; x < lvl.sizex; x++) {
            for (let y = 0; y < lvl.sizey; y++) {
                this.drawTile(x, y)
            }
        }

        //! Player Draw
        ctx.fillStyle = "#884411"
        ctx.fillRect(
            (this.player.pos.x * ts) - (ts * PLAYER_HALF_SIZE) + this.ox,
            (this.player.pos.y * ts) - (ts * PLAYER_HALF_SIZE) + this.oy,
            ts * PLAYER_SIZE,
            ts * PLAYER_SIZE
        )
    }
}