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
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
  
  function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
  
  function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  }
