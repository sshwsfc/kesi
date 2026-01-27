import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockAlarms } from '@/data/mockData';
import { CheckCircle, AlertTriangle, Bell, AlertCircle, Clock } from 'lucide-react';
import { type Alarm } from '@/types';
import { PageHeader } from '@/components/layout/PageHeader';

export function IoTAlarms() {
  const [alarms, setAlarms] = useState<Alarm[]>(mockAlarms);

  const handleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id ? { ...alarm, handled: true } : alarm
    ));
  };

  const getLevelBadge = (level: string) => {
    const config = {
      critical: { label: '严重', className: 'bg-red-500 hover:bg-red-600' },
      warning: { label: '警告', className: 'bg-yellow-500 hover:bg-yellow-600' },
      info: { label: '信息', className: 'bg-blue-500 hover:bg-blue-600' }
    };

    const { label, className } = config[level as keyof typeof config] || config.info;

    return (
      <Badge className={className}>
        {label}
      </Badge>
    );
  };

  const activeAlarms = alarms.filter(a => !a.handled);
  const handledAlarms = alarms.filter(a => a.handled);

  const stats = [
    {
      title: '总报警数',
      value: alarms.length,
      icon: Bell,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '待处理',
      value: activeAlarms.length,
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      title: '严重报警',
      value: alarms.filter(a => a.level === 'critical' && !a.handled).length,
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      title: '已处理',
      value: handledAlarms.length,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="报警管理"
        gradient="bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
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

      {/* 活跃报警 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-red-500/5 to-transparent">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">待处理报警</CardTitle>
          </div>
          <CardDescription>需要立即处理的报警信息</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {activeAlarms.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500/50" />
              <p>暂无待处理报警</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>级别</TableHead>
                  <TableHead>设备</TableHead>
                  <TableHead>报警信息</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAlarms.map((alarm) => (
                  <TableRow key={alarm.id} className="hover:bg-muted/50">
                    <TableCell>{getLevelBadge(alarm.level)}</TableCell>
                    <TableCell className="font-medium">{alarm.deviceName}</TableCell>
                    <TableCell>{alarm.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alarm.time.toLocaleString('zh-CN')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => handleAlarm(alarm.id)}
                        className="shadow-sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        处理
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 已处理报警 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-green-500/5 to-transparent">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">已处理报警</CardTitle>
          </div>
          <CardDescription>历史报警记录</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {handledAlarms.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>暂无已处理报警</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>级别</TableHead>
                  <TableHead>设备</TableHead>
                  <TableHead>报警信息</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="text-right">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {handledAlarms.map((alarm) => (
                  <TableRow key={alarm.id} className="hover:bg-muted/50">
                    <TableCell>{getLevelBadge(alarm.level)}</TableCell>
                    <TableCell className="font-medium">{alarm.deviceName}</TableCell>
                    <TableCell>{alarm.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alarm.time.toLocaleString('zh-CN')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="gap-1 border-green-500/30 text-green-700 bg-green-500/5">
                        <CheckCircle className="h-3 w-3" />
                        已处理
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
