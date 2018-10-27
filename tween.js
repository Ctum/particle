/** Tween.js
* t: current time（当前时间）；
* b: beginning value（初始值）；
* c: change in value（变化量）；
* d: duration（持续时间）。
* you can visit '缓动函数速查表' to get effect
*/            
   
const Quad = {
  easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
  },
  easeOut: function(t, b, c, d) {
      return -c *(t /= d)*(t-2) + b;  
  },
  easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t-2) - 1) + b;
  }
}
const Linear = function(t, b, c, d) { 
   return c * t / d + b; 
}
