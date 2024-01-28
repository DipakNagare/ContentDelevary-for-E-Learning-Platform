import React, { useState, useEffect } from 'react';
import '../CSS/NoteApp.css'; // Import styles.css file here

const NoteApp = ({ selectedContent }) => {
  const [stickiesArray, setStickiesArray] = useState([]);

  useEffect(() => {
    loadStartEvents();
    getStoredStickies();
  }, [selectedContent]);

  const loadStartEvents = () => {
    const deleteAllBtn = document.getElementById('deleteAll');
    const createFirstSticky = document.getElementById('createStickyBtn');

    deleteAllBtn.addEventListener('click', deleteAllStickies);
    createFirstSticky.addEventListener('click', createId);

    getStoredStickies();
  };

  const deleteAllStickies = () => {
    const parent = document.getElementById('main');
    const createFirstSticky = document.getElementById('createStickyBtn');

    const noteKeys = getNoteKeys();

    noteKeys.forEach((key) => localStorage.removeItem(key));
    noteKeys.forEach((key) => removeStickyFromDOM(key));

    setStickiesArray([]);

    if (noteKeys.length === 0 && parent.children.length <= 2) {
      createFirstSticky.style.display = 'block';
    } else {
      createFirstSticky.style.display = 'none';
    }
  };

  const getNoteKeys = () => {
    const allKeys = Object.keys(localStorage);
    const noteKeys = allKeys.filter((key) => key.startsWith(`sticky_${selectedContent.submenus.id}`));
    return noteKeys;
  };

  const getStoredStickies = () => {
    const noteKeys = getNoteKeys();

    if (noteKeys.length > 0) {
      const createFirstSticky = document.getElementById('createStickyBtn');
      createFirstSticky.style.display = 'none';

      const storedStickies = noteKeys.map((key) => {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
      });

      const stickiesForSelectedContent = storedStickies.filter(
        (sticky) => sticky !== null && sticky.subMenus[0].SubmenuId === selectedContent?.submenus?.id
      );

      setStickiesArray(stickiesForSelectedContent);

      const main = document.getElementById('main');
      main.innerHTML = '';

      stickiesForSelectedContent.forEach((sticky, index) => {
        if (sticky !== null) {
          addStoredStickiesToDom(sticky, noteKeys[index]);
        }
      });
    } else {
      const createFirstSticky = document.getElementById('createStickyBtn');
      createFirstSticky.style.display = 'block';
    }
  };

  const addStoredStickiesToDom = (stickyObject, key) => {
    const stickyClone = createSticky();
    stickyClone.setAttribute('id', key);

    if (stickyObject !== null) {
      const stickyContent = stickyClone.querySelector('.sticky-content');
      if (stickyContent) {
        stickyContent.value = stickyObject.notes;
      }

      const main = document.getElementById('main');
      main.appendChild(stickyClone);
    }
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
    stickyClone.style.display = 'block';

    const bulletListBtn = stickyClone.querySelector('.fa-list-ul');
    bulletListBtn.addEventListener('click', createBulletList);

    const newAddBtn = stickyClone.querySelector('.add-button');
    newAddBtn.addEventListener('click', createId);

    const removeBtn = stickyClone.querySelector('.remove-button');
    removeBtn.addEventListener('click', deleteSticky);

    const stickyCloneContent = stickyClone.querySelector('.sticky-content');
    stickyCloneContent.addEventListener('change', storeSticky);
    stickyCloneContent.addEventListener('input', notSavedNotification);

    return stickyClone;
  };

  const createId = () => {
    const createFirstSticky = document.getElementById('createStickyBtn');
    createFirstSticky.style.display = 'none';

    // const currentDate = new Date();
    const key = `sticky_${selectedContent.submenus.id}`;

    const stickyClone = createSticky();
    stickyClone.setAttribute('id', key);

    const stickiesArray = getStickiesArray();
    const newSticky = {
      courseId: selectedContent.courseId,
      courseName: selectedContent.courseName,
      moduleTitle: selectedContent.moduleTitle,
      id: key,
      subMenus: [{
        SubmenuId: selectedContent.submenus.id,
        submenuName: selectedContent.submenus.name,
        notes: ''
      }]
    };
    stickiesArray.push(newSticky);
    localStorage.setItem(`stickiesArray_${selectedContent.submenus.id}`, JSON.stringify(stickiesArray));
  };

  const deleteSticky = (e) => {
    const createFirstSticky = document.getElementById('createStickyBtn');
    const main = document.getElementById('main');
    const key = e.target.parentNode.parentNode.id;

    const stickiesArray = getStickiesArray();
    const indexToDelete = stickiesArray.findIndex((sticky) => sticky.id === key);
    if (indexToDelete !== -1) {
      stickiesArray.splice(indexToDelete, 1);
      localStorage.setItem(`stickiesArray_${selectedContent.submenus.id}`, JSON.stringify(stickiesArray));
    }

    localStorage.removeItem(key);

    removeStickyFromDOM(key);

    if (stickiesArray.length > 0 || main.children.length > 2) {
      createFirstSticky.style.display = 'none';
    } else {
      createFirstSticky.style.display = 'block';
    }
  };

  const removeStickyFromDOM = (key) => {
    const sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
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

    const newSticky = {
      courseId: selectedContent.courseId,
      courseName: selectedContent.courseName,
      moduleTitle: selectedContent.moduleTitle,
      id: key,
      subMenus: [{
        SubmenuId: selectedContent.submenus.id,
        submenuName: selectedContent.submenus.name,
        notes: bulletedList
      }]
    };

    const index = stickiesArray.findIndex((s) => s.id === key);
    if (index !== -1) {
      stickiesArray[index] = newSticky;
    } else {
      stickiesArray.push(newSticky);
    }

    localStorage.setItem(`stickiesArray_${selectedContent.submenus.id}`, JSON.stringify(stickiesArray));

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
    let stickiesArray = localStorage.getItem(`stickiesArray_${selectedContent.submenus.id}`);

    if (!stickiesArray) {
      stickiesArray = [];
      localStorage.setItem(`stickiesArray_${selectedContent.submenus.id}`, JSON.stringify(stickiesArray));
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
            <li id="deleteAll">Delete all</li>
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
