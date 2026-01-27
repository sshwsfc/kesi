import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Video, Link, Link2, Settings, Eye } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface GBDevice {
  id: string;
  name: string;
  deviceID: string;
  ip: string;
  port: number;
  manufacturer: string;
  model: string;
  status: 'online' | 'offline' | 'unregistered';
  channels: number;
  lastConnect: Date;
}

const mockGBDevices: GBDevice[] = [
  {
    id: '1',
    name: '前门摄像头',
    deviceID: '31011500991320000001',
    ip: '192.168.1.101',
    port: 37777,
    manufacturer: '海康威视',
    model: 'DS-2CD3T56',
    status: 'online',
    channels: 1,
    lastConnect: new Date()
  },
  {
    id: '2',
    name: '后门摄像头',
    deviceID: '31011500991320000002',
    ip: '192.168.1.102',
    port: 37777,
    manufacturer: '大华',
    model: 'DH-IPC-HFW',
    status: 'online',
    channels: 1,
    lastConnect: new Date()
  },
  {
    id: '3',
    name: '车间监控A',
    deviceID: '31011500991320000003',
    ip: '192.168.1.103',
    port: 37777,
    manufacturer: '海康威视',
    model: 'DS-2CD2T85',
    status: 'offline',
    channels: 1,
    lastConnect: new Date(Date.now() - 3600000)
  },
  {
    id: '4',
    name: '车间监控B',
    deviceID: '31011500991320000004',
    ip: '192.168.1.104',
    port: 37777,
    manufacturer: '宇视',
    model: 'IPC-B242',
    status: 'unregistered',
    channels: 1,
    lastConnect: new Date(Date.now() - 86400000)
  }
];

export function VideoGB28181() {
  const [devices] = useState<GBDevice[]>(mockGBDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'unregistered'>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.deviceID.includes(searchTerm) ||
                         device.ip.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      online: { label: '在线', className: 'bg-green-500 hover:bg-green-600' },
      offline: { label: '离线', className: 'bg-gray-500 hover:bg-gray-600' },
      unregistered: { label: '未注册', className: 'bg-yellow-500 hover:bg-yellow-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '设备总数',
      value: devices.length,
      icon: Video,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '在线设备',
      value: devices.filter(d => d.status === 'online').length,
      icon: Link2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '离线设备',
      value: devices.filter(d => d.status === 'offline').length,
      icon: Video,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '未注册',
      value: devices.filter(d => d.status === 'unregistered').length,
      icon: Link,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="国标视频"
        gradient="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Link2 className="h-4 w-4 mr-2" />
              添加设备
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              设备注册
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
        <CardHeader className="border-b bg-linear-to-r from-rose-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">GB28181设备</CardTitle>
              <CardDescription>管理所有国标协议视频设备</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4 mr-2" />
                刷新状态
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
                placeholder="搜索设备名称、ID或IP..."
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
                variant={statusFilter === 'unregistered' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('unregistered')}
                size="sm"
              >
                未注册
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>设备名称</TableHead>
                <TableHead>设备ID</TableHead>
                <TableHead>IP地址</TableHead>
                <TableHead>端口</TableHead>
                <TableHead>厂商</TableHead>
                <TableHead>型号</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最后连接</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的设备
                  </TableCell>
                </TableRow>
              ) : (
                filteredDevices.map((device) => (
                  <TableRow key={device.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {device.deviceID}
                      </code>
                    </TableCell>
                    <TableCell>{device.ip}</TableCell>
                    <TableCell>{device.port}</TableCell>
                    <TableCell>{device.manufacturer}</TableCell>
                    <TableCell>{device.model}</TableCell>
                    <TableCell>{getStatusBadge(device.status)}</TableCell>
                    <TableCell>{device.lastConnect.toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
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

      {/* 协议信息 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-rose-500/5 to-transparent">
          <CardTitle className="text-lg">协议信息</CardTitle>
          <CardDescription>GB28181协议配置和状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">服务器ID</div>
              <div className="font-mono text-lg mt-1">31011500991320000000</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">服务器IP</div>
              <div className="font-mono text-lg mt-1">192.168.1.100</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">服务器端口</div>
              <div className="font-mono text-lg mt-1">5060</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
