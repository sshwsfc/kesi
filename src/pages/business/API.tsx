import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, RefreshCw, Edit, Trash2, Copy, Eye, Code, Globe, Lock, Zap } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  category: string;
  status: 'published' | 'draft' | 'deprecated';
  auth: boolean;
  rateLimit: number;
  calls: number;
  avgResponseTime: number;
  lastUpdate: Date;
}

const mockAPIs: APIEndpoint[] = [
  {
    id: '1',
    name: '获取设备列表',
    path: '/api/v1/devices',
    method: 'GET',
    description: '获取所有已注册的设备列表，支持分页和筛选',
    category: '设备管理',
    status: 'published',
    auth: true,
    rateLimit: 1000,
    calls: 15420,
    avgResponseTime: 45,
    lastUpdate: new Date('2024-01-20')
  },
  {
    id: '2',
    name: '获取设备详情',
    path: '/api/v1/devices/:id',
    method: 'GET',
    description: '根据设备ID获取设备详细信息',
    category: '设备管理',
    status: 'published',
    auth: true,
    rateLimit: 2000,
    calls: 8730,
    avgResponseTime: 32,
    lastUpdate: new Date('2024-01-18')
  },
  {
    id: '3',
    name: '创建设备',
    path: '/api/v1/devices',
    method: 'POST',
    description: '创建新的设备',
    category: '设备管理',
    status: 'published',
    auth: true,
    rateLimit: 100,
    calls: 342,
    avgResponseTime: 120,
    lastUpdate: new Date('2024-01-15')
  },
  {
    id: '4',
    name: '更新设备',
    path: '/api/v1/devices/:id',
    method: 'PUT',
    description: '更新设备信息',
    category: '设备管理',
    status: 'published',
    auth: true,
    rateLimit: 200,
    calls: 521,
    avgResponseTime: 98,
    lastUpdate: new Date('2024-01-15')
  },
  {
    id: '5',
    name: '删除设备',
    path: '/api/v1/devices/:id',
    method: 'DELETE',
    description: '删除指定设备',
    category: '设备管理',
    status: 'published',
    auth: true,
    rateLimit: 50,
    calls: 89,
    avgResponseTime: 75,
    lastUpdate: new Date('2024-01-10')
  },
  {
    id: '6',
    name: '获取设备数据',
    path: '/api/v1/devices/:id/data',
    method: 'GET',
    description: '获取设备的实时数据',
    category: '数据查询',
    status: 'published',
    auth: true,
    rateLimit: 5000,
    calls: 45670,
    avgResponseTime: 28,
    lastUpdate: new Date('2024-01-20')
  },
  {
    id: '7',
    name: '批量获取设备数据',
    path: '/api/v1/devices/data/batch',
    method: 'POST',
    description: '批量获取多个设备的数据',
    category: '数据查询',
    status: 'published',
    auth: true,
    rateLimit: 1000,
    calls: 12340,
    avgResponseTime: 85,
    lastUpdate: new Date('2024-01-19')
  },
  {
    id: '8',
    name: '历史数据查询',
    path: '/api/v1/devices/:id/data/history',
    method: 'GET',
    description: '查询设备历史数据，支持时间范围和聚合',
    category: '数据查询',
    status: 'published',
    auth: true,
    rateLimit: 500,
    calls: 6780,
    avgResponseTime: 156,
    lastUpdate: new Date('2024-01-18')
  },
  {
    id: '9',
    name: '统计数据导出',
    path: '/api/v1/statistics/export',
    method: 'POST',
    description: '导出统计数据为Excel或CSV格式',
    category: '数据导出',
    status: 'draft',
    auth: true,
    rateLimit: 100,
    calls: 0,
    avgResponseTime: 0,
    lastUpdate: new Date('2024-01-20')
  },
  {
    id: '10',
    name: '报警列表查询',
    path: '/api/v1/alarms',
    method: 'GET',
    description: '查询报警记录',
    category: '报警管理',
    status: 'published',
    auth: true,
    rateLimit: 1000,
    calls: 9234,
    avgResponseTime: 52,
    lastUpdate: new Date('2024-01-17')
  },
  {
    id: '11',
    name: '确认报警',
    path: '/api/v1/alarms/:id/acknowledge',
    method: 'POST',
    description: '确认指定的报警',
    category: '报警管理',
    status: 'published',
    auth: true,
    rateLimit: 200,
    calls: 1234,
    avgResponseTime: 65,
    lastUpdate: new Date('2024-01-15')
  },
  {
    id: '12',
    name: '旧版设备列表',
    path: '/api/v0/devices',
    method: 'GET',
    description: '旧版设备列表接口（已废弃）',
    category: '设备管理',
    status: 'deprecated',
    auth: true,
    rateLimit: 1000,
    calls: 120,
    avgResponseTime: 58,
    lastUpdate: new Date('2023-12-01')
  }
];

export function BusinessAPI() {
  const [apis] = useState<APIEndpoint[]>(mockAPIs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(apis.map(api => api.category)))];
  const methods = ['all', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const statuses = ['all', 'published', 'draft', 'deprecated'];

  const filteredAPIs = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || api.category === categoryFilter;
    const matchesMethod = methodFilter === 'all' || api.method === methodFilter;
    const matchesStatus = statusFilter === 'all' || api.status === statusFilter;
    return matchesSearch && matchesCategory && matchesMethod && matchesStatus;
  });

  const getMethodBadge = (method: string) => {
    const config: Record<string, { label: string; className: string }> = {
      GET: { label: 'GET', className: 'bg-green-500/20 text-green-700 border-green-500/30' },
      POST: { label: 'POST', className: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
      PUT: { label: 'PUT', className: 'bg-orange-500/20 text-orange-700 border-orange-500/30' },
      DELETE: { label: 'DELETE', className: 'bg-red-500/20 text-red-700 border-red-500/30' },
      PATCH: { label: 'PATCH', className: 'bg-purple-500/20 text-purple-700 border-purple-500/30' }
    };
    const { label, className } = config[method] || { label: method, className: 'bg-gray-500/20 text-gray-700 border-gray-500/30' };
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string; icon: any }> = {
      published: { label: '已发布', className: 'bg-green-500 hover:bg-green-600', icon: Globe },
      draft: { label: '草稿', className: 'bg-gray-500 hover:bg-gray-600', icon: Edit },
      deprecated: { label: '已废弃', className: 'bg-red-500 hover:bg-red-600', icon: Zap }
    };
    const { label, className } = config[status];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '接口总数',
      value: apis.length,
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '已发布',
      value: apis.filter(a => a.status === 'published').length,
      icon: Globe,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '草稿',
      value: apis.filter(a => a.status === 'draft').length,
      icon: Edit,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    },
    {
      title: '总调用量',
      value: apis.reduce((sum, api) => sum + api.calls, 0).toLocaleString(),
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="数据接口管理"
        gradient="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            新建接口
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

      {/* API列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">接口列表</CardTitle>
              <CardDescription>查看和管理所有API接口</CardDescription>
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
                placeholder="搜索接口名称、路径或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* 分类筛选 */}
              <div>
                <label className="text-sm font-medium mb-2 block">分类</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? 'default' : 'outline'}
                      onClick={() => setCategoryFilter(cat)}
                      size="sm"
                    >
                      {cat === 'all' ? '全部' : cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 方法筛选 */}
              <div>
                <label className="text-sm font-medium mb-2 block">请求方法</label>
                <div className="flex flex-wrap gap-2">
                  {methods.map(method => (
                    <Button
                      key={method}
                      variant={methodFilter === method ? 'default' : 'outline'}
                      onClick={() => setMethodFilter(method)}
                      size="sm"
                    >
                      {method === 'all' ? '全部' : method}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 状态筛选 */}
              <div>
                <label className="text-sm font-medium mb-2 block">状态</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      onClick={() => setStatusFilter(status)}
                      size="sm"
                    >
                      {status === 'all' ? '全部' :
                       status === 'published' ? '已发布' :
                       status === 'draft' ? '草稿' : '已废弃'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>接口名称</TableHead>
                <TableHead>请求路径</TableHead>
                <TableHead>方法</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>调用量</TableHead>
                <TableHead>平均响应</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAPIs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的接口
                  </TableCell>
                </TableRow>
              ) : (
                filteredAPIs.map((api) => (
                  <TableRow key={api.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{api.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{api.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {api.path}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(api.path)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getMethodBadge(api.method)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{api.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(api.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{api.calls.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          api.avgResponseTime < 50 ? 'text-green-600' :
                          api.avgResponseTime < 100 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {api.avgResponseTime}ms
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="查看">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="编辑">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="删除">
                          <Trash2 className="h-4 w-4 text-red-500" />
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
