

import React, { useState, useEffect } from 'react';
import '../CSS/ContentView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/FeedBackTemplate.css'
import Swal from 'sweetalert2';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button
import NotesApp from '../notesApp/NotesApp';
import { createRoot } from 'react-dom/client';


const ContentView = ({ selectedContent, isSidebarOpen, markContentCompleted, loadingProgress, setLoadingProgress }) => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // State to control the visibility of the feedback modal
  const [feedbackData, setFeedbackData] = useState({}); // State to store feedback data
  const handleCloseModal = () => setShowModal(false); // Function to close modal
  const handleOpenModal = () => setShowModal(true); // Function to open modal
  let intervalId;

  // Function to handle opening the feedback modal
  const openFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  // Function to handle closing the feedback modal
  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const handleFeedbackSubmit = () => {
    const contentId = selectedContent.submenus.id;
    const contentName = selectedContent.submenus.name;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const opinion = document.querySelector('textarea[name="opinion"]').value;
    // Save feedback to localStorage
    const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
    const newFeedback = {
      contentId,
      contentName,
      rating,
      opinion
    };
    storedFeedback.push(newFeedback);
    localStorage.setItem('feedback', JSON.stringify(storedFeedback));
    // console.log('Feedback Submitted and Stored:', newFeedback);
    setShowFeedbackModal(false);
  };

  const handlePageChange = (page) => {
    console.log('Current Page:', page.currentPage + 1);
    setCurrentPage(page.currentPage + 1);

    localStorage.setItem(`contentId-${selectedContent.submenus.id}-lastPage`, page.currentPage + 1);

  };

  const handleLoadForPDF = () => {

    clearInterval(intervalId);
    const mediaElement = document.getElementById('selected-media');
    const storedPage = localStorage.getItem(`contentId-${selectedContent.submenus.id}-lastPage`);
    const viewerElement = mediaElement.querySelector('.rpv-core__viewer');
    const storedProgress = localStorage.getItem(`contentId-${selectedContent.submenus.id}`);
    const duration = selectedContent.submenus.duration || 0;
    const updateInterval = 1000;
    const totalUpdates = duration / (updateInterval / 1000);
    let progress = storedProgress ? parseFloat(storedProgress) : 0;
    const parsedPage = parseInt(storedPage, 10);


    if (progress < 100) {
      intervalId = setInterval(() => {
        progress += 100 / totalUpdates;

        updatePDFProgress(progress);

        if (progress >= 100) {
          clearInterval(intervalId);
        }
      }, updateInterval);
    }

    if (viewerElement && storedPage && parsedPage > 1) {
      Swal.fire({
        title: 'Resume or Start Over',
        text: 'Do you want to resume from where you left off or start from the beginning page?',
        showCancelButton: true,
        confirmButtonText: 'Resume',
        cancelButtonText: 'Start Over',
      }).then((result) => {
        if (result.isConfirmed) {
          // Resume from the stored page
          selectedContent.submenus.seektime = parsedPage;
          console.log('Resuming PDF from page:', selectedContent.submenus.seektime);
        } else {
          // Start from the beginning
          selectedContent.submenus.seektime = 1;
          console.log('Starting PDF from the beginning.');
        }
      });
    }
  }

  const handleLoadForVideos = () => {
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement && selectedContent.submenus.type === 'video') {
      const storedProgress = localStorage.getItem(`contentId-${selectedContent.submenus.id}`);

      if (storedProgress && parseFloat(storedProgress) > 1 && parseFloat(storedProgress) <= 99) {
        Swal.fire({
          title: 'Resume or Start Over',
          text: 'Do you want to resume from where you left off or start from the beginning?',
          showCancelButton: true,
          confirmButtonText: 'Resume',
          cancelButtonText: 'Start Over',
        }).then((result) => {
          if (result.isConfirmed) {
            const seekTime = (parseFloat(storedProgress) / 100) * selectedContent.submenus.duration;
            mediaElement.currentTime = seekTime;
            selectedContent.submenus.seektime = seekTime;
            console.log('Resuming video from:', selectedContent.submenus.seektime);
          } else {
            mediaElement.currentTime = 0;
            selectedContent.submenus.seektime = 0;
            console.log('Starting video from the beginning.');
          }

          //duration object initialize using mediaElement.duration
          if (selectedContent.submenus.duration === null) {
            selectedContent.submenus.duration = mediaElement.duration;
          }

          // Do not mark content as completed if progress is close to 100%
          if (parseFloat(storedProgress) < 99) {
            markContentCompleted();
          }

        });
      } else {
        // Start the video from the beginning if there is no stored progress
        mediaElement.currentTime = 0;
        selectedContent.submenus.seektime = 0;
        // console.log('Starting video from the beginning.');

        //duration object initialize using mediaElement.duration
        if (selectedContent.submenus.duration === null) {
          selectedContent.submenus.duration = mediaElement.duration;
        }
      }
    }
  };
  const handleLoadForImages = () => {
    clearInterval(intervalId);

    const storedProgress = localStorage.getItem(`contentId-${selectedContent.submenus.id}`);
    const duration = selectedContent.submenus.duration || 0;
    const updateInterval = 1000;
    const totalUpdates = duration / (updateInterval / 1000);
    let progress = storedProgress ? parseFloat(storedProgress) : 0;

    if (progress < 100) {
      intervalId = setInterval(() => {
        progress += 100 / totalUpdates;

        console.log("progres of image ; " + progress)
        updateImageProgress(progress);

        if (progress >= 100) {
          clearInterval(intervalId);
        }
      }, updateInterval);
    }
  };



  const updateImageProgress = (progress) => {
    console.log('Updating image progress:', progress);
    setLoadingProgress(progress);
    localStorage.setItem(`contentId-${selectedContent.submenus.id}`, progress.toString());

    // Mark content as completed only when progress is 100%
    if (progress >= 100) {
      markContentCompleted(selectedContent.submenus.id);
    }
  };

  const updatePDFProgress = (progress) => {
    console.log('Updating PDF progress:', progress);

    setLoadingProgress(progress);
    localStorage.setItem(`contentId-${selectedContent.submenus.id}`, progress.toString());


    // Mark content as completed only when progress is 100%
    if (progress >= 100) {
      markContentCompleted(selectedContent.submenus.id);
    }
  };
  const handleTimeUpdate = () => {
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement) {
      const progress = (mediaElement.currentTime / selectedContent.submenus.duration) * 100;
      console.log('Updating time progress:', progress);
      const storedProgress = parseFloat(localStorage.getItem(`contentId-${selectedContent.submenus.id}`)) || 0;
      const progressDifference = Math.abs(progress - storedProgress);

      if (!isUserInteracting && progressDifference < 1) {
        setLoadingProgress(progress);
        localStorage.setItem(`contentId-${selectedContent.submenus.id}`, progress.toString());
      }
    }
  };

  useEffect(() => {
    setLoadingProgress(0);
    const mediaElement = document.getElementById('selected-media');
    if (mediaElement) {
      if (selectedContent.submenus.type === 'video') {
        mediaElement.addEventListener('timeupdate', handleTimeUpdate);
        mediaElement.addEventListener('loadedmetadata', handleLoadForVideos);
        mediaElement.addEventListener('seeking', () => setIsUserInteracting(true));
        mediaElement.addEventListener('seeked', () => setIsUserInteracting(false));
      }
    }


    return () => {
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
    if (mediaElement && selectedContent.submenus.type === 'image') {
      mediaElement.addEventListener('load', handleLoadForImages);
    }

    return () => {
      if (mediaElement && selectedContent.submenus.type === 'image') {
        mediaElement.removeEventListener('load', handleLoadForImages);
      }
    };
  }, [selectedContent]);

  useEffect(() => {
    const mediaElement = document.getElementById('selected-media');

    if (mediaElement && selectedContent.submenus.type === 'pdf') {
      const viewerElement = mediaElement.querySelector('.rpv-core__viewer');

      // Check if the viewer is ready
      if (viewerElement) {
        handleLoadForPDF(); // Call handleLoadForPDF directly when the viewer is ready
      } else {
        mediaElement.addEventListener('load', handleLoadForPDF);
      }
    }

    return () => {
      if (mediaElement && selectedContent.submenus.type === 'pdf') {
        mediaElement.removeEventListener('load', handleLoadForPDF);
      }
    };
  }, [selectedContent]);

  useEffect(() => {
    if (selectedContent && selectedContent.submenus) {
      const storedProgress = localStorage.getItem(`contentId-${selectedContent.submenus.id}`);
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

  const progressBarStyle = {
    zIndex: 1,
  };

  const linearGradientStyle = {
    background: `linear-gradient(-180deg, #1D95C9 0%, #17759C 100%)`,
  };


  return (
    <div className="content">
      <div className="progress mb-3 " style={progressBarStyle}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${loadingProgress}%`, ...linearGradientStyle }}
          aria-valuenow={Math.round(loadingProgress)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span className='text-zoom'> {Math.round(loadingProgress)}%</span>
        </div>
      </div>
      {selectedContent && (
        <div className="selected-content">
          {selectedContent.submenus ? (
            selectedContent.submenus.type === 'image' ? (
              <img
                src={selectedContent.submenus.src}
                alt={selectedContent.submenus.name}
                id="selected-media"
                className="img-fluid"
              />
            ) : selectedContent.submenus.type === 'video' ? (
              <video
                controls
                id="selected-media"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadForVideos}
              >
                <source src={selectedContent.submenus.src} type="video/mp4" />
              </video>
            ) : selectedContent.submenus.type === 'pdf' ? (
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '500px',
                }}
              >
                <div id='selected-media'>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={selectedContent.submenus.src} onPageChange={handlePageChange} />
                  </Worker>
                </div>
              </div>
            ) : (
              <p>Unknown content type</p>
            )
          ) : null}
        </div>
      )}
      <div>
        <button className="notesButton" role="button"
          style={{
            position: 'fixed',
            bottom: '10px',
            fontSize: '16px',
            padding: '0px 0px',
            zIndex: 1
          }}
          onClick={handleOpenModal}
        > <span className='text-zoom'> Notes</span></button>

        <Modal show={showModal} onHide={handleCloseModal} >
          <Modal.Header closeButton>
            <Modal.Title>Note App</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NotesApp selectedContent={selectedContent} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


        <button className="button-43" role="button"
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '8px',
            fontSize: '16px',
            padding: '0px 0px',
            zIndex: 2
          }}
          onClick={() => openFeedbackModal()}>

          <span className='text-zoom'>Feedback</span>
        </button>
        <Modal show={showFeedbackModal} onHide={closeFeedbackModal}>
          <Modal.Header closeButton>
            <Modal.Title>Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Check if selectedContent exists and has submenus property before rendering */}
            {selectedContent && selectedContent.submenus && (
              <div style={{ background: '#FFF', padding: '2rem', maxWidth: '576px', width: '100%', borderRadius: '.75rem', boxShadow: '8px 8px 30px rgba(0,0,0,.05)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{selectedContent.submenus.name}</h3>
                <form>
                  <div className="starrating risingstar flex-row-reverse" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gridGap: '.5rem', fontSize: '2rem', color: '#FFBD13', marginBottom: '2rem' }}>
                    <input type="number" name="rating" hidden />
                    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="5 star"></label>
                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 star"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 star"></label>
                    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 star"></label>
                    <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 star"></label>
                  </div>
                  <textarea style={{ width: '100%', background: '#F5F5F5', padding: '1rem', borderRadius: '.5rem', border: 'none', outline: 'none', resize: 'none', marginBottom: '.5rem' }} name="opinion" cols="30" rows="5" placeholder="Your opinion..."></textarea>
                </form>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeFeedbackModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFeedbackSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div >
  );
};

export default ContentView;