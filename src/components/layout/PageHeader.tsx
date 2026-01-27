import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  titleClassName?: string;
  description?: string;
  actions?: ReactNode;
  rightContent?: ReactNode;
  gradient?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  titleClassName,
  description,
  actions,
  rightContent,
  gradient,
  children
}: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 w-full px-6 -mt-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          {children}
          <div>
            <h1 className={cn(
              "text-xl font-bold",
              gradient || "bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
              titleClassName
            )}>
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {rightContent}
        </div>
      </div>
    </div>
  );
}
