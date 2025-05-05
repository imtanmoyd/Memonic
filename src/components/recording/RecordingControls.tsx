
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';

interface RecordingControlsProps {
  recordingState: 'inactive' | 'recording' | 'paused';
  recordingTime: number;
  audioURL: string | null;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
  onSubmit: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  recordingState,
  recordingTime,
  audioURL,
  onStart,
  onStop,
  onPause,
  onResume,
  onClear,
  onSubmit,
}) => {
  return (
    <Card className="p-4 bg-secondary/50 border-secondary">
      <div className="flex flex-col items-center space-y-4">
        {/* Recording Status */}
        <div className="w-full text-center">
          {recordingState === 'inactive' && !audioURL && (
            <p className="text-lg font-medium">Ready to Share Your Story</p>
          )}
          {recordingState !== 'inactive' && (
            <div className="flex items-center justify-center space-x-2">
              <div className="relative w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-red-500"></span>
                {recordingState === 'recording' && (
                  <span className="recording-pulse opacity-75"></span>
                )}
              </div>
              <p className="text-lg font-medium">
                {recordingState === 'recording' ? 'Recording' : 'Paused'}: {formatTime(recordingTime)}
              </p>
            </div>
          )}
          {recordingState === 'inactive' && audioURL && (
            <div className="w-full">
              <p className="text-lg font-medium mb-2">Preview Your Story</p>
              <audio src={audioURL} controls className="w-full" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-3 w-full">
          {recordingState === 'inactive' && !audioURL && (
            <Button
              onClick={onStart}
              className="bg-soulcast-purple hover:bg-soulcast-purple/90 text-white"
            >
              Start Recording
            </Button>
          )}

          {recordingState === 'recording' && (
            <>
              <Button variant="outline" onClick={onPause}>
                Pause
              </Button>
              <Button variant="destructive" onClick={onStop}>
                Stop
              </Button>
            </>
          )}

          {recordingState === 'paused' && (
            <>
              <Button variant="outline" onClick={onResume}>
                Resume
              </Button>
              <Button variant="destructive" onClick={onStop}>
                Stop
              </Button>
            </>
          )}

          {recordingState === 'inactive' && audioURL && (
            <>
              <Button variant="outline" onClick={onClear}>
                Discard
              </Button>
              <Button
                onClick={onSubmit}
                className="bg-soulcast-purple hover:bg-soulcast-purple/90 text-white"
              >
                Share Story
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecordingControls;
