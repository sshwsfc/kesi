import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { platforms, getMenuItemsByPlatform } from '@/data/mockData';
import { type PlatformType, type MenuItem } from '@/types';
import * as Icons from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/theme-toggle';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // 从路径中获取当前中台
  const getCurrentPlatformFromPath = (): PlatformType | null => {
    const pathSegments = location.pathname.split('/');
    const platformId = pathSegments[1];
    if (platformId && platforms.find(p => p.id === platformId)) {
      return platformId as PlatformType;
    }
    return null;
  };

  // 处理中台切换
  const handlePlatformChange = (platformId: PlatformType) => {
    setCurrentPlatform(platformId);
    const menuItems = getMenuItemsByPlatform(platformId);
    if (menuItems.length > 0) {
      navigate(menuItems[0].path);
    }
  };

  // 渲染图标
  const renderIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  // 渲染侧边栏菜单
  const renderSidebarMenu = (items: MenuItem[]) => {
    return (
      <nav className="space-y-1 p-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={location.pathname === item.path ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigate(item.path)}
          >
            {renderIcon(item.icon)}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </nav>
    );
  };

  const platform = getCurrentPlatformFromPath();
  const menuItems = platform ? getMenuItemsByPlatform(platform) : [];

  // 移动端侧边栏
  const MobileSidebar = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Icons.Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <span className="font-semibold">KESI</span>
          </div>
          <ScrollArea className="flex-1">
            {renderSidebarMenu(menuItems)}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex h-screen flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            {isMobile && <MobileSidebar />}
            <span className="font-bold text-lg hidden sm:inline-block">AIRIOT</span>
          </div>

          {/* 中台导航菜单 */}
          <nav className="flex items-center space-x-1 mx-4 flex-1 overflow-x-auto">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={getCurrentPlatformFromPath() === platform.id ? 'secondary' : 'ghost'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handlePlatformChange(platform.id)}
              >
                {renderIcon(platform.icon)}
                <span className="hidden md:inline ml-2">{platform.name}</span>
              </Button>
            ))}
          </nav>

          {/* 右侧工具栏 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Icons.Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icons.User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧菜单栏 - 桌面端 */}
        {!isMobile && platform && (
          <>
            <aside
              className={`border-r bg-background transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'w-64' : 'w-16'
              }`}
            >
              <div className="flex h-full flex-col">
                <div className={`flex h-14 items-center border-b ${sidebarOpen ? 'px-4' : 'px-2 justify-center'}`}>
                  {sidebarOpen && (
                    <span className="font-semibold">{platforms.find(p => p.id === platform)?.name}</span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={sidebarOpen ? 'ml-auto' : ''}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? <Icons.ChevronLeft className="h-4 w-4" /> : <Icons.ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  {sidebarOpen ? (
                    renderSidebarMenu(menuItems)
                  ) : (
                    <nav className="space-y-2 p-2">
                      {menuItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                          className="w-full justify-center p-2"
                          onClick={() => navigate(item.path)}
                          title={item.label}
                        >
                          {renderIcon(item.icon)}
                        </Button>
                      ))}
                    </nav>
                  )}
                </ScrollArea>
              </div>
            </aside>
            <Separator orientation="vertical" />
          </>
        )}

        {/* 内容区域 */}
        <main className="flex-1 overflow-auto">
          <div className="container p-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
