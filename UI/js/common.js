const modalContainer = document.querySelector('.modal-container');

const hideModal = () => {
    document.querySelector('.modal-content').classList.remove('active');        
    setTimeout(() => {
        modalContainer.classList.remove('active');
    },450)
}

document.querySelector('.hide-modal').addEventListener('click',hideModal);

modalContainer.addEventListener('click',(e) => {
    if(e.path[0] === modalContainer){
        hideModal();
    }
})
