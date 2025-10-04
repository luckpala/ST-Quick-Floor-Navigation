// SillyTavern 快速楼层导航插件 - 直接显示完整功能
console.log('🎯 ST-Quick-Floor-Navigation 插件开始加载...');

// 立即执行，不等待任何条件
console.log('🎯 插件代码立即执行...');

// 创建完整的楼层导航功能
function createFullNavigation() {
    console.log('🎯 开始创建完整楼层导航...');
    
    // 移除现有面板
    var existing = document.getElementById('floor-nav-panel');
    if (existing) {
        existing.remove();
    }
    
    // 创建面板
    var panel = document.createElement('div');
    panel.id = 'floor-nav-panel';
    panel.style.position = 'fixed';
    panel.style.top = '20px';
    panel.style.right = '20px';
    panel.style.zIndex = '999999';
    panel.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    panel.style.color = 'white';
    panel.style.padding = '15px';
    panel.style.borderRadius = '10px';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.fontSize = '14px';
    panel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    panel.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '8px';
    panel.style.minWidth = '60px';
    panel.style.backdropFilter = 'blur(10px)';
    panel.style.cursor = 'move';
    panel.style.userSelect = 'none';
    
    // 创建标题栏（包含收缩按钮）
    var titleBar = document.createElement('div');
    titleBar.style.display = 'flex';
    titleBar.style.justifyContent = 'space-between';
    titleBar.style.alignItems = 'center';
    titleBar.style.marginBottom = '5px';
    
    var title = document.createElement('div');
    title.textContent = '🎯 楼层导航';
    title.style.fontWeight = 'bold';
    title.style.fontSize = '12px';
    title.style.flex = '1';
    title.style.textAlign = 'center';
    
    var collapseBtn = document.createElement('button');
    collapseBtn.textContent = '−';
    collapseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    collapseBtn.style.border = 'none';
    collapseBtn.style.color = 'white';
    collapseBtn.style.width = '20px';
    collapseBtn.style.height = '20px';
    collapseBtn.style.borderRadius = '3px';
    collapseBtn.style.fontSize = '12px';
    collapseBtn.style.cursor = 'pointer';
    collapseBtn.style.marginLeft = '5px';
    
    var autoHideBtn = document.createElement('button');
    autoHideBtn.textContent = '⏰';
    autoHideBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    autoHideBtn.style.border = 'none';
    autoHideBtn.style.color = 'white';
    autoHideBtn.style.width = '20px';
    autoHideBtn.style.height = '20px';
    autoHideBtn.style.borderRadius = '3px';
    autoHideBtn.style.fontSize = '10px';
    autoHideBtn.style.cursor = 'pointer';
    autoHideBtn.style.marginLeft = '3px';
    autoHideBtn.title = '自动隐藏开关';
    
    titleBar.appendChild(title);
    titleBar.appendChild(collapseBtn);
    titleBar.appendChild(autoHideBtn);
    panel.appendChild(titleBar);
    
    // 收缩状态
    var isCollapsed = false;
    var originalHeight = '';
    var originalGap = '';
    
    // 收缩/展开功能
    function toggleCollapse() {
        if (isCollapsed) {
            // 展开
            panel.style.height = originalHeight;
            panel.style.gap = originalGap;
            title.textContent = '🎯 楼层导航';
            collapseBtn.textContent = '−';
            
            // 显示所有按钮
            for (var i = 0; i < panel.children.length; i++) {
                var child = panel.children[i];
                if (child.tagName === 'BUTTON' || child.id === 'floor-info' || child.textContent === '💡 拖拽移动') {
                    child.style.display = 'block';
                }
            }
            isCollapsed = false;
        } else {
            // 收缩
            originalHeight = panel.style.height;
            originalGap = panel.style.gap;
            
            panel.style.height = 'auto';
            panel.style.gap = '0px';
            title.textContent = '🎯';
            collapseBtn.textContent = '+';
            
            // 隐藏所有按钮
            for (var i = 0; i < panel.children.length; i++) {
                var child = panel.children[i];
                if (child.tagName === 'BUTTON' || child.id === 'floor-info' || child.textContent === '💡 拖拽移动') {
                    child.style.display = 'none';
                }
            }
            isCollapsed = true;
        }
    }
    
    collapseBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡，避免触发拖拽
        toggleCollapse();
    });
    
    autoHideBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡，避免触发拖拽
        isAutoHideEnabled = !isAutoHideEnabled;
        
        if (isAutoHideEnabled) {
            autoHideBtn.textContent = '⏰';
            autoHideBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            showPanel(); // 重新启动自动隐藏
        } else {
            autoHideBtn.textContent = '⏰';
            autoHideBtn.style.background = 'rgba(255, 100, 100, 0.4)';
            clearTimeout(hideTimeout); // 停止自动隐藏
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
        }
    });
    
    // 获取消息元素
    function getMessages() {
        console.log('🎯 搜索楼层元素...');
        var selectors = [
            '.mes',
            '.message',
            '[class*="message"]',
            '[class*="mes"]',
            '.chat-message',
            '.msg',
            'div[class*="chat"] > div',
            '#chat > div',
            '.chat-container > div'
        ];
        
        for (var s = 0; s < selectors.length; s++) {
            var elements = document.querySelectorAll(selectors[s]);
            console.log('🎯 选择器 ' + selectors[s] + ' 找到 ' + elements.length + ' 个元素');
            
            if (elements.length > 0) {
                var validElements = [];
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var text = element.textContent || '';
                    if (text.match(/#\d+/) && element.offsetHeight > 20) {
                        console.log('🎯 找到楼层元素: ' + text.match(/#\d+/)[0]);
                        validElements.push(element);
                    }
                }
                if (validElements.length > 0) {
                    console.log('🎯 使用选择器 ' + selectors[s] + ' 找到 ' + validElements.length + ' 个有效楼层元素');
                    return validElements;
                }
            }
        }
        console.log('🎯 未找到楼层元素');
        return [];
    }
    
    // 跳转函数
    function jumpToFloor(floorNumber) {
        console.log('🎯 跳转到楼层: ' + floorNumber);
        var messages = getMessages();
        if (floorNumber >= 0 && floorNumber < messages.length) {
            messages[floorNumber].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
            console.log('🎯 成功跳转到楼层 ' + floorNumber);
            return true;
        } else {
            console.log('🎯 楼层号超出范围: ' + floorNumber + ' (总数: ' + messages.length + ')');
            return false;
        }
    }
    
    // 创建按钮
    var buttons = [
        { 
            text: '顶层', 
            action: function() { 
                console.log('🎯 点击顶层按钮');
                jumpToFloor(0); 
            } 
        },
        { 
            text: '上一层', 
            action: function() { 
                console.log('🎯 点击上一层按钮');
                var messages = getMessages();
                if (messages.length === 0) {
                    console.log('🎯 没有找到消息元素');
                    return;
                }
                
                var currentFloor = 0;
                var viewportTop = 100;
                
                // 找到当前最接近视窗顶部的楼层
                for (var i = 0; i < messages.length; i++) {
                    var rect = messages[i].getBoundingClientRect();
                    if (rect.top <= viewportTop && rect.bottom > viewportTop) {
                        currentFloor = i;
                        break;
                    }
                }
                
                // 如果没有找到合适的楼层，检查是否在底部
                if (currentFloor === 0) {
                    // 检查最后一个消息是否在视窗底部附近
                    var lastMessage = messages[messages.length - 1];
                    var lastRect = lastMessage.getBoundingClientRect();
                    
                    if (lastRect.bottom <= window.innerHeight + 50) {
                        // 如果在底部，当前楼层就是最后一层
                        currentFloor = messages.length - 1;
                        console.log('🎯 检测到在底部，当前楼层: ' + currentFloor);
                    } else {
                        // 否则使用第一个可见的楼层
                        for (var i = 0; i < messages.length; i++) {
                            var rect = messages[i].getBoundingClientRect();
                            if (rect.top >= 0 && rect.top <= window.innerHeight) {
                                currentFloor = i;
                                break;
                            }
                        }
                    }
                }
                
                console.log('🎯 当前楼层: ' + currentFloor + '/' + messages.length);
                
                if (currentFloor > 0) {
                    var targetFloor = currentFloor - 1;
                    console.log('🎯 跳转到楼层: ' + targetFloor);
                    jumpToFloor(targetFloor);
                } else {
                    console.log('🎯 已经在第一层');
                }
            } 
        },
        { 
            text: '下一层', 
            action: function() { 
                console.log('🎯 点击下一层按钮');
                var messages = getMessages();
                if (messages.length === 0) {
                    console.log('🎯 没有找到消息元素');
                    return;
                }
                
                var currentFloor = 0;
                var viewportTop = 100;
                
                // 找到当前最接近视窗顶部的楼层
                for (var i = 0; i < messages.length; i++) {
                    var rect = messages[i].getBoundingClientRect();
                    if (rect.top <= viewportTop && rect.bottom > viewportTop) {
                        currentFloor = i;
                        break;
                    }
                }
                
                // 如果没有找到合适的楼层，检查是否在底部
                if (currentFloor === 0) {
                    // 检查最后一个消息是否在视窗底部附近
                    var lastMessage = messages[messages.length - 1];
                    var lastRect = lastMessage.getBoundingClientRect();
                    
                    if (lastRect.bottom <= window.innerHeight + 50) {
                        // 如果在底部，当前楼层就是最后一层
                        currentFloor = messages.length - 1;
                        console.log('🎯 检测到在底部，当前楼层: ' + currentFloor);
                    } else {
                        // 否则使用第一个可见的楼层
                        for (var i = 0; i < messages.length; i++) {
                            var rect = messages[i].getBoundingClientRect();
                            if (rect.top >= 0 && rect.top <= window.innerHeight) {
                                currentFloor = i;
                                break;
                            }
                        }
                    }
                }
                
                console.log('🎯 当前楼层: ' + currentFloor + '/' + messages.length);
                
                if (currentFloor < messages.length - 1) {
                    var targetFloor = currentFloor + 1;
                    console.log('🎯 跳转到楼层: ' + targetFloor);
                    jumpToFloor(targetFloor);
                } else {
                    console.log('🎯 已经在最后一层');
                }
            } 
        },
        { 
            text: '底层', 
            action: function() { 
                console.log('🎯 点击底层按钮');
                var messages = getMessages();
                if (messages.length > 0) {
                    jumpToFloor(messages.length - 1);
                }
            } 
        },
        { 
            text: '🎯 跳转', 
            action: function() { 
                console.log('🎯 点击跳转按钮');
                var messages = getMessages();
                if (messages.length === 0) {
                    alert('未找到消息元素，无法跳转');
                    return;
                }
                var floorNumber = prompt('请输入要跳转的楼层 (0-' + (messages.length - 1) + '):');
                if (floorNumber !== null) {
                    var targetFloor = parseInt(floorNumber);
                    if (!isNaN(targetFloor) && targetFloor >= 0 && targetFloor < messages.length) {
                        jumpToFloor(targetFloor);
                    } else {
                        alert('无效的楼层号，请输入 0-' + (messages.length - 1) + ' 之间的数字');
                    }
                }
            } 
        }
    ];
    
    // 添加防抖功能
    var buttonCooldowns = {};
    
    function addButtonWithCooldown(button, action, cooldownMs) {
        button.addEventListener('click', function() {
            var now = Date.now();
            var lastClick = buttonCooldowns[button.textContent] || 0;
            
            if (now - lastClick < cooldownMs) {
                console.log('🎯 按钮冷却中，忽略点击');
                return;
            }
            
            buttonCooldowns[button.textContent] = now;
            action();
        });
    }
    
    // 添加按钮
    for (var b = 0; b < buttons.length; b++) {
        var button = document.createElement('button');
        button.textContent = buttons[b].text;
        button.style.background = 'rgba(255, 255, 255, 0.2)';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.padding = '10px 14px';
        button.style.borderRadius = '8px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '13px';
        button.style.fontWeight = '500';
        button.style.transition = 'all 0.2s ease';
        button.style.minWidth = '85px';
        button.style.minHeight = '36px';
        button.style.touchAction = 'manipulation'; // 优化触摸响应
        
        // 添加鼠标悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.4)';
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // 添加点击效果
        button.addEventListener('mousedown', function() {
            this.style.background = 'rgba(255, 255, 255, 0.6)';
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.background = 'rgba(255, 255, 255, 0.4)';
            this.style.transform = 'scale(1.05)';
        });
        
        // 为所有按钮添加相同的冷却时间
        addButtonWithCooldown(button, buttons[b].action, 200);
        
        panel.appendChild(button);
    }
    
    // 楼层信息显示
    var floorInfo = document.createElement('div');
    floorInfo.id = 'floor-info';
    floorInfo.style.background = 'rgba(255, 255, 255, 0.1)';
    floorInfo.style.color = 'white';
    floorInfo.style.padding = '6px 8px';
    floorInfo.style.borderRadius = '4px';
    floorInfo.style.fontSize = '11px';
    floorInfo.style.textAlign = 'center';
    floorInfo.style.marginTop = '5px';
    floorInfo.textContent = '楼层: 0/0';
    panel.appendChild(floorInfo);
    
    // 更新楼层信息
    function updateFloorInfo() {
        var messages = getMessages();
        var totalFloors = messages.length;
        var currentFloor = 0;
        
        // 使用与按钮相同的检测逻辑
        var viewportTop = 100;
        
        // 找到当前最接近视窗顶部的楼层
        for (var i = 0; i < messages.length; i++) {
            var rect = messages[i].getBoundingClientRect();
            if (rect.top <= viewportTop && rect.bottom > viewportTop) {
                currentFloor = i;
                break;
            }
        }
        
        // 如果没有找到合适的楼层，检查是否在底部
        if (currentFloor === 0) {
            // 检查最后一个消息是否在视窗底部附近
            var lastMessage = messages[messages.length - 1];
            var lastRect = lastMessage.getBoundingClientRect();
            
            if (lastRect.bottom <= window.innerHeight + 50) {
                // 如果在底部，当前楼层就是最后一层
                currentFloor = messages.length - 1;
            } else {
                // 否则使用第一个可见的楼层
                for (var i = 0; i < messages.length; i++) {
                    var rect = messages[i].getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight) {
                        currentFloor = i;
                        break;
                    }
                }
            }
        }
        
        floorInfo.textContent = '# ' + currentFloor + ' / ' + totalFloors;
    }
    
    // 自动隐藏功能
    var hideTimeout;
    var isAutoHideEnabled = true;
    
    function showPanel() {
        panel.style.opacity = '1';
        panel.style.transform = 'scale(1)';
        
        if (isAutoHideEnabled) {
            // 清除之前的隐藏定时器
            clearTimeout(hideTimeout);
            // 5秒后自动隐藏
            hideTimeout = setTimeout(function() {
                if (!isCollapsed) {
                    panel.style.opacity = '0.3';
                    panel.style.transform = 'scale(0.95)';
                }
            }, 5000);
        }
    }
    
    function hidePanel() {
        if (!isCollapsed) {
            panel.style.opacity = '0.3';
            panel.style.transform = 'scale(0.95)';
        }
    }
    
    // 监听滚动
    var scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateFloorInfo, 100);
        
        // 滚动时显示面板
        showPanel();
    });
    
    // 鼠标悬停时显示面板
    panel.addEventListener('mouseenter', function() {
        showPanel();
    });
    
    // 触摸开始时显示面板
    panel.addEventListener('touchstart', function() {
        showPanel();
    });
    
    // 添加拖拽功能（支持鼠标和触摸）
    var isDragging = false;
    var dragOffset = { x: 0, y: 0 };
    
    // 开始拖拽的通用函数
    function startDrag(clientX, clientY) {
        // 如果点击的是按钮，不启动拖拽
        if (event.target.tagName === 'BUTTON') {
            return;
        }
        
        isDragging = true;
        panel.style.cursor = 'grabbing';
        panel.style.opacity = '0.8';
        
        // 计算触摸/鼠标相对于面板的偏移
        var rect = panel.getBoundingClientRect();
        dragOffset.x = clientX - rect.left;
        dragOffset.y = clientY - rect.top;
        
        // 阻止默认行为
        event.preventDefault();
    }
    
    // 拖拽移动的通用函数
    function dragMove(clientX, clientY) {
        if (!isDragging) return;
        
        // 计算新位置
        var newX = clientX - dragOffset.x;
        var newY = clientY - dragOffset.y;
        
        // 限制在视窗范围内
        var maxX = window.innerWidth - panel.offsetWidth;
        var maxY = window.innerHeight - panel.offsetHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        // 更新位置
        panel.style.left = newX + 'px';
        panel.style.top = newY + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
    }
    
    // 结束拖拽的通用函数
    function endDrag() {
        if (isDragging) {
            isDragging = false;
            panel.style.cursor = 'move';
            panel.style.opacity = '1';
            
            // 保存位置到本地存储
            localStorage.setItem('floor-nav-position', JSON.stringify({
                left: panel.style.left,
                top: panel.style.top
            }));
        }
    }
    
    // 鼠标事件
    panel.addEventListener('mousedown', function(e) {
        startDrag(e.clientX, e.clientY);
    });
    
    document.addEventListener('mousemove', function(e) {
        dragMove(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', function() {
        endDrag();
    });
    
    // 触摸事件（手机端支持）
    panel.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            var touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1 && isDragging) {
            var touch = e.touches[0];
            dragMove(touch.clientX, touch.clientY);
            e.preventDefault(); // 阻止页面滚动
        }
    }, { passive: false });
    
    document.addEventListener('touchend', function() {
        endDrag();
    });
    
    // 防止触摸时意外触发点击事件
    panel.addEventListener('touchend', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
    
    // 从本地存储恢复位置
    var savedPosition = localStorage.getItem('floor-nav-position');
    if (savedPosition) {
        try {
            var position = JSON.parse(savedPosition);
            if (position.left && position.top) {
                panel.style.left = position.left;
                panel.style.top = position.top;
                panel.style.right = 'auto';
                panel.style.bottom = 'auto';
            }
        } catch (e) {
            console.log('🎯 无法恢复保存的位置');
        }
    }
    
    // 添加拖拽提示
    var dragHint = document.createElement('div');
    dragHint.textContent = '💡 拖拽移动';
    dragHint.style.fontSize = '10px';
    dragHint.style.opacity = '0.7';
    dragHint.style.textAlign = 'center';
    dragHint.style.marginTop = '5px';
    panel.appendChild(dragHint);
    
    // 添加到页面
    document.body.appendChild(panel);
    
    // 初始更新
    setTimeout(updateFloorInfo, 500);
    
    console.log('🎯 楼层导航面板已创建（支持拖拽移动）');
    
    // 返回控制对象
    window.QuickFloorFixed = {
        panel: panel,
        updateInfo: updateFloorInfo,
        remove: function() { panel.remove(); },
        test: function() {
            console.log('🧪 开始测试按钮功能...');
            console.log('1. 跳转到顶部...');
            jumpToFloor(0);
            setTimeout(function() {
                console.log('2. 跳转到底部...');
                var messages = getMessages();
                if (messages.length > 0) jumpToFloor(messages.length - 1);
            }, 1000);
        },
        getMessages: getMessages,
        jumpToFloor: jumpToFloor,
        debug: function() {
            console.log('🔍 调试信息:');
            var messages = getMessages();
            console.log('找到 ' + messages.length + ' 个楼层元素');
            for (var i = 0; i < messages.length; i++) {
                var text = messages[i].textContent || '';
                var match = text.match(/#\d+/);
                var floorText = match ? match[0] : '无编号';
                console.log('楼层 ' + i + ': ' + floorText);
            }
        }
    };
    
    return panel;
}

// 直接创建完整的楼层导航功能
createFullNavigation();

// 延迟创建（以防页面还没完全加载）
setTimeout(createFullNavigation, 1000);
setTimeout(createFullNavigation, 3000);

console.log('🎯 ST-Quick-Floor-Navigation 插件加载完成');