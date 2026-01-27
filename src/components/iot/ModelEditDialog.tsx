import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Trash2, Code, Braces, Settings } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  identifier: string;
  dataType: string;
  unit?: string;
  min?: string;
  max?: string;
  step?: string;
  rw: 'read' | 'write' | 'read-write';
  description: string;
}

interface Event {
  id: string;
  name: string;
  identifier: string;
  eventType: 'info' | 'warn' | 'error';
  params: number;
  description: string;
}

interface Service {
  id: string;
  name: string;
  identifier: string;
  callType: 'sync' | 'async';
  inputParams: number;
  outputParams: number;
  description: string;
}

interface ModelEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelId?: string;
  modelName?: string;
  modelType?: 'property' | 'event' | 'service';
  onSave?: (model: any) => void;
}

const mockProperties: Property[] = [
  {
    id: '1',
    name: '温度',
    identifier: 'temperature',
    dataType: 'double',
    unit: '°C',
    min: '-40',
    max: '120',
    step: '0.1',
    rw: 'read',
    description: '当前温度值'
  },
  {
    id: '2',
    name: '湿度',
    identifier: 'humidity',
    dataType: 'double',
    unit: '%',
    min: '0',
    max: '100',
    step: '0.1',
    rw: 'read',
    description: '当前湿度值'
  },
  {
    id: '3',
    name: '开关状态',
    identifier: 'switch_status',
    dataType: 'bool',
    rw: 'read-write',
    description: '设备开关状态'
  },
  {
    id: '4',
    name: '工作模式',
    identifier: 'work_mode',
    dataType: 'enum',
    rw: 'read-write',
    description: '设备工作模式'
  },
  {
    id: '5',
    name: '设备名称',
    identifier: 'device_name',
    dataType: 'text',
    rw: 'read',
    description: '设备名称'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    name: '温度告警',
    identifier: 'temp_alarm',
    eventType: 'error',
    params: 3,
    description: '温度超过阈值时触发'
  },
  {
    id: '2',
    name: '设备上线',
    identifier: 'device_online',
    eventType: 'info',
    params: 2,
    description: '设备上线事件'
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: '设置温度',
    identifier: 'set_temperature',
    callType: 'sync',
    inputParams: 1,
    outputParams: 0,
    description: '设置目标温度'
  },
  {
    id: '2',
    name: '重启设备',
    identifier: 'reboot',
    callType: 'async',
    inputParams: 0,
    outputParams: 1,
    description: '重启设备'
  }
];

export function ModelEditDialog({
  open,
  onOpenChange,
  modelId,
  modelName = '',
  modelType = 'property',
  onSave
}: ModelEditDialogProps) {
  const [saving, setSaving] = useState(false);
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave?.({
        id: modelId || Date.now().toString(),
        name: modelName,
        type: modelType,
        properties,
        events,
        services
      });
      onOpenChange(false);
    }, 1000);
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setPropertyDialogOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setPropertyDialogOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const getDataTypeBadge = (dataType: string) => {
    const config: Record<string, { label: string; className: string }> = {
      int: { label: '整数', className: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
      double: { label: '浮点', className: 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30' },
      bool: { label: '布尔', className: 'bg-green-500/20 text-green-700 border-green-500/30' },
      enum: { label: '枚举', className: 'bg-purple-500/20 text-purple-700 border-purple-500/30' },
      text: { label: '字符串', className: 'bg-orange-500/20 text-orange-700 border-orange-500/30' },
      date: { label: '日期', className: 'bg-pink-500/20 text-pink-700 border-pink-500/30' },
      json: { label: 'JSON', className: 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30' }
    };
    const { label, className } = config[dataType] || { label: dataType, className: 'bg-gray-500/20 text-gray-700 border-gray-500/30' };
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getRwBadge = (rw: string) => {
    const config: Record<string, { label: string; className: string }> = {
      read: { label: '只读', className: 'bg-gray-500/20 text-gray-700 border-gray-500/30' },
      write: { label: '只写', className: 'bg-orange-500/20 text-orange-700 border-orange-500/30' },
      'read-write': { label: '读写', className: 'bg-green-500/20 text-green-700 border-green-500/30' }
    };
    const { label, className } = config[rw];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getEventTypeBadge = (eventType: string) => {
    const config: Record<string, { label: string; className: string }> = {
      info: { label: '信息', className: 'bg-blue-500 hover:bg-blue-600' },
      warn: { label: '警告', className: 'bg-yellow-500 hover:bg-yellow-600' },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600' }
    };
    const { label, className } = config[eventType];
    return <Badge className={className}>{label}</Badge>;
  };

  const getCallTypeBadge = (callType: string) => {
    const config: Record<string, { label: string; className: string }> = {
      sync: { label: '同步', className: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
      async: { label: '异步', className: 'bg-purple-500/20 text-purple-700 border-purple-500/30' }
    };
    const { label, className } = config[callType];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {modelName ? `编辑模型: ${modelName}` : '创建物模型'}
          </DialogTitle>
          <DialogDescription>
            定义物模型的属性、事件和服务，支持JSON格式导入导出
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="properties">
              属性定义
              <Badge variant="secondary" className="ml-2">{properties.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="events">
              事件定义
              <Badge variant="secondary" className="ml-2">{events.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="services">
              服务定义
              <Badge variant="secondary" className="ml-2">{services.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* 基本信息 */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="modelName">模型名称 *</Label>
                <Input
                  id="modelName"
                  placeholder="温度传感器模型"
                  defaultValue={modelName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelType">模型类型 *</Label>
                <Select defaultValue={modelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property">属性模型</SelectItem>
                    <SelectItem value="event">事件模型</SelectItem>
                    <SelectItem value="service">服务模型</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">模型描述</Label>
              <Textarea
                id="description"
                placeholder="描述该模型的用途和功能..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="version">版本号</Label>
                <Input
                  id="version"
                  placeholder="1.0.0"
                  defaultValue="1.0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sensor">传感器</SelectItem>
                    <SelectItem value="controller">控制器</SelectItem>
                    <SelectItem value="gateway">网关</SelectItem>
                    <SelectItem value="camera">摄像头</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* 属性定义 */}
          <TabsContent value="properties" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">属性列表</h3>
                <p className="text-sm text-muted-foreground">定义设备可读取或设置的属性参数</p>
              </div>
              <Button onClick={handleAddProperty} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加属性
              </Button>
            </div>

            <div className="border rounded-lg divide-y">
              {properties.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  暂无属性，点击上方按钮添加
                </div>
              ) : (
                properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.name}</span>
                        <span className="text-sm text-muted-foreground">({property.identifier})</span>
                        {getDataTypeBadge(property.dataType)}
                        {getRwBadge(property.rw)}
                      </div>
                      <div className="text-sm text-muted-foreground ml-7">
                        {property.description}
                        {property.unit && ` | 单位: ${property.unit}`}
                        {(property.min !== undefined || property.max !== undefined) &&
                          ` | 范围: [${property.min || '-∞'}, ${property.max || '+∞'}]`
                        }
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* JSON预览 */}
            <div className="space-y-2">
              <Label>JSON预览</Label>
              <div className="p-4 border rounded-lg bg-muted/20">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify({ properties }, null, 2)}
                </pre>
              </div>
            </div>
          </TabsContent>

          {/* 事件定义 */}
          <TabsContent value="events" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">事件列表</h3>
                <p className="text-sm text-muted-foreground">定义设备主动上报的事件</p>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加事件
              </Button>
            </div>

            <div className="border rounded-lg divide-y">
              {events.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  暂无事件，点击上方按钮添加
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Braces className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{event.name}</span>
                        <span className="text-sm text-muted-foreground">({event.identifier})</span>
                        {getEventTypeBadge(event.eventType)}
                        <Badge variant="outline">{event.params}个参数</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground ml-7">
                        {event.description}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* 服务定义 */}
          <TabsContent value="services" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">服务列表</h3>
                <p className="text-sm text-muted-foreground">定义可调用的设备服务</p>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加服务
              </Button>
            </div>

            <div className="border rounded-lg divide-y">
              {services.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  暂无服务，点击上方按钮添加
                </div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{service.name}</span>
                        <span className="text-sm text-muted-foreground">({service.identifier})</span>
                        {getCallTypeBadge(service.callType)}
                      </div>
                      <div className="text-sm text-muted-foreground ml-7">
                        {service.description}
                        {' '}| 输入参数: {service.inputParams}个 | 输出参数: {service.outputParams}个
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button variant="outline">
            导入JSON
          </Button>
          <Button variant="outline">
            导出JSON
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '保存中...' : '保存模型'}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* 属性编辑对话框 */}
      <PropertyEditDialog
        open={propertyDialogOpen}
        onOpenChange={setPropertyDialogOpen}
        property={selectedProperty}
        onSave={(property) => {
          if (selectedProperty) {
            setProperties(properties.map(p => p.id === property.id ? property : p));
          } else {
            setProperties([...properties, { ...property, id: Date.now().toString() }]);
          }
          setPropertyDialogOpen(false);
        }}
      />
    </Dialog>
  );
}

// 属性编辑对话框
interface PropertyEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property | null;
  onSave: (property: Property) => void;
}

function PropertyEditDialog({ open, onOpenChange, property, onSave }: PropertyEditDialogProps) {
  const [formData, setFormData] = useState<Property>(
    property || {
      id: '',
      name: '',
      identifier: '',
      dataType: 'int',
      rw: 'read',
      description: ''
    }
  );

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{property ? '编辑属性' : '添加属性'}</DialogTitle>
          <DialogDescription>
            定义属性的名称、标识符、数据类型和访问权限
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="propName">属性名称 *</Label>
              <Input
                id="propName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="温度"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propIdentifier">标识符 *</Label>
              <Input
                id="propIdentifier"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                placeholder="temperature"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="propDataType">数据类型 *</Label>
              <Select
                value={formData.dataType}
                onValueChange={(value) => setFormData({ ...formData, dataType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="int">整数 (int)</SelectItem>
                  <SelectItem value="double">浮点数 (double)</SelectItem>
                  <SelectItem value="bool">布尔值 (bool)</SelectItem>
                  <SelectItem value="enum">枚举 (enum)</SelectItem>
                  <SelectItem value="text">字符串 (text)</SelectItem>
                  <SelectItem value="date">日期 (date)</SelectItem>
                  <SelectItem value="json">JSON对象 (json)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propRw">访问权限 *</Label>
              <Select
                value={formData.rw}
                onValueChange={(value: any) => setFormData({ ...formData, rw: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">只读</SelectItem>
                  <SelectItem value="write">只写</SelectItem>
                  <SelectItem value="read-write">读写</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.dataType === 'int' || formData.dataType === 'double') && (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="propUnit">单位</Label>
                <Input
                  id="propUnit"
                  value={formData.unit || ''}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="°C"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propMin">最小值</Label>
                <Input
                  id="propMin"
                  type="number"
                  value={formData.min || ''}
                  onChange={(e) => setFormData({ ...formData, min: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propMax">最大值</Label>
                <Input
                  id="propMax"
                  type="number"
                  value={formData.max || ''}
                  onChange={(e) => setFormData({ ...formData, max: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="propDesc">描述</Label>
            <Textarea
              id="propDesc"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="描述该属性的用途..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
