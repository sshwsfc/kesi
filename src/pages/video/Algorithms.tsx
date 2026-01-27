import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Brain, Target, Scan, UserCheck, Car, Package, Settings, Play } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface Algorithm {
  id: string;
  name: string;
  type: 'person' | 'vehicle' | 'object' | 'behavior';
  version: string;
  accuracy: number;
  status: 'active' | 'inactive' | 'testing';
  devices: number;
  lastUpdate: Date;
}

const mockAlgorithms: Algorithm[] = [
  {
    id: '1',
    name: '人脸识别',
    type: 'person',
    version: '2.3.1',
    accuracy: 98.5,
    status: 'active',
    devices: 12,
    lastUpdate: new Date()
  },
  {
    id: '2',
    name: '车辆检测',
    type: 'vehicle',
    version: '1.8.0',
    accuracy: 96.2,
    status: 'active',
    devices: 8,
    lastUpdate: new Date()
  },
  {
    id: '3',
    name: '行为分析',
    type: 'behavior',
    version: '3.0.2',
    accuracy: 94.8,
    status: 'active',
    devices: 5,
    lastUpdate: new Date(Date.now() - 3600000)
  },
  {
    id: '4',
    name: '物体识别',
    type: 'object',
    version: '1.5.0',
    accuracy: 92.3,
    status: 'testing',
    devices: 3,
    lastUpdate: new Date(Date.now() - 7200000)
  },
  {
    id: '5',
    name: '人员统计',
    type: 'person',
    version: '2.0.1',
    accuracy: 95.7,
    status: 'inactive',
    devices: 0,
    lastUpdate: new Date(Date.now() - 86400000)
  }
];

export function VideoAlgorithms() {
  const [algorithms] = useState<Algorithm[]>(mockAlgorithms);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'person' | 'vehicle' | 'object' | 'behavior'>('all');

  const filteredAlgorithms = algorithms.filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || algo.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const config = {
      person: { label: '人员', className: 'bg-blue-500 hover:bg-blue-600', icon: UserCheck },
      vehicle: { label: '车辆', className: 'bg-green-500 hover:bg-green-600', icon: Car },
      object: { label: '物体', className: 'bg-purple-500 hover:bg-purple-600', icon: Package },
      behavior: { label: '行为', className: 'bg-orange-500 hover:bg-orange-600', icon: Scan }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: '运行中', className: 'bg-green-500 hover:bg-green-600' },
      inactive: { label: '未启用', className: 'bg-gray-500 hover:bg-gray-600' },
      testing: { label: '测试中', className: 'bg-yellow-500 hover:bg-yellow-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      person: UserCheck,
      vehicle: Car,
      object: Package,
      behavior: Scan
    };
    return icons[type as keyof typeof icons] || Brain;
  };

  const stats = [
    {
      title: '算法总数',
      value: algorithms.length,
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '运行中',
      value: algorithms.filter(a => a.status === 'active').length,
      icon: Play,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '平均准确率',
      value: `${(algorithms.reduce((sum, a) => sum + a.accuracy, 0) / algorithms.length).toFixed(1)}%`,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '应用设备',
      value: algorithms.reduce((sum, a) => sum + a.devices, 0),
      icon: Scan,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="视频算法"
        gradient="bg-linear-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            添加算法
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

      {/* 算法列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-fuchsia-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">算法列表</CardTitle>
              <CardDescription>查看和管理所有AI算法</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                批量分析
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
                placeholder="搜索算法名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('all')}
                size="sm"
              >
                全部
              </Button>
              <Button
                variant={typeFilter === 'person' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('person')}
                size="sm"
              >
                人员
              </Button>
              <Button
                variant={typeFilter === 'vehicle' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('vehicle')}
                size="sm"
              >
                车辆
              </Button>
              <Button
                variant={typeFilter === 'object' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('object')}
                size="sm"
              >
                物体
              </Button>
              <Button
                variant={typeFilter === 'behavior' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('behavior')}
                size="sm"
              >
                行为
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>算法名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>准确率</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>应用设备</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlgorithms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的算法
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlgorithms.map((algo) => {
                  const Icon = getTypeIcon(algo.type);
                  return (
                    <TableRow key={algo.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{algo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(algo.type)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">v{algo.version}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{ width: `${algo.accuracy}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{algo.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(algo.status)}</TableCell>
                      <TableCell>{algo.devices} 台</TableCell>
                      <TableCell>{algo.lastUpdate.toLocaleDateString('zh-CN')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 算法类型卡片 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-fuchsia-500/5 to-transparent">
          <CardTitle className="text-lg">算法类型</CardTitle>
          <CardDescription>各类AI分析算法</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-blue-500 hover:bg-blue-500/5">
              <UserCheck className="h-6 w-6 text-blue-500" />
              <span>人员识别</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-green-500 hover:bg-green-500/5">
              <Car className="h-6 w-6 text-green-500" />
              <span>车辆检测</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-purple-500 hover:bg-purple-500/5">
              <Package className="h-6 w-6 text-purple-500" />
              <span>物体识别</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-orange-500 hover:bg-orange-500/5">
              <Scan className="h-6 w-6 text-orange-500" />
              <span>行为分析</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
