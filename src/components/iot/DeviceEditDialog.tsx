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
import { Edit, Settings, Database, Shield, MapPin } from 'lucide-react';

interface DeviceEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceId?: string;
  deviceName?: string;
  deviceType?: string;
  onSave?: (device: any) => void;
}

interface DeviceData {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  deviceId: string;
  deviceKey: string;
  driver: string;
  gateway: string;
  model: string;
  manufacturer: string;
  status: 'online' | 'offline' | 'warning';
  enabled: boolean;
  autoReport: boolean;
  reportInterval: number;
}

const mockDeviceData: DeviceData = {
  id: '1',
  name: '温度传感器-01',
  type: '传感器',
  location: '1号车间-东墙',
  description: '监测1号车间东侧环境温度',
  deviceId: 'DEV20240101001',
  deviceKey: 'secret_key_xxxxx',
  driver: 'Modbus TCP Driver',
  gateway: '网关-01',
  model: 'T100',
  manufacturer: '智联科技',
  status: 'online',
  enabled: true,
  autoReport: true,
  reportInterval: 5000
};

export function DeviceEditDialog({
  open,
  onOpenChange,
  deviceId,
  deviceName = '',
  deviceType = '',
  onSave
}: DeviceEditDialogProps) {
  const [saving, setSaving] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceData>(mockDeviceData);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave?.(deviceData);
      onOpenChange(false);
    }, 1000);
  };

  const updateDeviceData = (field: keyof DeviceData, value: any) => {
    setDeviceData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {deviceData.name ? `编辑设备: ${deviceData.name}` : '添加设备'}
          </DialogTitle>
          <DialogDescription>
            配置设备的基本信息、连接参数和运行属性
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="config">设备配置</TabsTrigger>
            <TabsTrigger value="auth">认证信息</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
          </TabsList>

          {/* 基本信息 */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deviceName">设备名称 *</Label>
                <Input
                  id="deviceName"
                  value={deviceData.name}
                  onChange={(e) => updateDeviceData('name', e.target.value)}
                  placeholder="温度传感器-01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deviceType">设备类型 *</Label>
                <Select value={deviceData.type} onValueChange={(value) => updateDeviceData('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择设备类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="传感器">传感器</SelectItem>
                    <SelectItem value="控制器">控制器</SelectItem>
                    <SelectItem value="网关">网关</SelectItem>
                    <SelectItem value="执行器">执行器</SelectItem>
                    <SelectItem value="摄像头">摄像头</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">安装位置 *</Label>
              <div className="flex gap-2">
                <MapPin className="h-10 w-10 text-muted-foreground p-2 border rounded" />
                <Input
                  id="location"
                  value={deviceData.location}
                  onChange={(e) => updateDeviceData('location', e.target.value)}
                  placeholder="1号车间-东墙"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="model">设备型号</Label>
                <Input
                  id="model"
                  value={deviceData.model}
                  onChange={(e) => updateDeviceData('model', e.target.value)}
                  placeholder="T100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">制造商</Label>
                <Input
                  id="manufacturer"
                  value={deviceData.manufacturer}
                  onChange={(e) => updateDeviceData('manufacturer', e.target.value)}
                  placeholder="智联科技"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">设备描述</Label>
              <Textarea
                id="description"
                value={deviceData.description}
                onChange={(e) => updateDeviceData('description', e.target.value)}
                placeholder="描述该设备的用途和功能..."
                className="min-h-[80px]"
              />
            </div>

            {/* 设备状态 */}
            <div className="p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">设备状态</span>
                <Badge
                  className={
                    deviceData.status === 'online'
                      ? 'bg-green-500 hover:bg-green-600'
                      : deviceData.status === 'offline'
                      ? 'bg-gray-500 hover:bg-gray-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }
                >
                  {deviceData.status === 'online' ? '在线' : deviceData.status === 'offline' ? '离线' : '警告'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最后通信时间</span>
                  <span className="font-medium">2024-01-20 14:30:25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">信号强度</span>
                  <span className="font-medium text-green-600">强 (-45dBm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">电量</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 设备配置 */}
          <TabsContent value="config" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="driver">设备驱动 *</Label>
              <Select value={deviceData.driver} onValueChange={(value) => updateDeviceData('driver', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择设备驱动" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Modbus TCP Driver">Modbus TCP Driver</SelectItem>
                  <SelectItem value="OPC UA Client">OPC UA Client</SelectItem>
                  <SelectItem value="MQTT Broker">MQTT Broker</SelectItem>
                  <SelectItem value="HTTP Collector">HTTP Collector</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                选择与设备通信的协议驱动
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gateway">接入网关 *</Label>
              <Select value={deviceData.gateway} onValueChange={(value) => updateDeviceData('gateway', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择接入网关" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="网关-01">网关-01 (在线)</SelectItem>
                  <SelectItem value="网关-02">网关-02 (在线)</SelectItem>
                  <SelectItem value="网关-03">网关-03 (离线)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                选择设备接入的网关设备
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceModel">物模型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择物模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temp_sensor">温度传感器模型</SelectItem>
                  <SelectItem value="humidity_sensor">湿度传感器模型</SelectItem>
                  <SelectItem value="controller">控制器模型</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                选择设备对应的物模型模板
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">连接参数</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ip">设备IP地址</Label>
                  <Input
                    id="ip"
                    placeholder="192.168.1.100"
                    defaultValue="192.168.1.100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">端口号</Label>
                  <Input
                    id="port"
                    type="number"
                    placeholder="502"
                    defaultValue="502"
                  />
                </div>
              </div>
            </div>

            {/* 关联设备 */}
            <div className="space-y-2">
              <Label>关联设备</Label>
              <div className="border rounded-lg divide-y max-h-40 overflow-y-auto">
                <div className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <p className="font-medium">温度传感器-02</p>
                    <p className="text-xs text-muted-foreground">ID: DEV20240101002</p>
                  </div>
                  <Button variant="ghost" size="sm">解除</Button>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <p className="font-medium">温度传感器-03</p>
                    <p className="text-xs text-muted-foreground">ID: DEV20240101003</p>
                  </div>
                  <Button variant="ghost" size="sm">解除</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                添加关联设备
              </Button>
            </div>
          </TabsContent>

          {/* 认证信息 */}
          <TabsContent value="auth" className="space-y-4 mt-4">
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/20">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">设备认证信息用于验证设备身份，确保数据安全</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceId">设备ID *</Label>
              <Input
                id="deviceId"
                value={deviceData.deviceId}
                onChange={(e) => updateDeviceData('deviceId', e.target.value)}
                placeholder="DEV20240101001"
              />
              <p className="text-xs text-muted-foreground">
                设备的唯一标识，创建后不可修改
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceKey">设备密钥 *</Label>
              <div className="flex gap-2">
                <Input
                  id="deviceKey"
                  type="password"
                  value={deviceData.deviceKey}
                  onChange={(e) => updateDeviceData('deviceKey', e.target.value)}
                  placeholder="secret_key_xxxxx"
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                设备的密钥，用于设备认证，请妥善保管
              </p>
            </div>

            <div className="space-y-2">
              <Label>认证方式</Label>
              <Select defaultValue="key">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="key">密钥认证</SelectItem>
                  <SelectItem value="certificate">证书认证</SelectItem>
                  <SelectItem value="token">Token认证</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>证书上传</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  拖拽文件到此处，或点击上传
                </p>
                <p className="text-xs text-muted-foreground">
                  支持 .crt, .key, .pem 格式
                </p>
                <Button variant="outline" className="mt-4" size="sm">
                  选择文件
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="enableEncryption">启用加密传输</Label>
                <p className="text-xs text-muted-foreground">
                  使用TLS/SSL加密设备通信数据
                </p>
              </div>
              <Switch id="enableEncryption" defaultChecked={true} />
            </div>
          </TabsContent>

          {/* 高级设置 */}
          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="deviceEnabled">启用设备</Label>
                <p className="text-xs text-muted-foreground">
                  禁用后设备将停止数据采集
                </p>
              </div>
              <Switch
                id="deviceEnabled"
                checked={deviceData.enabled}
                onCheckedChange={(checked) => updateDeviceData('enabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="autoReport">自动上报</Label>
                <p className="text-xs text-muted-foreground">
                  设备自动定期上报数据
                </p>
              </div>
              <Switch
                id="autoReport"
                checked={deviceData.autoReport}
                onCheckedChange={(checked) => updateDeviceData('autoReport', checked)}
              />
            </div>

            {deviceData.autoReport && (
              <div className="space-y-2">
                <Label htmlFor="reportInterval">上报间隔 (ms)</Label>
                <Input
                  id="reportInterval"
                  type="number"
                  value={deviceData.reportInterval}
                  onChange={(e) => updateDeviceData('reportInterval', Number(e.target.value))}
                  placeholder="5000"
                />
                <p className="text-xs text-muted-foreground">
                  设备自动上报数据的时间间隔
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="timeout">通信超时 (ms)</Label>
              <Input
                id="timeout"
                type="number"
                placeholder="3000"
                defaultValue="3000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retryTimes">重试次数</Label>
              <Input
                id="retryTimes"
                type="number"
                placeholder="3"
                min="0"
                max="10"
                defaultValue="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">设备标签</Label>
              <Input
                id="tags"
                placeholder="温度,车间1,环境监测"
                defaultValue="温度,车间1,环境监测"
              />
              <p className="text-xs text-muted-foreground">
                多个标签用逗号分隔，用于设备分组和筛选
              </p>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="enableLog">启用日志</Label>
                <p className="text-xs text-muted-foreground">
                  记录设备的详细通信日志
                </p>
              </div>
              <Switch id="enableLog" defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="alarmEnabled">启用告警</Label>
                <p className="text-xs text-muted-foreground">
                  设备异常时触发告警通知
                </p>
              </div>
              <Switch id="alarmEnabled" defaultChecked={true} />
            </div>

            {/* 维护信息 */}
            <div className="p-4 border rounded-lg bg-muted/20">
              <h4 className="text-sm font-medium mb-3">维护信息</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>购买日期</Label>
                  <Input type="date" defaultValue="2024-01-01" />
                </div>
                <div className="space-y-2">
                  <Label>保修期限</Label>
                  <Input type="date" defaultValue="2025-01-01" />
                </div>
                <div className="space-y-2">
                  <Label>维护周期</Label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">每周</SelectItem>
                      <SelectItem value="month">每月</SelectItem>
                      <SelectItem value="quarter">每季度</SelectItem>
                      <SelectItem value="year">每年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>最后维护</Label>
                  <Input type="date" defaultValue="2024-01-15" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '保存中...' : '保存设备'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
