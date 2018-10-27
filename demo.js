import Boom from './Boom';
let boomChildList = [];
for (let i = 0; i < 10; i ++) {
  let tempDom = document.createElement('div');
  tempDom.className = 'demoDom';
  tempDom.innerHTML = i;
  boomChildList.push(tempDom);
}

let boom = new Boom({
  childList: boomChildList,
  boomNumber: 6,
  rotate: 0,
  spraed: 360,
  delayRange: 100,
  power: 3
});
