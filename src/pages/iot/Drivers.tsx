import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Play, Square, RefreshCw, Settings, Wrench, Zap, Server } from 'lucide-react';
import { ModbusConfigDialog } from '@/components/iot/ModbusConfigDialog';
import { PageHeader } from '@/components/layout/PageHeader';

interface Driver {
  id: string;
  name: string;
  protocol: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  connectedDevices: number;
  lastUpdate: Date;
  description: string;
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Modbus TCP Driver',
    protocol: 'Modbus TCP',
    version: '2.3.1',
    status: 'running',
    connectedDevices: 15,
    lastUpdate: new Date(),
    description: 'Modbus TCP协议驱动，支持标准Modbus设备'
  },
  {
    id: '2',
    name: 'OPC UA Client',
    protocol: 'OPC UA',
    version: '1.8.0',
    status: 'running',
    connectedDevices: 8,
    lastUpdate: new Date(),
    description: 'OPC UA客户端驱动，支持数据订阅和监控'
  },
  {
    id: '3',
    name: 'MQTT Broker',
    protocol: 'MQTT',
    version: '3.2.0',
    status: 'stopped',
    connectedDevices: 0,
    lastUpdate: new Date(Date.now() - 3600000),
    description: 'MQTT消息代理驱动'
  },
  {
    id: '4',
    name: 'HTTP Collector',
    protocol: 'HTTP',
    version: '1.5.2',
    status: 'error',
    connectedDevices: 3,
    lastUpdate: new Date(Date.now() - 7200000),
    description: 'HTTP数据采集驱动'
  }
];

export function IoTDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const filteredDrivers = drivers.filter(driver => {
    return driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           driver.protocol.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status: string) => {
    const config = {
      running: { label: '运行中', className: 'bg-green-500 hover:bg-green-600' },
      stopped: { label: '已停止', className: 'bg-gray-500 hover:bg-gray-600' },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const openConfigDialog = (driver: Driver) => {
    setSelectedDriver(driver);
    setConfigDialogOpen(true);
  };

  const handleConfigSave = () => {
    // 配置保存逻辑
    console.log('保存配置:', selectedDriver);
    setConfigDialogOpen(false);
  };

  const toggleDriverStatus = (id: string) => {
    setDrivers(drivers.map(driver => {
      if (driver.id === id) {
        const newStatus = driver.status === 'running' ? 'stopped' : 'running';
        return {
          ...driver,
          status: newStatus,
          lastUpdate: new Date(),
          connectedDevices: newStatus === 'running' ? driver.connectedDevices : 0
        };
      }
      return driver;
    }));
  };

  const stats = [
    {
      title: '驱动总数',
      value: drivers.length,
      icon: Wrench,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '运行中',
      value: drivers.filter(d => d.status === 'running').length,
      icon: Play,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '已停止',
      value: drivers.filter(d => d.status === 'stopped').length,
      icon: Square,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '错误',
      value: drivers.filter(d => d.status === 'error').length,
      icon: Zap,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="驱动管理"
        gradient="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            添加驱动
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

      {/* 驱动列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-cyan-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">驱动列表</CardTitle>
              <CardDescription>管理和监控所有驱动程序</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* 搜索 */}
          <div className="p-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索驱动名称或协议..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>驱动名称</TableHead>
                <TableHead>协议</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>连接设备</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的驱动
                  </TableCell>
                </TableRow>
              ) : (
                filteredDrivers.map((driver) => (
                  <TableRow key={driver.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{driver.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{driver.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{driver.protocol}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">v{driver.version}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell>{driver.connectedDevices}</TableCell>
                    <TableCell>{driver.lastUpdate.toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleDriverStatus(driver.id)}
                          title={driver.status === 'running' ? '停止' : '启动'}
                        >
                          {driver.status === 'running' ? (
                            <Square className="h-4 w-4 text-red-500" />
                          ) : (
                            <Play className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openConfigDialog(driver)}
                          title="配置"
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

      {/* Modbus驱动配置对话框 */}
      {selectedDriver && selectedDriver.protocol === 'Modbus TCP' && (
        <ModbusConfigDialog
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          driverName={selectedDriver.name}
          driverId={selectedDriver.id}
          onSave={handleConfigSave}
        />
      )}
    </div>
  );
}
