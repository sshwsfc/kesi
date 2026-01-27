import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Upload, Download, Trash2, Edit, Code, Braces } from 'lucide-react';
import { ModelEditDialog } from '@/components/iot/ModelEditDialog';
import { PageHeader } from '@/components/layout/PageHeader';

interface IoTModel {
  id: string;
  name: string;
  type: 'property' | 'event' | 'service';
  version: string;
  description: string;
  properties: number;
  devices: number;
  lastModified: Date;
}

const mockModels: IoTModel[] = [
  {
    id: '1',
    name: '温度传感器模型',
    type: 'property',
    version: '1.0.0',
    description: '标准温度传感器数据模型',
    properties: 5,
    devices: 12,
    lastModified: new Date('2024-01-15')
  },
  {
    id: '2',
    name: '设备报警事件',
    type: 'event',
    version: '2.1.0',
    description: '设备报警和异常事件定义',
    properties: 8,
    devices: 45,
    lastModified: new Date('2024-01-20')
  },
  {
    id: '3',
    name: '远程控制服务',
    type: 'service',
    version: '1.2.0',
    description: '设备远程控制指令模型',
    properties: 6,
    devices: 23,
    lastModified: new Date('2024-01-18')
  },
  {
    id: '4',
    name: '湿度传感器模型',
    type: 'property',
    version: '1.0.0',
    description: '湿度测量数据模型',
    properties: 4,
    devices: 8,
    lastModified: new Date('2024-01-10')
  }
];

export function IoTModels() {
  const [models, setModels] = useState<IoTModel[]>(mockModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'property' | 'event' | 'service'>('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<IoTModel | null>(null);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || model.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const config = {
      property: { label: '属性', className: 'bg-blue-500 hover:bg-blue-600', icon: Code },
      event: { label: '事件', className: 'bg-purple-500 hover:bg-purple-600', icon: Braces },
      service: { label: '服务', className: 'bg-green-500 hover:bg-green-600', icon: Code }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const openEditDialog = (model?: IoTModel) => {
    setSelectedModel(model || null);
    setEditDialogOpen(true);
  };

  const handleCreateModel = () => {
    openEditDialog();
  };

  const handleModelSave = (savedModel: any) => {
    console.log('保存模型:', savedModel);
    // 这里可以添加更新模型列表的逻辑
  };

  const stats = [
    {
      title: '模型总数',
      value: models.length,
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '属性模型',
      value: models.filter(m => m.type === 'property').length,
      icon: Code,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      title: '事件模型',
      value: models.filter(m => m.type === 'event').length,
      icon: Braces,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '服务模型',
      value: models.filter(m => m.type === 'service').length,
      icon: Code,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="模型管理"
        gradient="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm" onClick={handleCreateModel}>
            <Plus className="h-4 w-4 mr-2" />
            创建模型
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

      {/* 模型列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-indigo-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">模型列表</CardTitle>
              <CardDescription>查看和管理所有数据模型</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
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
                placeholder="搜索模型名称或描述..."
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
                variant={typeFilter === 'property' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('property')}
                size="sm"
              >
                属性
              </Button>
              <Button
                variant={typeFilter === 'event' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('event')}
                size="sm"
              >
                事件
              </Button>
              <Button
                variant={typeFilter === 'service' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('service')}
                size="sm"
              >
                服务
              </Button>
            </div>
          </div>

          {/* 表格 */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>模型名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>属性数</TableHead>
                <TableHead>关联设备</TableHead>
                <TableHead>最后修改</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的模型
                  </TableCell>
                </TableRow>
              ) : (
                filteredModels.map((model) => (
                  <TableRow key={model.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-muted-foreground">{model.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(model.type)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">v{model.version}</Badge>
                    </TableCell>
                    <TableCell>{model.properties}</TableCell>
                    <TableCell>{model.devices}</TableCell>
                    <TableCell>{model.lastModified.toLocaleDateString('zh-CN')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(model)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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

      {/* 物模型编辑对话框 */}
      <ModelEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        modelId={selectedModel?.id}
        modelName={selectedModel?.name}
        modelType={selectedModel?.type}
        onSave={handleModelSave}
      />
    </div>
  );
}
