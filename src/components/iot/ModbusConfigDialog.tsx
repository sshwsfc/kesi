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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Settings, Server, Database, Clock } from 'lucide-react';

interface ModbusConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverName: string;
  driverId: string;
  onSave?: () => void;
}

export function ModbusConfigDialog({
  open,
  onOpenChange,
  driverName,
  driverId,
  onSave
}: ModbusConfigDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // 模拟保存操作
    setTimeout(() => {
      setSaving(false);
      onSave?.();
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {driverName} - 驱动配置
          </DialogTitle>
          <DialogDescription>
            配置Modbus TCP协议驱动的连接参数和数据采集设置
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connection">连接设置</TabsTrigger>
            <TabsTrigger value="registers">寄存器配置</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
          </TabsList>

          {/* 连接设置 */}
          <TabsContent value="connection" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ip">服务器IP地址</Label>
                <Input
                  id="ip"
                  placeholder="192.168.1.100"
                  defaultValue="192.168.1.100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">端口</Label>
                <Input
                  id="port"
                  type="number"
                  placeholder="502"
                  defaultValue="502"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slaveId">从站ID (Slave ID)</Label>
                <Input
                  id="slaveId"
                  type="number"
                  placeholder="1"
                  min="1"
                  max="247"
                  defaultValue="1"
                />
                <p className="text-xs text-muted-foreground">
                  Modbus从站地址范围：1-247
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">连接超时 (ms)</Label>
                <Input
                  id="timeout"
                  type="number"
                  placeholder="3000"
                  defaultValue="3000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pollInterval">轮询间隔 (ms)</Label>
              <Input
                id="pollInterval"
                type="number"
                placeholder="1000"
                defaultValue="1000"
              />
              <p className="text-xs text-muted-foreground">
                驱动从设备读取数据的时间间隔
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retryAttempts">重试次数</Label>
              <Input
                id="retryAttempts"
                type="number"
                placeholder="3"
                min="0"
                max="10"
                defaultValue="3"
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="enableCompression">启用压缩</Label>
                <p className="text-xs text-muted-foreground">
                  使用Modbus TCP压缩功能
                </p>
              </div>
              <Switch id="enableCompression" defaultChecked={false} />
            </div>
          </TabsContent>

          {/* 寄存器配置 */}
          <TabsContent value="registers" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="autoRead">自动读取</Label>
                  <p className="text-xs text-muted-foreground">
                    定期自动读取寄存器数据
                  </p>
                </div>
                <Switch id="autoRead" defaultChecked={true} />
              </div>

              <div className="space-y-2">
                <Label>寄存器类型</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <input
                      type="radio"
                      name="registerType"
                      id="coil"
                      value="coil"
                      defaultChecked
                      className="h-4 w-4"
                    />
                    <Label htmlFor="coil" className="text-sm font-medium">
                      线圈 (Coil)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <input
                      type="radio"
                      name="registerType"
                      id="discrete"
                      value="discrete"
                      className="h-4 w-4"
                    />
                    <Label htmlFor="discrete" className="text-sm font-medium">
                      离散 (Discrete)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <input
                      type="radio"
                      name="registerType"
                      id="input"
                      value="input"
                      className="h-4 w-4"
                    />
                    <Label htmlFor="input" className="text-sm font-medium">
                      输入 (Input)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startAddress">起始地址</Label>
                  <Input
                    id="startAddress"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="65535"
                    defaultValue="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">读取数量</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="10"
                    min="1"
                    max="125"
                    defaultValue="10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="functionCode">功能码</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="选择功能码" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">读取线圈状态 (0x01)</SelectItem>
                      <SelectItem value="2">读取离散输入 (0x02)</SelectItem>
                      <SelectItem value="3">读取保持寄存器 (0x03)</SelectItem>
                      <SelectItem value="4">读取输入寄存器 (0x04)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFormat">数据格式</Label>
                  <Select defaultValue="16">
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16">16位无符号整数</SelectItem>
                      <SelectItem value="32">32位整数</SelectItem>
                      <SelectItem value="float">32位浮点数</SelectItem>
                      <SelectItem value="double">64位浮点数</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 寄存器列表 */}
            <div className="space-y-2">
              <Label>已配置的寄存器</Label>
              <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">温度传感器</p>
                      <p className="text-xs text-muted-foreground">地址: 40001, 数量: 2</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">编辑</Button>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">湿度传感器</p>
                      <p className="text-xs text-muted-foreground">地址: 40003, 数量: 1</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">编辑</Button>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">压力传感器</p>
                      <p className="text-xs text-muted-foreground">地址: 40100, 数量: 4</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">编辑</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                添加寄存器
              </Button>
            </div>
          </TabsContent>

          {/* 高级设置 */}
          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="byteSwap">字节序转换</Label>
                  <p className="text-xs text-muted-foreground">
                    自动转换大端/小端字节序
                  </p>
                </div>
                <Switch id="byteSwap" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="errorChecking">CRC校验</Label>
                  <p className="text-xs text-muted-foreground">
                    启用CRC循环冗余校验
                  </p>
                </div>
                <Switch id="errorChecking" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="logEnable">启用日志</Label>
                  <p className="text-xs text-muted-foreground">
                    记录详细的通信日志
                  </p>
                </div>
                <Switch id="logEnable" defaultChecked={false} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logLevel">日志级别</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue placeholder="选择日志级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">调试 (Debug)</SelectItem>
                    <SelectItem value="info">信息 (Info)</SelectItem>
                    <SelectItem value="warn">警告 (Warn)</SelectItem>
                    <SelectItem value="error">错误 (Error)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxConnections">最大连接数</Label>
              <Input
                id="maxConnections"
                type="number"
                placeholder="10"
                min="1"
                max="100"
                defaultValue="10"
              />
            </div>

            <div className="p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">连接状态</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">当前连接数</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">活跃连接</span>
                  <span className="font-medium text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">错误连接</span>
                  <span className="font-medium text-red-600">3</span>
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
            {saving ? '保存中...' : '保存配置'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
