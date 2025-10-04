// 修复版本的快速定位楼层插件
// 解决按键没有效果的问题

(function() {
    'use strict';
    
    console.log('🔧 修复版本插件启动中...');
    
    // 移除现有按钮
    const existing = document.getElementById('quick-floor-nav-test');
    if (existing) {
        existing.remove();
        console.log('移除现有按钮');
    }
    
    // 创建修复版本的按钮
    function createFixedButtons() {
        console.log('创建修复版本按钮...');
        
        // 创建按钮容器
        const container = document.createElement('div');
        container.id = 'quick-floor-nav-fixed';
        container.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 999999 !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            padding: 15px !important;
            border-radius: 10px !important;
            font-family: Arial, sans-serif !important;
            font-size: 14px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            min-width: 120px !important;
        `;
        
        // 创建标题
        const title = document.createElement('div');
        title.textContent = '🎯 楼层导航';
        title.style.cssText = 'text-align: center !important; font-weight: bold !important; margin-bottom: 5px !important; font-size: 12px !important;';
        container.appendChild(title);
        
        // 查找聊天容器的函数
        function findChatContainer() {
            const selectors = [
                '#chat',
                '.chat-container', 
                '.chat',
                '[class*="chat"]',
                '.messages-container',
                '.message-container',
                '.conversation-container'
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
        
        // 获取消息元素的函数
        function getMessageElements() {
            const chatContainer = findChatContainer();
            const selectors = [
                '.mes',
                '.message',
                '[class*="message"]',
                '[class*="mes"]',
                '.chat-message',
                '.msg'
            ];
            
            for (const selector of selectors) {
                const elements = chatContainer.querySelectorAll(selector);
                if (elements.length > 0) {
                    console.log(`找到 ${elements.length} 条消息 (${selector})`);
                    return Array.from(elements);
                }
            }
            
            console.log('未找到消息元素，使用所有可滚动元素');
            return Array.from(chatContainer.querySelectorAll('*')).filter(el => 
                el.offsetHeight > 50 && el.offsetWidth > 100
            );
        }
        
        // 跳转到顶部
        function goToTop() {
            console.log('执行跳转到顶部...');
            try {
                // 尝试多种滚动方式
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // 如果页面没有滚动，尝试滚动聊天容器
                const chatContainer = findChatContainer();
                if (chatContainer && chatContainer !== document.body) {
                    chatContainer.scrollTop = 0;
                }
                
                console.log('✅ 跳转到顶部完成');
            } catch (error) {
                console.error('跳转到顶部失败:', error);
            }
        }
        
        // 跳转到底部
        function goToBottom() {
            console.log('执行跳转到底部...');
            try {
                // 尝试多种滚动方式
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                
                // 如果页面没有滚动，尝试滚动聊天容器
                const chatContainer = findChatContainer();
                if (chatContainer && chatContainer !== document.body) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
                
                console.log('✅ 跳转到底部完成');
            } catch (error) {
                console.error('跳转到底部失败:', error);
            }
        }
        
        // 向上滚动
        function goUp() {
            console.log('执行向上滚动...');
            try {
                const scrollAmount = 200;
                
                // 尝试多种滚动方式
                window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                
                // 如果页面没有滚动，尝试滚动聊天容器
                const chatContainer = findChatContainer();
                if (chatContainer && chatContainer !== document.body) {
                    chatContainer.scrollTop = Math.max(0, chatContainer.scrollTop - scrollAmount);
                }
                
                console.log('✅ 向上滚动完成');
            } catch (error) {
                console.error('向上滚动失败:', error);
            }
        }
        
        // 向下滚动
        function goDown() {
            console.log('执行向下滚动...');
            try {
                const scrollAmount = 200;
                
                // 尝试多种滚动方式
                window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                
                // 如果页面没有滚动，尝试滚动聊天容器
                const chatContainer = findChatContainer();
                if (chatContainer && chatContainer !== document.body) {
                    const maxScroll = chatContainer.scrollHeight - chatContainer.clientHeight;
                    chatContainer.scrollTop = Math.min(maxScroll, chatContainer.scrollTop + scrollAmount);
                }
                
                console.log('✅ 向下滚动完成');
            } catch (error) {
                console.error('向下滚动失败:', error);
            }
        }
        
        // 跳转到指定楼层
        function showFloorInput() {
            console.log('显示楼层输入框...');
            try {
                const messages = getMessageElements();
                if (messages.length === 0) {
                    alert('未找到消息元素，无法跳转');
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
                if (targetMessage) {
                    // 尝试多种滚动到元素的方式
                    targetMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // 备用方案：直接设置滚动位置
                    setTimeout(() => {
                        const rect = targetMessage.getBoundingClientRect();
                        const scrollTop = window.pageYOffset + rect.top - window.innerHeight / 2;
                        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    }, 100);
                    
                    console.log(`✅ 跳转到第${targetFloor}层完成`);
                } else {
                    alert('目标楼层不存在');
                }
            } catch (error) {
                console.error('跳转楼层失败:', error);
            }
        }
        
        // 创建按钮
        const buttons = [
            { text: '⬆️ 顶部', action: goToTop },
            { text: '⬆ 上移', action: goUp },
            { text: '⬇ 下移', action: goDown },
            { text: '⬇️ 底部', action: goToBottom },
            { text: '🎯 跳转', action: showFloorInput }
        ];
        
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.text;
            button.style.cssText = `
                background: rgba(255, 255, 255, 0.2) !important;
                border: none !important;
                color: white !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                font-size: 12px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
                min-width: 80px !important;
            `;
            
            // 添加悬停效果
            button.addEventListener('mouseenter', () => {
                button.style.background = 'rgba(255, 255, 255, 0.3)';
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'rgba(255, 255, 255, 0.2)';
                button.style.transform = 'translateY(0)';
            });
            
            // 绑定点击事件
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`点击按钮: ${btn.text}`);
                btn.action();
            });
            
            container.appendChild(button);
        });
        
        // 添加楼层信息显示
        const floorInfo = document.createElement('div');
        floorInfo.id = 'floor-info-fixed';
        floorInfo.style.cssText = `
            background: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
            padding: 6px 8px !important;
            border-radius: 4px !important;
            font-size: 11px !important;
            text-align: center !important;
            margin-top: 5px !important;
        `;
        floorInfo.textContent = '楼层: 0/0';
        container.appendChild(floorInfo);
        
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
            
            floorInfo.textContent = `楼层: ${currentFloor}/${totalFloors}`;
        }
        
        // 监听滚动事件
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateFloorInfo, 100);
        });
        
        // 添加到页面
        document.body.appendChild(container);
        
        // 初始更新
        setTimeout(updateFloorInfo, 500);
        
        console.log('✅ 修复版本按钮已创建');
        console.log('按钮元素:', container);
        
        // 返回控制对象
        window.QuickFloorFixed = {
            container: container,
            updateInfo: updateFloorInfo,
            remove: () => container.remove(),
            test: () => {
                console.log('测试按钮功能...');
                goToTop();
                setTimeout(() => goToBottom(), 1000);
            }
        };
        
        return container;
    }
    
    // 创建按钮
    createFixedButtons();
    
})();



