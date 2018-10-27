import Particle from './particle';

class Boom {
  particleList = [];
  particleNumbers = 6;
  boomTimeGap = .1e3;
  boomTimer = 0;
  childList = [];
  rotate = 120;
  spread = 180;
  delayRange = 100;
  power = 3;
  con = null;

  constructor({ childList , container, boomNumber , rotate, spraed, delayRange, power = {}}) {
    this.childList = childList || [];
    this.con = container || null;
    this.particleNumbers = boomNumber || 6;
    this.rotate = rotate || 120;
    this.spread = spread || 180;
    this.delayRange = delayRange || 100;
    this.power = power || 3;
    this.createParticals(this.particalNumbers);
  }

  setContainer(con) {
    this.con = con;
  }

  createParticles(num) {
    for (let i = 0; i < num; i ++) {
      let particle = new Particle();
      particle.onAnimationEnd(() => {
        particle.deleteEl();
      });
      this.particleList.push(particle);
    }
  }

  boom() {
    let lastBoomTimer = this.boomTimer;
    let now = +new Date();
    if(now - lastBoomTimer < this.boomTimeGap){
        // console.warn("点的太快了");
        return;
    }
    this.boomTimer = now;
    
    
    console.warn("粒子总数:" , this.particleList.length)
    let boomNums = 0;
    // 在内存列表找，查找没有执行动画的粒子
    let unAnimateList = this.particleList.filter(partical => partical.animating == false);

    let childList = this.childList;
    let childListLength = childList.length;

    let rotate = this.rotate;
    let spread = this.spread;
    let delayRange = this.delayRange;
    let power = this.power;
    
    // 每有一个未执行动画的粒子，执行一次动画
    for(let particle of unAnimateList){
        if(boomNums >= this.particalNumbers) return ;
        
        boomNums++;
        let r = Math.random();
        // 设置粒子父容器
        particle.renderIn(this.con);
        // 随机选择粒子的slot内容
        particle.insertChild(childList[Math.floor(r * childListLength)].cloneNode(true));
        // 执行动画，在输入范围内随机角度、力度、延迟
        partic;e.animate({
            deg: (r * spread + rotate) % 360,
            pow: r * power + 1,
            delay: r * delayRange,
        });
    }
    // 如果粒子树木不够，则再次创建，防止下次不够用
    if(boomNums < this.particalNumbers){
        this.createParticals(this.particalNumbers - boomNums);
    }
  }
}

export default Boom;
