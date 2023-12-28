import React, { useState, useEffect } from 'react';
import '../CSS/ContentView.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ContentView = ({ selectedContent, isSidebarOpen, isPreviousContentCompleted, markContentCompleted, loadingProgress, setLoadingProgress }) => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [previousMargin, setPreviousMargin] = useState('3px');

  const handleLoadForVideos = () => {
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement && selectedContent.type === 'video') {
      const storedProgress = localStorage.getItem(`contentId-${selectedContent.id}`);
      console.log('Loaded Stored Video Progress:', storedProgress);

      if (storedProgress) {
        const seekTime = (parseFloat(storedProgress) / 100) * mediaElement.duration;
        mediaElement.currentTime = seekTime;
      }

      // Do not mark content as completed if progress is close to 100%
      if (parseFloat(storedProgress) < 99) {
        markContentCompleted();
      }
    }
  };

  const updateImageProgress = (progress) => {
    setLoadingProgress(progress);
    localStorage.setItem(`contentId-${selectedContent.id}`, progress.toString());
    console.log('Updated Image Progress:', progress);
  };

  const handleLoadForImages = () => {
    updateImageProgress(100);
    markContentCompleted(selectedContent.id);

  };

  const handleTimeUpdateForImages = () => {
    const mediaElement = document.getElementById('selected-media');

    if (!isUserInteracting && mediaElement && mediaElement.tagName === 'IMG') {
      const currentTime = mediaElement.currentTime;

      // Wait for 3 seconds and then set progress to 100%
      if (currentTime < 3) {
        setTimeout(() => {
          updateImageProgress(100);
        }, 3000);
      }
    }
  };

  const handleTimeUpdate = () => {
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement) {
      const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
      const storedProgress = parseFloat(localStorage.getItem(`contentId-${selectedContent.id}`)) || 0;
      const progressDifference = Math.abs(progress - storedProgress);

      if (!isUserInteracting && progressDifference < 1) {
        setLoadingProgress(progress);
        localStorage.setItem(`contentId-${selectedContent.id}`, progress.toString());
        console.log('Updated Video Progress:', progress);
      }
    }
  };

  useEffect(() => {
    console.log('ContentView useEffect - Start');

    setLoadingProgress(0);

    const mediaElement = document.getElementById('selected-media');

    if (mediaElement) {
      if (selectedContent.type === 'video') {
        mediaElement.addEventListener('timeupdate', handleTimeUpdate);
        mediaElement.addEventListener('loadedmetadata', handleLoadForVideos);
        mediaElement.addEventListener('seeking', () => setIsUserInteracting(true));
        mediaElement.addEventListener('seeked', () => setIsUserInteracting(false));
      }
    }

    if (!isSidebarOpen) {
      setPreviousMargin(contentStyle.marginLeft);
    }

    return () => {
      console.log('ContentView useEffect - Cleanup');
      if (mediaElement) {
        mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
        mediaElement.removeEventListener('loadedmetadata', handleLoadForVideos);
        mediaElement.removeEventListener('seeking', () => setIsUserInteracting(true));
        mediaElement.removeEventListener('seeked', () => setIsUserInteracting(false));
      }
    };
  }, [selectedContent, isSidebarOpen]);

  useEffect(() => {
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement && selectedContent.type === 'image') {
      mediaElement.addEventListener('load', handleLoadForImages);
      mediaElement.addEventListener('timeupdate', handleTimeUpdateForImages);
    }

    return () => {
      if (mediaElement && selectedContent.type === 'image') {
        mediaElement.removeEventListener('load', handleLoadForImages);
        mediaElement.removeEventListener('timeupdate', handleTimeUpdateForImages);
      }
    };
  }, [selectedContent]);

  useEffect(() => {
    if (selectedContent && selectedContent.id) {
      const storedProgress = localStorage.getItem(`contentId-${selectedContent.id}`);
      console.log('Stored Video Progress on Mount:', storedProgress);
      if (storedProgress) {
        setLoadingProgress(parseFloat(storedProgress));
      }
    }
  }, [selectedContent]);

  const contentStyle = {
    marginTop:'100px',
  };
  
  const progressBarStyle = {
    zIndex: 1, // Set the z-index to a value greater than the z-index of the content
  };

//   if (!isPreviousContentCompleted) {
//     Swal.fire({
//       title: 'Incomplete Content',
//       text: 'Complete the previous content 100% before proceeding to the next menu.',
//       icon: 'warning',
//     });
//   }
// }, [isPreviousContentCompleted]);

  return (
    <div className="content" style={contentStyle}>
      <div className="progress mb-3" style={progressBarStyle}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${loadingProgress}%` }}
              aria-valuenow={Math.round(loadingProgress)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(loadingProgress)}%
            </div>
          </div>
      {selectedContent && (
        <div className="selected-content">
          {selectedContent.type === 'image' || isPreviousContentCompleted ? (
            selectedContent.type === 'image' ? (
              <>
                <img
                  src={selectedContent.src}
                  alt={selectedContent.name}
                  id="selected-media"
                  className="img-fluid"
                />
              </>
            ) : selectedContent.type === 'video' ? (
              <>
                <video
                  controls
                  id="selected-media"
              
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadForVideos}
                >
                  <source src={selectedContent.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <p>PDF</p>
            )
          ) : (
            <p>Complete the previous content 100% before proceeding to the next menu.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentView;