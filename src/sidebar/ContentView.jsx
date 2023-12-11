import React, { useState, useEffect } from 'react';
import '../CSS/ContentView.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContentView = ({ selectedContent, isSidebarOpen, isPreviousContentCompleted, markContentCompleted }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [previousMargin, setPreviousMargin] = useState('5px'); // State to store the previous margin



    // const isMobile = window.innerWidth <= 767;
    const handleLoadForVideos = () => {
        console.log('Loading video+++++++++:', selectedContent.id);
        const mediaElement = document.getElementById('selected-media');
        if (mediaElement && selectedContent.type === 'video') {
            const storedProgress = localStorage.getItem(`videoProgress-${selectedContent.id}`);
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



    const handleLoad = () => {
        setTimeout(() => {
            setLoadingProgress(100);
            markContentCompleted(); // Mark the content as completed when loaded
        }, 3000);
    };

    const handleTimeUpdate = () => {
        const mediaElement = document.getElementById('selected-media');
        if (mediaElement) {
            const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
            setLoadingProgress(progress);
            //storing in local storage
            localStorage.setItem(`videoProgress-${selectedContent.id}`, progress.toString());

        }
    };

    useEffect(() => {
        console.log('Selected content updated:', selectedContent);

        setLoadingProgress(0);

        if (selectedContent) {
            const mediaElement = document.getElementById('selected-media');
            if (mediaElement) {
                if (selectedContent.type === 'video') {
                    mediaElement.addEventListener('timeupdate', handleTimeUpdate);
                    mediaElement.addEventListener('loadedmetadata', handleLoadForVideos);

                } else if (selectedContent.type === 'image') {
                    mediaElement.addEventListener('load', handleLoad);
                }
            }
        }
        // Store the current margin before the sidebar is closed
        if (!isSidebarOpen) {
            setPreviousMargin(contentStyle.marginLeft);
        }

        return () => {
            const mediaElement = document.getElementById('selected-media');
            if (mediaElement) {
                mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
                mediaElement.removeEventListener('loadedmetadata', handleLoadForVideos);
                mediaElement.removeEventListener('load', handleLoad);
            }
        };
    }, [selectedContent, isSidebarOpen]);

    const contentStyle = {
        marginLeft: isSidebarOpen ? '5px' : previousMargin || '260px', // Use previous margin or default to '260px'
    };


    return (
        <div className="content" style={contentStyle}>
            {selectedContent && (
                <div className="selected-content">
                    <div className="progress mb-3">
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
                                    className="w-100"
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadForVideos}

                                >
                                    <source src={selectedContent.src} type="video/mp4" />
                                </video>
                            </>
                        ) : (
                            <p>Unsupported content type</p>
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
