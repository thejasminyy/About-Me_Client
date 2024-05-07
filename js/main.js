/**
 * HTML結構解析完成後立即執行的程式碼
 */
document.addEventListener('DOMContentLoaded', function () {
  //生成經歷區塊左側時間軸
  createHistoryLine();

  window.addEventListener('resize', function () {
    createHistoryLine();
  });

  //語言切換
  const thisLan = localStorage.getItem('language');
  const lanBtns = document.querySelectorAll('.langrage-wrap > div');
  lanBtns.forEach((lanBtn) => {
    //語言按鈕燈亮
    if (lanBtn.dataset.lan == thisLan) lanBtn.classList.add('this-lan');
    else lanBtn.classList.add('other-lan');
    //語言切換事件
    lanBtn.addEventListener('click', channgeLanguage);
  });

  //附錄圖片超連結
  const appendixs = document.querySelectorAll('.appendix-object > .photo-img');
  appendixs.forEach((appendix) => {
    appendix.addEventListener('click', openPhoto);
  });
});

/**
 * 圖片等資源全部載入完才執行的程式碼
 */
window.onload = function () {
  //彈跳視窗按紐
  const linkBtns = document.querySelectorAll('.link-btn');
  linkBtns.forEach((btn) => {
    btn.src = 'img/link-solid.svg';
    btn.addEventListener('click', openLinkWrap);
  });

  //關閉彈掉視窗按紐
  const closeBtns = document.querySelectorAll('.close-btn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeLinkWrap);
  });

  //切換照片按紐
  const switchBtns = document.querySelectorAll('.switch-btn');
  switchBtns.forEach((btn) => {
    btn.addEventListener('click', switchNextPage);
  });

  //圖片超連結
  const photos = document.querySelectorAll('.photo-object > .photo-img');
  photos.forEach((photo) => {
    photo.addEventListener('click', openPhoto);
  });
};

/**
 * 開啟彈跳視窗
 */
function openLinkWrap() {
  const id = this.dataset.id;
  if (id != null) {
    const wrap = document.querySelector(`.flow-cover[data-id='${id}']`);
    wrap.classList.remove('hidden-wrap');
  }
}

/**
 * 關閉彈跳視窗
 */
function closeLinkWrap() {
  const wraps = document.querySelectorAll(`.flow-cover`);
  wraps.forEach((wrap) => {
    wrap.classList.add('hidden-wrap');
  });
}

/**
 * 切換照片
 */
function switchNextPage() {
  const photoWrap = this.parentNode.querySelector('.photo-wrap');
  if (photoWrap == null) return;
  const type = this.dataset.type;
  const children = photoWrap.children;
  const index = parseInt(photoWrap.dataset.index);
  const maxIndex = children.length - 1;
  let newIndex = 0;
  if (type == 'left') {
    newIndex = index <= 0 ? maxIndex : index - 1;
  } else {
    newIndex = index >= maxIndex ? 0 : index + 1;
  }

  photoWrap.dataset.index = newIndex;
  Array.from(children).forEach((child, i) => {
    if (i == newIndex) {
      child.classList.remove('hide');
    } else {
      child.classList.add('hide');
    }
  });
}

/**
 * 另開照片視窗
 */
function openPhoto() {
  const url = this.src;
  window.open(url, '_blank');
}

/**
 * 切換語言
 */
function channgeLanguage() {
  const newLan = this.dataset.lan;
  const thisLan = localStorage.getItem('language');
  if (newLan != thisLan) {
    const newPage = newLan == 'zh-tw' ? 'index.html' : `index_${newLan}.html`;
    const href = document.location.href;
    const thisPage = href.split('/')[href.split('/').length - 1];
    const newHref = thisPage == '' ? href + newPage : href.replace(thisPage, newPage);
    document.location.href = newHref;
  }
}

/**
 * 生成經歷區塊左側時間軸
 */
function createHistoryLine() {
  const jobWrap = document.querySelector('.job-wrap');
  const jobTitles = document.querySelectorAll('.job-title');
  if (jobWrap == null || jobTitles.length == 0) return;

  const oldhistoryLineWrap = document.querySelector('.history-line-wrap');
  if (oldhistoryLineWrap != null) oldhistoryLineWrap.remove();

  const historyLineWrap = document.createElement('div');
  historyLineWrap.classList = 'history-line-wrap';
  jobWrap.append(historyLineWrap);

  jobTitles.forEach((jobTitle, i) => {
    const historyPoint = document.createElement('div');
    historyPoint.classList = 'history-point';
    historyPoint.style.top = `calc(0.35rem + ${jobTitle.offsetTop}px)`;
    historyLineWrap.append(historyPoint);
  });

  const historyline = document.createElement('div');
  historyline.classList = 'history-line';
  historyline.style.height = `calc(${jobWrap.offsetHeight}px - 1.4rem)`;
  historyLineWrap.append(historyline);
}
