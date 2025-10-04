// 调试版本的快速定位楼层插件
// 这个文件用于调试插件不显示的问题

(function() {
    'use strict';
    
    console.log('🔧 调试版本插件加载中...');
    
    // 等待页面完全加载
    function waitForPageLoad() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }
    
    // 强制创建按钮
    function createDebugButtons() {
        console.log('🔧 创建调试按钮...');
        
        // 移除现有按钮
        const existing = document.getElementById('debug-quick-nav');
        if (existing) {
            existing.remove();
        }
        
        // 创建按钮容器
        const container = document.createElement('div');
        container.id = 'debug-quick-nav';
        container.style.cssText = `
            position: fixed !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 999999 !important;
            background: red !important;
            color: white !important;
            padding: 10px !important;
            border-radius: 5px !important;
            font-family: Arial, sans-serif !important;
            font-size: 12px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
        `;
        
        // 创建按钮
        const buttons = [
            { text: '顶部', action: () => window.scrollTo(0, 0) },
            { text: '底部', action: () => window.scrollTo(0, document.body.scrollHeight) },
            { text: '上移', action: () => window.scrollBy(0, -200) },
            { text: '下移', action: () => window.scrollBy(0, 200) },
            { text: '调试', action: showDebugInfo }
        ];
        
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.text;
            button.style.cssText = `
                margin: 2px !important;
                padding: 5px 10px !important;
                background: blue !important;
                color: white !important;
                border: none !important;
                border-radius: 3px !important;
                cursor: pointer !important;
            `;
            button.onclick = btn.action;
            container.appendChild(button);
        });
        
        // 添加到页面
        document.body.appendChild(container);
        console.log('✅ 调试按钮已创建');
    }
    
    // 显示调试信息
    function showDebugInfo() {
        console.log('🔍 页面调试信息:');
        console.log('URL:', window.location.href);
        console.log('页面标题:', document.title);
        console.log('页面状态:', document.readyState);
        console.log('页面高度:', document.body.scrollHeight);
        console.log('视窗高度:', window.innerHeight);
        
        // 查找可能的聊天元素
        const chatSelectors = [
            '#chat', '.chat', '[class*="chat"]', '[id*="chat"]',
            '.message', '[class*="message"]', '[id*="message"]',
            '.conversation', '[class*="conversation"]',
            '.dialog', '[class*="dialog"]'
        ];
        
        chatSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`找到元素 ${selector}:`, elements);
            }
        });
        
        // 检查插件状态
        if (window.QuickFloorNavigation) {
            console.log('插件已加载:', window.QuickFloorNavigation);
            window.QuickFloorNavigation.debug();
        } else {
            console.log('插件未加载');
        }
        
        alert('调试信息已输出到控制台，请按F12查看');
    }
    
    // 初始化调试版本
    async function initDebug() {
        await waitForPageLoad();
        console.log('页面加载完成，创建调试按钮...');
        createDebugButtons();
        
        // 延迟创建，确保页面完全渲染
        setTimeout(() => {
            createDebugButtons();
        }, 1000);
    }
    
    // 立即执行
    initDebug();
    
    // 导出调试函数
    window.DebugQuickNav = {
        createButtons: createDebugButtons,
        showInfo: showDebugInfo
    };
    
})();



