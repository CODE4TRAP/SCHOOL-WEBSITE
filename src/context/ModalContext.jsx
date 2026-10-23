import React, { createContext, useState } from 'react';
import { useModal } from './useModal';

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [noticeModal, setNoticeModal] = useState({ isOpen: false, title: '', date: '', desc: '' });
  const [messageModal, setMessageModal] = useState({ isOpen: false, title: '', author: '', content: '' });
  const [lightboxModal, setLightboxModal] = useState({
    isOpen: false,
    img: '',
    caption: '',
    imagesList: [],
    currentIndex: 0
  });
  const [portalModal, setPortalModal] = useState({ isOpen: false, title: '', session: '', note: '' });
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const openMobileDrawer = () => setMobileDrawerOpen(true);
  const closeMobileDrawer = () => setMobileDrawerOpen(false);
  const toggleMobileDrawer = () => setMobileDrawerOpen(prev => !prev);

  const openNotice = (notice) => {
    setNoticeModal({
      isOpen: true,
      title: notice.title || '',
      date: notice.date || '',
      desc: notice.desc || ''
    });
  };

  const closeNotice = () => setNoticeModal(prev => ({ ...prev, isOpen: false }));

  const openMessage = (title, author, content) => {
    setMessageModal({
      isOpen: true,
      title,
      author,
      content
    });
  };

  const closeMessage = () => setMessageModal(prev => ({ ...prev, isOpen: false }));

  const openLightbox = (img, caption, imagesList = [], currentIndex = 0) => {
    setLightboxModal({
      isOpen: true,
      img,
      caption: caption || 'Swami Shiwanand Academy & Kid\'s Play School',
      imagesList: imagesList.length > 0 ? imagesList : [{ img, title: caption }],
      currentIndex
    });
  };

  const nextLightbox = () => {
    setLightboxModal(prev => {
      if (!prev.imagesList || prev.imagesList.length === 0) return prev;
      const nextIdx = (prev.currentIndex + 1) % prev.imagesList.length;
      return {
        ...prev,
        currentIndex: nextIdx,
        img: prev.imagesList[nextIdx].img,
        caption: prev.imagesList[nextIdx].title
      };
    });
  };

  const prevLightbox = () => {
    setLightboxModal(prev => {
      if (!prev.imagesList || prev.imagesList.length === 0) return prev;
      const prevIdx = (prev.currentIndex - 1 + prev.imagesList.length) % prev.imagesList.length;
      return {
        ...prev,
        currentIndex: prevIdx,
        img: prev.imagesList[prevIdx].img,
        caption: prev.imagesList[prevIdx].title
      };
    });
  };

  const closeLightbox = () => setLightboxModal(prev => ({ ...prev, isOpen: false }));

  const openPortal = (title = 'Portal Login', session = '2026-27', note = '') => {
    setPortalModal({
      isOpen: true,
      title,
      session,
      note: note || 'Enter your registered Student / Staff ID and Password to view attendance, report cards, fees, and circulars.'
    });
  };

  const closePortal = () => setPortalModal(prev => ({ ...prev, isOpen: false }));

  return (
    <ModalContext.Provider
      value={{
        noticeModal,
        openNotice,
        closeNotice,
        messageModal,
        openMessage,
        closeMessage,
        lightboxModal,
        openLightbox,
        nextLightbox,
        prevLightbox,
        closeLightbox,
        portalModal,
        openPortal,
        closePortal,
        mobileDrawerOpen,
        openMobileDrawer,
        closeMobileDrawer,
        toggleMobileDrawer
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { useModal };
