import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAIAgents } from '@/data/mockData';
import { Play, Square, Settings } from 'lucide-react';

export function AIAgents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI中台 - Agent管理</h1>
          <p className="text-muted-foreground mt-2">管理和监控AI智能体</p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          创建Agent
        </Button>
      </div>

      {/* Agent统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总Agent数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAIAgents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">运行中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockAIAgents.filter(a => a.status === 'running').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已停止</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockAIAgents.filter(a => a.status === 'stopped').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">异常</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockAIAgents.filter(a => a.status === 'error').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockAIAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {agent.name}
                    <Badge
                      variant={
                        agent.status === 'running' ? 'default' :
                        agent.status === 'stopped' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {agent.status === 'running' ? '运行中' :
                       agent.status === 'stopped' ? '已停止' : '异常'}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{agent.type}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </p>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-muted-foreground">最后运行:</span>
                <span>{agent.lastRun.toLocaleString('zh-CN')}</span>
              </div>

              <div className="flex gap-2">
                {agent.status === 'running' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Square className="h-4 w-4 mr-2" />
                    停止
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    启动
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 创建新Agent卡片 */}
        <Card className="border-dashed hover:border-primary transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium">创建新Agent</p>
            <p className="text-sm text-muted-foreground mt-2">配置并启动智能体</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
