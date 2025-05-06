// 经历部分交互效果脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库（如果已加载）
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true
        });
    }

    // 实现展开/收起功能
    initToggleButtons();
    
    // 添加画布元素动画
    animateCanvasElements();
});

// 初始化展开/收起按钮功能
function initToggleButtons() {
    const toggleButtons = document.querySelectorAll('.exp-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前卡片的隐藏内容
            const card = this.closest('.experience-card-content');
            const hiddenItems = card.querySelectorAll('.exp-more-item.hidden');
            const visibleItems = card.querySelectorAll('.exp-more-item:not(.hidden)');
            
            // 切换按钮状态
            this.classList.toggle('active');
            
            // 如果有隐藏内容，则展开
            if (hiddenItems.length > 0) {
                hiddenItems.forEach(item => item.classList.remove('hidden'));
                this.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
            } else {
                // 否则收起内容
                visibleItems.forEach((item, index) => {
                    // 第一个不隐藏，其他隐藏
                    if (index > 0) {
                        item.classList.add('hidden');
                    }
                });
                this.innerHTML = '显示更多 <i class="fas fa-chevron-down"></i>';
            }
        });
    });
}

// 画布元素动画函数
function animateCanvasElements() {
    const canvasElements = document.querySelectorAll('.canvas-element');
    
    canvasElements.forEach(element => {
        // 随机生成初始位置偏移
        const randomX = Math.random() * 20 - 10; // -10 到 10 之间的随机值
        const randomY = Math.random() * 20 - 10; // -10 到 10 之间的随机值
        
        // 应用随机偏移
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}
