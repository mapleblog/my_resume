// 导航菜单切换
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
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(skill => {
        const percentage = skill.getAttribute('data-progress') || skill.getAttribute('data-width');
        skill.style.width = percentage + '%';
    });
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
        if (isElementInViewport(item)) {
            item.classList.add('visible');
        }
    });

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
            { name: 'PDFMerger', tag: 'PDF工具', type: 'image', url: 'C:\\Users\\HostDemo\\Pictures\\disneyland-paris.jpg' },
            { name: 'Tracker Maintenance', tag: '维护工具', type: 'image', url: 'C:\\Users\\HostDemo\\Pictures\\disneyland-paris.jpg' },
            { name: 'IP Scan Tools', tag: '网络扫描', type: 'image', url: 'C:\\Users\\HostDemo\\Pictures\\disneyland-paris.jpg' }
        ]
    },
    'management-tools': {
        title: 'Management Tools 项目列表',
        items: [
            { name: 'IT 资产管理系统', tag: 'Assets', type: 'image', url: 'D:\\Users\\chris\\Pictures\\it_management_tools.webp' },
            { name: '许可证管理系统', tag: 'Licenses', type: 'pdf', url: '#' },
            { name: '用户权限管理系统', tag: 'Access', type: 'doc', url: '#' },
            { name: '帮助台管理系统', tag: 'Helpdesk', type: 'image', url: 'D:\\Users\\chris\\Pictures\\it_management_tools.webp' },
            { name: '配置管理数据库', tag: 'CMDB', type: 'pdf', url: '#' }
        ]
    },
    'ai-tools': {
        title: 'AI Tools 项目列表',
        items: [
            { name: 'Claude 文本生成工具', tag: 'Text', type: 'image', url: 'D:\\Users\\chris\\Pictures\\ai_apps.webp' },
            { name: 'ChatGPT 对话工具', tag: 'Chat', type: 'pdf', url: '#' },
            { name: 'Grok 数据分析工具', tag: 'Data', type: 'doc', url: '#' },
            { name: 'Windsurf 代码生成工具', tag: 'Code', type: 'image', url: 'D:\\Users\\chris\\Pictures\\ai_apps.webp' },
            { name: 'AI 图像生成工具', tag: 'Image', type: 'pdf', url: '#' }
        ]
    },
    'python-tools': {
        title: 'Python Tools 项目列表',
        items: [
            { name: '数据分析库', tag: 'Data', type: 'image', url: 'D:\\Users\\chris\\Pictures\\python_tools_cover.webp' },
            { name: '测试框架', tag: 'Testing', type: 'pdf', url: '#' },
            { name: '文件处理库', tag: 'Files', type: 'doc', url: '#' },
            { name: 'API 客户端库', tag: 'API', type: 'image', url: 'D:\\Users\\chris\\Pictures\\python_tools_cover.webp' },
            { name: '数据可视化库', tag: 'Viz', type: 'pdf', url: '#' },
	        { name: 'PDF合并工具', tag: 'Apps', type: 'doc', url: '#' }
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
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && simpleModal.classList.contains('active')) {
        simpleModal.classList.remove('active');
    }
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
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunction();
    }
});

// 显示图片预览
function showImagePreview(url, title) {
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
        
        const image = document.createElement('img');
        image.src = url;
        image.alt = title || '项目图片';
        image.onerror = function() {
            // 图片加载失败时显示错误信息
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20fill%3D%22%23f5f5f5%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3E图片无法加载%3C%2Ftext%3E%3C%2Fsvg%3E';
            console.error('图片加载失败:', url);
        };
        
        imageContent.appendChild(closeBtn);
        imageContent.appendChild(imageTitle);
        imageContent.appendChild(image);
        imageModal.appendChild(imageContent);
        
        document.body.appendChild(imageModal);
        
        // 显示图片预览
        setTimeout(() => {
            imageModal.classList.add('show');
        }, 10);
        
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
    } catch (error) {
        console.error('显示图片预览时出错:', error);
        alert('无法显示图片预览');
    }
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    // 技能进度条动画
    setTimeout(animateSkills, 1000);
    
    // 打字效果
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach((element, index) => {
        const originalText = element.textContent;
        createTypingEffect(element, originalText, 100, index * 1000);
    });
});