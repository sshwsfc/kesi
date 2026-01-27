import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';

// 物联中台页面
import { IoTDashboard } from '@/pages/iot/Dashboard';
import { IoTDevices } from '@/pages/iot/Devices';
import { IoTAlarms } from '@/pages/iot/Alarms';
import { IoTModels } from '@/pages/iot/Models';
import { IoTDrivers } from '@/pages/iot/Drivers';
import { IoTAnalytics } from '@/pages/iot/Analytics';
import { IoTLogs } from '@/pages/iot/Logs';
import { IoTPush } from '@/pages/iot/Push';

// 业务中台页面
import { BusinessDashboard } from '@/pages/business/Dashboard';
import { BusinessData } from '@/pages/business/Data';
import { BusinessAnalysis } from '@/pages/business/Analysis';
import { BusinessMedia } from '@/pages/business/Media';
import { BusinessWorkflow } from '@/pages/business/Workflow';
import { BusinessReports } from '@/pages/business/Reports';
import { BusinessAPI } from '@/pages/business/API';

// 视频中台页面
import { VideoDashboard } from '@/pages/video/Dashboard';
import { VideoGB28181 } from '@/pages/video/GB28181';
import { VideoStreams } from '@/pages/video/Streams';
import { VideoAlgorithms } from '@/pages/video/Algorithms';
import { VideoDevices } from '@/pages/video/Devices';

// 可视化中台页面
import { VisualizationProjects } from '@/pages/visualization/Projects';

// AI中台页面
import { AIAgents } from '@/pages/ai/Agents';

// 占位组件
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-muted-foreground">此页面正在开发中...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // 默认重定向到物联中台
      {
        index: true,
        element: <Navigate to="/iot/dashboard" replace />
      },

      // 物联中台路由
      {
        path: 'iot',
        children: [
          { index: true, element: <Navigate to="/iot/dashboard" replace /> },
          { path: 'dashboard', element: <IoTDashboard /> },
          { path: 'devices', element: <IoTDevices /> },
          { path: 'alarms', element: <IoTAlarms /> },
          { path: 'models', element: <IoTModels /> },
          { path: 'drivers', element: <IoTDrivers /> },
          { path: 'analytics', element: <IoTAnalytics /> },
          { path: 'logs', element: <IoTLogs /> },
          { path: 'push', element: <IoTPush /> }
        ]
      },

      // 业务中台路由
      {
        path: 'business',
        children: [
          { index: true, element: <Navigate to="/business/dashboard" replace /> },
          { path: 'dashboard', element: <BusinessDashboard /> },
          { path: 'data', element: <BusinessData /> },
          { path: 'analysis', element: <BusinessAnalysis /> },
          { path: 'media', element: <BusinessMedia /> },
          { path: 'workflow', element: <BusinessWorkflow /> },
          { path: 'reports', element: <BusinessReports /> },
          { path: 'api', element: <BusinessAPI /> }
        ]
      },

      // 视频中台路由
      {
        path: 'video',
        children: [
          { index: true, element: <Navigate to="/video/dashboard" replace /> },
          { path: 'dashboard', element: <VideoDashboard /> },
          { path: 'gb28181', element: <VideoGB28181 /> },
          { path: 'streams', element: <VideoStreams /> },
          { path: 'algorithms', element: <VideoAlgorithms /> },
          { path: 'devices', element: <VideoDevices /> }
        ]
      },

      // 可视化中台路由
      {
        path: 'visualization',
        children: [
          { index: true, element: <Navigate to="/visualization/projects" replace /> },
          { path: 'projects', element: <VisualizationProjects /> },
          { path: 'editor', element: <Placeholder name="编辑器" /> },
          { path: 'components', element: <Placeholder name="组件库" /> },
          { path: 'templates', element: <Placeholder name="模板库" /> }
        ]
      },

      // AI中台路由
      {
        path: 'ai',
        children: [
          { index: true, element: <Navigate to="/ai/agents" replace /> },
          { path: 'agents', element: <AIAgents /> },
          { path: 'algorithms', element: <Placeholder name="AI算法中心" /> },
          { path: 'models', element: <Placeholder name="模型管理" /> },
          { path: 'knowledge', element: <Placeholder name="知识库管理" /> }
        ]
      }
    ]
  }
]);
