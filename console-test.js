// 控制台测试版本 - 直接在浏览器控制台中运行
// 复制以下代码到浏览器控制台中执行

(function() {
    console.log('🚀 开始创建快速定位楼层按钮...');
    
    // 移除现有按钮
    const existing = document.getElementById('quick-floor-nav-test');
    if (existing) {
        existing.remove();
        console.log('移除现有按钮');
    }
    
    // 创建按钮容器
    const container = document.createElement('div');
    container.id = 'quick-floor-nav-test';
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
    title.style.cssText = `
        text-align: center !important;
        font-weight: bold !important;
        margin-bottom: 5px !important;
        font-size: 12px !important;
    `;
    container.appendChild(title);
    
    // 创建按钮
    const buttons = [
        { text: '⬆️ 顶部', action: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('跳转到顶部');
        }},
        { text: '⬆ 上移', action: () => {
            window.scrollBy({ top: -200, behavior: 'smooth' });
            console.log('向上滚动');
        }},
        { text: '⬇ 下移', action: () => {
            window.scrollBy({ top: 200, behavior: 'smooth' });
            console.log('向下滚动');
        }},
        { text: '⬇️ 底部', action: () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            console.log('跳转到底部');
        }},
        { text: '🎯 跳转', action: () => {
            const floor = prompt('请输入楼层号:');
            if (floor && !isNaN(floor)) {
                const messages = document.querySelectorAll('.mes, .message, [class*="message"]');
                if (messages.length > 0) {
                    const targetIndex = Math.min(parseInt(floor) - 1, messages.length - 1);
                    messages[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    console.log(`跳转到第${floor}层`);
                } else {
                    alert('未找到消息元素');
                }
            }
        }}
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
        
        button.onclick = btn.action;
        container.appendChild(button);
    });
    
    // 添加楼层信息显示
    const floorInfo = document.createElement('div');
    floorInfo.id = 'floor-info-test';
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
    
    // 添加到页面
    document.body.appendChild(container);
    
    // 更新楼层信息
    function updateFloorInfo() {
        const messages = document.querySelectorAll('.mes, .message, [class*="message"]');
        const totalFloors = messages.length;
        
        // 计算当前楼层
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
    
    // 初始更新
    setTimeout(updateFloorInfo, 500);
    
    console.log('✅ 快速定位楼层按钮已创建！');
    console.log('按钮位置:', container.getBoundingClientRect());
    
    // 返回控制对象
    window.QuickFloorTest = {
        container: container,
        updateInfo: updateFloorInfo,
        remove: () => container.remove()
    };
    
})();



