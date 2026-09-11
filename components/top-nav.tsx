'use client';
import Link from 'next/link';
import { HelpCircle, MessageCircle, User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/dashboard/" className="flex items-center gap-2">
          <span aria-hidden className="text-2xl">
            🦋
          </span>
          <span className="font-heading text-[18px] font-bold text-primary">
            PinoyCare CH
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Help</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <DropdownMenuLabel>Support</DropdownMenuLabel>
              <DropdownMenuItem>How it works</DropdownMenuItem>
              <DropdownMenuItem>Safety tips</DropdownMenuItem>
              <DropdownMenuItem>Contact support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report a problem</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" aria-label="Messages" asChild>
            <Link href="/dashboard/messages/">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile/">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login/">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
