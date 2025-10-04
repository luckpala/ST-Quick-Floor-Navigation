// 简化版本 - 修复按键问题
(function() {
    'use strict';
    
    console.log('🔧 简化版本插件启动中...');
    
    // 移除现有按钮
    var existing = document.getElementById('quick-floor-nav-fixed');
    if (existing) {
        existing.remove();
        console.log('移除现有按钮');
    }
    
    // 创建按钮
    function createButtons() {
        console.log('创建按钮...');
        
        // 创建容器
        var container = document.createElement('div');
        container.id = 'quick-floor-nav-fixed';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '999999';
        container.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        container.style.color = 'white';
        container.style.padding = '15px';
        container.style.borderRadius = '10px';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.fontSize = '14px';
        container.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '8px';
        container.style.minWidth = '120px';
        
        // 创建标题
        var title = document.createElement('div');
        title.textContent = '🎯 楼层导航';
        title.style.textAlign = 'center';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '5px';
        title.style.fontSize = '12px';
        container.appendChild(title);
        
        // 获取消息元素
        function getMessages() {
            console.log('开始搜索楼层元素...');
            
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
                var selector = selectors[s];
                var elements = document.querySelectorAll(selector);
                console.log('选择器 ' + selector + ' 找到 ' + elements.length + ' 个元素');
                
                if (elements.length > 0) {
                    var validElements = [];
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        var text = element.textContent || '';
                        
                        if (text.match(/#\d+/)) {
                            console.log('找到楼层元素: ' + text.match(/#\d+/)[0]);
                            if (element.offsetHeight > 20 && element.offsetWidth > 50) {
                                validElements.push(element);
                            }
                        }
                    }
                    
                    if (validElements.length > 0) {
                        console.log('使用选择器 ' + selector + ' 找到 ' + validElements.length + ' 个有效楼层元素');
                        return validElements;
                    }
                }
            }
            
            console.log('未找到楼层元素');
            return [];
        }
        
        // 跳转函数
        function jumpToFloor(floorNumber) {
            console.log('尝试跳转到楼层: ' + floorNumber);
            var messages = getMessages();
            
            if (messages.length === 0) {
                console.log('未找到消息元素');
                return false;
            }
            
            if (floorNumber >= 0 && floorNumber < messages.length) {
                var targetMessage = messages[floorNumber];
                console.log('跳转到索引 ' + floorNumber + ' 的元素');
                targetMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'
                });
                return true;
            } else {
                console.log('楼层号超出范围: ' + floorNumber + ' (总数: ' + messages.length + ')');
                return false;
            }
        }
        
        // 跳转到顶部
        function goToTop() {
            console.log('执行跳转到顶部...');
            jumpToFloor(0);
        }
        
        // 跳转到底部
        function goToBottom() {
            console.log('执行跳转到底部...');
            var messages = getMessages();
            if (messages.length > 0) {
                jumpToFloor(messages.length - 1);
            }
        }
        
        // 向上移动
        function goUp() {
            console.log('执行向上移动...');
            var messages = getMessages();
            console.log('总楼层数: ' + messages.length);
            
            // 找到当前楼层
            var currentFloor = -1;
            for (var i = 0; i < messages.length; i++) {
                var message = messages[i];
                var rect = message.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    currentFloor = i;
                    break;
                }
            }
            
            console.log('当前在楼层 ' + currentFloor);
            if (currentFloor > 0) {
                jumpToFloor(currentFloor - 1);
            } else {
                console.log('已经在第一层');
            }
        }
        
        // 向下移动
        function goDown() {
            console.log('执行向下移动...');
            var messages = getMessages();
            console.log('总楼层数: ' + messages.length);
            
            // 找到当前楼层
            var currentFloor = -1;
            for (var i = 0; i < messages.length; i++) {
                var message = messages[i];
                var rect = message.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    currentFloor = i;
                    break;
                }
            }
            
            console.log('当前在楼层 ' + currentFloor);
            if (currentFloor < messages.length - 1) {
                jumpToFloor(currentFloor + 1);
            } else {
                console.log('已经在最后一层');
            }
        }
        
        // 跳转输入
        function showFloorInput() {
            console.log('显示楼层输入框...');
            var messages = getMessages();
            if (messages.length === 0) {
                alert('未找到消息元素，无法跳转');
                return;
            }
            
            var floorNumber = prompt('请输入要跳转的楼层 (0-' + (messages.length - 1) + '):');
            if (floorNumber === null) return;
            
            var targetFloor = parseInt(floorNumber);
            if (isNaN(targetFloor) || targetFloor < 0 || targetFloor >= messages.length) {
                alert('无效的楼层号，请输入 0-' + (messages.length - 1) + ' 之间的数字');
                return;
            }
            
            jumpToFloor(targetFloor);
        }
        
        // 创建顶部按钮
        var topButton = document.createElement('button');
        topButton.textContent = '⬆️ 顶部';
        topButton.style.background = 'rgba(255, 255, 255, 0.2)';
        topButton.style.border = 'none';
        topButton.style.color = 'white';
        topButton.style.padding = '8px 12px';
        topButton.style.borderRadius = '6px';
        topButton.style.cursor = 'pointer';
        topButton.style.fontSize = '12px';
        topButton.style.fontWeight = '500';
        topButton.style.transition = 'all 0.2s ease';
        topButton.style.minWidth = '80px';
        topButton.addEventListener('click', goToTop);
        container.appendChild(topButton);
        
        // 创建上移按钮
        var upButton = document.createElement('button');
        upButton.textContent = '⬆ 上移';
        upButton.style.background = 'rgba(255, 255, 255, 0.2)';
        upButton.style.border = 'none';
        upButton.style.color = 'white';
        upButton.style.padding = '8px 12px';
        upButton.style.borderRadius = '6px';
        upButton.style.cursor = 'pointer';
        upButton.style.fontSize = '12px';
        upButton.style.fontWeight = '500';
        upButton.style.transition = 'all 0.2s ease';
        upButton.style.minWidth = '80px';
        upButton.addEventListener('click', goUp);
        container.appendChild(upButton);
        
        // 创建下移按钮
        var downButton = document.createElement('button');
        downButton.textContent = '⬇ 下移';
        downButton.style.background = 'rgba(255, 255, 255, 0.2)';
        downButton.style.border = 'none';
        downButton.style.color = 'white';
        downButton.style.padding = '8px 12px';
        downButton.style.borderRadius = '6px';
        downButton.style.cursor = 'pointer';
        downButton.style.fontSize = '12px';
        downButton.style.fontWeight = '500';
        downButton.style.transition = 'all 0.2s ease';
        downButton.style.minWidth = '80px';
        downButton.addEventListener('click', goDown);
        container.appendChild(downButton);
        
        // 创建底部按钮
        var bottomButton = document.createElement('button');
        bottomButton.textContent = '⬇️ 底部';
        bottomButton.style.background = 'rgba(255, 255, 255, 0.2)';
        bottomButton.style.border = 'none';
        bottomButton.style.color = 'white';
        bottomButton.style.padding = '8px 12px';
        bottomButton.style.borderRadius = '6px';
        bottomButton.style.cursor = 'pointer';
        bottomButton.style.fontSize = '12px';
        bottomButton.style.fontWeight = '500';
        bottomButton.style.transition = 'all 0.2s ease';
        bottomButton.style.minWidth = '80px';
        bottomButton.addEventListener('click', goToBottom);
        container.appendChild(bottomButton);
        
        // 创建跳转按钮
        var jumpButton = document.createElement('button');
        jumpButton.textContent = '🎯 跳转';
        jumpButton.style.background = 'rgba(255, 255, 255, 0.2)';
        jumpButton.style.border = 'none';
        jumpButton.style.color = 'white';
        jumpButton.style.padding = '8px 12px';
        jumpButton.style.borderRadius = '6px';
        jumpButton.style.cursor = 'pointer';
        jumpButton.style.fontSize = '12px';
        jumpButton.style.fontWeight = '500';
        jumpButton.style.transition = 'all 0.2s ease';
        jumpButton.style.minWidth = '80px';
        jumpButton.addEventListener('click', showFloorInput);
        container.appendChild(jumpButton);
        
        // 添加楼层信息显示
        var floorInfo = document.createElement('div');
        floorInfo.id = 'floor-info-fixed';
        floorInfo.style.background = 'rgba(255, 255, 255, 0.1)';
        floorInfo.style.color = 'white';
        floorInfo.style.padding = '6px 8px';
        floorInfo.style.borderRadius = '4px';
        floorInfo.style.fontSize = '11px';
        floorInfo.style.textAlign = 'center';
        floorInfo.style.marginTop = '5px';
        floorInfo.textContent = '楼层: 0/0';
        container.appendChild(floorInfo);
        
        // 更新楼层信息
        function updateFloorInfo() {
            var messages = getMessages();
            var totalFloors = messages.length;
            var currentFloor = 0;
            
            for (var i = 0; i < messages.length; i++) {
                var message = messages[i];
                var rect = message.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    currentFloor = i;
                    break;
                }
            }
            
            floorInfo.textContent = '楼层: ' + currentFloor + '/' + totalFloors;
        }
        
        // 监听滚动事件
        var scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateFloorInfo, 100);
        });
        
        // 添加到页面
        document.body.appendChild(container);
        
        // 初始更新
        setTimeout(updateFloorInfo, 500);
        
        console.log('✅ 简化版本按钮已创建');
        
        // 返回控制对象
        window.QuickFloorFixed = {
            container: container,
            updateInfo: updateFloorInfo,
            remove: function() { container.remove(); },
            test: function() {
                console.log('🧪 开始测试按钮功能...');
                console.log('1. 跳转到顶部...');
                goToTop();
                setTimeout(function() {
                    console.log('2. 跳转到底部...');
                    goToBottom();
                }, 1000);
                setTimeout(function() {
                    console.log('3. 向上移动...');
                    goUp();
                }, 2000);
                setTimeout(function() {
                    console.log('4. 向下移动...');
                    goDown();
                }, 3000);
            },
            getMessages: getMessages,
            jumpToFloor: jumpToFloor,
            debug: function() {
                console.log('🔍 调试信息:');
                var messages = getMessages();
                console.log('找到 ' + messages.length + ' 个楼层元素');
                
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i];
                    var text = message.textContent || '';
                    var match = text.match(/#\d+/);
                    var floorText = match ? match[0] : '无编号';
                    var rect = message.getBoundingClientRect();
                    console.log('楼层 ' + i + ': ' + floorText + ' - 位置: (' + Math.round(rect.top) + ', ' + Math.round(rect.left) + ')');
                }
            },
            testJump: function(floorNumber) {
                console.log('🧪 测试跳转到第' + floorNumber + '层...');
                jumpToFloor(floorNumber);
            }
        };
        
        return container;
    }
    
    // 创建按钮
    createButtons();
    
})();