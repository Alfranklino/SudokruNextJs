// PlayerList component following the documented design
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Crown, Eye, CheckCircle, Clock, X, Wifi, WifiOff } from 'lucide-react';
import type { PlayerGame } from '@/types/game';

interface PlayerListProps {
  players: PlayerGame[];
  currentUserId?: string;
  showStats?: boolean;
  isSpectatorMode?: boolean;
  className?: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'playing': return <Clock className="w-4 h-4 text-blue-500" />;
    case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'disconnected': return <WifiOff className="w-4 h-4 text-red-500" />;
    case 'joined': return <Wifi className="w-4 h-4 text-gray-500" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  const colors = {
    joined: 'bg-gray-100 text-gray-800',
    ready: 'bg-green-100 text-green-800',
    playing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    disconnected: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || colors.joined;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const PlayerList = ({
  players,
  currentUserId,
  showStats = false,
  isSpectatorMode = false,
  className
}: PlayerListProps) => {
  const activePlayers = players.filter(p => p.role === 'player');
  const spectators = players.filter(p => p.role === 'spectator');

  return (
    <div className={cn('space-y-4', className)}>
      {/* Active Players */}
      {activePlayers.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Players ({activePlayers.length})
            </h3>
            {showStats && (
              <span className="text-xs text-gray-500">
                Stats visible
              </span>
            )}
          </div>

          <div className="space-y-2">
            {activePlayers
              .sort((a, b) => {
                // Sort by completion status, then by time
                if (a.status === 'completed' && b.status !== 'completed') return -1;
                if (b.status === 'completed' && a.status !== 'completed') return 1;
                if (a.completionTime && b.completionTime) {
                  return a.completionTime - b.completionTime;
                }
                return 0;
              })
              .map((player, index) => (
                <div
                  key={player.id}
                  className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg border transition-colors',
                    player.userId === currentUserId
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200',
                    player.isWinner ? 'ring-2 ring-yellow-400 bg-yellow-50' : '',
                    player.status === 'disconnected' ? 'opacity-60' : ''
                  )}
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={player.user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                        {(player.user.displayName?.[0] || player.user.username[0]).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Host crown */}
                    {index === 0 && (
                      <Crown className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                    )}

                    {/* Winner crown */}
                    {player.isWinner && (
                      <Crown className="w-4 h-4 text-yellow-500 absolute -top-2 -right-2" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {player.user.displayName || player.user.username}
                      </p>
                      {player.userId === currentUserId && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                      {player.finalPosition && (
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-xs',
                            player.finalPosition === 1 ? 'bg-yellow-100 text-yellow-800' :
                            player.finalPosition === 2 ? 'bg-gray-100 text-gray-800' :
                            player.finalPosition === 3 ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          )}
                        >
                          #{player.finalPosition}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span>Rating: {player.user.rating}</span>
                      {showStats && player.moveCount > 0 && (
                        <>
                          <span>•</span>
                          <span>Moves: {player.moveCount}</span>
                        </>
                      )}
                      {showStats && player.errorCount > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-red-500">Errors: {player.errorCount}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(player.status)}
                      <Badge className={cn('text-xs', getStatusColor(player.status))}>
                        {player.status}
                      </Badge>
                    </div>

                    {showStats && player.completionTime && (
                      <div className="text-xs text-gray-500 font-mono">
                        {formatTime(player.completionTime)}
                      </div>
                    )}

                    {player.score > 0 && (
                      <div className="text-xs font-medium text-blue-600">
                        {player.score} pts
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Spectators */}
      {spectators.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Spectators ({spectators.length})
          </h3>
          <div className="space-y-2">
            {spectators.map((spectator) => (
              <div
                key={spectator.id}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg',
                  spectator.userId === currentUserId
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                )}
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src={spectator.user.avatar} />
                  <AvatarFallback className="text-xs bg-gray-200">
                    {(spectator.user.displayName?.[0] || spectator.user.username[0]).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 truncate flex-1">
                  {spectator.user.displayName || spectator.user.username}
                </span>
                {spectator.userId === currentUserId && (
                  <Badge variant="outline" className="text-xs">You</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {activePlayers.length === 0 && spectators.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No players yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Waiting for players to join...
          </p>
        </Card>
      )}
    </div>
  );
};

// Re-export Users icon for consistency
function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  );
}