# 故障排除指南

## 浏览器显示模块导出错误

如果你在浏览器控制台看到类似这样的错误：
```
Uncaught SyntaxError: The requested module '/src/types/index.ts' does not provide an export named 'AIAgent'
```

### 解决方法

**方法 1：硬刷新浏览器（推荐）**
- Windows/Linux: `Ctrl + Shift + R` 或 `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**方法 2：清除浏览器缓存**
1. 打开浏览器开发者工具 (F12)
2. 右键点击刷新按钮
3. 选择"清空缓存并硬性重新加载"

**方法 3：无痕模式测试**
- 在无痕/隐私浏览模式下打开 http://localhost:5173/
- 如果无痕模式正常工作，说明是缓存问题

**方法 4：重启开发服务器**
```bash
# 停止当前服务器 (Ctrl+C)
# 然后清除缓存并重启
rm -rf node_modules/.vite dist
npm run dev
```

## 验证修复

打开 http://localhost:5173/，你应该看到：
- ✅ 顶部显示 5 个中台的导航按钮
- ✅ 左侧显示当前中台的菜单
- ✅ 中间显示内容区域
- ✅ 无控制台错误

## 仍然有问题？

1. 检查 Node.js 版本 (需要 >= 18)
   ```bash
   node --version
   ```

2. 删除 node_modules 重新安装
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. 检查端口 5173 是否被占用
   ```bash
   lsof -i :5173  # Mac/Linux
   netstat -ano | findstr :5173  # Windows
   ```
