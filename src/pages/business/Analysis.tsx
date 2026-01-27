import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, TrendingDown, PieChart, LineChart, Activity, Target, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface AnalysisChart {
  id: string;
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie';
  data: number[];
  labels: string[];
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const mockAnalysis: AnalysisChart[] = [
  {
    id: '1',
    title: '产量趋势分析',
    description: '过去30天产量变化趋势',
    type: 'line',
    trend: 'up',
    change: 15.3,
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}日`)
  },
  {
    id: '2',
    title: '能耗分布',
    description: '各车间能耗占比分析',
    type: 'pie',
    trend: 'down',
    change: 8.2,
    data: [35, 25, 20, 12, 8],
    labels: ['车间A', '车间B', '车间C', '车间D', '其他']
  },
  {
    id: '3',
    title: '良品率统计',
    description: '各生产线良品率对比',
    type: 'bar',
    trend: 'up',
    change: 5.7,
    data: [95.2, 97.8, 93.5, 96.1, 98.2],
    labels: ['产线1', '产线2', '产线3', '产线4', '产线5']
  },
  {
    id: '4',
    title: '设备利用率',
    description: '设备运行时间统计',
    type: 'bar',
    trend: 'stable',
    change: 1.2,
    data: [85, 92, 78, 88, 95, 82],
    labels: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6']
  }
];

export function BusinessAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [analysis] = useState<AnalysisChart[]>(mockAnalysis);

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
      title: '分析模型',
      value: '12',
      icon: BarChart3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '数据指标',
      value: '48',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '报告生成',
      value: '156',
      icon: PieChart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '预警规则',
      value: '23',
      icon: Activity,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const renderChart = (type: string, data: number[], labels: string[]) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    if (type === 'pie') {
      const total = data.reduce((sum, val) => sum + val, 0);
      return (
        <div className="h-48 flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {data.map((value, index) => {
                const percentage = (value / total) * 100;
                const dashArray = `${percentage} ${100 - percentage}`;
                const offset = data.slice(0, index).reduce((sum, v) => sum - (v / total) * 100, 0);
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
                return (
                  <circle
                    key={index}
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke={colors[index % colors.length].replace('bg-', '#')}
                    strokeWidth="3"
                    strokeDasharray={dashArray}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className="h-48 flex items-end gap-2">
        {data.map((value, index) => {
          const height = ((value - minValue) / (maxValue - minValue || 1)) * 100;
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-sm hover:from-teal-600 hover:to-cyan-500 transition-colors cursor-pointer"
                style={{ height: `${Math.max(height, 5)}%` }}
                title={`${labels[index]}: ${value}`}
              />
              <span className="text-xs text-muted-foreground truncate w-full text-center">
                {labels[index]?.length > 5 ? labels[index].substring(0, 4) + '..' : labels[index]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="数据分析"
        gradient="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
        actions={
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
                <SelectItem value="90d">最近90天</SelectItem>
                <SelectItem value="1y">最近一年</SelectItem>
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
        {analysis.map((item) => (
          <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b bg-linear-to-r from-emerald-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {item.type === 'line' ? (
                      <LineChart className="h-5 w-5 text-emerald-500" />
                    ) : item.type === 'pie' ? (
                      <PieChart className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <BarChart3 className="h-5 w-5 text-emerald-500" />
                    )}
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div>{getTrendIcon(item.trend, item.change)}</div>
              </div>
            </CardHeader>
            <CardContent>
              {renderChart(item.type, item.data, item.labels)}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>数据点: {item.data.length}</span>
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速分析 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-emerald-500/5 to-transparent">
          <CardTitle className="text-lg">快速分析</CardTitle>
          <CardDescription>常用分析功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-emerald-500 hover:bg-emerald-500/5">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <span>趋势分析</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-blue-500 hover:bg-blue-500/5">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <span>对比分析</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-purple-500 hover:bg-purple-500/5">
              <PieChart className="h-6 w-6 text-purple-500" />
              <span>占比分析</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-orange-500 hover:bg-orange-500/5">
              <Target className="h-6 w-6 text-orange-500" />
              <span>目标达成</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
