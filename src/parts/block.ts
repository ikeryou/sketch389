import { MyDisplay } from "../core/myDisplay";
import { Func } from "../core/func";
import { Tween } from "../core/tween";
import { SvhGetter } from "../core/svhGetter";
import { Conf } from "../core/conf";
import { Color } from "three";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Block extends MyDisplay {

  private _id: number
  private _inner: HTMLElement
  private _txt: HTMLElement
  private _txtBg: HTMLElement
  private _photo: HTMLElement

  constructor(opt:any) {
    super(opt)

    this._id = opt.id

    const inner = document.createElement('div')
    inner.classList.add('l-block-inner')
    this.el.appendChild(inner)
    this._inner = inner

    const photo = document.createElement('div')
    photo.classList.add('l-block-photo')
    inner.appendChild(photo)
    this._photo = photo

    const bg = document.createElement('div')
    photo.appendChild(bg)
    bg.classList.add('l-block-bg')
    this._txtBg = bg
    this.useGPU(this._txtBg)

    const txt = document.createElement('div')
    photo.appendChild(txt)
    this._txt = txt
    this._txt.classList.add('l-block-txt')
    this._txt.innerHTML = 'block id #' + Util.numStr(this._id, 3)




    // const col = new Color(Util.random(0,1), Util.random(0,1), Util.random(0,1))
    // const g = Util.random(0, 1)
    const col = Util.hit(5) ? new Color(1, 1, 0) : new Color(0, 0, 1)
    const colR = new Color(1 - col.r, 1 - col.g, 1 - col.b)
    Tween.set(this._txt, {
      color: colR.getStyle(),
    })
    Tween.set(this._txtBg, {
      backgroundColor: col.getStyle(),
    })
  }


  protected _update(): void {
    super._update();

    const sw = Func.sw()
    const sh = SvhGetter.instance.val * 1

    const it = 1

    let w = sw / it
    let h = sh
    const blockHeight = (h / Conf.NUM_IMG) * 1

    Tween.set(this.el, {
      marginTop: blockHeight * 20 * (this._id + 1),
      height: blockHeight * 10 * Conf.NUM_IMG
    })

    Tween.set(this._inner, {
      top: this._id * blockHeight,

    })

    Tween.set(this._photo, {
      width: w,
      height: blockHeight * 1,
      // x: w * (this._id % it),
      x: Math.cos(Util.radian(this._c * 5 + this._id * 5)) * w * 0.1
      // x: Util.map(Math.sin(Util.radian(this._id * 20)), 0, sw - w, 0, 1)
    })

    Tween.set(this._txt, {
      width: w,
      height: blockHeight,
    })

    Tween.set(this._txtBg, {
      scaleX: Util.map(Math.sin(Util.radian(this._c * 5 + this._id * 5)), 0, 1, -1, 1)
    })
  }

  protected _resize(): void {
    super._resize();
  }
}