import { type Platform, type MenuItem, type IoTDevice, type Alarm, type BusinessData, type VideoDevice, type AIAgent, type VisualizationProject } from '../types';

// 中台列表
export const platforms: Platform[] = [
  {
    id: 'iot',
    name: '物联',
    icon: 'TicketsPlane',
    description: '物联网设备接入与管理'
  },
  {
    id: 'business',
    name: '业务',
    icon: 'Briefcase',
    description: '业务流程与数据管理'
  },
  {
    id: 'video',
    name: '视频',
    icon: 'Video',
    description: '视频流媒体处理与分析'
  },
  {
    id: 'visualization',
    name: '可视化',
    icon: 'BarChart3',
    description: '数据可视化与大屏展示'
  },
  {
    id: 'ai',
    name: 'AI',
    icon: 'Bot',
    description: 'AI算法与智能体管理'
  }
];

// 物联中台菜单
export const iotMenuItems: MenuItem[] = [
  { id: 'dashboard', label: '平台首页', icon: 'LayoutDashboard', path: '/iot/dashboard' },
  { id: 'models', label: '模型管理', icon: 'Box', path: '/iot/models' },
  { id: 'devices', label: '设备管理', icon: 'Cpu', path: '/iot/devices' },
  { id: 'drivers', label: '驱动管理', icon: 'Settings', path: '/iot/drivers' },
  { id: 'alarms', label: '报警管理', icon: 'AlertTriangle', path: '/iot/alarms' },
  { id: 'analytics', label: '物联数据分析', icon: 'LineChart', path: '/iot/analytics' },
  { id: 'logs', label: '日志分析', icon: 'FileText', path: '/iot/logs' },
  { id: 'push', label: '数据推送', icon: 'Cloud', path: '/iot/push' }
];

// 业务中台菜单
export const businessMenuItems: MenuItem[] = [
  { id: 'dashboard', label: '看板', icon: 'LayoutDashboard', path: '/business/dashboard' },
  { id: 'data', label: '数据管理', icon: 'Database', path: '/business/data' },
  { id: 'analysis', label: '数据分析', icon: 'BarChart3', path: '/business/analysis' },
  { id: 'media', label: '媒体库', icon: 'Image', path: '/business/media' },
  { id: 'workflow', label: '业务流程', icon: 'Workflow', path: '/business/workflow' },
  { id: 'reports', label: '报表管理', icon: 'FileSpreadsheet', path: '/business/reports' },
  { id: 'api', label: '数据接口', icon: 'Code', path: '/business/api' }
];

// 视频中台菜单
export const videoMenuItems: MenuItem[] = [
  { id: 'dashboard', label: '看板', icon: 'LayoutDashboard', path: '/video/dashboard' },
  { id: 'gb28181', label: '国标视频', icon: 'Camera', path: '/video/gb28181' },
  { id: 'streams', label: '视频流', icon: 'Radio', path: '/video/streams' },
  { id: 'algorithms', label: '视频算法', icon: 'Wand2', path: '/video/algorithms' },
  { id: 'devices', label: '视频设备', icon: 'Monitor', path: '/video/devices' }
];

// 可视化中台菜单
export const visualizationMenuItems: MenuItem[] = [
  { id: 'projects', label: '前台项目管理', icon: 'Folder', path: '/visualization/projects' },
  { id: 'editor', label: '编辑器', icon: 'Edit', path: '/visualization/editor' },
  { id: 'components', label: '组件库', icon: 'Layers', path: '/visualization/components' },
  { id: 'templates', label: '模板库', icon: 'Copy', path: '/visualization/templates' }
];

// AI中台菜单
export const aiMenuItems: MenuItem[] = [
  { id: 'agents', label: '平台AI Agent管理', icon: 'Bot', path: '/ai/agents' },
  { id: 'algorithms', label: 'AI算法中心', icon: 'Brain', path: '/ai/algorithms' },
  { id: 'models', label: '模型管理', icon: 'Box', path: '/ai/models' },
  { id: 'knowledge', label: '知识库管理', icon: 'Book', path: '/ai/knowledge' }
];

// 物联设备假数据
export const mockIoTDevices: IoTDevice[] = [
  { id: '1', name: '温度传感器-01', type: '传感器', status: 'online', location: '车间A', lastUpdate: new Date() },
  { id: '2', name: '温度传感器-02', type: '传感器', status: 'online', location: '车间A', lastUpdate: new Date() },
  { id: '3', name: '湿度传感器-01', type: '传感器', status: 'warning', location: '车间B', lastUpdate: new Date(Date.now() - 3600000) },
  { id: '4', name: 'PLC控制器-01', type: '控制器', status: 'online', location: '控制室', lastUpdate: new Date() },
  { id: '5', name: 'PLC控制器-02', type: '控制器', status: 'offline', location: '控制室', lastUpdate: new Date(Date.now() - 7200000) },
  { id: '6', name: '智能电表-01', type: '仪表', status: 'online', location: '配电房', lastUpdate: new Date() },
  { id: '7', name: '智能电表-02', type: '仪表', status: 'online', location: '配电房', lastUpdate: new Date() },
  { id: '8', name: '压力传感器-01', type: '传感器', status: 'online', location: '管道A', lastUpdate: new Date() }
];

// 报警假数据
export const mockAlarms: Alarm[] = [
  { id: '1', deviceId: '3', deviceName: '湿度传感器-01', level: 'warning', message: '湿度超出正常范围', time: new Date(Date.now() - 3600000), handled: false },
  { id: '2', deviceId: '5', deviceName: 'PLC控制器-02', level: 'critical', message: '设备离线', time: new Date(Date.now() - 7200000), handled: false },
  { id: '3', deviceId: '1', deviceName: '温度传感器-01', level: 'info', message: '数据更新', time: new Date(), handled: true }
];

// 业务数据假数据
export const mockBusinessData: BusinessData[] = [
  { id: '1', name: '总能耗', value: 12450, unit: 'kWh', trend: 'down', updateTime: new Date() },
  { id: '2', name: '产量', value: 3850, unit: '件', trend: 'up', updateTime: new Date() },
  { id: '3', name: '设备效率', value: 87.5, unit: '%', trend: 'up', updateTime: new Date() },
  { id: '4', name: '质量合格率', value: 98.2, unit: '%', trend: 'stable', updateTime: new Date() }
];

// 视频设备假数据
export const mockVideoDevices: VideoDevice[] = [
  { id: '1', name: '摄像头-01', ip: '192.168.1.101', status: 'online', channels: 1, hasAI: true },
  { id: '2', name: '摄像头-02', ip: '192.168.1.102', status: 'online', channels: 1, hasAI: false },
  { id: '3', name: 'NVR-01', ip: '192.168.1.201', status: 'online', channels: 16, hasAI: true },
  { id: '4', name: '摄像头-03', ip: '192.168.1.103', status: 'offline', channels: 1, hasAI: false }
];

// AI Agent假数据
export const mockAIAgents: AIAgent[] = [
  { id: '1', name: '设备巡检Agent', type: '巡检', status: 'running', description: '自动巡检设备状态', lastRun: new Date() },
  { id: '2', name: '智能问答Agent', type: '问答', status: 'running', description: '回答用户问题', lastRun: new Date(Date.now() - 1800000) },
  { id: '3', name: '预警分析Agent', type: '预警', status: 'stopped', description: '分析预警信息', lastRun: new Date(Date.now() - 86400000) }
];

// 可视化项目假数据
export const mockVisualizationProjects: VisualizationProject[] = [
  { id: '1', name: '生产监控大屏', type: 'screen', status: 'published', thumbnail: '', updateTime: new Date() },
  { id: '2', name: '设备看板', type: 'dashboard', status: 'published', thumbnail: '', updateTime: new Date() },
  { id: '3', name: '能耗分析', type: 'dashboard', status: 'draft', thumbnail: '', updateTime: new Date(Date.now() - 86400000) }
];

// 获取菜单项的辅助函数
export function getMenuItemsByPlatform(platformId: string): MenuItem[] {
  switch (platformId) {
    case 'iot':
      return iotMenuItems;
    case 'business':
      return businessMenuItems;
    case 'video':
      return videoMenuItems;
    case 'visualization':
      return visualizationMenuItems;
    case 'ai':
      return aiMenuItems;
    default:
      return [];
  }
}
