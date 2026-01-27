import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, FileText, Download, Eye, Calendar, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface Report {
  id: string;
  name: string;
  type: 'production' | 'quality' | 'equipment' | 'financial';
  creator: string;
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'completed' | 'scheduled';
  schedule?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: '月度生产统计报告',
    type: 'production',
    creator: '张三',
    createdAt: new Date(Date.now() - 86400000),
    lastModified: new Date(),
    status: 'completed',
    schedule: '每月1日'
  },
  {
    id: '2',
    name: '质量检测分析报告',
    type: 'quality',
    creator: '李四',
    createdAt: new Date(Date.now() - 172800000),
    lastModified: new Date(Date.now() - 86400000),
    status: 'completed',
    schedule: '每周一'
  },
  {
    id: '3',
    name: '设备运行效率报告',
    type: 'equipment',
    creator: '王五',
    createdAt: new Date(Date.now() - 259200000),
    lastModified: new Date(Date.now() - 172800000),
    status: 'scheduled',
    schedule: '每日9:00'
  },
  {
    id: '4',
    name: '季度财务总结',
    type: 'financial',
    creator: '赵六',
    createdAt: new Date(Date.now() - 43200000),
    lastModified: new Date(Date.now() - 43200000),
    status: 'draft'
  },
  {
    id: '5',
    name: '能耗分析报告',
    type: 'equipment',
    creator: '孙七',
    createdAt: new Date(Date.now() - 604800000),
    lastModified: new Date(Date.now() - 518400000),
    status: 'completed'
  }
];

export function BusinessReports() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'production' | 'quality' | 'equipment' | 'financial'>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const config = {
      production: { label: '生产', className: 'bg-blue-500 hover:bg-blue-600' },
      quality: { label: '质量', className: 'bg-green-500 hover:bg-green-600' },
      equipment: { label: '设备', className: 'bg-purple-500 hover:bg-purple-600' },
      financial: { label: '财务', className: 'bg-orange-500 hover:bg-orange-600' }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { label: '草稿', className: 'bg-gray-500 hover:bg-gray-600' },
      completed: { label: '已完成', className: 'bg-green-500 hover:bg-green-600' },
      scheduled: { label: '定时', className: 'bg-blue-500 hover:bg-blue-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '报告总数',
      value: reports.length,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '已完成',
      value: reports.filter(r => r.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '定时任务',
      value: reports.filter(r => r.status === 'scheduled').length,
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '草稿',
      value: reports.filter(r => r.status === 'draft').length,
      icon: FileText,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="报表管理"
        gradient="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            新建报表
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

      {/* 报表列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-amber-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">报表列表</CardTitle>
              <CardDescription>查看和管理所有报表</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
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
                placeholder="搜索报表名称或创建者..."
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
                variant={typeFilter === 'production' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('production')}
                size="sm"
              >
                生产
              </Button>
              <Button
                variant={typeFilter === 'quality' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('quality')}
                size="sm"
              >
                质量
              </Button>
              <Button
                variant={typeFilter === 'equipment' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('equipment')}
                size="sm"
              >
                设备
              </Button>
              <Button
                variant={typeFilter === 'financial' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('financial')}
                size="sm"
              >
                财务
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>报表名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>创建者</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>定时</TableHead>
                <TableHead>最后修改</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的报表
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(report.type)}</TableCell>
                    <TableCell>{report.creator}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      {report.schedule ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {report.schedule}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{report.lastModified.toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
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

      {/* 快速操作 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-amber-500/5 to-transparent">
          <CardTitle className="text-lg">快速操作</CardTitle>
          <CardDescription>常用报表功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-amber-500 hover:bg-amber-500/5">
              <TrendingUp className="h-6 w-6 text-amber-500" />
              <span>生成趋势报表</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-blue-500 hover:bg-blue-500/5">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <span>生成对比报表</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 hover:border-green-500 hover:bg-green-500/5">
              <FileText className="h-6 w-6 text-green-500" />
              <span>导出历史数据</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
