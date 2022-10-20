function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const startBtn = document.querySelector('button[data-start]');
  const stopBtn = document.querySelector('button[data-stop]');
  
  startBtn.addEventListener('click', onStartBtnClick);
  stopBtn.addEventListener('click', onStopBtnClick);
  
  let timerId = null;
  
  stopBtn.disabled = true;
  
  function onStartBtnClick() {
    timerId = setInterval(changeBackgroundColor, 1000);
    switchBtn(startBtn, stopBtn);
  }
  
  function onStopBtnClick() {
    clearInterval(timerId);
    switchBtn(startBtn, stopBtn);
  }
  
  function switchBtn(...buttons) {
    for (const btn of buttons) {
      if (btn.hasAttribute('disabled')) {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', '');
      }
    }
  }
  
  
  function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  }
