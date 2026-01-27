import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Upload, Image, Video, FileText, Music, Filter, Grid, List } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  size: string;
  duration?: string;
  thumbnail?: string;
  uploadDate: Date;
  tags: string[];
}

const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: '生产线全景图.jpg',
    type: 'image',
    size: '2.4 MB',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    uploadDate: new Date(),
    tags: ['生产', '全景']
  },
  {
    id: '2',
    name: '设备操作演示.mp4',
    type: 'video',
    size: '156 MB',
    duration: '05:32',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    uploadDate: new Date(Date.now() - 3600000),
    tags: ['培训', '操作']
  },
  {
    id: '3',
    name: '质量检测标准.pdf',
    type: 'document',
    size: '8.5 MB',
    uploadDate: new Date(Date.now() - 7200000),
    tags: ['标准', '质量']
  },
  {
    id: '4',
    name: '安全培训视频.mp4',
    type: 'video',
    size: '234 MB',
    duration: '12:45',
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    uploadDate: new Date(Date.now() - 86400000),
    tags: ['安全', '培训']
  },
  {
    id: '5',
    name: '产品展示图.jpg',
    type: 'image',
    size: '3.8 MB',
    thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    uploadDate: new Date(Date.now() - 172800000),
    tags: ['产品', '展示']
  },
  {
    id: '6',
    name: '设备说明书.pdf',
    type: 'document',
    size: '12.3 MB',
    uploadDate: new Date(Date.now() - 259200000),
    tags: ['文档', '设备']
  }
];

export function BusinessMedia() {
  const [mediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'document' | 'audio'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      image: Image,
      video: Video,
      document: FileText,
      audio: Music
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const getTypeBadge = (type: string) => {
    const config = {
      image: { label: '图像', className: 'bg-blue-500 hover:bg-blue-600' },
      video: { label: '视频', className: 'bg-purple-500 hover:bg-purple-600' },
      document: { label: '文档', className: 'bg-green-500 hover:bg-green-600' },
      audio: { label: '音频', className: 'bg-orange-500 hover:bg-orange-600' }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '媒体总数',
      value: mediaItems.length,
      icon: Image,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '图像',
      value: mediaItems.filter(m => m.type === 'image').length,
      icon: Image,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '视频',
      value: mediaItems.filter(m => m.type === 'video').length,
      icon: Video,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '文档',
      value: mediaItems.filter(m => m.type === 'document').length,
      icon: FileText,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="媒体库"
        gradient="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              上传文件
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新建文件夹
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

      {/* 媒体列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-violet-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">媒体资源</CardTitle>
              <CardDescription>浏览和管理所有媒体文件</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
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
                placeholder="搜索媒体文件或标签..."
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
                variant={typeFilter === 'image' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('image')}
                size="sm"
              >
                图像
              </Button>
              <Button
                variant={typeFilter === 'video' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('video')}
                size="sm"
              >
                视频
              </Button>
              <Button
                variant={typeFilter === 'document' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('document')}
                size="sm"
              >
                文档
              </Button>
            </div>
          </div>

          {/* 媒体网格 */}
          <div className="p-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Image className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>没有找到匹配的媒体文件</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all cursor-pointer"
                    >
                      {item.type === 'image' || item.type === 'video' ? (
                        <>
                          <div
                            className="aspect-square bg-cover bg-center"
                            style={{ backgroundImage: item.thumbnail }}
                          />
                          {item.type === 'video' && item.duration && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {item.duration}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="aspect-square bg-muted flex items-center justify-center">
                          <Icon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                          {getTypeBadge(item.type)}
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                          {item.duration && (
                            <span className="text-xs text-muted-foreground">• {item.duration}</span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            • {item.uploadDate.toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeBadge(item.type)}
                        <Button variant="ghost" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
