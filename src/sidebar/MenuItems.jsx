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
    courseId: 1,
    courseName: 'Content Dilevary',
    modules: [
      {
        id: 1,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        title: 'Overview',
        id: 2,
        icon: 'bx-grid-alt',
        submenus: [
          { id: 9, name: "Images1", type: 'image', src: image1, duration: 20, seektime: null },
          { id: 10, name: "video1", type: 'video', src: Video1, duration: null, seektime: null, },
          { id: 11, name: "Images2", type: 'image', src: image2, duration: 20, seektime: null },
          { id: 12, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 13, name: "Images3", type: 'image', src: image3, duration: 20, seektime: null },
          { id: 14, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 15, name: 'Pdf samp', type: 'pdf', src: PdfFile, duration: 3, seektime: null },
        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
      {
        id: 3,
        title: 'Home',
        icon: 'bx-grid-alt',
        submenus: [
          { id: 1, name: "Images1Images1Images11", type: 'image', src: image1, duration: 20, seektime: null},
          { id: 2, name: "video1", type: 'video', src: Video1, duration: null, seektime: null },
          { id: 3, name: "Images2", type: 'image', src: image2, duration: 3, seektime: null },
          { id: 4, name: "video2", type: 'video', src: Video2, duration: null, seektime: null },
          { id: 5, name: "Images3", type: 'image', src: image3, duration: 3, seektime: null },
          { id: 6, name: "video3", type: 'video', src: Video3, duration: null, seektime: null },
          { id: 7, name: "Images4", type: 'image', src: image4, duration: 10, seektime: null },
          { id: 8, name: 'PDF samp ', type: 'pdf', src: PdfFile, duration: 16, seektime: null },

        ],
      },
 
    ],
  },
];

export default MenuItems;


