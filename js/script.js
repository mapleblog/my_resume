// 导航菜单切换
// 页面刷新时滚动到顶部
window.onload = function() {
    window.scrollTo(0, 0);
};

// 确保在页面加载时也滚动到顶部
history.scrollRestoration = 'manual';

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // 如果href仅为#，滚动到页面顶部，否则滚动到指定元素
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // 尝试选择目标元素
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.warn('无效的选择器:', targetId);
            }
        }
        
        // 更新导航状态
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 滚动事件
window.addEventListener('scroll', function() {
    checkScroll();
});

// 导航切换
document.querySelector('.hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 技能进度条动画
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    let isFirstAnimation = true;
    
    // 重置所有技能条的宽度为0
    document.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = '0';
    });
    
    // 延迟一小段时间后应用宽度，以确保动画效果
    setTimeout(() => {
        skillItems.forEach((item, index) => {
            // 清除任何可能的内联样式
            item.removeAttribute('style');
            
            const skillFill = item.querySelector('.skill-fill');
            const percentage = item.getAttribute('data-skill');
            const delay = isFirstAnimation ? 300 + (index * 200) : index * 150;
            
            if (skillFill && percentage) {
                // 延迟每个技能条的动画，创造依次填充的效果
                setTimeout(() => {
                    // 确保初始宽度为0
                    skillFill.style.width = '0';
                    
                    // 使用requestAnimationFrame确保平滑过渡
                    requestAnimationFrame(() => {
                        // 添加一个小延迟以确保浏览器渲染周期
                        setTimeout(() => {
                            skillFill.style.width = percentage + '%';
                        }, 50);
                    });
                }, delay);
            }
        });
    }, 400);
    
    // 设置标志为非首次动画
    isFirstAnimation = false;
}

// 检查元素是否在视图中
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 检查滚动
function checkScroll() {
    // 更新导航状态
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // 添加动画
            if (!section.classList.contains('animated')) {
                section.classList.add('animated');
                const animatedElements = section.querySelectorAll('.fade-in, .slide-in');
                animatedElements.forEach(el => {
                    el.classList.add('active');
                });
            }
        }
    });
    
    // 技能进度条动画
    const skillsSection = document.querySelector('.skills');
    if (isElementInViewport(skillsSection)) {
        animateSkills();
    }

    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        // 立即添加visible类，不等待滚动
        item.classList.add('visible');
    });
    
    // 添加渐出效果函数
    function handleTimelineFadeEffect() {
        const timelineSection = document.getElementById('experience');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (!timelineSection || timelineItems.length === 0) return;
        
        const sectionTop = timelineSection.getBoundingClientRect().top;
        const sectionBottom = timelineSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // 如果时间线部分在视口内
        if (sectionTop < windowHeight && sectionBottom > 0) {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const itemCenter = itemTop + item.offsetHeight / 2;
                
                // 计算元素中心点与视口中心的距离
                const distanceFromCenter = Math.abs(itemCenter - windowHeight / 2);
                const maxDistance = windowHeight * 0.6; // 最大距离阈值
                
                if (distanceFromCenter > maxDistance) {
                    // 如果距离超过阈值，添加渐出效果
                    item.classList.add('fade-out');
                } else {
                    // 否则移除渐出效果
                    item.classList.remove('fade-out');
                }
            });
        }
    }
    
    // 初始调用一次渐出效果
    handleTimelineFadeEffect();
    
    // 滚动时触发渐出效果
    window.addEventListener('scroll', handleTimelineFadeEffect);

    // 项目卡片动画
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        }
    });
}

// 打字效果
function createTypingEffect(element, text, speed = 100, delay = 0) {
    // 清空元素内容
    element.textContent = '';
    element.classList.add('typing-text');
    
    // 开始打字效果
    setTimeout(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                // 打字效果完成后移除动画
                setTimeout(() => {
                    // 保持typing-text类以保持样式，不需要移除
                }, 1000);
            }
        }, speed);
    }, delay);
}

// 项目列表数据
const projectsData = {
    'tracker-tools': {
        title: 'Tracker Tools 项目列表',
        items: [
            { name: 'PDFMerger', tag: 'PDF工具', type: 'image', url: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', description: 'PDF合并工具可以将多个PDF文件合并为一个文件，支持文件排序、页面选择和文件压缩等功能。' },
            { name: 'Tracker Maintenance', tag: '维护工具', type: 'image', url: 'https://source.unsplash.com/random/800x600/?maintenance,tech' },
            { name: 'IP Scan Tools', tag: '网络扫描', type: 'image', url: 'https://source.unsplash.com/random/800x600/?network,security' }
        ]
    },
    'management-tools': {
        title: 'Management Tools 项目列表',
        items: [
            { name: 'IT 资产管理系统', tag: 'Assets', type: 'image', url: 'https://source.unsplash.com/random/800x600/?management,assets' },
            { name: '许可证管理系统', tag: 'Licenses', type: 'image', url: 'https://source.unsplash.com/random/800x600/?license,software' },
            { name: '用户权限管理系统', tag: 'Access', type: 'image', url: 'https://source.unsplash.com/random/800x600/?access,security' },
            { name: '帮助台管理系统', tag: 'Helpdesk', type: 'image', url: 'https://source.unsplash.com/random/800x600/?helpdesk,support' },
            { name: '配置管理数据库', tag: 'CMDB', type: 'image', url: 'https://source.unsplash.com/random/800x600/?database,config' }
        ]
    },
    'ai-tools': {
        title: 'AI Tools 项目列表',
        items: [
            { name: 'Claude 文本生成工具', tag: 'Text', type: 'image', url: 'https://source.unsplash.com/random/800x600/?ai,text' },
            { name: 'ChatGPT 对话工具', tag: 'Chat', type: 'image', url: 'https://source.unsplash.com/random/800x600/?chat,ai' },
            { name: 'Grok 数据分析工具', tag: 'Data', type: 'image', url: 'https://source.unsplash.com/random/800x600/?data,analysis' },
            { name: 'Windsurf 代码生成工具', tag: 'Code', type: 'image', url: 'https://source.unsplash.com/random/800x600/?code,programming' },
            { name: 'AI 图像生成工具', tag: 'Image', type: 'image', url: 'https://source.unsplash.com/random/800x600/?ai,image' }
        ]
    },
    'python-tools': {
        title: 'Python Tools 项目列表',
        items: [
            { name: '数据分析库', tag: 'Data', type: 'image', url: 'https://source.unsplash.com/random/800x600/?python,data' },
            { name: '测试框架', tag: 'Testing', type: 'image', url: 'https://source.unsplash.com/random/800x600/?testing,code' },
            { name: '文件处理库', tag: 'Files', type: 'image', url: 'https://source.unsplash.com/random/800x600/?files,document' },
            { name: 'API 客户端库', tag: 'API', type: 'image', url: 'https://source.unsplash.com/random/800x600/?api,web' },
            { name: '数据可视化库', tag: 'Viz', type: 'image', url: 'https://source.unsplash.com/random/800x600/?visualization,chart' },
	        { name: 'PDF合并工具', tag: 'Apps', type: 'image', url: 'https://source.unsplash.com/random/800x600/?pdf,tools' }
        ]
    }
};

// 获取模态框元素
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-list');
const closeModal = document.querySelector('.close-modal');

// 点击项目卡片或demo按钮打开模态框（同时支持新旧两种卡片样式）
document.querySelectorAll('.project-card, .masonry-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是按钮，不要重复触发
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            return;
        }
        
        const projectId = this.id;
        openProjectModal(projectId);
    });
});

// 点击demo按钮打开简单模态框
document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认行为
        console.log('点击了按钮:', this);
        
        const projectId = this.getAttribute('data-project');
        console.log('项目ID:', projectId);
        
        // 调用简单模态框显示函数
        openSimpleProjectModal(projectId);
    });
});

// 新的简单模态框相关元素
const simpleModal = document.getElementById('simple-project-modal');
const simpleModalTitle = document.getElementById('simple-modal-title');
const simpleModalList = document.getElementById('simple-modal-list');
const simpleModalClose = document.querySelector('.simple-modal-close');
const simpleModalOverlay = document.querySelector('.simple-modal-overlay');

// 打开简单项目模态框的函数
function openSimpleProjectModal(projectId) {
    try {
        // 获取项目数据
        const projectData = projectsData[projectId];
        console.log('项目数据:', projectData);
        
        if (!projectData) {
            console.error('找不到项目数据:', projectId);
            return;
        }
        
        // 设置模态框标题
        simpleModalTitle.textContent = projectData.title || '项目列表';
        
        // 创建项目列表内容
        let listHTML = '<ul>';
        
        if (Array.isArray(projectData.items) && projectData.items.length > 0) {
            projectData.items.forEach(item => {
                listHTML += `
                    <li>
                        <span class="simple-project-name">${item.name}</span>
                        <p>${item.description || ''}</p>
                        <span class="simple-project-tag">${item.tag}</span>
                    </li>
                `;
            });
        } else {
            listHTML += '<li><span class="simple-project-name">暂无项目数据</span></li>';
        }
        
        listHTML += '</ul>';
        simpleModalList.innerHTML = listHTML;
        
        // 显示模态框
        simpleModal.classList.add('active');
        
        console.log('简单模态框已显示');
    } catch (error) {
        console.error('打开简单模态框时出错:', error);
        alert('无法显示项目列表');
    }
}

// 关闭按钮点击事件
simpleModalClose.addEventListener('click', function() {
    simpleModal.classList.remove('active');
});

// 点击遮罩关闭模态框
simpleModalOverlay.addEventListener('click', function() {
    simpleModal.classList.remove('active');
});

// ESC键关闭模态框
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 确保在所有资源加载完成后也滚动到顶部
    window.onload = function() {
        window.scrollTo(0, 0);
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && simpleModal.classList.contains('active')) {
            simpleModal.classList.remove('active');
        }
    });
});

// 原来的模态框代码（保留，但不再使用）

// 打开项目模态框的函数
function openProjectModal(projectId) {
    console.log('正在打开模态框，项目ID:', projectId);
    
    try {
        // 检查模态框元素是否存在
        if (!modal || !modalTitle || !modalList) {
            console.error('模态框元素不存在:', { modal, modalTitle, modalList });
            return;
        }
        
        const projectData = projectsData[projectId];
        console.log('项目数据:', projectData);
        
        if (!projectData) {
            console.error('找不到项目数据:', projectId);
            return;
        }
        
        // 设置模态框标题
        modalTitle.textContent = projectData.title || '项目列表';
        
        // 创建项目列表
        let listHTML = '<ul class="project-list">';
        
        if (Array.isArray(projectData.items) && projectData.items.length > 0) {
            projectData.items.forEach((item, index) => {
                // 根据类型添加图标
                let iconClass = 'fa-file';  // 默认图标
                if (item.type === 'image') iconClass = 'fa-image';
                else if (item.type === 'pdf') iconClass = 'fa-file-pdf';
                else if (item.type === 'doc') iconClass = 'fa-file-alt';
                
                listHTML += `
                    <li class="project-item-animation">
                        <div class="project-list-item">
                            <div class="project-list-icon"><i class="fas ${iconClass}"></i></div>
                            <div class="project-list-content">
                                <span class="project-list-name">${item.name || '项目项'}</span>
                                <span class="project-list-tag" data-type="${item.type || 'text'}" data-url="${item.url || '#'}">${item.tag || '标签'}</span>
                            </div>
                        </div>
                    </li>
                `;
            });
        } else {
            // 如果没有项目项，显示默认消息
            listHTML += `
                <li class="project-item-animation">
                    <div class="project-list-item">
                        <div class="project-list-content">
                            <span class="project-list-name">暂无项目项</span>
                        </div>
                    </div>
                </li>
            `;
        }
        
        listHTML += '</ul>';
        modalList.innerHTML = listHTML;
        
        // 添加tag点击事件
        document.querySelectorAll('.project-list-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const url = this.getAttribute('data-url');
                
                if (type === 'image') {
                    // 显示图片预览
                    showImagePreview(url, this.textContent);
                } else if (type === 'pdf' || type === 'doc') {
                    // 下载文件
                    alert(`正在下载 ${this.textContent} 文件...`);
                }
            });
        });
        
        // 添加动画效果
        setTimeout(() => {
            document.querySelectorAll('.project-item-animation').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        }, 100);
        
        // 显示模态框 - 先设置显示，再添加动画类
        console.log('显示模态框');
        modal.style.display = 'block';
        
        // 使用requestAnimationFrame确保浏览器有时间处理显示
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.classList.add('show');
                console.log('模态框已显示');
            });
        });
    } catch (error) {
        console.error('打开模态框时出错:', error);
    }
}

// 点击关闭按钮关闭模态框
closeModal.addEventListener('click', closeModalFunction);

// 点击模态框外部关闭模态框
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModalFunction();
    }
});

// 关闭模态框函数
function closeModalFunction() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 按ESC键关闭模态框
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 确保在所有资源加载完成后也滚动到顶部
    window.onload = function() {
        window.scrollTo(0, 0);
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
});

// 显示图片预览 - 增强版本
function showImagePreview(url, title, description) {
    console.log('显示图片预览:', url, title);
    
    try {
        // 创建图片预览模态框
        const imageModal = document.createElement('div');
        imageModal.className = 'image-modal';
        
        const imageContent = document.createElement('div');
        imageContent.className = 'image-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-image-modal';
        closeBtn.innerHTML = '&times;';
        
        const imageTitle = document.createElement('h3');
        imageTitle.textContent = title || '图片预览';
        imageTitle.className = 'preview-title';
        
        // 添加项目标签
        const projectTag = document.createElement('div');
        projectTag.className = 'modal-project-tag';
        const projectType = getProjectTypeByName(title);
        if (projectType) {
            projectTag.textContent = projectType;
        }
        
        // 添加项目描述
        const projectDescription = document.createElement('div');
        projectDescription.className = 'modal-project-description';
        if (description) {
            projectDescription.textContent = description;
        }
        
        // 添加图片容器，支持缩放和拖动
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const image = document.createElement('img');
        image.src = url;
        image.alt = title || '项目图片';
        image.className = 'preview-image';
        image.onerror = function() {
            // 图片加载失败时显示错误信息
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20fill%3D%22%23f5f5f5%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3E图片无法加载%3C%2Ftext%3E%3C%2Fsvg%3E';
            console.error('图片加载失败:', url);
        };
        
        // 添加缩放控制按钮
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        
        const zoomIn = document.createElement('button');
        zoomIn.className = 'zoom-btn zoom-in';
        zoomIn.innerHTML = '<i class="fas fa-search-plus"></i>';
        zoomIn.title = '放大';
        
        const zoomOut = document.createElement('button');
        zoomOut.className = 'zoom-btn zoom-out';
        zoomOut.innerHTML = '<i class="fas fa-search-minus"></i>';
        zoomOut.title = '缩小';
        
        const resetZoom = document.createElement('button');
        resetZoom.className = 'zoom-btn reset-zoom';
        resetZoom.innerHTML = '<i class="fas fa-undo"></i>';
        resetZoom.title = '重置';
        
        zoomControls.appendChild(zoomIn);
        zoomControls.appendChild(zoomOut);
        zoomControls.appendChild(resetZoom);
        
        imageContainer.appendChild(image);
        
        imageContent.appendChild(closeBtn);
        imageContent.appendChild(imageTitle);
        if (projectTag.textContent) {
            imageContent.appendChild(projectTag);
        }
        if (description) {
            imageContent.appendChild(projectDescription);
        }
        imageContent.appendChild(imageContainer);
        imageContent.appendChild(zoomControls);
        
        imageModal.appendChild(imageContent);
        document.body.appendChild(imageModal);
        
        // 显示图片预览
        setTimeout(() => {
            imageModal.classList.add('show');
        }, 10);
        
        // 图片缩放功能
        let scale = 1;
        const scaleStep = 0.1;
        
        zoomIn.addEventListener('click', () => {
            scale += scaleStep;
            image.style.transform = `scale(${scale})`;
        });
        
        zoomOut.addEventListener('click', () => {
            if (scale > scaleStep) {
                scale -= scaleStep;
                image.style.transform = `scale(${scale})`;
            }
        });
        
        resetZoom.addEventListener('click', () => {
            scale = 1;
            image.style.transform = 'scale(1)';
            image.style.transition = 'transform 0.3s ease';
        });
        
        // 关闭图片预览模态框
        closeBtn.addEventListener('click', () => {
            imageModal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(imageModal);
            }, 300);
        });
        
        // 点击图片预览模态框外部关闭
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(imageModal);
                }, 300);
            }
        });
        
        // 支持键盘操作
        document.addEventListener('keydown', function handleKeyDown(e) {
            if (imageModal.classList.contains('show')) {
                if (e.key === 'Escape') {
                    imageModal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(imageModal);
                        document.removeEventListener('keydown', handleKeyDown);
                    }, 300);
                } else if (e.key === '+' || e.key === '=') {
                    scale += scaleStep;
                    image.style.transform = `scale(${scale})`;
                } else if (e.key === '-') {
                    if (scale > scaleStep) {
                        scale -= scaleStep;
                        image.style.transform = `scale(${scale})`;
                    }
                } else if (e.key === '0') {
                    scale = 1;
                    image.style.transform = 'scale(1)';
                }
            }
        });
    } catch (error) {
        console.error('显示图片预览时出错:', error);
        alert('无法显示图片预览');
    }
}

// 获取项目类型
function getProjectTypeByName(projectName) {
    // 遍历所有项目数据查找匹配的项目类型
    for (const categoryId in projectsData) {
        const category = projectsData[categoryId];
        for (const item of category.items) {
            if (item.name === projectName) {
                return item.tag;
            }
        }
    }
    return null;
}

// 初始化项目名称点击事件
function initProjectNameClickEvents() {
    const projectNames = document.querySelectorAll('.project-name');
    
    projectNames.forEach(nameElement => {
        const projectName = nameElement.textContent;
        nameElement.classList.add('clickable');
        
        // 判断是否是PDFMerger项目，如果是则添加特殊样式
        if (projectName === 'PDFMerger') {
            nameElement.classList.add('highlight-project');
        }
        
        // 添加点击提示
        const tooltip = document.createElement('span');
        tooltip.className = 'name-tooltip';
        tooltip.textContent = '点击查看详情';
        nameElement.appendChild(tooltip);
        
        nameElement.addEventListener('click', () => {
            // 查找项目数据
            const parentCard = nameElement.closest('.masonry-card');
            if (!parentCard) return;
            
            const cardId = parentCard.id;
            const projectData = projectsData[cardId];
            
            if (projectData) {
                const item = projectData.items.find(item => item.name === projectName);
                if (item && item.url && item.type === 'image') {
                    // 添加点击动画效果
                    nameElement.classList.add('clicked');
                    setTimeout(() => {
                        nameElement.classList.remove('clicked');
                    }, 300);
                    
                    // 显示预览，并传入描述信息
                    showImagePreview(item.url, item.name, item.description);
                } else {
                    console.log('项目没有图片或不是图片类型:', projectName);
                    alert('该项目暂无图片预览');
                }
            }
        });
    });
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    // 技能进度条动画 - 立即执行一次，不等待滚动
    animateSkills();
    // 为了确保进度条显示，再次延迟执行
    setTimeout(animateSkills, 500);
    
    // 为所有项目名称添加点击事件
    initProjectNameClickEvents();
    
    // 打字效果
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach((element, index) => {
        const originalText = element.textContent;
        createTypingEffect(element, originalText, 100, index * 1000);
    });
});