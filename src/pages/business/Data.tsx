import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Upload, Download, Database, FileText, Image, Video } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface DataItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'dataset';
  size: string;
  records: number;
  lastModified: Date;
  status: 'active' | 'archived' | 'processing';
}

const mockDataItems: DataItem[] = [
  {
    id: '1',
    name: '生产记录数据集',
    type: 'dataset',
    size: '2.4 GB',
    records: 125000,
    lastModified: new Date(),
    status: 'active'
  },
  {
    id: '2',
    name: '设备监控日志',
    type: 'document',
    size: '856 MB',
    records: 45000,
    lastModified: new Date(Date.now() - 3600000),
    status: 'active'
  },
  {
    id: '3',
    name: '产品检测图像',
    type: 'image',
    size: '12.3 GB',
    records: 8500,
    lastModified: new Date(Date.now() - 7200000),
    status: 'processing'
  },
  {
    id: '4',
    name: '生产线录像',
    type: 'video',
    size: '45.6 GB',
    records: 120,
    lastModified: new Date(Date.now() - 86400000),
    status: 'archived'
  },
  {
    id: '5',
    name: '质量检测报告',
    type: 'document',
    size: '124 MB',
    records: 2300,
    lastModified: new Date(Date.now() - 172800000),
    status: 'active'
  }
];

export function BusinessData() {
  const [dataItems] = useState<DataItem[]>(mockDataItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'document' | 'image' | 'video' | 'dataset'>('all');

  const filteredItems = dataItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const config = {
      document: { label: '文档', className: 'bg-blue-500 hover:bg-blue-600', icon: FileText },
      image: { label: '图像', className: 'bg-green-500 hover:bg-green-600', icon: Image },
      video: { label: '视频', className: 'bg-purple-500 hover:bg-purple-600', icon: Video },
      dataset: { label: '数据集', className: 'bg-orange-500 hover:bg-orange-600', icon: Database }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: '活跃', className: 'bg-green-500 hover:bg-green-600' },
      archived: { label: '已归档', className: 'bg-gray-500 hover:bg-gray-600' },
      processing: { label: '处理中', className: 'bg-yellow-500 hover:bg-yellow-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '数据总数',
      value: dataItems.length,
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '总记录数',
      value: dataItems.reduce((sum, item) => sum + item.records, 0).toLocaleString(),
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '总存储',
      value: '61.2 GB',
      icon: Database,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '处理中',
      value: dataItems.filter(d => d.status === 'processing').length,
      icon: Upload,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="数据管理"
        gradient="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              上传数据
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新建数据集
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

      {/* 数据列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-teal-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">数据列表</CardTitle>
              <CardDescription>查看和管理所有数据资源</CardDescription>
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
                placeholder="搜索数据名称..."
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
                variant={typeFilter === 'dataset' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('dataset')}
                size="sm"
              >
                数据集
              </Button>
              <Button
                variant={typeFilter === 'document' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('document')}
                size="sm"
              >
                文档
              </Button>
              <Button
                variant={typeFilter === 'image' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('image')}
                size="sm"
              >
                图像
              </Button>
              <Button
                variant={typeFilter === 'video' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('video')}
                size="sm"
              >
                视频
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>数据名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>大小</TableHead>
                <TableHead>记录数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最后修改</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的数据
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(item.type)}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.records.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastModified.toLocaleDateString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          查看
                        </Button>
                        <Button variant="ghost" size="sm">
                          下载
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
    </div>
  );
}
