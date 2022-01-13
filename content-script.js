const button = document.createElement('button');
document.body.appendChild(button);
button.style.position = 'fixed';
button.style.right = '50px';
button.style.bottom = '50px';
button.style.width = '100px';
button.style.height = '100px';
button.style.display = 'flex';
button.style.backgroundColor = '#34d058';
button.style.zIndex = '9999';
button.style.borderRadius = '50%';
button.style.boxShadow = '0 0 5px black';
button.style.color = 'white';
button.style.justifyContent = 'center';
button.style.alignItems = 'center';
button.innerText = 'LGTM';

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
});
