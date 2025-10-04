# GitHub部署指南

## 部署步骤

### 1. 创建GitHub仓库

1. 登录GitHub
2. 点击"New repository"
3. 仓库名称：`ST-Quick-Floor-Navigation`
4. 描述：`A quick floor navigation plugin for SillyTavern`
5. 选择Public（公开）
6. 不要初始化README（我们已经有了）
7. 点击"Create repository"

### 2. 上传文件到GitHub

#### 方法1：使用Git命令行

```bash
# 在项目目录中初始化Git
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: ST-Quick-Floor-Navigation plugin"

# 添加远程仓库
git remote add origin https://github.com/qb/ST-Quick-Floor-Navigation.git

# 推送到GitHub
git push -u origin main
```

#### 方法2：使用GitHub Desktop

1. 下载并安装GitHub Desktop
2. 登录你的GitHub账户
3. 点击"Clone a repository from the Internet"
4. 选择刚创建的仓库
5. 将项目文件复制到本地仓库文件夹
6. 在GitHub Desktop中提交并推送

#### 方法3：使用网页上传

1. 在GitHub仓库页面点击"uploading an existing file"
2. 拖拽所有文件到上传区域
3. 填写提交信息："Initial commit: ST-Quick-Floor-Navigation plugin"
4. 点击"Commit changes"

### 3. 发布Release版本

1. 在GitHub仓库页面点击"Releases"
2. 点击"Create a new release"
3. 标签版本：`v1.0.0`
4. 发布标题：`ST-Quick-Floor-Navigation v1.0.0`
5. 描述：
   ```
   ## 功能特性
   - 🎯 快速楼层跳转
   - ⬆️⬇️ 上下移动
   - 🔍 智能楼层识别
   - 📊 实时楼层信息
   - ⌨️ 键盘友好
   - 🎨 美观界面
   
   ## 安装方法
   在SillyTavern的扩展管理器中添加此仓库URL即可安装。
   ```
6. 点击"Publish release"

## 在SillyTavern中安装

### 方法1：通过扩展管理器

1. 打开SillyTavern
2. 进入设置 → 扩展管理器
3. 点击"添加扩展"
4. 输入仓库URL：`https://github.com/qb/ST-Quick-Floor-Navigation`
5. 点击安装

### 方法2：手动安装

1. 下载仓库ZIP文件
2. 解压到SillyTavern的`public/extensions/third-party/`目录
3. 重启SillyTavern
4. 在扩展管理器中启用插件

## 验证安装

1. 安装后重启SillyTavern
2. 检查右上角是否出现紫色楼层导航面板
3. 测试各个按钮功能
4. 确认楼层信息正确显示

## 更新插件

当有新版本时，用户可以通过以下方式更新：

1. 在扩展管理器中点击"更新"
2. 或者重新安装插件

## 注意事项

- 确保所有文件都正确上传到GitHub
- manifest.json必须位于仓库根目录
- index.js是插件的主文件
- README.md会显示在仓库首页
