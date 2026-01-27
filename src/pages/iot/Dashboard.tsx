import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockIoTDevices, mockAlarms } from '@/data/mockData';
import { AlertTriangle, Activity, TrendingDown, Database, Zap } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

export function IoTDashboard() {
  const totalDevices = mockIoTDevices.length;
  const onlineDevices = mockIoTDevices.filter(d => d.status === 'online').length;
  const offlineDevices = mockIoTDevices.filter(d => d.status === 'offline').length;
  const warningDevices = mockIoTDevices.filter(d => d.status === 'warning').length;
  const activeAlarms = mockAlarms.filter(a => !a.handled).length;

  const stats = [
    {
      title: '设备总数',
      value: totalDevices,
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '在线设备',
      value: onlineDevices,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '离线设备',
      value: offlineDevices,
      icon: TrendingDown,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '警告设备',
      value: warningDevices,
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      title: '活跃报警',
      value: activeAlarms,
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
        title="物联中台 - 首页看板"
        gradient="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      />

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
                <p className="text-xs text-muted-foreground mt-1">实时数据</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 设备列表和报警 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 设备列表 */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-blue-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">设备状态</CardTitle>
                <CardDescription>最近更新的设备</CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>设备名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIoTDevices.slice(0, 5).map((device) => (
                  <TableRow key={device.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          device.status === 'online'
                            ? 'default'
                            : device.status === 'offline'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={
                          device.status === 'online'
                            ? 'bg-green-500 hover:bg-green-600'
                            : device.status === 'warning'
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : ''
                        }
                      >
                        {device.status === 'online' ? '在线' : device.status === 'offline' ? '离线' : '警告'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 最新报警 */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-red-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">最新报警</CardTitle>
                <CardDescription>未处理的报警信息</CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAlarms.filter(a => !a.handled).map((alarm) => (
                <div
                  key={alarm.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    alarm.level === 'critical' ? 'bg-red-500/10' :
                    alarm.level === 'warning' ? 'bg-yellow-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alarm.level === 'critical' ? 'text-red-500' :
                      alarm.level === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{alarm.message}</p>
                    <p className="text-xs text-muted-foreground truncate">{alarm.deviceName}</p>
                    <p className="text-xs text-muted-foreground">
                      {alarm.time.toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <Badge
                    variant={alarm.level === 'critical' ? 'destructive' : 'secondary'}
                    className={
                      alarm.level === 'critical'
                        ? 'bg-red-500 hover:bg-red-600'
                        : alarm.level === 'warning'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : ''
                    }
                  >
                    {alarm.level === 'critical' ? '严重' : alarm.level === 'warning' ? '警告' : '信息'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
