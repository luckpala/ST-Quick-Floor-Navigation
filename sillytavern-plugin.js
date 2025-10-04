// SillyTavern专用快速定位楼层插件
// 针对SillyTavern环境优化

(function() {
    'use strict';
    
    console.log('🎯 SillyTavern快速定位楼层插件启动中...');
    
    // 等待SillyTavern完全加载
    function waitForSillyTavern() {
        return new Promise((resolve) => {
            if (window.SillyTavern || document.querySelector('#chat')) {
                resolve();
            } else {
                const checkInterval = setInterval(() => {
                    if (window.SillyTavern || document.querySelector('#chat')) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            }
        });
    }
    
    // 创建插件按钮
    function createPluginButtons() {
        console.log('创建SillyTavern专用按钮...');
        
        // 移除现有按钮
        const existing = document.getElementById('st-quick-nav');
        if (existing) {
            existing.remove();
        }
        
        // 创建按钮容器
        const container = document.createElement('div');
        container.id = 'st-quick-nav';
        container.className = 'st-quick-nav-container';
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .st-quick-nav-container {
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                z-index: 10000 !important;
                background: rgba(0, 0, 0, 0.85) !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px !important;
                padding: 12px !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 6px !important;
                min-width: 100px !important;
            }
            
            .st-quick-nav-container .nav-title {
                color: white !important;
                font-size: 11px !important;
                font-weight: 600 !important;
                text-align: center !important;
                margin-bottom: 4px !important;
                opacity: 0.9 !important;
            }
            
            .st-quick-nav-container .nav-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                border: none !important;
                color: white !important;
                padding: 6px 10px !important;
                border-radius: 5px !important;
                cursor: pointer !important;
                font-size: 11px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 4px !important;
                min-height: 28px !important;
            }
            
            .st-quick-nav-container .nav-button:hover {
                transform: translateY(-1px) !important;
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4) !important;
            }
            
            .st-quick-nav-container .nav-button:active {
                transform: translateY(0) !important;
            }
            
            .st-quick-nav-container .floor-info {
                background: rgba(255, 255, 255, 0.1) !important;
                color: white !important;
                padding: 4px 6px !important;
                border-radius: 3px !important;
                font-size: 10px !important;
                text-align: center !important;
                margin-top: 2px !important;
            }
        `;
        
        if (!document.querySelector('#st-quick-nav-style')) {
            style.id = 'st-quick-nav-style';
            document.head.appendChild(style);
        }
        
        // 添加标题
        const title = document.createElement('div');
        title.className = 'nav-title';
        title.textContent = '🎯 楼层导航';
        container.appendChild(title);
        
        // 创建按钮
        const buttonConfigs = [
            { text: '顶部', icon: '⬆️', action: goToTop },
            { text: '上移', icon: '⬆', action: goUp },
            { text: '下移', icon: '⬇', action: goDown },
            { text: '底部', icon: '⬇️', action: goToBottom },
            { text: '跳转', icon: '🎯', action: showFloorInput }
        ];
        
        buttonConfigs.forEach(config => {
            const button = document.createElement('button');
            button.className = 'nav-button';
            button.innerHTML = `<span>${config.icon}</span>${config.text}`;
            button.title = config.text;
            button.addEventListener('click', config.action);
            container.appendChild(button);
        });
        
        // 添加楼层信息
        const floorInfo = document.createElement('div');
        floorInfo.className = 'floor-info';
        floorInfo.id = 'st-floor-info';
        floorInfo.textContent = '楼层: 0/0';
        container.appendChild(floorInfo);
        
        // 添加到页面
        document.body.appendChild(container);
        
        console.log('✅ SillyTavern按钮已创建');
        return container;
    }
    
    // 查找聊天容器
    function findChatContainer() {
        const selectors = [
            '#chat',
            '.chat-container',
            '.chat',
            '[class*="chat"]',
            '.messages-container',
            '.message-container'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log('找到聊天容器:', selector);
                return element;
            }
        }
        
        console.log('使用body作为聊天容器');
        return document.body;
    }
    
    // 获取消息元素
    function getMessageElements() {
        const chatContainer = findChatContainer();
        const selectors = [
            '.mes',
            '.message',
            '[class*="message"]',
            '[class*="mes"]'
        ];
        
        for (const selector of selectors) {
            const elements = chatContainer.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`找到 ${elements.length} 条消息 (${selector})`);
                return Array.from(elements);
            }
        }
        
        console.log('未找到消息元素');
        return [];
    }
    
    // 更新楼层信息
    function updateFloorInfo() {
        const messages = getMessageElements();
        const totalFloors = messages.length;
        
        let currentFloor = 0;
        if (messages.length > 0) {
            const containerRect = document.body.getBoundingClientRect();
            const containerCenter = containerRect.top + containerRect.height / 2;
            
            let closestDistance = Infinity;
            messages.forEach((message, index) => {
                const messageRect = message.getBoundingClientRect();
                const messageCenter = messageRect.top + messageRect.height / 2;
                const distance = Math.abs(messageCenter - containerCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    currentFloor = index + 1;
                }
            });
        }
        
        const floorInfo = document.getElementById('st-floor-info');
        if (floorInfo) {
            floorInfo.textContent = `楼层: ${currentFloor}/${totalFloors}`;
        }
    }
    
    // 跳转到顶部
    function goToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('跳转到顶部');
    }
    
    // 跳转到底部
    function goToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        console.log('跳转到底部');
    }
    
    // 向上滚动
    function goUp() {
        window.scrollBy({ top: -200, behavior: 'smooth' });
        console.log('向上滚动');
    }
    
    // 向下滚动
    function goDown() {
        window.scrollBy({ top: 200, behavior: 'smooth' });
        console.log('向下滚动');
    }
    
    // 显示楼层输入框
    function showFloorInput() {
        const messages = getMessageElements();
        if (messages.length === 0) {
            alert('未找到消息，无法跳转');
            return;
        }
        
        const floorNumber = prompt(`请输入要跳转的楼层 (1-${messages.length}):`);
        if (floorNumber === null) return;
        
        const targetFloor = parseInt(floorNumber);
        if (isNaN(targetFloor) || targetFloor < 1 || targetFloor > messages.length) {
            alert(`无效的楼层号，请输入 1-${messages.length} 之间的数字`);
            return;
        }
        
        const targetMessage = messages[targetFloor - 1];
        targetMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log(`跳转到第${targetFloor}层`);
    }
    
    // 绑定键盘事件
    function bindKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            const ctrl = event.ctrlKey || event.metaKey;
            if (!ctrl) return;
            
            switch (event.key) {
                case 'Home':
                    event.preventDefault();
                    goToTop();
                    break;
                case 'End':
                    event.preventDefault();
                    goToBottom();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    goUp();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    goDown();
                    break;
                case 'g':
                case 'G':
                    event.preventDefault();
                    showFloorInput();
                    break;
            }
        });
        
        console.log('键盘事件已绑定');
    }
    
    // 监听消息变化
    function observeMessages() {
        const chatContainer = findChatContainer();
        if (!chatContainer) return;
        
        const observer = new MutationObserver(() => {
            setTimeout(updateFloorInfo, 100);
        });
        
        observer.observe(chatContainer, {
            childList: true,
            subtree: true
        });
        
        console.log('消息监听已启动');
    }
    
    // 初始化插件
    async function initPlugin() {
        try {
            await waitForSillyTavern();
            console.log('SillyTavern已加载，初始化插件...');
            
            createPluginButtons();
            bindKeyboardEvents();
            observeMessages();
            
            // 延迟更新楼层信息
            setTimeout(updateFloorInfo, 1000);
            
            console.log('✅ SillyTavern快速定位楼层插件初始化完成');
            
        } catch (error) {
            console.error('插件初始化失败:', error);
        }
    }
    
    // 导出插件接口
    window.SillyTavernQuickNav = {
        init: initPlugin,
        updateInfo: updateFloorInfo,
        goToTop,
        goToBottom,
        goUp,
        goDown,
        showFloorInput
    };
    
    // 自动初始化
    initPlugin();
    
})();



