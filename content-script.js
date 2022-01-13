const button = document.createElement('button');
document.body.appendChild(button);
button.style.cssText = `
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 9999;
    background-color: rgb(40, 167, 69);
    color: #fff;
    padding: 12px 24px;
    text-align: center;
    border-radius: 2em;
    line-height: 20px;
    font-weight: 500;
    font-size: 20px;
    border: none;
    box-shadow: 2px 3px 3px #e1e3e6;
`;
button.innerText = 'LGTM!';

function addReview() {
  const reviewEle = document.getElementById('pull_request_review_body');
  const approveCheckbox = document.querySelector(
    'input[name="pull_request_review[event]"][value="approve"]',
  );
  if (!reviewEle || !approveCheckbox) return;

  reviewEle.value = 'LGTM';
  approveCheckbox.click();
  document.querySelectorAll("button[type='submit']").forEach((btn) => {
    if (btn.innerHTML.toLowerCase().includes('submit review')) {
      btn.click();
    }
  });
}

function validatePRState() {
  const stateElement = document.querySelector('.State');
  if (!stateElement) return false;

  const state = stateElement.innerText;
  if (state.toLowerCase().trim() === 'open') {
    return true;
  }
  return false;
}

function handleReview() {
  const currentUrl = window.location.pathname;
  if (currentUrl.endsWith('/files')) {
    addReview();
    return;
  }

  const reviewUrl = window.location.origin + currentUrl + '/files#auto-review';
  window.location.href = reviewUrl;
}

button.addEventListener('click', function () {
  const isValidState = validatePRState();
  if (isValidState) {
    handleReview();
  }
});

window.addEventListener('load', () => {
  const currentUrl = window.location.href;
  if (currentUrl.endsWith('/files#auto-review')) {
    addReview();
  }

  document.addEventListener('keypress', (e) => {
    // Ctrl + L
    if(e.key === 'l' && e.ctrlKey === true) {
      addReview();
  }
  })
});

