document.addEventListener('DOMContentLoaded', (e) => {
  const stepSlide = document.querySelectorAll('.step-slide');

  if(stepSlide) {    
    const infoModal = document.querySelector('.info-modal');
    if (!infoModal) {
      return false;
    }
  
    const infoModalTitle = infoModal.querySelector('h3');
    const infoModalTxt = infoModal.querySelector('p');
    const infoModalClose = document.querySelector('.info_modal__close');
  
    if(infoModalClose) {
      infoModalClose.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('info_modal__close')) {
          infoModal.classList.remove('active');
        }
      });
    }
  
    document.addEventListener('click', (e) => {
      if (infoModal.contains(e.target) && infoModal.classList.contains('active') && !e.target.classList.contains('info_modal__main')) {
        infoModal.classList.remove('active');
      }
    });
  
    stepSlide.forEach(slide => {
      const stepLink = slide.querySelector('.step_slide--link');
      const nameCard = stepLink.dataset.name;
      const txtCard = stepLink.dataset.txt;
  
      stepLink.addEventListener('click', (e) => {
          if (nameCard && txtCard) {
              infoModalTitle.innerHTML = nameCard;
              infoModalTxt.innerHTML = txtCard;
          }
  
          infoModal.classList.add('active');
      });
    });
  }
});
