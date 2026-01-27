import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Square, Settings, Search, Video, Activity } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface VideoStream {
  id: string;
  name: string;
  source: string;
  type: 'rtsp' | 'rtmp' | 'hls' | 'flv';
  resolution: string;
  fps: number;
  bitrate: number;
  status: 'active' | 'inactive' | 'error';
  viewers: number;
}

const mockStreams: VideoStream[] = [
  {
    id: '1',
    name: '前门实时监控',
    source: 'rtsp://192.168.1.101:554/stream1',
    type: 'rtsp',
    resolution: '1920x1080',
    fps: 25,
    bitrate: 4096,
    status: 'active',
    viewers: 5
  },
  {
    id: '2',
    name: '后门实时监控',
    source: 'rtmp://192.168.1.102/live/stream2',
    type: 'rtmp',
    resolution: '1280x720',
    fps: 30,
    bitrate: 2048,
    status: 'active',
    viewers: 3
  },
  {
    id: '3',
    name: '车间A监控',
    source: 'http://192.168.1.103/live/stream3.m3u8',
    type: 'hls',
    resolution: '1920x1080',
    fps: 25,
    bitrate: 6144,
    status: 'inactive',
    viewers: 0
  },
  {
    id: '4',
    name: '车间B监控',
    source: 'http://192.168.1.104/live/stream4.flv',
    type: 'flv',
    resolution: '2560x1440',
    fps: 30,
    bitrate: 8192,
    status: 'error',
    viewers: 0
  }
];

export function VideoStreams() {
  const [streams, setStreams] = useState<VideoStream[]>(mockStreams);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'error'>('all');

  const filteredStreams = streams.filter(stream => {
    const matchesSearch = stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || stream.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStream = (id: string) => {
    setStreams(streams.map(stream => {
      if (stream.id === id && stream.status !== 'error') {
        return {
          ...stream,
          status: stream.status === 'active' ? 'inactive' : 'active',
          viewers: stream.status === 'active' ? 0 : stream.viewers + 1
        };
      }
      return stream;
    }));
  };

  const getTypeBadge = (type: string) => {
    const config = {
      rtsp: { label: 'RTSP', className: 'bg-blue-500 hover:bg-blue-600' },
      rtmp: { label: 'RTMP', className: 'bg-purple-500 hover:bg-purple-600' },
      hls: { label: 'HLS', className: 'bg-green-500 hover:bg-green-600' },
      flv: { label: 'FLV', className: 'bg-orange-500 hover:bg-orange-600' }
    };

    const { label, className } = config[type as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: '直播中', className: 'bg-green-500 hover:bg-green-600' },
      inactive: { label: '未开播', className: 'bg-gray-500 hover:bg-gray-600' },
      error: { label: '错误', className: 'bg-red-500 hover:bg-red-600' }
    };

    const { label, className } = config[status as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const stats = [
    {
      title: '视频流总数',
      value: streams.length,
      icon: Video,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '直播中',
      value: streams.filter(s => s.status === 'active').length,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: '总观看数',
      value: streams.reduce((sum, s) => sum + s.viewers, 0),
      icon: Play,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '错误流',
      value: streams.filter(s => s.status === 'error').length,
      icon: Square,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <PageHeader
        title="视频流管理"
        gradient="bg-linear-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent"
        actions={
          <Button size="sm">
            <Video className="h-4 w-4 mr-2" />
            添加流
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

      {/* 视频流列表 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b bg-linear-to-r from-sky-500/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">视频流列表</CardTitle>
              <CardDescription>查看和管理所有视频流</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* 搜索和筛选 */}
          <div className="p-4 space-y-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索视频流名称或地址..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                全部
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
                size="sm"
              >
                直播中
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('inactive')}
                size="sm"
              >
                未开播
              </Button>
              <Button
                variant={statusFilter === 'error' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('error')}
                size="sm"
              >
                错误
              </Button>
            </div>
          </div>

          {/* 流卡片 */}
          <div className="p-4 grid gap-4 md:grid-cols-2">
            {filteredStreams.length === 0 ? (
              <div className="col-span-2 text-center py-16 text-muted-foreground">
                <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>没有找到匹配的视频流</p>
              </div>
            ) : (
              filteredStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                    <div className="text-center">
                      <Play className="h-12 w-12 mx-auto mb-2 text-white/50" />
                      <p className="text-white/70">{stream.name}</p>
                    </div>
                    {stream.status === 'active' && (
                      <div className="absolute top-2 left-2 flex items-center gap-2">
                        <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                          LIVE
                        </Badge>
                        <Badge variant="secondary">{stream.viewers} 观看</Badge>
                      </div>
                    )}
                    {stream.status === 'error' && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 hover:bg-red-600">错误</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{stream.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{stream.source}</p>
                        </div>
                        {getStatusBadge(stream.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeBadge(stream.type)}
                        <span className="text-sm text-muted-foreground">
                          {stream.resolution} • {stream.fps}fps • {(stream.bitrate / 1024).toFixed(1)}Mbps
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {stream.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => toggleStream(stream.id)}
                          >
                            <Pause className="h-4 w-4 mr-2" />
                            停止
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => toggleStream(stream.id)}
                            disabled={stream.status === 'error'}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {stream.status === 'error' ? '错误' : '播放'}
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
