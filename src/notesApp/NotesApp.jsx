import React, { useState, useEffect } from 'react';
import '../CSS/NoteApp.css'; // Import styles.css file here
import Swal from 'sweetalert2';

const NoteApp = ({ selectedContent }) => {
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    loadStartEvents();
    displayStoredStickies(); 
  }, [selectedContent]);

 const addStoredStickiesToDom = (stickyObject, key) => {
  const stickyClone = createSticky();
  stickyClone.setAttribute('id', key);

  const stickyContent = stickyClone.querySelector('.sticky-content');
  if (stickyContent) {
    stickyContent.value = stickyObject?.notes || '' }

  const main = document.getElementById('main');
  main.appendChild(stickyClone);
};

  
  const displayStoredStickies = () => {
    const storedStickies = getStickiesArray();
    const selectedContentId = selectedContent.submenus.id;
  
    storedStickies.forEach((course) => {
      course.modules.forEach((module) => {
        module.contents.forEach((content) => {
          if (content.contentId === selectedContentId) {
            content.Notes.forEach((note) => {
              // Check if sticky with the same ID already exists in the DOM
              if (!document.getElementById(note.id)) {
                addStoredStickiesToDom(note, note.id); // Note object should be passed here
              }
            });
          }
        });
      });
    });
  };
  

  const loadStartEvents = () => {
    const createFirstSticky = document.getElementById('createStickyBtn');
    const deleteAllBtn = document.getElementById('deleteAll');

    deleteAllBtn.addEventListener('click', deleteAllStickies);
    createFirstSticky.addEventListener('click', createId);
  };

  const deleteAllStickies = () => {
    const parent = document.getElementById('main');
  
    const noteKeys = getNoteKeys();
  
    noteKeys.forEach((key) => localStorage.removeItem(key));
    noteKeys.forEach((key) => removeStickyFromDOM(key));
  
    setNotesArray([]);
  
    const createFirstSticky = document.getElementById('createStickyBtn');
    if (parent.children.length <= 2) {
      createFirstSticky.style.display = 'block';
    }
  };
  

  const getNoteKeys = () => {
    const allKeys = Object.keys(localStorage);
    const noteKeys = allKeys.filter((key) => key.startsWith(`sticky_${selectedContent.submenus.id}`));
    return noteKeys;
  };


  const createBulletList = (e) => {
    const stickyCloneContent = e.target.parentNode.parentNode.querySelector('.sticky-content');
    let currentContent = stickyCloneContent.value;

    if (e.key === 'Enter') {
      const lines = currentContent.split('\n');
      const currentLine = lines[lines.length - 1];

      if (currentLine.trim().endsWith('.')) {
        currentContent += '\n\u2022 ';
      }
    } else {
      if (!currentContent.startsWith('\u2022')) {
        const lines = currentContent.split('\n');
        const bulletedList = lines.map((line, index) => `\u2022 ${line}`).join('\n');
        currentContent = bulletedList;
      } else {
        currentContent += '\n\u2022 ';
      }
    }

    stickyCloneContent.value = currentContent;
    storeSticky({ target: stickyCloneContent });
  };

  const createSticky = () => {
    const parent = document.getElementById('main');
    const sticky = document.querySelector('.sticky');
    const stickyClone = sticky.cloneNode(true);
    parent.appendChild(stickyClone);
    stickyClone.style.display = 'block'; // Ensure the cloned sticky is displayed

    const bulletListBtn = stickyClone.querySelector('.fa-list-ul');
    bulletListBtn.addEventListener('click', createBulletList);

    const newAddBtn = stickyClone.querySelector('.add-button');
    newAddBtn.addEventListener('click', createId);

    const removeBtn = stickyClone.querySelector('.remove-button');
    removeBtn.addEventListener('click', deleteSticky);

    // Ensure that the textarea with class sticky-content is displayed
    const stickyCloneContent = stickyClone.querySelector('.sticky-content');
    stickyCloneContent.style.display = 'block';

    stickyCloneContent.addEventListener('change', storeSticky);
    stickyCloneContent.addEventListener('input', notSavedNotification);

    return stickyClone;
  };

  const createId = () => {
    const createFirstSticky = document.getElementById('createStickyBtn');
    createFirstSticky.style.display = 'none';

    const key = `sticky_${selectedContent.submenus.id}_${Date.now()}`; // Append timestamp for uniqueness

    let stickiesArray = getStickiesArray();

    let course = stickiesArray.find((course) => course.courseId === selectedContent.courseId);

    if (!course) {
      // Course doesn't exist, create new course entry
      course = {
        courseId: selectedContent.courseId,
        courseName: selectedContent.courseName,
        modules: [],
      };
      stickiesArray.push(course);
    }

    let module = course.modules.find((module) => module.moduleId === selectedContent.moduleId);

    if (!module) {
      // Module doesn't exist, create new module entry
      module = {
        moduleTitle: selectedContent.moduleTitle,
        moduleId: selectedContent.moduleId,
        contents: [],
      };
      course.modules.push(module);
    }

    let content = module.contents.find((content) => content.contentId === selectedContent.submenus.id);

    if (!content) {
      // Content doesn't exist, create new content entry
      content = {
        contentId: selectedContent.submenus.id,
        contentName: selectedContent.submenus.name,
        Notes: [
          {
            id: key,
            notes: '',
          },
        ],
      };
      module.contents.push(content);
    } else {
      // Content exists, add note to existing content
      content.Notes.push({
        id: key,
        notes: '',
      });
    }

    localStorage.setItem(`Notes_Array`, JSON.stringify(stickiesArray));
    addStoredStickiesToDom({ id: key, modules: [{ contents: [{ Notes: [{ notes: '' }] }] }] }, key);
  };

  const deleteSticky = (e) => {
    const key = e.target.parentNode.parentNode.id;
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this sticky!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      backdrop: "rgba(0, 0, 0, 0.8)",
      zIndex: 2000,
    }).then((result) => {
      if (result.isConfirmed) {
        const stickiesArray = getStickiesArray();
  
        // Find the index of the note to delete
        const indexToDelete = stickiesArray.findIndex(course =>
          course.modules.some(module =>
            module.contents.some(content =>
              content.Notes.some(note => note.id === key)
            )
          )
        );
  
        if (indexToDelete !== -1) {
          const course = stickiesArray[indexToDelete];
          const updatedModules = course.modules.map(module => ({
            ...module,
            contents: module.contents.map(content => {
              const updatedNotes = content.Notes.filter(note => note.id !== key);
              return {
                ...content,
                Notes: updatedNotes
              };
            })
          }));
  
          // Check if any content has no notes left after deletion
          updatedModules.forEach(module => {
            module.contents = module.contents.filter(content =>
              content.Notes.length > 0
            );
  
            // Remove the entire content if it becomes empty after deletion
            module.contents = module.contents.filter(content =>
              content.Notes.length > 0
            );
          });
  
          // Check if any module has no contents left after deletion
          updatedModules.forEach(module => {
            module.contents = module.contents.filter(content =>
              content.Notes.length > 0
            );
  
            // Remove the entire module if it becomes empty after deletion
            if (module.contents.length === 0) {
              delete course.modules[module];
            }
          });
  
          // Update the course with updated modules
          const updatedCourse = {
            ...course,
            modules: updatedModules.filter(module =>
              module.contents.length > 0
            )
          };
  
          const updatedStickiesArray = [
            ...stickiesArray.slice(0, indexToDelete),
            updatedCourse,
            ...stickiesArray.slice(indexToDelete + 1)
          ];
  
          localStorage.setItem(`Notes_Array`, JSON.stringify(updatedStickiesArray));
        }
  
        // Remove the note from localStorage
        localStorage.removeItem(key);
  
        // Remove the note from the DOM
        removeStickyFromDOM(key);
  
        // Update state to reflect the deletion
        setNotesArray(prevNotes => prevNotes.filter(note => note.id !== key));
  
        Swal.fire(
          'Deleted!',
          'Your sticky has been deleted.',
          'success'
        );
      }
    });
  };
  
  const removeStickyFromDOM = (key) => {
    const sticky = document.getElementById(key);
    if (sticky) {
      sticky.parentNode.removeChild(sticky);
    }
  };

  const convertToBulletedList = (text) => {
    const lines = text.split('\n');
    const bulletedList = lines.map((line, index) => `\u2022 ${line}`).join('\n');
    return bulletedList;
  };

  const storeSticky = (e) => {
    const stickiesArray = getStickiesArray();
    const sticky = e.target.parentNode;
    const key = sticky.id;
    const stickyContent = e.target.value;
    const bulletedList = convertToBulletedList(stickyContent);

    const courseId = selectedContent.courseId;
    const moduleId = selectedContent.moduleId;
    const contentId = selectedContent.submenus.id;

    const courseIndex = stickiesArray.findIndex((course) => course.courseId === courseId);
    if (courseIndex !== -1) {
      const moduleIndex = stickiesArray[courseIndex].modules.findIndex((module) => module.moduleId === moduleId);
      if (moduleIndex !== -1) {
        const contentIndex = stickiesArray[courseIndex].modules[moduleIndex].contents.findIndex(
          (content) => content.contentId === contentId
        );
        if (contentIndex !== -1) {
          const noteIndex = stickiesArray[courseIndex].modules[moduleIndex].contents[contentIndex].Notes.findIndex(
            (note) => note.id === key
          );
          if (noteIndex !== -1) {
            stickiesArray[courseIndex].modules[moduleIndex].contents[contentIndex].Notes[noteIndex].notes = bulletedList;
            localStorage.setItem(`Notes_Array`, JSON.stringify(stickiesArray));
          }
        }
      }
    }

    const notSaved = sticky.querySelector('.notSaved');
    notSaved.style.display = 'inline-block';
    notSaved.style.color = 'black';
    notSaved.title = 'saved';
  };


  const notSavedNotification = (e) => {
    const stickyId = e.target.parentNode.id;
    const notSaved = document.querySelector(`#${stickyId} .notSaved`);
    notSaved.style.display = 'inline-block';
    notSaved.style.color = 'red';
    notSaved.title = 'not saved';
  };

  const getStickiesArray = () => {
    let stickiesArray = localStorage.getItem(`Notes_Array`);

    if (!stickiesArray) {
      stickiesArray = [];
      localStorage.setItem(`Notes_Array`, JSON.stringify(stickiesArray));
    } else {
      stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
  };

  return (
    <div>
      <header id="header">
        <nav id="navbar">
          <ul>
            <li id="deleteAll">Create Notes</li>  
          </ul>
        </nav>
      </header>
      <main id="main">
        <div className="sticky">
          <div className="sticky-header">
            <span className="sticky-header-menu add-button fas fa-plus" title="new sticky"></span>
            <span className="sticky-header-menu notSaved fas fa-check" title="not saved"></span>
            <span className="sticky-header-menu drop-button fas fa-paint-brush" title="change color"></span>
            <span className="sticky-header-menu add-button fas fa-list-ul" title="new bullet list"></span>
            <div className="dropdown-content-hide">
              {/* Removed color options */}
            </div>
            <span className="sticky-header-menu remove-button fas fa-trash-alt" title="delete sticky"></span>
          </div>
          <textarea className="sticky-content"></textarea>
        </div>
        <div id="createStickyBtn">+</div>
      </main>
    </div>
  );
};

export default NoteApp;
