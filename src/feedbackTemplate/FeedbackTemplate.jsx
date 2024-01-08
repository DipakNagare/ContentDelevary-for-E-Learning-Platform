// import React, { useEffect } from 'react'
// import '../CSS/FeedBackTemplate.css'
// import { useState } from 'react';

// const FeedbackTemplate = () => {
//     const [rating, setRating] = useState(0);
//   const [opinion, setOpinion] = useState('');

//   useEffect(() => {
//     const allStar = document.querySelectorAll('.rating .star');
//     const ratingValue = document.querySelector('.rating input');

//     const handleStarClick = (idx) => {
//       let click = 0;
//       ratingValue.value = idx + 1;

//       allStar.forEach((i) => {
//         i.classList.replace('bxs-star', 'bx-star');
//         i.classList.remove('active');
//       });

//       for (let i = 0; i < allStar.length; i++) {
//         if (i <= idx) {
//           allStar[i].classList.replace('bx-star', 'bxs-star');
//           allStar[i].classList.add('active');
//         } else {
//           allStar[i].style.setProperty('--i', click);
//           click++;
//         }
//       }
//     };

//     allStar.forEach((item, idx) => {
//       item.addEventListener('click', () => handleStarClick(idx));
//     });

//     return () => {
//       // Cleanup event listeners if needed
//       allStar.forEach((item, idx) => {
//         item.removeEventListener('click', () => handleStarClick(idx));
//       });
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Rating:', rating);
//     console.log('Opinion:', opinion);
//   };

//   const handleCancel = () => {
//     // Handle cancel logic here
//     setRating(0);
//     setOpinion('');
//   };

//   return (
//     <div className="wrapper">
//       <h3>Lorem ipsum dolor sit amet.</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="rating">
//           <input type="number" name="rating" value={rating} hidden readOnly />
//           {[0, 1, 2, 3, 4].map((index) => (
//             <i
//               key={index}
//               className={`bx bx-star star ${index < rating ? 'active' : ''}`}
//               style={{ '--i': index }}
//             ></i>
//           ))}
//         </div>
//         <textarea
//           name="opinion"
//           cols="30"
//           rows="5"
//           placeholder="Your opinion..."
//           value={opinion}
//           onChange={(e) => setOpinion(e.target.value)}
//         ></textarea>
//         <div className="btn-group">
//           <button type="submit" className="btn submit">
//             Submit
//           </button>
//           <button type="button" className="btn cancel" onClick={handleCancel}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FeedbackTemplate