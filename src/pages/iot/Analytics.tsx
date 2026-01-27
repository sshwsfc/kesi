import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Activity, Zap, Database, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface AnalyticsCard {
  id: string;
  title: string;
  description: string;
  type: 'line' | 'bar' | 'pie';
  data: DataPoint[];
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const mockAnalytics: AnalyticsCard[] = [
  {
    id: '1',
    title: '温度趋势分析',
    description: '过去24小时温度数据变化',
    type: 'line',
    trend: 'up',
    change: 12.5,
    data: Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      value: 20 + Math.random() * 10
    }))
  },
  {
    id: '2',
    title: '设备能耗统计',
    description: '各设备能耗对比分析',
    type: 'bar',
    trend: 'down',
    change: 8.3,
    data: Array.from({ length: 8 }, (_, i) => ({
      timestamp: `设备${i + 1}`,
      value: Math.random() * 100
    }))
  },
  {
    id: '3',
    title: '数据采集频率',
    description: '实时数据采集统计',
    type: 'line',
    trend: 'stable',
    change: 2.1,
    data: Array.from({ length: 12 }, (_, i) => ({
      timestamp: `${i * 5}min`,
      value: 100 + Math.random() * 50
    }))
  }
];

export function IoTAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [analytics] = useState<AnalyticsCard[]>(mockAnalytics);

  const getTrendIcon = (trend: string, change: number) => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+{change}%</span>
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center gap-1 text-red-500">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">-{change}%</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-gray-500">
            <Activity className="h-4 w-4" />
            <span className="text-sm">±{change}%</span>
          </div>
        );
    }
  };

  const stats = [
    {
      title: '数据点总数',
      value: '2.4M',
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '实时采集',
      value: '1.2K/s',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '分析任务',
      value: '8',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '异常数据',
      value: '23',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const renderChart = (type: string, data: DataPoint[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));

    return (
      <div className="h-48 flex items-end gap-1 mt-4">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / (maxValue - minValue || 1)) * 100;
          return (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer"
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`${point.timestamp}: ${point.value.toFixed(2)}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="物联数据分析"
        gradient="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        actions={
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">最近1小时</SelectItem>
                <SelectItem value="24h">最近24小时</SelectItem>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" size="sm">
              <RefreshCw className="h-4 w-4" />
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

      {/* 分析图表 */}
      <div className="grid gap-4 md:grid-cols-2">
        {analytics.map((item) => (
          <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b bg-linear-to-r from-purple-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {item.type === 'line' ? (
                      <LineChart className="h-5 w-5 text-purple-500" />
                    ) : (
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                    )}
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div>{getTrendIcon(item.trend, item.change)}</div>
              </div>
            </CardHeader>
            <CardContent>
              {renderChart(item.type, item.data)}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>数据点: {item.data.length}</span>
                <span>
                  范围: {Math.min(...item.data.map(d => d.value)).toFixed(1)} - {Math.max(...item.data.map(d => d.value)).toFixed(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速分析 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-purple-500/5 to-transparent">
          <CardTitle className="text-lg">快速分析</CardTitle>
          <CardDescription>常用数据分析功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-purple-500 hover:bg-purple-500/5">
              <Activity className="h-6 w-6 text-purple-500" />
              <span>实时监控</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-blue-500 hover:bg-blue-500/5">
              <LineChart className="h-6 w-6 text-blue-500" />
              <span>趋势分析</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-green-500 hover:bg-green-500/5">
              <BarChart3 className="h-6 w-6 text-green-500" />
              <span>对比分析</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
