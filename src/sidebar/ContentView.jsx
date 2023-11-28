import React, { useState, useEffect } from 'react';
import '../CSS/ContentView.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContentView = ({ selectedContent, isSidebarOpen }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);

    const handleLoad = () => {
        // Introduce a 3-second delay before showing 100% progress for images
        setTimeout(() => {
            setLoadingProgress(100);
        }, 3000);
    };

    const handleTimeUpdate = () => {
        const mediaElement = document.getElementById('selected-media');
        if (mediaElement) {
            const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
            setLoadingProgress(progress);
        }
    };

    useEffect(() => {
        setLoadingProgress(0);

        if (selectedContent) {
            const mediaElement = document.getElementById('selected-media');
            if (mediaElement) {
                if (selectedContent.type === 'video') {
                    mediaElement.addEventListener('timeupdate', handleTimeUpdate);
                } else if (selectedContent.type === 'image') {
                    mediaElement.addEventListener('load', handleLoad);
                }
            }
        }

        return () => {
            const mediaElement = document.getElementById('selected-media');
            if (mediaElement) {
                mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
                mediaElement.removeEventListener('load', handleLoad);
            }
        };
    }, [selectedContent]);

    const contentStyle = {
        marginLeft: isSidebarOpen ? '260px' : '80px',
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
                    {selectedContent.type === 'image' ? (
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
                            >
                                <source src={selectedContent.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </>
                    ) : (
                        <p>Unsupported content type</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContentView;
