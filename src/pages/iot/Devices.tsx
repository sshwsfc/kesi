import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockIoTDevices } from '@/data/mockData';
import { Search, Plus, RefreshCw, Settings, Eye, Database, Activity, AlertCircle } from 'lucide-react';
import { type IoTDevice, type DeviceStatus } from '@/types';
import { DeviceEditDialog } from '@/components/iot/DeviceEditDialog';
import { PageHeader } from '@/components/layout/PageHeader';

export function IoTDevices() {
  const [devices, setDevices] = useState<IoTDevice[]>(mockIoTDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'all'>('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: DeviceStatus) => {
    const config = {
      online: { label: '在线', className: 'bg-green-500 hover:bg-green-600' },
      offline: { label: '离线', className: 'bg-gray-500 hover:bg-gray-600' },
      warning: { label: '警告', className: 'bg-yellow-500 hover:bg-yellow-600' }
    };

    const { label, className } = config[status];

    return (
      <Badge className={className}>
        {label}
      </Badge>
    );
  };

  const openEditDialog = (device?: IoTDevice) => {
    setSelectedDevice(device || null);
    setEditDialogOpen(true);
  };

  const handleAddDevice = () => {
    openEditDialog();
  };

  const handleDeviceSave = (savedDevice: any) => {
    console.log('保存设备:', savedDevice);
    // 这里可以添加更新设备列表的逻辑
  };

  const stats = [
    {
      title: '设备总数',
      value: devices.length,
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '在线',
      value: devices.filter(d => d.status === 'online').length,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '离线',
      value: devices.filter(d => d.status === 'offline').length,
      icon: AlertCircle,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '警告',
      value: devices.filter(d => d.status === 'warning').length,
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="设备管理"
        gradient="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm" onClick={handleAddDevice}>
            <Plus className="h-4 w-4 mr-2" />
            添加设备
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

      {/* 设备列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">设备列表</CardTitle>
              <CardDescription>查看和管理所有设备</CardDescription>
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
                placeholder="搜索设备名称或位置..."
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
                variant={statusFilter === 'warning' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('warning')}
                size="sm"
              >
                警告
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>设备名称</TableHead>
                <TableHead>设备类型</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的设备
                  </TableCell>
                </TableRow>
              ) : (
                filteredDevices.map((device) => (
                  <TableRow key={device.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>{getStatusBadge(device.status)}</TableCell>
                    <TableCell>{device.lastUpdate.toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(device)}
                        >
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

      {/* 设备编辑对话框 */}
      <DeviceEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        deviceId={selectedDevice?.id}
        deviceName={selectedDevice?.name}
        deviceType={selectedDevice?.type}
        onSave={handleDeviceSave}
      />
    </div>
  );
}
