import React, { useState, useEffect } from 'react';
import '../CSS/ContentView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/FeedBackTemplate.css'
import Swal from 'sweetalert2';



const ContentView = ({ selectedContent, isSidebarOpen, markContentCompleted, loadingProgress, setLoadingProgress }) => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [previousMargin, setPreviousMargin] = useState('3px');


  let intervalId;

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


    // Mark content as completed only when progress is 100%
    if (progress >= 100) {
      markContentCompleted(selectedContent.id);
    }
  };

  const handleLoadForImages = () => {
    clearInterval(intervalId);

    const storedProgress = localStorage.getItem(`contentId-${selectedContent.id}`);
    const duration = selectedContent.duration || 0;
    const updateInterval = 1000;
    const totalUpdates = duration / (updateInterval / 1000);
    let progress = storedProgress ? parseFloat(storedProgress) : 0;

    if (progress < 100) {
      intervalId = setInterval(() => {
        progress += 100 / totalUpdates;
        updateImageProgress(progress);

        if (progress >= 100) {
          clearInterval(intervalId);
          // markContentCompleted(selectedContent.id);
        }
      }, updateInterval);
    }
  };

  // const handleTimeUpdateForImages = () => {
  //   const mediaElement = document.getElementById('selected-media');

  //   if (!isUserInteracting && mediaElement && mediaElement.tagName === 'IMG') {
  //     const currentTime = mediaElement.currentTime;

  //     // Wait for 3 seconds and then set progress to 100%
  //     if (currentTime < 3) {
  //       setTimeout(() => {
  //         updateImageProgress(100);
  //       }, 3000);
  //     }
  //   }
  // };

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
      // mediaElement.addEventListener('timeupdate', handleTimeUpdateForImages);
    }

    return () => {
      if (mediaElement && selectedContent.type === 'image') {
        mediaElement.removeEventListener('load', handleLoadForImages);
        // mediaElement.removeEventListener('timeupdate', handleTimeUpdateForImages);
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

  useEffect(() => {
    // Cleanup the interval when the component unmounts or when selectedContent changes
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId, selectedContent]);

  const contentStyle = {
    marginTop: '100px',
  };

  const progressBarStyle = {
    zIndex: 1,
  };


  return (
    <div className="content" style={contentStyle}>
      <div className="progress mb-3" style={progressBarStyle}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
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
          {selectedContent ? (
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
          ) : null}
        </div>
      )}
      <div>
        {/* Button placed after the content */}
        <button
          className="custom-btn btn-12"
          style={{
            position: 'fixed',
            bottom: '21px',
            right: '20px',
            fontSize: '14px', // Adjust the font size
            padding: '0px 0px', // Adjust the padding2
            zIndex: 2
          }}
          onClick={() => {
            const contentId = selectedContent.id;
            const contentName = selectedContent.name;
            Swal.fire({
              title: 'Feedback',
              html: `
                
                  <div style="background: #FFF; padding: 2rem; max-width: 576px; width: 100%; border-radius: .75rem; box-shadow: 8px 8px 30px rgba(0,0,0,.05); text-align: center;">
                    <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">${selectedContent.name}</h3>
                    <form action="#">
                    <div class="starrating risingstar  flex-row-reverse" style="display: flex; justify-content: center; align-items: center; grid-gap: .5rem; font-size: 2rem; color: #FFBD13; margin-bottom: 2rem;">
                    <input type="number" name="rating" hidden>
                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
                        </div>
                      <textarea style="width: 100%; background: #F5F5F5; padding: 1rem; border-radius: .5rem; border: none; outline: none; resize: none; margin-bottom: .5rem;" name="opinion" cols="30" rows="5" placeholder="Your opinion..."></textarea>
                     
                    </form>
                  </div>
                `,
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: 'Submit',
              cancelButtonText: 'Cancel',
              backdrop: `rgba(0,0,0,0.8)`,
              preConfirm: () => {
                const rating = document.querySelector('input[name="rating"]:checked')?.value;
                const opinion = document.querySelector('textarea[name="opinion"]').value;

                // Do something with the feedback data
                console.log('Content ID:', contentId);
                console.log('Content Name:', contentName);
                console.log('Rating:', rating);
                console.log('Opinion:', opinion);
                // You can store the feedback data or send it to a server here

                // Return a Promise that resolves with the form data
                return {
                  contentId: contentId || null,
                  contentName: contentName || null,
                  rating: rating || null,
                  opinion: opinion || null,
                };
              }
            });
          }}
        >
          <span>Click!</span><span>Feedback</span></button>
      </div>
    </div>
  );
};

export default ContentView;