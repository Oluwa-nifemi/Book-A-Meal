document.querySelectorAll('.tabs-button').forEach((e) => {
    e.addEventListener('click',() => {
        document.querySelector('.tabs-button.active').classList.remove('active');
        e.classList.add('active');
        document.querySelector('.tab.active').classList.remove('active');
        const target = e.dataset.target;
        document.querySelector(`.${target}`).classList.add('active');
        if(target === 'pending'){
            document.querySelector('.indicator.right').classList.remove('right')
        }else{
            document.querySelector('.indicator').classList.add('right')            
        }
    })
})

document.querySelectorAll('.delete').forEach((e) => {
    e.addEventListener('click',() => {
        modalContainer.classList.add('active');
        setTimeout(() => {
            document.querySelector('.modal-content').classList.add('active');        
        },50)
    })
})

document.querySelector('.cancel').addEventListener('click',hideModal);