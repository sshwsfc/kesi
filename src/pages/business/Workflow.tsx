import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitBranch, Play, Pause, Settings, Plus, Clock, CheckCircle, AlertCircle, Workflow } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: string;
}

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  trigger: string;
  steps: WorkflowStep[];
  totalRuns: number;
  successRate: number;
  lastRun: Date;
}

const mockWorkflows: WorkflowItem[] = [
  {
    id: '1',
    name: '质检流程自动化',
    description: '自动质量检查和报告生成流程',
    status: 'active',
    trigger: '数据采集完成',
    steps: [
      { id: '1', name: '数据采集', status: 'completed', duration: '2s' },
      { id: '2', name: '质量检测', status: 'completed', duration: '5s' },
      { id: '3', name: '报告生成', status: 'running', duration: '3s' },
      { id: '4', name: '通知发送', status: 'pending' }
    ],
    totalRuns: 1250,
    successRate: 98.5,
    lastRun: new Date()
  },
  {
    id: '2',
    name: '设备维护提醒',
    description: '定期设备维护和保养提醒',
    status: 'active',
    trigger: '定时触发',
    steps: [
      { id: '1', name: '检查设备状态', status: 'completed', duration: '1s' },
      { id: '2', name: '计算维护周期', status: 'completed', duration: '2s' },
      { id: '3', name: '发送提醒', status: 'completed', duration: '1s' }
    ],
    totalRuns: 856,
    successRate: 100,
    lastRun: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    name: '库存预警处理',
    description: '库存不足时自动触发采购流程',
    status: 'paused',
    trigger: '库存低于阈值',
    steps: [
      { id: '1', name: '检测库存', status: 'completed', duration: '1s' },
      { id: '2', name: '生成采购单', status: 'failed' },
      { id: '3', name: '审批流程', status: 'pending' },
      { id: '4', name: '发送供应商', status: 'pending' }
    ],
    totalRuns: 423,
    successRate: 92.8,
    lastRun: new Date(Date.now() - 7200000)
  },
  {
    id: '4',
    name: '生产报表汇总',
    description: '每日生产数据汇总和分析',
    status: 'draft',
    trigger: '每日23:00',
    steps: [
      { id: '1', name: '收集数据', status: 'pending' },
      { id: '2', name: '统计分析', status: 'pending' },
      { id: '3', name: '生成报表', status: 'pending' },
      { id: '4', name: '邮件发送', status: 'pending' }
    ],
    totalRuns: 0,
    successRate: 0,
    lastRun: new Date()
  }
];

export function BusinessWorkflow() {
  const [workflows] = useState<WorkflowItem[]>(mockWorkflows);

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: '运行中', className: 'bg-green-500 hover:bg-green-600' },
      paused: { label: '已暂停', className: 'bg-yellow-500 hover:bg-yellow-600' },
      draft: { label: '草稿', className: 'bg-gray-500 hover:bg-gray-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const stats = [
    {
      title: '流程总数',
      value: workflows.length,
      icon: Workflow,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '运行中',
      value: workflows.filter(w => w.status === 'active').length,
      icon: Play,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '总执行次数',
      value: workflows.reduce((sum, w) => sum + w.totalRuns, 0).toLocaleString(),
      icon: GitBranch,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '平均成功率',
      value: `${(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%`,
      icon: CheckCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="业务流程"
        gradient="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            创建流程
          </Button>
        }
      />

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`transition-all hover:shadow-lg hover:scale-105 ${stat.borderColor} border`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 流程列表 */}
      <div className="grid gap-4 md:grid-cols-2">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b bg-linear-to-r from-indigo-500/5 to-transparent">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-indigo-500" />
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-1">{workflow.description}</CardDescription>
                </div>
                {getStatusBadge(workflow.status)}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* 流程信息 */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">触发条件</p>
                    <p className="font-medium">{workflow.trigger}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">执行次数</p>
                    <p className="font-medium">{workflow.totalRuns.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">成功率</p>
                    <p className="font-medium text-green-600">{workflow.successRate}%</p>
                  </div>
                </div>

                {/* 流程步骤 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">流程步骤</p>
                  <div className="space-y-2">
                    {workflow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            {getStepStatusIcon(step.status)}
                          </div>
                          {index < workflow.steps.length - 1 && (
                            <div className="w-0.5 h-4 bg-muted" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{step.name}</p>
                          {step.duration && (
                            <p className="text-xs text-muted-foreground">{step.duration}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    最后运行: {workflow.lastRun.toLocaleString('zh-CN')}
                  </span>
                  <div className="flex gap-2">
                    {workflow.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        暂停
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        启动
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
