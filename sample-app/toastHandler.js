export const openToast = (message, action) => {
  const toast = document.getElementById('toast');
  if (action === 'show') {
    toast.classList.add('show');
    const toastBody = document.getElementById('toast-body');
    toastBody.innerText = message;
  } else {
    toast.classList.remove('show');
  }
};
