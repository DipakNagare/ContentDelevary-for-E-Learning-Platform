import React, { useState, useEffect } from 'react';
import '../CSS/NoteApp.css'; // Create styles.css file and import it here

const NoteApp = ({ selectedContent }) => {
  const [stickiesArray, setStickiesArray] = useState([]);

  useEffect(() => {
    loadStartEvents();
    const createFirstSticky = document.getElementById('createStickyBtn');
    getStoredStickies(createFirstSticky);
  }, [selectedContent]);

  const loadStartEvents = () => {
    const deleteAllBtn = document.getElementById('deleteAll');
    const createFirstSticky = document.getElementById('createStickyBtn');

    deleteAllBtn.addEventListener('click', deleteAllStickies);
    createFirstSticky.addEventListener('click', createId);

    getStoredStickies(createFirstSticky);
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

  const getStoredStickies = (createFirstSticky) => {
    if (!createFirstSticky) return;

    const noteKeys = getNoteKeys();

    if (noteKeys.length > 0) {
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
      createFirstSticky.style.display = 'block';
    }
  };
  
  const addStoredStickiesToDom = (stickyObject, key) => {
    const stickyClone = createSticky();
    stickyClone.setAttribute('id', key);

    if (stickyObject !== null) {
      const stickyContent = Array.from(stickyClone.children).find(
        (el) => el.className === 'sticky-content'
      );
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

  const createSticky = (stickyObject) => {
    const parent = document.getElementById('main');
    const sticky = document.querySelector('.sticky');
    const stickyClone = sticky.cloneNode(true);
    parent.appendChild(stickyClone);
    stickyClone.style.display = 'block';

    const bulletListBtn = Array.from(
      Array.from(stickyClone.children).filter((el) => el.className === 'sticky-header')[0].children
    ).filter((el) => el.classList.contains('fa-list-ul'))[0];
    bulletListBtn.addEventListener('click', createBulletList);

    const newAddBtn = Array.from(
      Array.from(stickyClone.children).filter((el) => el.className === 'sticky-header')[0].children
    ).filter((el) => el.classList.contains('add-button'))[0];
    newAddBtn.addEventListener('click', createId);

    const removeBtn = Array.from(
      Array.from(stickyClone.children).filter((el) => el.className === 'sticky-header')[0].children
    ).filter((el) => el.classList.contains('remove-button'))[0];
    removeBtn.addEventListener('click', deleteSticky);

    const dropBtn = Array.from(
      Array.from(stickyClone.children).filter((el) => el.className === 'sticky-header')[0].children
    ).filter((el) => el.classList.contains('drop-button'))[0];
    dropBtn.addEventListener('click', toggleDropMenuClick);

    const stickyCloneContent = Array.from(stickyClone.children).filter(
      (el) => el.className === 'sticky-content'
    )[0];

    if (stickyObject !== undefined) {
      stickyCloneContent.value = stickyObject.notes;
      const event = new Event('change', { bubbles: true });
      stickyCloneContent.dispatchEvent(event);
    }

    stickyCloneContent.addEventListener('change', storeSticky);
    stickyCloneContent.addEventListener('input', notSavedNotification);

    return stickyClone;
  };

  const createId = (e) => {
    if (e.target.id === 'createStickyBtn') {
      e.target.style.display = 'none';
    }

    const currentDate = new Date();
    const key = `sticky_${currentDate.getTime()}_${selectedContent.submenus.id}`;

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

  const toggleDropMenuClick = (e) => {
    const parentId = e.target.parentNode.parentNode.id;
    const stickyContent = document.querySelector(`#${parentId} .sticky-content`);
    const dropMenu = document.querySelector(`#${parentId} .dropdown-content-hide`);
    dropMenu.style.display !== 'flex'
      ? (dropMenu.style.display = 'flex')
      : (dropMenu.style.display = 'none');
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

    const notSaved = document.querySelector(`#${key} .notSaved`);
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
