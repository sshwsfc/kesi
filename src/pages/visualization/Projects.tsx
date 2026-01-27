import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockVisualizationProjects } from '@/data/mockData';
import { Plus, FolderOpen, Edit, Trash2 } from 'lucide-react';

export function VisualizationProjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">可视化中台 - 项目管理</h1>
          <p className="text-muted-foreground mt-2">管理和编辑可视化项目</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建项目
        </Button>
      </div>

      {/* 项目列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockVisualizationProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {project.type === 'screen' ? '大屏项目' : '仪表盘'}
                  </CardDescription>
                </div>
                <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                  {project.status === 'published' ? '已发布' : '草稿'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* 缩略图占位 */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                <FolderOpen className="h-12 w-12 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>更新于 {project.updateTime.toLocaleDateString('zh-CN')}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 新建项目卡片 */}
        <Card className="border-dashed hover:border-primary transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium">新建项目</p>
            <p className="text-sm text-muted-foreground mt-2">创建新的可视化应用</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
