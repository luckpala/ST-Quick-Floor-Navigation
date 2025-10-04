# 插件调试指南

如果插件安装后没有显示按钮，请按照以下步骤进行调试：

## 🔍 第一步：检查插件是否正确加载

1. 打开浏览器开发者工具（按F12）
2. 切换到"控制台"标签
3. 刷新页面
4. 查看是否有以下日志：
   - `🚀 快速定位楼层按键插件正在初始化...`
   - `✅ 导航按钮已创建并添加到页面`

如果没有看到这些日志，说明插件没有正确加载。

## 🔧 第二步：手动调试

在控制台中输入以下命令来手动调试：

```javascript
// 检查插件是否加载
console.log(window.QuickFloorNavigation);

// 手动初始化插件
window.QuickFloorNavigation.init();

// 强制显示按钮
window.QuickFloorNavigation.forceShow();

// 查看调试信息
window.QuickFloorNavigation.debug();
```

## 🎯 第三步：使用调试版本

如果主插件不工作，可以临时加载调试版本：

1. 在控制台中输入：
```javascript
// 创建调试按钮
const script = document.createElement('script');
script.src = 'data:text/javascript;base64,' + btoa(`
// 调试版本代码
(function() {
    const container = document.createElement('div');
    container.id = 'debug-nav';
    container.style.cssText = 'position:fixed;top:10px;right:10px;z-index:999999;background:red;color:white;padding:10px;border-radius:5px;';
    
    const buttons = ['顶部', '底部', '上移', '下移'];
    buttons.forEach(text => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.cssText = 'margin:2px;padding:5px;background:blue;color:white;border:none;border-radius:3px;cursor:pointer;';
        btn.onclick = () => {
            if (text === '顶部') window.scrollTo(0, 0);
            else if (text === '底部') window.scrollTo(0, document.body.scrollHeight);
            else if (text === '上移') window.scrollBy(0, -200);
            else if (text === '下移') window.scrollBy(0, 200);
        };
        container.appendChild(btn);
    });
    
    document.body.appendChild(container);
    console.log('调试按钮已创建');
})();
`);
document.head.appendChild(script);
```

## 🔍 第四步：检查页面结构

在控制台中运行以下代码来检查页面结构：

```javascript
// 查找所有可能的聊天容器
const selectors = [
    '#chat', '.chat', '[class*="chat"]', '[id*="chat"]',
    '.message', '[class*="message"]', '[id*="message"]',
    '.conversation', '[class*="conversation"]'
];

selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        console.log(`找到元素 ${selector}:`, elements);
    }
});

// 检查页面是否有滚动
console.log('页面高度:', document.body.scrollHeight);
console.log('视窗高度:', window.innerHeight);
console.log('是否有滚动条:', document.body.scrollHeight > window.innerHeight);
```

## 🛠️ 第五步：常见问题解决

### 问题1：按钮被其他元素遮挡
```javascript
// 提高按钮的z-index
const buttons = document.getElementById('quick-floor-navigation');
if (buttons) {
    buttons.style.zIndex = '999999';
}
```

### 问题2：按钮位置不对
```javascript
// 调整按钮位置
const buttons = document.getElementById('quick-floor-navigation');
if (buttons) {
    buttons.style.top = '10px';
    buttons.style.right = '10px';
    buttons.style.position = 'fixed';
}
```

### 问题3：样式被覆盖
```javascript
// 强制应用样式
const buttons = document.getElementById('quick-floor-navigation');
if (buttons) {
    buttons.style.cssText += '!important';
}
```

## 📱 第六步：SillyTavern特定调试

如果是在SillyTavern中使用，请检查：

1. 插件是否正确安装在插件目录
2. 插件是否在插件管理器中启用
3. 是否有其他插件冲突

在控制台中运行：
```javascript
// 检查SillyTavern环境
console.log('SillyTavern版本:', window.SillyTavern?.version);
console.log('已加载插件:', window.SillyTavern?.plugins);
```

## 🆘 如果仍然无法解决

请提供以下信息：

1. 浏览器类型和版本
2. SillyTavern版本
3. 控制台中的错误信息
4. 页面URL
5. 其他已安装的插件列表

## 🔄 重新安装插件

如果所有方法都无效，请尝试：

1. 完全卸载插件
2. 清除浏览器缓存
3. 重新安装插件
4. 重启SillyTavern

```javascript
// 完全重置插件
if (window.QuickFloorNavigation) {
    window.QuickFloorNavigation.unload();
}
// 然后重新加载页面
```



