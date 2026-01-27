// 中台类型
export type PlatformType = 'iot' | 'business' | 'video' | 'visualization' | 'ai';

// 中台信息接口
export interface Platform {
  id: PlatformType;
  name: string;
  icon: string;
  description: string;
}

// 菜单项接口
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

// 设备状态
export type DeviceStatus = 'online' | 'offline' | 'warning';

// 物联设备接口
export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  location: string;
  lastUpdate: Date;
}

// 报警级别
export type AlarmLevel = 'info' | 'warning' | 'critical';

// 报警信息接口
export interface Alarm {
  id: string;
  deviceId: string;
  deviceName: string;
  level: AlarmLevel;
  message: string;
  time: Date;
  handled: boolean;
}

// 业务数据接口
export interface BusinessData {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  updateTime: Date;
}

// 视频设备接口
export interface VideoDevice {
  id: string;
  name: string;
  ip: string;
  status: DeviceStatus;
  channels: number;
  hasAI: boolean;
}

// AI Agent接口
export interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'stopped' | 'error';
  description: string;
  lastRun: Date;
}

// 可视化项目接口
export interface VisualizationProject {
  id: string;
  name: string;
  type: 'dashboard' | 'screen';
  status: 'published' | 'draft';
  thumbnail: string;
  updateTime: Date;
}
