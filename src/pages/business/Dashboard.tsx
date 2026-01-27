import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockBusinessData } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus, BarChart3, Factory, Zap, Droplets } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

export function BusinessDashboard() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return { color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' };
      case 'down':
        return { color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' };
      default:
        return { color: 'text-gray-500', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/20' };
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="业务中台 - 看板"
        gradient="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
      />

      {/* 业务指标卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockBusinessData.map((data, index) => {
          const trendColors = getTrendColor(data.trend);
          const icons = [Factory, Zap, Droplets, BarChart3];
          const Icon = icons[index % icons.length];

          return (
            <Card
              key={data.id}
              className={`transition-all hover:shadow-lg hover:scale-105 ${trendColors.borderColor} border`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${trendColors.bgColor}`}>
                    <Icon className={`h-4 w-4 ${trendColors.color}`} />
                  </div>
                  {getTrendIcon(data.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.value.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {data.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  更新时间: {data.updateTime.toLocaleString('zh-CN')}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 图表占位 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-purple-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">能耗趋势</CardTitle>
                <CardDescription>过去7天的能耗统计</CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">图表区域（待集成图表库）</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-blue-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">产量统计</CardTitle>
                <CardDescription>本月产量完成情况</CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Factory className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">图表区域</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-green-500/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">设备效率</CardTitle>
                <CardDescription>设备运行效率分析</CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
              <div className="text-center">
                <TrendingUp className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">图表区域</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
