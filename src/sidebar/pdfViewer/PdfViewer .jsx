// import React, { useEffect } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PdfViewer = ({ fileUrl, manualDuration, setLoadingProgress }) => {
//   useEffect(() => {
//     let intervalId;

//     const updatePdfLoadingProgress = () => {
//       setLoadingProgress((prevProgress) => {
//         const newProgress = prevProgress + (100 / (manualDuration / 1000)); // Convert duration to seconds
//         return newProgress >= 100 ? 100 : newProgress;
//       });
//     };

//     if (manualDuration > 0) {
//       intervalId = setInterval(updatePdfLoadingProgress, 1000); // Update progress every second
//     }

//     return () => clearInterval(intervalId);
//   }, [manualDuration, setLoadingProgress]);

//   return (
//     <div>
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//         <Viewer fileUrl={fileUrl} />
//       </Worker>
//     </div>
//   );
// };

// export default PdfViewer;
