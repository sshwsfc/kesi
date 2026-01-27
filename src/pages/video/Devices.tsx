import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Camera, Settings, Eye, Edit, Trash2, RefreshCw, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface VideoDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  manufacturer: string;
  model: string;
  location: string;
  channels: number;
  hasAI: boolean;
  status: 'online' | 'offline' | 'error';
  lastSeen: Date;
}

const mockVideoDevices: VideoDevice[] = [
  {
    id: '1',
    name: '前门监控',
    ip: '192.168.1.101',
    mac: '00:11:22:33:44:55',
    manufacturer: '海康威视',
    model: 'DS-2CD3T56WD-I3',
    location: '主入口',
    channels: 1,
    hasAI: true,
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '2',
    name: '后门监控',
    ip: '192.168.1.102',
    mac: '00:11:22:33:44:56',
    manufacturer: '大华',
    model: 'DH-IPC-HFW2431E',
    location: '后门',
    channels: 1,
    hasAI: false,
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '3',
    name: '车间A-1',
    ip: '192.168.1.103',
    mac: '00:11:22:33:44:57',
    manufacturer: '宇视',
    model: 'IPC-B242',
    location: '生产车间A区',
    channels: 4,
    hasAI: true,
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '4',
    name: '车间B-2',
    ip: '192.168.1.104',
    mac: '00:11:22:33:44:58',
    manufacturer: '海康威视',
    model: 'DS-2CD2T85F',
    location: '生产车间B区',
    channels: 2,
    hasAI: true,
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000)
  },
  {
    id: '5',
    name: '仓库监控',
    ip: '192.168.1.105',
    mac: '00:11:22:33:44:59',
    manufacturer: '天地伟业',
    model: 'TC-GFP',
    location: '仓库区',
    channels: 1,
    hasAI: false,
    status: 'error',
    lastSeen: new Date(Date.now() - 7200000)
  }
];

export function VideoDevices() {
  const [devices] = useState<VideoDevice[]>(mockVideoDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'error'>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      online: { label: '在线', className: 'bg-green-500 hover:bg-green-600' },
      offline: { label: '离线', className: 'bg-gray-500 hover:bg-gray-600' },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '设备总数',
      value: devices.length,
      icon: Camera,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '在线设备',
      value: devices.filter(d => d.status === 'online').length,
      icon: Camera,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '总通道数',
      value: devices.reduce((sum, d) => sum + d.channels, 0),
      icon: Camera,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'AI启用',
      value: devices.filter(d => d.hasAI).length,
      icon: Camera,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="视频设备"
        gradient="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新状态
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加设备
            </Button>
          </div>
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

      {/* 设备列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-indigo-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">设备列表</CardTitle>
              <CardDescription>查看和管理所有视频设备</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* 搜索和筛选 */}
          <div className="p-4 space-y-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索设备名称、IP或位置..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                全部
              </Button>
              <Button
                variant={statusFilter === 'online' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('online')}
                size="sm"
              >
                在线
              </Button>
              <Button
                variant={statusFilter === 'offline' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('offline')}
                size="sm"
              >
                离线
              </Button>
              <Button
                variant={statusFilter === 'error' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('error')}
                size="sm"
              >
                错误
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>设备名称</TableHead>
                <TableHead>IP地址</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>厂商</TableHead>
                <TableHead>型号</TableHead>
                <TableHead>通道数</TableHead>
                <TableHead>AI分析</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最后上线</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的设备
                  </TableCell>
                </TableRow>
              ) : (
                filteredDevices.map((device) => (
                  <TableRow key={device.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{device.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{device.ip}</div>
                        <div className="text-xs text-muted-foreground">{device.mac}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {device.location}
                      </div>
                    </TableCell>
                    <TableCell>{device.manufacturer}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{device.model}</code>
                    </TableCell>
                    <TableCell>{device.channels}</TableCell>
                    <TableCell>
                      {device.hasAI ? (
                        <Badge className="bg-purple-500 hover:bg-purple-600">已启用</Badge>
                      ) : (
                        <Badge variant="outline">未启用</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(device.status)}</TableCell>
                    <TableCell>{device.lastSeen.toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
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

      {/* 设备分布 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-indigo-500/5 to-transparent">
          <CardTitle className="text-lg">设备分布</CardTitle>
          <CardDescription>按区域统计设备数量</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {['主入口', '后门', '生产车间A区', '生产车间B区', '仓库区'].map((location, index) => {
              const count = devices.filter(d => d.location === location).length;
              return (
                <div key={location} className="p-4 border rounded-lg text-center hover:bg-muted/50 transition-colors">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground mt-1">{location}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
