import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText, AlertTriangle, Info, CheckCircle, XCircle, Filter, Download, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

type LogLevel = 'info' | 'warning' | 'error' | 'success';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  source: string;
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(),
    level: 'info',
    source: 'Modbus TCP Driver',
    message: '成功连接到设备 192.168.1.100',
    details: '连接耗时 125ms'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 60000),
    level: 'warning',
    source: 'OPC UA Client',
    message: '数据订阅延迟',
    details: '订阅更新延迟超过5秒'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 120000),
    level: 'error',
    source: 'HTTP Collector',
    message: '设备连接失败',
    details: '连接超时：192.168.1.105:8080'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 180000),
    level: 'success',
    source: 'MQTT Broker',
    message: '消息处理完成',
    details: '处理了 150 条消息'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 240000),
    level: 'info',
    source: 'Data Service',
    message: '数据写入成功',
    details: '写入 5000 条数据记录'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 300000),
    level: 'error',
    source: 'Modbus TCP Driver',
    message: '读取数据失败',
    details: '寄存器地址 40001 读取错误'
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 360000),
    level: 'warning',
    source: 'System',
    message: '内存使用率偏高',
    details: '当前使用率 85%'
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 420000),
    level: 'info',
    source: 'OPC UA Client',
    message: '重新连接成功',
    details: '自动重连完成'
  }
];

export function IoTLogs() {
  const [logs] = useState<LogEntry[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelBadge = (level: LogLevel) => {
    const config = {
      info: { label: '信息', className: 'bg-blue-500 hover:bg-blue-600', icon: Info },
      warning: { label: '警告', className: 'bg-yellow-500 hover:bg-yellow-600', icon: AlertTriangle },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600', icon: XCircle },
      success: { label: '成功', className: 'bg-green-500 hover:bg-green-600', icon: CheckCircle }
    };

    const { label, className } = config[level];
    return <Badge className={className}>{label}</Badge>;
  };

  const getLevelIcon = (level: LogLevel) => {
    const config = {
      info: Info,
      warning: AlertTriangle,
      error: XCircle,
      success: CheckCircle
    };

    const Icon = config[level];
    const colors = {
      info: 'text-blue-500 bg-blue-500/10',
      warning: 'text-yellow-500 bg-yellow-500/10',
      error: 'text-red-500 bg-red-500/10',
      success: 'text-green-500 bg-green-500/10'
    };

    return (
      <div className={`p-2 rounded-lg ${colors[level]}`}>
        <Icon className="h-4 w-4" />
      </div>
    );
  };

  const stats = [
    {
      title: '日志总数',
      value: logs.length,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '错误',
      value: logs.filter(l => l.level === 'error').length,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      title: '警告',
      value: logs.filter(l => l.level === 'warning').length,
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      title: '成功',
      value: logs.filter(l => l.level === 'success').length,
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
        title="日志分析"
        gradient="bg-linear-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              清理
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

      {/* 日志列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-slate-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">日志记录</CardTitle>
              <CardDescription>实时系统日志</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
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
                placeholder="搜索日志内容或来源..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={levelFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('all')}
                size="sm"
              >
                全部
              </Button>
              <Button
                variant={levelFilter === 'error' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('error')}
                size="sm"
              >
                错误
              </Button>
              <Button
                variant={levelFilter === 'warning' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('warning')}
                size="sm"
              >
                警告
              </Button>
              <Button
                variant={levelFilter === 'success' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('success')}
                size="sm"
              >
                成功
              </Button>
              <Button
                variant={levelFilter === 'info' ? 'default' : 'outline'}
                onClick={() => setLevelFilter('info')}
                size="sm"
              >
                信息
              </Button>
            </div>
          </div>

          {/* 日志列表 */}
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>没有找到匹配的日志</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex gap-3">
                    {getLevelIcon(log.level)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">{log.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.source} • {log.timestamp.toLocaleString('zh-CN')}
                          </p>
                        </div>
                        <div>{getLevelBadge(log.level)}</div>
                      </div>
                      {log.details && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs font-mono text-muted-foreground">
                          {log.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
