// SillyTavern 快速楼层导航插件
console.log('🎯 快速楼层导航插件开始加载...');

// 立即执行
(function() {
    'use strict';
    
    console.log('🎯 插件代码执行中...');
    
    // 创建简单的测试按钮
    function createTestButton() {
        console.log('🎯 创建测试按钮...');
        
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
        button.style.background = 'red';
        button.style.color = 'white';
        button.style.padding = '10px';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.textContent = '🎯 测试按钮';
        
        button.addEventListener('click', function() {
            alert('插件工作正常！');
            console.log('🎯 按钮被点击了！');
        });
        
        document.body.appendChild(button);
        console.log('🎯 测试按钮已创建');
    }
    
    // 立即创建按钮
    createTestButton();
    
    // 延迟创建（以防页面还没完全加载）
    setTimeout(createTestButton, 1000);
    setTimeout(createTestButton, 3000);
    
})();

console.log('🎯 快速楼层导航插件加载完成');