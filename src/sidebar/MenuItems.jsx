import image1 from '../assets/images/img1.jpg'
import image2 from '../assets/images/img2.jpg'
import image3 from '../assets/images/img3.jpg'
import image4 from '../assets/images/img4.jpg'

import Video1 from '../assets/videos/v2.mp4'
import Video2 from '../assets/videos/v2.mp4'
import Video3 from '../assets/videos/v3.mpeg'

import PdfFile from '../assets/pdfs/sampleFile.pdf'




const MenuItems = [
  {
    title: 'Home',
    icon: 'bx-home-alt',
    submenus: [
      { id: 1, name: "Images1", type: 'image', src: image1,progressValue:0 },
      { id: 2, name: "video1", type: 'video', src: Video1,progressValue:0 },
      { id: 3, name: "Images2", type: 'image', src: image2,progressValue:0 },
      { id: 4, name: "video2", type: 'video', src: Video2,progressValue:0 },
      { id: 5, name: "Images3", type: 'image', src: image3,progressValue:0 },
      { id: 6, name: "video3", type: 'video', src: Video3,progressValue:0 },
      { id: 7, name: "Images4", type: 'image', src: image4,progressValue:0 },
      { id: 8, name: 'PDF Sample', type: 'pdf', src: PdfFile },

    ],  
  },
  {
    title: 'Overview',
    icon: 'bx-grid-alt',
    submenus: [
      { id: 9, name: "Images1", type: 'image', src: image1,progressValue:0 },
      { id: 10, name: "video1", type: 'video', src: Video1,progressValue:0 },
      { id: 11, name: "Images2", type: 'image', src: image2,progressValue:0 },
      { id: 12, name: "video2", type: 'video', src: Video2,progressValue:0 },
      { id: 13, name: "Images3", type: 'image', src: image3,progressValue:0 },
      { id: 14, name: "video3", type: 'video', src: Video3,progressValue:0 },
      { id: 15, name: 'PDF Sample', type: 'pdf', src: PdfFile},
    ],
  },
];

export default MenuItems;