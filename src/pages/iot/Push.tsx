import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, RefreshCw, Edit, Trash2, Play, Square, Clock, TrendingUp, Database, Cloud } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface PushTask {
  id: string;
  name: string;
  type: 'http' | 'mqtt' | 'kafka' | 'websocket';
  target: string;
  source: string;
  frequency: number;
  enabled: boolean;
  status: 'running' | 'stopped' | 'error';
  lastPush?: Date;
  nextPush?: Date;
  successRate: number;
  totalPush: number;
  failedPush: number;
  createTime: Date;
}

const mockPushTasks: PushTask[] = [
  {
    id: '1',
    name: '设备数据推送至ERP系统',
    type: 'http',
    target: 'https://erp.example.com/api/devices/data',
    source: '所有设备',
    frequency: 5000,
    enabled: true,
    status: 'running',
    lastPush: new Date(Date.now() - 5000),
    nextPush: new Date(Date.now() + 5000),
    successRate: 99.8,
    totalPush: 152340,
    failedPush: 304,
    createTime: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'MQTT实时数据推送',
    type: 'mqtt',
    target: 'mqtt://broker.example.com:1883',
    source: '温度传感器',
    frequency: 1000,
    enabled: true,
    status: 'running',
    lastPush: new Date(Date.now() - 1000),
    nextPush: new Date(Date.now() + 1000),
    successRate: 99.9,
    totalPush: 895420,
    failedPush: 895,
    createTime: new Date('2024-01-05')
  },
  {
    id: '3',
    name: 'Kafka数据流推送',
    type: 'kafka',
    target: 'kafka://localhost:9092/topic/devices',
    source: '所有设备',
    frequency: 2000,
    enabled: true,
    status: 'running',
    lastPush: new Date(Date.now() - 2000),
    nextPush: new Date(Date.now() + 2000),
    successRate: 98.5,
    totalPush: 45670,
    failedPush: 685,
    createTime: new Date('2024-01-10')
  },
  {
    id: '4',
    name: 'WebSocket实时推送',
    type: 'websocket',
    target: 'wss://ws.example.com/devices',
    source: '报警数据',
    frequency: 0,
    enabled: false,
    status: 'stopped',
    lastPush: new Date(Date.now() - 3600000),
    successRate: 100,
    totalPush: 12340,
    failedPush: 0,
    createTime: new Date('2024-01-15')
  },
  {
    id: '5',
    name: '历史数据归档推送',
    type: 'http',
    target: 'https://archive.example.com/api/data',
    source: '所有设备',
    frequency: 3600000,
    enabled: true,
    status: 'error',
    lastPush: new Date(Date.now() - 7200000),
    nextPush: new Date(Date.now() + 3600000),
    successRate: 85.2,
    totalPush: 156,
    failedPush: 27,
    createTime: new Date('2024-01-18')
  }
];

export function IoTPush() {
  const [tasks, setTasks] = useState<PushTask[]>(mockPushTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const types = ['all', 'http', 'mqtt', 'kafka', 'websocket'];
  const statuses = ['all', 'running', 'stopped', 'error'];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type: string) => {
    const config: Record<string, { label: string; className: string; icon: any }> = {
      http: { label: 'HTTP', className: 'bg-blue-500/20 text-blue-700 border-blue-500/30', icon: Cloud },
      mqtt: { label: 'MQTT', className: 'bg-purple-500/20 text-purple-700 border-purple-500/30', icon: Cloud },
      kafka: { label: 'Kafka', className: 'bg-orange-500/20 text-orange-700 border-orange-500/30', icon: Database },
      websocket: { label: 'WebSocket', className: 'bg-green-500/20 text-green-700 border-green-500/30', icon: Cloud }
    };
    const { label, className } = config[type];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string, enabled: boolean) => {
    if (!enabled) {
      return <Badge className="bg-gray-500 hover:bg-gray-600">已禁用</Badge>;
    }
    const config: Record<string, { label: string; className: string }> = {
      running: { label: '运行中', className: 'bg-green-500 hover:bg-green-600' },
      stopped: { label: '已停止', className: 'bg-gray-500 hover:bg-gray-600' },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600' }
    };
    const { label, className } = config[status];
    return <Badge className={className}>{label}</Badge>;
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newEnabled = !task.enabled;
        return {
          ...task,
          enabled: newEnabled,
          status: newEnabled ? 'running' : 'stopped'
        };
      }
      return task;
    }));
  };

  const stats = [
    {
      title: '推送任务',
      value: tasks.length,
      icon: Cloud,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '运行中',
      value: tasks.filter(t => t.status === 'running').length,
      icon: Play,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '已禁用',
      value: tasks.filter(t => !t.enabled).length,
      icon: Square,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '总推送量',
      value: tasks.reduce((sum, task) => sum + task.totalPush, 0).toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="数据推送管理"
        gradient="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            创建推送任务
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

      {/* 推送任务列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-cyan-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">推送任务</CardTitle>
              <CardDescription>管理和监控所有数据推送任务</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* 搜索和筛选 */}
          <div className="p-4 space-y-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索任务名称、目标或数据源..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* 类型筛选 */}
              <div>
                <label className="text-sm font-medium mb-2 block">推送类型</label>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <Button
                      key={type}
                      variant={typeFilter === type ? 'default' : 'outline'}
                      onClick={() => setTypeFilter(type)}
                      size="sm"
                    >
                      {type === 'all' ? '全部' : type.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 状态筛选 */}
              <div>
                <label className="text-sm font-medium mb-2 block">运行状态</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      onClick={() => setStatusFilter(status)}
                      size="sm"
                    >
                      {status === 'all' ? '全部' :
                       status === 'running' ? '运行中' :
                       status === 'stopped' ? '已停止' : '错误'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>任务名称</TableHead>
                <TableHead>推送类型</TableHead>
                <TableHead>目标地址</TableHead>
                <TableHead>数据源</TableHead>
                <TableHead>推送频率</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>成功率</TableHead>
                <TableHead>推送量</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的推送任务
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Cloud className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{task.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          创建于 {task.createTime.toLocaleDateString('zh-CN')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(task.type)}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <code className="text-xs bg-muted px-2 py-1 rounded block truncate">
                          {task.target}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{task.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {task.frequency === 0 ? '实时' :
                           task.frequency < 1000 ? `${task.frequency}ms` :
                           task.frequency < 60000 ? `${task.frequency / 1000}s` :
                           task.frequency < 3600000 ? `${task.frequency / 60000}min` :
                           `${task.frequency / 3600000}h`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(task.status, task.enabled)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-2 rounded-full bg-gray-200 overflow-hidden`}>
                          <div
                            className={`h-full transition-all ${
                              task.successRate >= 99 ? 'bg-green-500' :
                              task.successRate >= 95 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${task.successRate}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          task.successRate >= 99 ? 'text-green-600' :
                          task.successRate >= 95 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {task.successRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{task.totalPush.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-1">次</span>
                        </div>
                        {task.failedPush > 0 && (
                          <div className="text-xs text-red-600">
                            失败 {task.failedPush.toLocaleString()} 次
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTaskStatus(task.id)}
                          title={task.enabled ? '禁用' : '启用'}
                        >
                          {task.enabled ? (
                            <Square className="h-4 w-4 text-red-500" />
                          ) : (
                            <Play className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" title="编辑">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="删除">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 推送统计 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              今日推送统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">总推送次数</span>
                <span className="text-2xl font-bold">124,580</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">成功次数</span>
                <span className="text-xl font-bold text-green-600">124,120</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">失败次数</span>
                <span className="text-xl font-bold text-red-600">460</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">平均成功率</span>
                <span className="text-xl font-bold text-blue-600">99.63%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5" />
              推送数据量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">今日数据量</span>
                <span className="text-xl font-bold">2.4 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">平均速率</span>
                <span className="text-xl font-bold">28 MB/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">峰值速率</span>
                <span className="text-xl font-bold">45 MB/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">本月累计</span>
                <span className="text-xl font-bold">68.5 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
