# KESI 项目文档

## 项目概述

KESI 是一个基于物联网（IoT）、业务管理和视频监控的多中台管理系统，采用 React + TypeScript + Vite 构建，使用 shadcn/ui 组件库实现现代化 UI。

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **路由**: React Router v6
- **UI组件库**: shadcn/ui (Radix UI + Tailwind CSS)
- **样式**: Tailwind CSS v4
- **图标**: Lucide React
- **状态管理**: React Hooks (useState, useEffect, useContext)
- **主题**: 暗色/亮色模式切换 (Context API + localStorage)

## 项目结构

```
kesi/
├── src/
│   ├── components/          # 公共组件
│   │   ├── layout/         # 布局组件
│   │   │   ├── MainLayout.tsx      # 主布局（侧边栏+顶栏）
│   │   │   └── PageHeader.tsx      # 页面标题栏（公共组件）
│   │   ├── ui/             # shadcn/ui 基础组件
│   │   └── iot/            # 物联中台专用组件
│   │       ├── ModbusConfigDialog.tsx   # Modbus驱动配置
│   │       ├── ModelEditDialog.tsx      # 物模型编辑
│   │       └── DeviceEditDialog.tsx     # 设备编辑
│   ├── pages/              # 页面组件
│   │   ├── iot/            # 物联中台页面
│   │   ├── business/       # 业务中台页面
│   │   ├── video/          # 视频中台页面
│   │   ├── visualization/  # 可视化中台页面
│   │   └── ai/             # AI中台页面
│   ├── data/               # 模拟数据
│   │   └── mockData.ts     # 假数据（菜单、设备、报警等）
│   ├── router/             # 路由配置
│   │   └── index.tsx       # 路由定义
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts        # 全局类型
│   ├── hooks/              # 自定义Hooks
│   │   └── use-mobile.ts   # 移动端检测
│   ├── lib/                # 工具函数
│   │   └── utils.ts        # cn()等工具函数
│   ├── App.tsx             # 根组件
│   └── main.tsx            # 入口文件（主题提供者）
└── AGENT.md                # 本文档
```

## 核心功能模块

### 1. 物联中台 (IoT)
路由前缀: `/iot`

主要功能：
- **平台首页** (`/iot/dashboard`) - IoT 数据概览和统计
- **模型管理** (`/iot/models`) - 物模型定义和编辑（属性、事件、服务）
- **设备管理** (`/iot/devices`) - 设备列表、添加、编辑、状态监控
- **驱动管理** (`/iot/drivers`) - 设备驱动配置（Modbus、OPC UA、MQTT、HTTP）
- **报警管理** (`/iot/alarms`) - 报警记录、处理状态
- **物联数据分析** (`/iot/analytics`) - 数据图表、趋势分析
- **日志分析** (`/iot/logs`) - 系统日志查看和筛选
- **数据推送** (`/iot/push`) - 数据推送任务管理（HTTP、MQTT、Kafka、WebSocket）

关键组件：
- `ModelEditDialog` - 物模型编辑对话框（包含属性、事件、服务定义）
- `DeviceEditDialog` - 设备编辑对话框（4个Tab：基本信息、设备配置、认证信息、高级设置）
- `ModbusConfigDialog` - Modbus驱动配置（连接、寄存器、高级设置）

### 2. 业务中台 (Business)
路由前缀: `/business`

主要功能：
- **看板** (`/business/dashboard`) - 业务数据概览
- **数据管理** (`/business/data`) - 数据资源管理（数据集、文档、图片、视频）
- **数据分析** (`/business/analysis`) - 业务数据分析和可视化
- **媒体库** (`/business/media`) - 媒体文件管理（网格/列表视图）
- **业务流程** (`/business/workflow`) - 业务流程自动化
- **报表管理** (`/business/reports`) - 报表生成和管理
- **API接口** (`/business/api`) - 数据接口管理（REST API配置和监控）

### 3. 视频中台 (Video)
路由前缀: `/video`

主要功能：
- **看板** (`/video/dashboard`) - 视频系统概览
- **国标视频** (`/video/gb28181`) - GB28181协议设备管理
- **视频流管理** (`/video/streams`) - 实时视频流管理（RTSP、RTMP、HLS、FLV）
- **视频算法** (`/video/algorithms`) - AI视频算法管理
- **视频设备** (`/video/devices`) - 视频设备管理

### 4. 可视化中台 (Visualization)
路由前缀: `/visualization`

主要功能：
- **前台项目管理** (`/visualization/projects`) - 大屏项目创建和管理

### 5. AI中台 (AI)
路由前缀: `/ai`

主要功能：
- **平台AI Agent管理** (`/ai/agents`) - AI智能体管理

## UI/UX 设计规范

### 颜色主题

**物联中台**：
- 主色调：蓝色到紫色渐变 (`from-blue-600 to-purple-600`)
- 统计卡片：蓝色、绿色、灰色、黄色边框

**业务中台**：
- 主色调：翠色到青色渐变 (`from-emerald-600 to-teal-600`)
- 统计卡片：对应的柔和色调

**视频中台**：
- 主色调：靛蓝到紫色渐变 (`from-indigo-600 to-purple-600`)
- 统计卡片：相应的视频主题色

### 页面布局

所有页面遵循统一结构：

```tsx
<div className="space-y-6">
  {/* 页面标题 - 使用PageHeader公共组件 */}
  <PageHeader
    title="页面标题"
    gradient="bg-linear-to-r from-xxx to-xxx bg-clip-text text-transparent"
    actions={<Button>操作按钮</Button>}
  />

  {/* 统计卡片 - 4列网格 */}
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {/* 统计卡片 */}
  </div>

  {/* 主内容区 - Card组件 */}
  <Card>
    <CardHeader>
      <CardTitle>内容标题</CardTitle>
      <CardDescription>内容描述</CardDescription>
    </CardHeader>
    <CardContent>
      {/* 表格、表单等 */}
    </CardContent>
  </Card>
</div>
```

### PageHeader 公共组件

所有页面必须使用 `PageHeader` 组件：

```tsx
import { PageHeader } from '@/components/layout/PageHeader';

<PageHeader
  title="页面标题"
  gradient="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
  actions={
    <Button size="sm" onClick={handleAction}>
      <Plus className="h-4 w-4 mr-2" />
      按钮
    </Button>
  }
/>
```

特性：
- Sticky定位，滚动时固定在顶部
- 背景模糊效果
- 紧凑高度 (h-14)
- 支持自定义渐变色
- 支持操作按钮

### 主题切换

- 右上角主题切换按钮（太阳/月亮图标）
- 使用 `ThemeProvider` 包裹
- 主题持久化到 localStorage (key: `kesi-ui-theme`)
- 支持 light、dark、system 三种模式

## 数据管理

### 模拟数据位置
`src/data/mockData.ts`

包含：
- `platforms` - 中台列表
- `iotMenuItems` - 物联中台菜单
- `businessMenuItems` - 业务中台菜单
- `videoMenuItems` - 视频中台菜单
- `visualizationMenuItems` - 可视化中台菜单
- `aiMenuItems` - AI中台菜单
- `mockIoTDevices` - 设备假数据
- `mockAlarms` - 报警假数据
- `mockBusinessData` - 业务数据
- `mockVideoDevices` - 视频设备
- `mockAIAgents` - AI智能体
- `mockVisualizationProjects` - 可视化项目

### 菜单配置

添加新页面时，需要更新：
1. 创建页面组件（如 `src/pages/iot/NewPage.tsx`）
2. 在 `src/router/index.tsx` 中添加路由
3. 在 `src/data/mockData.ts` 对应的菜单数组中添加菜单项

## 路由配置

路由定义在 `src/router/index.tsx`：

```tsx
{
  path: 'iot',
  children: [
    { index: true, element: <Navigate to="/iot/dashboard" replace /> },
    { path: 'dashboard', element: <IoTDashboard /> },
    { path: 'devices', element: <IoTDevices /> },
    // ... 更多路由
  ]
}
```

## 组件库使用

### shadcn/ui 组件

项目中已安装的 UI 组件：
- Button, Input, Textarea
- Card, CardContent, CardDescription, CardHeader, CardTitle
- Badge, Table, Tabs
- Dialog, Select, Switch, Label, ScrollArea
- Sheet, Separator

### 图标使用

使用 Lucide React 图标库：

```tsx
import { Plus, Edit, Trash2, Settings } from 'lucide-react';

<Plus className="h-4 w-4" />
```

## 样式规范

### Tailwind CSS v4

使用新的语法：
- 渐变：`bg-linear-to-r from-blue-500 to-purple-500` (不是 `bg-gradient-to-r`)
- 颜色透明度：`bg-blue-500/10` 表示 10% 不透明度

### 常用样式类

**容器**：
- `space-y-6` - 子元素垂直间距
- `grid gap-4 md:grid-cols-2 lg:grid-cols-4` - 响应式网格
- `flex items-center justify-between` - flexbox布局

**卡片**：
- `shadow-sm hover:shadow-md transition-shadow` - 阴影和过渡
- `border-xxx/20` - 边框颜色（20%不透明度）

**文字**：
- `text-3xl font-bold` - 标题
- `text-sm text-muted-foreground` - 次要文字
- `bg-clip-text text-transparent` - 渐变文字

## 开发规范

### 添加新页面流程

1. 创建页面组件 `src/pages/{module}/{PageName}.tsx`
2. 使用 `PageHeader` 公共组件作为标题
3. 导入必要的 shadcn/ui 组件
4. 在 `src/router/index.tsx` 添加路由
5. 在 `src/data/mockData.ts` 添加菜单项

### 页面结构模板

```tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { Icon } from 'lucide-react';

export function PageName() {
  const [data, setData] = useState([]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="页面标题"
        gradient="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Icon className="h-4 w-4 mr-2" />
            操作
          </Button>
        }
      />

      {/* 内容 */}
      <Card>
        <CardHeader>
          <CardTitle>卡片标题</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 内容 */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### TypeScript 类型

主要类型定义在 `src/types/index.ts`：
- `PlatformType` - 中台类型
- `MenuItem` - 菜单项
- `IoTDevice` - IoT设备
- `DeviceStatus` - 设备状态
- `Alarm` - 报警
- `BusinessData` - 业务数据
- `VideoDevice` - 视频设备
- `AIAgent` - AI智能体
- `VisualizationProject` - 可视化项目

## 响应式设计

### 断点
- 移动端：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

### 布局
- 侧边栏：桌面端固定，移动端折叠（Sheet组件）
- 卡片网格：`md:grid-cols-2 lg:grid-cols-4`
- 表格：水平滚动

## 状态管理

当前使用 React Hooks 进行状态管理：
- `useState` - 组件本地状态
- `useEffect` - 副作用
- `useContext` - 全局主题状态

## 开发建议

### 性能优化
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存事件处理函数
- 避免不必要的重渲染

### 代码复用
- 使用 `PageHeader` 公共组件
- 提取可复用的逻辑到自定义 Hooks
- 创建可复用的 UI 组件

### 样式一致性
- 遵循既定的颜色主题
- 使用统一的间距系统（Tailwind）
- 保持组件尺寸一致

## 已知问题和待优化

1. **数据持久化**：当前使用假数据，需要对接后端API
2. **状态管理**：复杂页面可考虑引入状态管理库（如Jotai、Zustand）
3. **表单验证**：需要添加表单验证机制
4. **错误处理**：需要统一的错误处理和提示机制
5. **权限控制**：需要添加路由和功能权限控制

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 类型检查
npm run type-check

# Lint检查
npm run lint
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

版本要求：现代浏览器（支持 ES2020+）

## 贡献指南

1. 遵循现有代码风格
2. 使用 TypeScript 类型
3. 编写清晰的注释
4. 测试功能正常
5. 更新相关文档

## 许可证

[待补充]

---

**文档版本**: 1.0
**最后更新**: 2024-01-20
**维护者**: KESI Team
