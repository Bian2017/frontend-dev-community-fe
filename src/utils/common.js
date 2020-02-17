const getParam = (name, url) => {
  // eslint-disable-next-line no-restricted-globals
  if (!url) url = location.href;

  name = name.replace(/[\\[]/, "\\\\[").replace(/[\]]/, "\\\\]");
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);

  return results === null ? null : results[1];
};

// 获取元素要滚动的高度
const getElementY = elem => {
  // pageYOffset: 返回当前页面相对于窗口显示区左上角的 Y 位置。即滚动条当前的位置，表示已滚动多少
  // getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。此处即获取元素距离窗口顶部的位置
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top;
};

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 */
const scrollToElem = (elem, duration, offset) => {
  const startingY = window.pageYOffset; // 窗体位置
  const elementY = getElementY(elem); // 元素位置

  // 需要滚动的距离
  const diff = elementY - startingY + offset;
  if (!diff) return; // 如果diff 0 则不滚动

  /**
   * 如何让滚动变得丝滑
   * 缓动函数(https://easings.net/)，参考链接: https://gist.github.com/gre/1650294
   */
  const easing = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1); // easeInOutCubic

  let start; // 初始化滚动时间
  window.requestAnimationFrame(function step(timestamp) {
    // timestamp为系统产生的时间
    if (!start) start = timestamp;

    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);
    window.scrollTo(0, startingY + diff * percent); // 0是X轴，后面是Y轴

    // 一旦时间大于duration，则滚动停止
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

export { getParam, getElementY, scrollToElem };
