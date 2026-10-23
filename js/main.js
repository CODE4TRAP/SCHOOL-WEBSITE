/**
 * SWAMI SHIVANAND KIDS PLAY SCHOOL
 * Main Frontend Interactivity Script
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const sfMenu = document.querySelector('.sf-menu');

  if (mobileToggle && sfMenu) {
    mobileToggle.addEventListener('click', function () {
      sfMenu.classList.toggle('show-mobile');
    });
  }

  // Mobile submenu accordion
  const menuWithChildren = document.querySelectorAll('.sf-menu > li');
  menuWithChildren.forEach(function (li) {
    const dropdown = li.querySelector('.dropdown-menu-custom');
    if (dropdown) {
      const link = li.querySelector('a');
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      });
    }
  });

  // 2. Back to Top Button
  const scrollTopBtn = document.querySelector('.btn-scroll-top');
  window.addEventListener('scroll', function () {
    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Footer Sitemap Toggle (+ / -)
  const sitemapBtn = document.querySelector('.footer-sitemap-btn');
  const sitemapContent = document.querySelector('.footer-sitemap-content');

  if (sitemapBtn && sitemapContent) {
    sitemapBtn.addEventListener('click', function () {
      if (sitemapContent.style.display === 'block') {
        sitemapContent.style.display = 'none';
        sitemapBtn.innerHTML = '<i class="fas fa-plus"></i> View Full Sitemap &amp; Links';
      } else {
        sitemapContent.style.display = 'block';
        sitemapBtn.innerHTML = '<i class="fas fa-minus"></i> Hide Sitemap';
      }
    });
  }

  // 4. Visitor Counter Animation
  const visitorCountEl = document.getElementById('visitorCount');
  if (visitorCountEl) {
    let target = 229653;
    let count = 228000;
    let speed = 20;
    let timer = setInterval(function () {
      count += 35;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      visitorCountEl.textContent = count.toLocaleString('en-IN');
    }, speed);
  }

  // 5. Lightbox Modal for Photo Gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxModalImg');
  const lightboxCaption = document.getElementById('lightboxModalCaption');

  if (galleryItems && lightboxModal && lightboxImg) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = item.querySelector('img');
        const caption = item.querySelector('h5');
        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = caption ? caption.textContent : 'Swami Shivanand Kids Play School';
          const modalInstance = new bootstrap.Modal(lightboxModal);
          modalInstance.show();
        }
      });
    });
  }
});

// Helper function to view notice details in modal
function showNoticeModal(title, date, desc) {
  const noticeModal = document.getElementById('noticeDetailModal');
  if (noticeModal) {
    document.getElementById('noticeModalTitle').textContent = title;
    document.getElementById('noticeModalDate').textContent = date;
    document.getElementById('noticeModalDesc').innerHTML = desc;
    const modalInstance = new bootstrap.Modal(noticeModal);
    modalInstance.show();
  }
}

// Helper function for quick message read more
function showMessageModal(title, author, content) {
  const msgModal = document.getElementById('messageReadMoreModal');
  if (msgModal) {
    document.getElementById('msgModalTitle').textContent = title;
    document.getElementById('msgModalAuthor').textContent = author;
    document.getElementById('msgModalContent').innerHTML = content;
    const modalInstance = new bootstrap.Modal(msgModal);
    modalInstance.show();
  }
}
