// SillyTavern 快速楼层导航插件 - 极简测试版
console.log('🎯 ST-Quick-Floor-Navigation 插件开始加载...');

// 立即执行，不等待任何条件
console.log('🎯 插件代码立即执行...');

// 创建简单的测试按钮
function createTestButton() {
    console.log('🎯 开始创建测试按钮...');
    
    // 移除现有按钮
    var existing = document.getElementById('floor-nav-test');
    if (existing) {
        existing.remove();
    }
    
    // 创建按钮
    var button = document.createElement('div');
    button.id = 'floor-nav-test';
    button.style.position = 'fixed';
    button.style.top = '50px';
    button.style.right = '50px';
    button.style.zIndex = '999999';
    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    button.style.color = 'white';
    button.style.padding = '15px';
    button.style.borderRadius = '10px';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'Arial, sans-serif';
    button.style.fontSize = '14px';
    button.style.fontWeight = 'bold';
    button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    button.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    button.style.minWidth = '120px';
    button.style.textAlign = 'center';
    button.textContent = '🎯 楼层导航测试';
    
    button.addEventListener('click', function() {
        alert('插件工作正常！\n\n功能包括：\n- 快速跳转到楼层\n- 上下移动\n- 楼层编号识别\n\n点击确定后开始创建完整功能...');
        console.log('🎯 测试按钮被点击，开始创建完整功能...');
        createFullNavigation();
    });
    
    button.addEventListener('mouseenter', function() {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'all 0.2s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        button.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
    console.log('🎯 测试按钮已创建');
}

// 创建完整的楼层导航功能
function createFullNavigation() {
    console.log('🎯 开始创建完整楼层导航...');
    
    // 移除测试按钮
    var testButton = document.getElementById('floor-nav-test');
    if (testButton) {
        testButton.remove();
    }
    
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
    panel.style.minWidth = '120px';
    panel.style.backdropFilter = 'blur(10px)';
    
    // 创建标题
    var title = document.createElement('div');
    title.textContent = '🎯 楼层导航';
    title.style.textAlign = 'center';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '5px';
    title.style.fontSize = '12px';
    panel.appendChild(title);
    
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
            text: '⬆️ 顶部', 
            action: function() { 
                console.log('🎯 点击顶部按钮');
                jumpToFloor(0); 
            } 
        },
        { 
            text: '⬆ 上移', 
            action: function() { 
                console.log('🎯 点击上移按钮');
                var messages = getMessages();
                var currentFloor = 0;
                for (var i = 0; i < messages.length; i++) {
                    var rect = messages[i].getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        currentFloor = i;
                        break;
                    }
                }
                if (currentFloor > 0) {
                    jumpToFloor(currentFloor - 1);
                } else {
                    console.log('🎯 已经在第一层');
                }
            } 
        },
        { 
            text: '⬇ 下移', 
            action: function() { 
                console.log('🎯 点击下移按钮');
                var messages = getMessages();
                var currentFloor = 0;
                for (var i = 0; i < messages.length; i++) {
                    var rect = messages[i].getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        currentFloor = i;
                        break;
                    }
                }
                if (currentFloor < messages.length - 1) {
                    jumpToFloor(currentFloor + 1);
                } else {
                    console.log('🎯 已经在最后一层');
                }
            } 
        },
        { 
            text: '⬇️ 底部', 
            action: function() { 
                console.log('🎯 点击底部按钮');
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
    
    // 添加按钮
    for (var b = 0; b < buttons.length; b++) {
        var button = document.createElement('button');
        button.textContent = buttons[b].text;
        button.style.background = 'rgba(255, 255, 255, 0.2)';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.padding = '8px 12px';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '12px';
        button.style.fontWeight = '500';
        button.style.transition = 'all 0.2s ease';
        button.style.minWidth = '80px';
        button.addEventListener('click', buttons[b].action);
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
        
        for (var i = 0; i < messages.length; i++) {
            var rect = messages[i].getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                currentFloor = i;
                break;
            }
        }
        
        floorInfo.textContent = '楼层: ' + currentFloor + '/' + totalFloors;
    }
    
    // 监听滚动
    var scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateFloorInfo, 100);
    });
    
    // 添加到页面
    document.body.appendChild(panel);
    
    // 初始更新
    setTimeout(updateFloorInfo, 500);
    
    console.log('🎯 楼层导航面板已创建');
    
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

// 立即创建测试按钮
createTestButton();

// 延迟创建（以防页面还没完全加载）
setTimeout(createTestButton, 1000);
setTimeout(createTestButton, 3000);

console.log('🎯 ST-Quick-Floor-Navigation 插件加载完成');