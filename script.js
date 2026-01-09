function selectBundle(element, price) {
    // 1. Xóa class 'active' của tất cả các gói hiện có
    document.querySelectorAll('.bundle-card').forEach(card => {
        card.classList.remove('active');
    });

    // 2. Thêm class 'active' vào gói vừa được click
    element.classList.add('active');

    // 3. Cập nhật giá tiền trên nút Add to Cart
    const btn = document.getElementById('add-to-cart-btn');
    if (btn) {
        btn.innerText = `ADD TO CART — $${price}`;
    }

    // 4. CẬP NHẬT DÒNG CHỮ REFILL (Phải nằm TRONG hàm này)
    const refillText = document.getElementById('refill-text');
    const newRefillValue = element.getAttribute('data-refill'); // Lấy từ thuộc tính data-refill của thẻ
    
    if (refillText && newRefillValue) {
        refillText.innerText = newRefillValue;
    }
} // <--- Dấu ngoặc kết thúc hàm phải nằm ở đây


function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    // Tìm thẻ cha ngoài cùng (thẻ có class border)
    const card = content.parentElement; 
    
    const isOpen = content.classList.contains('open');
    
    if (isOpen) {
        content.classList.remove('open');
        icon.innerText = '+';
        icon.classList.remove('active');
        card.classList.remove('item-active');
    } else {
        content.classList.add('open');
        icon.innerText = '×';
        icon.classList.add('active');
        card.classList.add('item-active');
    }
}

    function toggleIngredient(id) {
  const content = document.getElementById(`content-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);
  
  // Toggle active class
  content.classList.toggle('active');
  arrow.classList.toggle('rotated');
}



function toggleDropdown() {
  document.getElementById('dropdownMenu').classList.toggle('hidden');
}

function selectFilter(option) {
  document.getElementById('selectedOption').innerText = option;
  document.getElementById('dropdownMenu').classList.add('hidden');
  // Ở đây bạn có thể thêm logic để lọc dữ liệu thực tế
  console.log("Filtering by: " + option);
}

// Đóng dropdown khi click ra ngoài
window.onclick = function(event) {
  if (!event.target.closest('#dropdownBtn')) {
    document.getElementById('dropdownMenu').classList.add('hidden');
  }
}

function toggleFaq(element) {
        const faqItem = element.parentElement;
        faqItem.classList.toggle('active');
}



const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressContainer = document.getElementById('progressContainer');
        const items = document.querySelectorAll('.carousel-item');
        

        let activeVideoIndex = 0;
        let currentIndex = 0;
        let itemsPerView = 4;
        let totalVideos = items.length; // 10 videos
        let totalScrollPositions = totalVideos - itemsPerView + 1; // 7 positions (10-4+1=7)
        let isDragging = false;
        let startPos = 0;
        let currentVideo = null;

        // Update items per view based on screen size
        function updateItemsPerView() {
            if (window.innerWidth <= 480) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 768) {
                itemsPerView = 2;
            } else if (window.innerWidth <= 1024) {
                itemsPerView = 3;
            } else {
                itemsPerView = 4;
            }
            totalScrollPositions = totalVideos - itemsPerView + 1;
            createProgressBar();
            updateCarousel();
        }

        // Create progress bar - số segments = số scroll positions (7 ô cho 10 videos)
        function createProgressBar() {
            progressContainer.innerHTML = '';
            for (let i = 0; i < totalScrollPositions; i++) {
                const segment = document.createElement('div');
                segment.className = 'progress-segment';
                segment.dataset.index = i;
                segment.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                    updateProgressHighlight(i);
                });
                progressContainer.appendChild(segment);
            }
            updateProgressHighlight(0);
        }

        // Update progress highlight
        function updateProgressHighlight(index) {
            document.querySelectorAll('.progress-segment').forEach((seg, i) => {
                seg.classList.toggle('active', i === index);
            });
        }

        // Scroll to specific video
        function scrollToVideo(index) {
            activeVideoIndex = index;
            // Đảm bảo luôn hiển thị đủ itemsPerView videos
            // Nếu click vào video gần cuối, scroll đến vị trí sao cho vẫn hiển thị đủ 4 videos
            const maxIndex = Math.max(0, totalVideos - itemsPerView);
            currentIndex = Math.min(index, maxIndex);
            updateCarousel();
        }

        // Update carousel position
        function updateCarousel() {
            const wrapper = document.getElementById('carouselWrapper');
            const wrapperWidth = wrapper.offsetWidth;
            const gap = 20;
            const itemWidth = (wrapperWidth - gap * (itemsPerView - 1)) / itemsPerView;
            const offset = -currentIndex * (itemWidth + gap);
            carousel.style.transform = `translateX(${offset}px)`;
        }

        // Previous position
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                updateProgressHighlight(currentIndex);
            }
        });

        // Next position
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalScrollPositions - 1) {
                currentIndex++;
                updateCarousel();
                updateProgressHighlight(currentIndex);
            }
        });

        // Drag functionality
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.pageX;
        });

        carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const diff = e.pageX - startPos;

    if (Math.abs(diff) > 60) {
        if (diff > 0 && currentIndex > 0) {
            currentIndex--;
        } else if (diff < 0 && currentIndex < totalScrollPositions - 1) {
            currentIndex++;
        }

        updateCarousel();
        updateProgressHighlight(currentIndex);
        isDragging = false;
    }
});


        carousel.addEventListener('mouseup', () => {
            isDragging = false;
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // Touch events for mobile
        carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPos = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentPosition = e.touches[0].clientX;
            const diff = currentPosition - startPos;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && activeVideoIndex > 0) {
                    activeVideoIndex--;
                    scrollToVideo(activeVideoIndex);
                    updateProgressHighlight(activeVideoIndex);
                    isDragging = false;
                } else if (diff < 0 && activeVideoIndex < totalVideos - 1) {
                    activeVideoIndex++;
                    scrollToVideo(activeVideoIndex);
                    updateProgressHighlight(activeVideoIndex);
                    isDragging = false;
                }
            }
        });

        carousel.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Video play/pause functionality
        document.querySelectorAll('.video-container').forEach((container) => {
            const video = container.querySelector('video');
            const thumbnail = container.querySelector('img');
            const playButton = container.querySelector('.play-button');

            container.addEventListener('click', () => {
                // Pause all other videos
               // Pause all other videos
document.querySelectorAll('.video-container').forEach(other => {
    const v = other.querySelector('video');
    const img = other.querySelector('img');
    const btn = other.querySelector('.play-button');

    if (v !== video && !v.paused) {
        v.pause();
        v.currentTime = 0;
        v.classList.add('hidden');
        img.classList.remove('hidden');
        btn.classList.remove('hidden');
    }
});


                // Toggle current video
                if (video.paused) {
                    video.classList.remove('hidden');
                    thumbnail.classList.add('hidden');
                    playButton.classList.add('hidden');
                    video.play();
                    currentVideo = video;
                } else {
                    video.pause();
                    video.currentTime = 0;
                    video.classList.add('hidden');
                    thumbnail.classList.remove('hidden');
                    playButton.classList.remove('hidden');
                    currentVideo = null;
                }
            });

            // When video ends
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.classList.add('hidden');
                thumbnail.classList.remove('hidden');
                playButton.classList.remove('hidden');
                currentVideo = null;
            });
        });

        // Initialize
        window.addEventListener('resize', updateItemsPerView);
        updateItemsPerView();


const REVIEWS_PER_PAGE = 5;
  const reviews = document.querySelectorAll(".review-item");
  const pageBtns = document.querySelectorAll(".page-btn");
  const navBtns = document.querySelectorAll(".nav-btn");

  let currentPage = 1;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  function renderReviews(page) {
    reviews.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * REVIEWS_PER_PAGE &&
        index < page * REVIEWS_PER_PAGE
          ? "block"
          : "none";
    });
  }

  function updatePagination() {
    pageBtns.forEach((btn) => {
      btn.classList.remove("active", "text-[22px]", "font-semibold", "text-gray-500");
      btn.classList.add("text-[#ff8a8a]");

      if (Number(btn.dataset.page) === currentPage) {
        btn.classList.add("text-[22px]", "font-semibold", "text-gray-500");
      }
    });

    // Ẩn nút khi ở trang đầu
    navBtns.forEach((btn) => btn.classList.remove("hidden"));

    if (currentPage === 1) {
      document.querySelector('[data-action="first"]').classList.add("hidden");
      document.querySelector('[data-action="prev"]').classList.add("hidden");
    }

    if (currentPage === totalPages) {
      document.querySelector('[data-action="next"]').classList.add("hidden");
      document.querySelector('[data-action="last"]').classList.add("hidden");
    }
  }

  document.getElementById("pagination").addEventListener("click", (e) => {
    const page = e.target.dataset.page;
    const action = e.target.dataset.action;

    if (page) currentPage = Number(page);
    if (action === "prev" && currentPage > 1) currentPage--;
    if (action === "next" && currentPage < totalPages) currentPage++;
    if (action === "first") currentPage = 1;
    if (action === "last") currentPage = totalPages;

    renderReviews(currentPage);
    updatePagination();
  });

  // Init
  renderReviews(currentPage);
  updatePagination();


document.addEventListener("click", function (e) {
    const btn = e.target.closest(".close-item");
    if (!btn) return;

    const li = btn.closest("li");
    if (li) {
      li.remove();
    }
});




// const openBtn = document.getElementById("openNutritionModal");
//   const modal = document.getElementById("nutritionModal");
//   const closeBtn = document.getElementById("closeNutritionModal");

//   openBtn.addEventListener("click", () => {
//     modal.classList.remove("hidden");
//   });

//   closeBtn.addEventListener("click", () => {
//     modal.classList.add("hidden");
//   });

//   // click ra ngoài để đóng
//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) {
//       modal.classList.add("hidden");
//     }
//   });























