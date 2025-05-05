
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import RecordingControls from '@/components/recording/RecordingControls';
import EmotionSelector from '@/components/EmotionSelector';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import useLocation from '@/hooks/useLocation';
import useStoriesManagement from '@/hooks/useStoriesManagement';
import { toast } from 'sonner';
import { getRandomGreeting } from '@/lib/utils';

const Record = () => {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const { 
    audioURL, 
    audioBlob, 
    recordingState, 
    recordingTime, 
    startRecording, 
    stopRecording, 
    pauseRecording, 
    resumeRecording, 
    clearRecording 
  } = useAudioRecorder();
  
  const { latitude, longitude, loading: locationLoading, error: locationError } = useLocation();
  const { addStory, isLoading: storyLoading } = useStoriesManagement();

  const handleSubmit = async () => {
    if (!audioBlob || !latitude || !longitude) {
      toast.error('Cannot share story. Please try again.');
      return;
    }

    try {
      const story = await addStory(
        audioBlob,
        { latitude, longitude },
        selectedEmotions,
        recordingTime
      );
      
      // Navigate to the story detail page
      navigate(`/story/${story.id}`);
    } catch (error) {
      console.error('Failed to share story:', error);
      toast.error('Failed to share your story. Please try again.');
    }
  };

  return (
    <>
      <PageContainer>
        <Header title="Record Story" showNotifications={false} />
        
        <div className="space-y-6">
          <p className="text-lg">
            {getRandomGreeting()}
          </p>
          
          <RecordingControls
            recordingState={recordingState}
            recordingTime={recordingTime}
            audioURL={audioURL}
            onStart={startRecording}
            onStop={stopRecording}
            onPause={pauseRecording}
            onResume={resumeRecording}
            onClear={clearRecording}
            onSubmit={handleSubmit}
          />
          
          {recordingState === 'inactive' && audioURL && (
            <EmotionSelector
              selectedEmotions={selectedEmotions}
              onChange={setSelectedEmotions}
            />
          )}
          
          {locationError && (
            <div className="text-sm text-destructive">
              <p>{locationError}</p>
              <p>Enable location services to share your story.</p>
            </div>
          )}
        </div>
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Record;
