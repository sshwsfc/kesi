import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockVideoDevices } from '@/data/mockData';
import { Camera, HardDrive, Activity, Brain, Video, Play } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

export function VideoDashboard() {
  const totalDevices = mockVideoDevices.length;
  const onlineDevices = mockVideoDevices.filter(d => d.status === 'online').length;
  const totalChannels = mockVideoDevices.reduce((sum, d) => sum + d.channels, 0);
  const aiEnabledDevices = mockVideoDevices.filter(d => d.hasAI).length;

  const stats = [
    {
      title: '视频设备',
      value: totalDevices,
      icon: Camera,
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
      title: '总通道数',
      value: totalChannels,
      icon: HardDrive,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'AI分析',
      value: aiEnabledDevices,
      icon: Brain,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="视频中台 - 看板"
        gradient="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
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
                <p className="text-xs text-muted-foreground mt-1">实时统计</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 视频设备列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">视频设备</CardTitle>
              <CardDescription>所有视频源设备</CardDescription>
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Video className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>设备名称</TableHead>
                <TableHead>IP地址</TableHead>
                <TableHead>通道数</TableHead>
                <TableHead>AI分析</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVideoDevices.map((device) => (
                <TableRow key={device.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell>{device.channels}</TableCell>
                  <TableCell>
                    {device.hasAI ? (
                      <Badge className="bg-purple-500 hover:bg-purple-600">已启用</Badge>
                    ) : (
                      <Badge variant="outline">未启用</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={device.status === 'online' ? 'default' : 'secondary'}
                      className={device.status === 'online' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {device.status === 'online' ? '在线' : '离线'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 视频预览占位 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-purple-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">实时预览</CardTitle>
              <CardDescription>选择设备查看实时视频流</CardDescription>
            </div>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Play className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-linear-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg group cursor-pointer"
              >
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2 text-white/50 group-hover:text-purple-400 transition-colors" />
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">通道 {i}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
