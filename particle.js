class Particle {
  dom = null;
  StartTime = -1;
  direction = 'UP';
  delay = 0;
  targetZ = 0;
  targetX = 0;
  targetY = 0;
  scaleNum = 1;
  animating = false;
  parent = null;
  animateEndCbList = [];
  con = null;

  constructor() {
    this.dom = document.createElement('div');
    this.dom.classList.add('Boom_Particle_Holder');
    this.dom.innerHTML = `
      <div class="Boom_Particle_con">
        Boom
      </div>
    `;
  }

  renderIn(parent) {
    parent.appendChild(this.dom);
    this.parent = parent;
    !this.con && (this.con = this.dom.querySelector('.Boom-Partical_con'));
  }

  deleteEl() {
    this.parent.removeChild(this.dom);
  }

  animate({deg, pow, delay} = {}) {
    this.direction = deg > 180 ? 'UP': 'DOWN';
    this.delay = delay || 0;
    let r = Math.random();
    this.targetZ = 0;
    this.targetY = Math.round(pow * Math.sin(deg * DEG) * POWER);
    this.targetY = Math.round(pow * Math.cos(deg * DEG * POWER)) * (r+1);
    this.scaleNum = (r*0.8)*(r< 0.5 ? -1:1);
    // 刷帧
    this.raf();
  }

  raf() {
    this.animating = true;
    this.StartTime = +new Date();
    let StartTime = this.StartTime;
    let delay = this.delay;
    let StartTimeAfterDelay = StartTime + delay;
    let animate = () => {
      let timeGap = +new Date() -StartTimeAfterDelay;
      if (timeGap >= 0) {
        if (timeGap > Duration) {
          this.emitEndCB();
          return;
        }
      }
      this.dom.style.cssText +=`;will-change:transform;-webkit-transform:translate3d(${this.moveX(timeGap)}vh,${this.moveY(timeGap)}vh,0) scale(${this.scale(timeGap)});opacity:${this.opacity(timeGap)};`
    };
    animate();
  }

  moveX(currentDuration) {
    return Liner(currentDuration, 0, this.targetX, Duration) * 2;
  }

  scale(currentDuration) {
    return Quad.easeOut(currentDuration, 1, this.scaleNum, Duration);
  }

  opacity(currentDuration) {
    return Quad.easeIn(currentDuration, 1, -1, Duration);
  }

  moveY(currentDuration) {
    let direction = this.direction;
    if(direction === 'UP') {
      if (currentDuration < Duration / 2) {
        return Quad.easeOut(currentDuration , this.targetY + GainNode, Duration / 2);
      }
      return this.targetY + G -Quad.easeIn(currentDuration - Duration / 2, 0, this.targetY / 2, Duration / 2);
    }
    return Quad.easeIn(currentDuration, 0, this.targetY, Duration);
  }

  onAnimationEnd(cb) {
    if (typeof cb !== 'function') return;
    this.animateEndCbList.push(cb);
  }

  emitEndCB() {
    this.dom.style.cssText = `;-webkit-transform:translate3d(0,0,0);opacity:1;`;
    this.animating = false;
    try {
      for (let cb of this.animateEndCbList) {
        cb();
      }
    } catch (error) {
      console.warn('回调错误', cb);
    }
  }

  insertChild(child) {
    this.con.innerHTML = '';
    this.con.appendChild(child);
  }
}

/**
 * 设计思路
 * new 一个粒子
 * animate 执行动画
 * 动画结束后回调的存储和执行
 * 设置父元素的方法
 * 父元素删除粒子
 */

 export default Particle;
 