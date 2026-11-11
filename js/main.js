$(document).ready(function () {
  const $sidebar = $('#sidebarMenu');
  const $backdrop = $('#sidebarBackdrop');
  const $header = $('#header');
  const $menuToggleBtn = $('#menuToggleBtn');
  const $sidebarCloseBtn = $('#sidebarCloseBtn');
  const $searchBtn = $('#searchBtn');
  const $searchBar = $('#headerSearch');
  const $searchCloseBtn = $('#searchCloseBtn');
  const $heroScrollBtn = $('#heroScrollBtn');

  function openSidebar() {
    $sidebar.addClass('sidebar-menu--open');
    $backdrop.addClass('sidebar-backdrop--visible');
    $header.addClass('header--menu-open');
    $('body').css('overflow', 'hidden');
  }

  function closeSidebar() {
    $sidebar.removeClass('sidebar-menu--open');
    $backdrop.removeClass('sidebar-backdrop--visible');
    $header.removeClass('header--menu-open');
    $('body').css('overflow', '');
  }

  $menuToggleBtn.on('click', function (e) {
    e.preventDefault();
    if ($sidebar.hasClass('sidebar-menu--open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  $sidebarCloseBtn.on('click', function (e) {
    e.preventDefault();
    closeSidebar();
  });

  $backdrop.on('click', function () {
    closeSidebar();
  });

  $('.sidebar-menu__link').on('click', function () {
    closeSidebar();
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($sidebar.hasClass('sidebar-menu--open')) {
        closeSidebar();
      }
      if ($searchBar.hasClass('header-search--open')) {
        $searchBar.removeClass('header-search--open');
      }
    }
  });

  $searchBtn.on('click', function (e) {
    e.preventDefault();
    $searchBar.toggleClass('header-search--open');
    if ($searchBar.hasClass('header-search--open')) {
      $searchBar.find('input').focus();
    }
  });

  $searchCloseBtn.on('click', function (e) {
    e.preventDefault();
    $searchBar.removeClass('header-search--open');
  });

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $header.addClass('header--sticky');
    } else {
      $header.removeClass('header--sticky');
    }
  });

  $heroScrollBtn.on('click', function (e) {
    e.preventDefault();
    const heroHeight = $('.hero-wrapper').outerHeight();
    $('html, body').animate({
      scrollTop: heroHeight
    }, 800);
  });

  $('#backToTopBtn').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  let currentProjectIdx = 0;
  let isPlaying = true;
  const projectDuration = 5000;
  let animFrameId = null;
  let startTime = null;
  let elapsedBeforePause = 0;

  const $projectName = $('#projectName');
  const $projectLocation = $('#projectLocation');
  const $projectScale = $('#projectScale');
  const $projectInvestment = $('#projectInvestment');
  const $projectCategories = $('#projectCategories');
  const $projectInfo = $('#projectInfo');
  const $progressBar = $('#projectsProgressBar');
  const $playBtn = $('#projectsPlayBtn');
  const $playIcon = $('#projectsPlayIcon');
  const $thumbs = $('.projects-thumb');
  let bgTransitionTimeout = null;

  function switchBgImage(src, alt) {
    const $bgContainer = $('.projects-bg');
    if (bgTransitionTimeout) {
      clearTimeout(bgTransitionTimeout);
      $bgContainer.find('.projects-bg__img:not(:last-child)').remove();
    }
    const $currentImgs = $bgContainer.find('.projects-bg__img');
    const newImg = document.createElement('img');
    newImg.className = 'projects-bg__img img-fluid w-100 projects-bg__img--incoming';
    newImg.src = src;
    newImg.alt = alt;
    $bgContainer.append(newImg);

    void newImg.offsetWidth;
    newImg.classList.add('projects-bg__img--active');

    bgTransitionTimeout = setTimeout(function () {
      $currentImgs.remove();
      $(newImg).removeClass('projects-bg__img--incoming projects-bg__img--active');
      bgTransitionTimeout = null;
    }, 950);
  }

  function updateProject(index) {
    const total = $thumbs.length;
    if (!total) return;

    currentProjectIdx = (index + total) % total;
    const $activeThumb = $thumbs.eq(currentProjectIdx);

    $thumbs.removeClass('projects-thumb--active');
    $activeThumb.addClass('projects-thumb--active');

    const title = $activeThumb.attr('data-title');
    const location = $activeThumb.attr('data-location');
    const scale = $activeThumb.attr('data-scale');
    const investment = $activeThumb.attr('data-investment');
    const categories = $activeThumb.attr('data-categories');
    const bg = $activeThumb.attr('data-bg');

    $projectInfo.addClass('projects-info--fade');
    switchBgImage(bg, title);

    setTimeout(function () {
      $projectName.text(title);
      $projectLocation.text(location);
      $projectScale.text(scale);
      $projectInvestment.text(investment);
      $projectCategories.text(categories);
      $projectInfo.removeClass('projects-info--fade');
    }, 280);
  }

  function runProgress(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }
    const elapsed = (timestamp - startTime) + elapsedBeforePause;
    const progress = Math.min(elapsed / projectDuration, 1);
    $progressBar.css('width', (progress * 100) + '%');

    if (progress >= 1) {
      cancelAnimationFrame(animFrameId);
      elapsedBeforePause = 0;
      startTime = null;
      $progressBar.css('width', '0%');
      updateProject(currentProjectIdx + 1);
      if (isPlaying) {
        animFrameId = requestAnimationFrame(runProgress);
      }
    } else if (isPlaying) {
      animFrameId = requestAnimationFrame(runProgress);
    }
  }

  function startAutoPlay() {
    cancelAnimationFrame(animFrameId);
    isPlaying = true;
    $playIcon.attr('class', 'fa-solid fa-pause');
    startTime = null;
    animFrameId = requestAnimationFrame(runProgress);
  }

  function stopAutoPlay() {
    cancelAnimationFrame(animFrameId);
    isPlaying = false;
    $playIcon.attr('class', 'fa-solid fa-play');
    if (startTime) {
      elapsedBeforePause += performance.now() - startTime;
      startTime = null;
    }
  }

  function resetAndPlay(index) {
    cancelAnimationFrame(animFrameId);
    elapsedBeforePause = 0;
    startTime = null;
    $progressBar.css('width', '0%');
    updateProject(index);
    if (isPlaying) {
      animFrameId = requestAnimationFrame(runProgress);
    }
  }

  $thumbs.on('click', function () {
    const idx = $(this).index();
    if (idx === currentProjectIdx) return;
    resetAndPlay(idx);
  });

  $playBtn.on('click', function (e) {
    e.preventDefault();
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  startAutoPlay();

  $('.activities-col').on('mouseenter click', function () {
    const bgIdx = $(this).data('bg-idx');
    $('.activities-col').removeClass('activities-col--active');
    $(this).addClass('activities-col--active');
    $('.activities-section').attr('data-hover', bgIdx);
    $('.activities-bg__img').removeClass('activities-bg__img--active');
    $(`.activities-bg__img--${bgIdx}`).addClass('activities-bg__img--active');
  });

  $('.activities-cols').on('mouseleave', function () {
    $('.activities-col').removeClass('activities-col--active');
    $('.activities-section').removeAttr('data-hover');
    $('.activities-bg__img').removeClass('activities-bg__img--active');
    $('.activities-bg__img--default').addClass('activities-bg__img--active');
  });

  $('.history-milestone').on('click', function () {
    $('.history-milestone').removeClass('history-milestone--active');
    $(this).addClass('history-milestone--active');
  });

  function syncInvestorsScrollbar() {
    const $activeList = $('.investors-tab-content .tab-pane.active .investors-docs-list');
    const list = $activeList[0];
    const $track = $('.investors-docs-track');
    const $thumb = $('.investors-docs-thumb');
    if (!list || !$track.length || !$thumb.length) return;

    const scrollHeight = list.scrollHeight;
    const clientHeight = list.clientHeight;
    const canScroll = clientHeight > 0 && (scrollHeight - clientHeight > 8);

    $track.toggleClass('is-visible', canScroll);
    if (!canScroll) {
      $thumb.css({ height: '0px', top: '0px' });
      return;
    }

    const trackHeight = $track.innerHeight();
    const thumbHeight = Math.max(36, (clientHeight / scrollHeight) * trackHeight);
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbTop = (list.scrollTop / maxScroll) * maxThumbTop;

    $thumb.css({
      height: thumbHeight + 'px',
      top: Math.min(maxThumbTop, Math.max(0, thumbTop)) + 'px'
    });
  }

  $('.investors-docs-list').on('scroll', function () {
    syncInvestorsScrollbar();
  });

  document.addEventListener('scroll', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('investors-docs-list')) {
      syncInvestorsScrollbar();
    }
  }, true);

  $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
    syncInvestorsScrollbar();
  });

  $(window).on('resize load', function () {
    syncInvestorsScrollbar();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      syncInvestorsScrollbar();
    });
  }

  let isDraggingThumb = false;
  let dragStartY = 0;
  let dragStartScrollTop = 0;

  $('.investors-docs-thumb').on('mousedown touchstart', function (e) {
    e.preventDefault();
    isDraggingThumb = true;
    $(this).addClass('is-dragging');
    const clientY = e.type === 'touchstart' ? e.originalEvent.touches[0].clientY : e.clientY;
    dragStartY = clientY;
    const $activeList = $('.investors-tab-content .tab-pane.active .investors-docs-list');
    dragStartScrollTop = $activeList.scrollTop();
  });

  $(document).on('mousemove touchmove', function (e) {
    if (!isDraggingThumb) return;
    const $activeList = $('.investors-tab-content .tab-pane.active .investors-docs-list');
    const list = $activeList[0];
    const $track = $('.investors-docs-track');
    const $thumb = $('.investors-docs-thumb');
    if (!list || !$track.length || !$thumb.length) return;

    const clientY = e.type === 'touchmove' ? e.originalEvent.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;
    const trackHeight = $track.innerHeight();
    const thumbHeight = $thumb.outerHeight();
    const maxThumbTop = trackHeight - thumbHeight;
    const maxScroll = list.scrollHeight - list.clientHeight;

    if (maxThumbTop > 0) {
      const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
      $activeList.scrollTop(dragStartScrollTop + scrollDelta);
    }
  });

  $(document).on('mouseup touchend', function () {
    if (isDraggingThumb) {
      isDraggingThumb = false;
      $('.investors-docs-thumb').removeClass('is-dragging');
    }
  });

  $('.investors-docs-track').on('click', function (e) {
    if (!$(this).hasClass('is-visible')) return;
    if ($(e.target).closest('.investors-docs-thumb').length) return;
    const $track = $(this);
    const $activeList = $('.investors-tab-content .tab-pane.active .investors-docs-list');
    const list = $activeList[0];
    if (!list) return;

    const trackOffsetTop = $track.offset().top;
    const clickY = e.pageY - trackOffsetTop;
    const trackHeight = $track.innerHeight();
    const ratio = Math.max(0, Math.min(1, clickY / trackHeight));
    const maxScroll = list.scrollHeight - list.clientHeight;
    $activeList.scrollTop(ratio * maxScroll);
  });

  syncInvestorsScrollbar();

  if ($.fn.counterUp) {
    $('.counter').counterUp({
      delay: 10,
      time: 1200
    });
  }

  function resolveVideoSource(rawUrl) {
    if (!rawUrl) return { type: 'none', url: '' };
    const url = String(rawUrl).trim();
    if (!url) return { type: 'none', url: '' };

    const isDirectVideo = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.startsWith('blob:') || url.startsWith('data:video');
    if (isDirectVideo) {
      return { type: 'video', url: url };
    }

    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return { type: 'iframe', url: 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0' };
    }

    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return { type: 'iframe', url: 'https://player.vimeo.com/video/' + vimeoMatch[1] + '?autoplay=1' };
    }

    let embedUrl = url;
    if (!/[?&]autoplay=/i.test(embedUrl)) {
      embedUrl += (embedUrl.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
    }
    return { type: 'iframe', url: embedUrl };
  }

  $('#documentaryModal').on('show.bs.modal', function (e) {
    const $modal = $(this);
    const triggerSrc = e && e.relatedTarget ? $(e.relatedTarget).attr('data-video-src') : null;
    const modalSrc = $modal.attr('data-video-src');
    const $iframe = $modal.find('iframe');
    const $video = $modal.find('video');
    const currentSrc = triggerSrc || modalSrc || $iframe.attr('data-src') || $iframe.attr('src') || $video.attr('src') || $video.find('source').attr('src');
    const resolved = resolveVideoSource(currentSrc);

    if (resolved.type === 'video') {
      if ($iframe.length) {
        $iframe.addClass('d-none').attr('src', '');
      }
      if ($video.length) {
        $video.removeClass('d-none');
        if ($video.attr('src') !== resolved.url) {
          $video.attr('src', resolved.url);
          $video.find('source').attr('src', resolved.url);
          const v = $video[0];
          if (v && typeof v.load === 'function') {
            v.load();
          }
        }
        const videoEl = $video[0];
        if (videoEl && typeof videoEl.play === 'function') {
          videoEl.currentTime = 0;
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(function () {});
          }
        }
      }
    } else if (resolved.type === 'iframe') {
      if ($video.length) {
        const videoEl = $video[0];
        if (videoEl && typeof videoEl.pause === 'function') {
          videoEl.pause();
        }
        $video.addClass('d-none').attr('src', '');
      }
      if ($iframe.length) {
        $iframe.removeClass('d-none').attr('src', resolved.url);
      }
    }
  });

  $('#documentaryModal').on('hide.bs.modal hidden.bs.modal', function () {
    const $modal = $(this);
    const $iframe = $modal.find('iframe');
    const $video = $modal.find('video');

    if ($iframe.length) {
      $iframe.attr('src', '');
    }
    if ($video.length) {
      const videoEl = $video[0];
      if (videoEl && typeof videoEl.pause === 'function') {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    }
  });

  $('.news-nav-btn--next').on('click', function (e) {
    e.preventDefault();
    $('.news-tab-content > .tab-pane.active .carousel').carousel('next');
  });

  $('.news-nav-btn--prev').on('click', function (e) {
    e.preventDefault();
    $('.news-tab-content > .tab-pane.active .carousel').carousel('prev');
  });

  $('.news-tab-content .carousel').on('slid.bs.carousel', function () {
    const idx = $(this).find('.carousel-item.active').index();
    $('.news-page-current').text(String(idx + 1).padStart(2, '0'));
  });

  $('.news-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const target = $(e.target).attr('href');
    const idx = $(target).find('.carousel-item.active').index();
    $('.news-page-current').text(String(idx + 1).padStart(2, '0'));
  });

  var currentTimelineIdx = 0;
  function updateTimeline(idx) {
    var $cols = jQuery('.timeline-col');
    var total = $cols.length;
    if (!total) return;

    if (idx < 0) idx = 0;
    if (idx >= total) idx = total - 1;
    currentTimelineIdx = idx;

    var $col = $cols.eq(idx);
    $cols.removeClass('active');
    $col.addClass('active');

    var year = $col.attr('data-year') || '';
    var title = $col.attr('data-title') || '';
    var desc = $col.attr('data-desc') || '';
    var img = $col.attr('data-img') || '';

    jQuery('#timelineCapsuleYear').text(year);
    jQuery('#timelineYearMenu .timeline-nav-item').removeClass('active').eq(idx).addClass('active');

    if (idx === 0) {
      jQuery('#timelinePrev').addClass('is-disabled');
    } else {
      jQuery('#timelinePrev').removeClass('is-disabled');
    }

    if (idx === total - 1) {
      jQuery('#timelineNext').addClass('is-disabled');
    } else {
      jQuery('#timelineNext').removeClass('is-disabled');
    }

    var winW = window.innerWidth;
    var colW = $col.outerWidth() || 289;
    var shiftX = 0;
    if (winW >= 1200) {
      shiftX = 566 - (idx * colW);
    } else if (winW >= 992) {
      shiftX = 290 - (idx * colW);
    }
    jQuery('#timelineColumnsTrack').css('transform', 'translateX(' + shiftX + 'px)');

    if (winW < 992 && $col.length) {
      var trackEl = document.getElementById('timelineColumnsTrack');
      if (trackEl && trackEl.scrollTo) {
        var colLeft = $col[0].offsetLeft;
        var colW2 = $col[0].offsetWidth;
        var trackW = trackEl.offsetWidth;
        trackEl.scrollTo({
          left: colLeft - (trackW / 2) + (colW2 / 2),
          behavior: 'smooth'
        });
      }
    }

    var $bigYear = jQuery('#timelineBigYear');
    $bigYear.addClass('is-updating');

    var $card = jQuery('#timelineFocalCard');
    $card.addClass('is-updating');

    setTimeout(function () {
      $bigYear.text(year);
      jQuery('#timelineTitle').text(title);
      jQuery('#timelineDesc').text(desc);
      if (img) {
        jQuery('#timelineImage').attr('src', img);
      }
      $bigYear.removeClass('is-updating');
      $card.removeClass('is-updating');
    }, 160);
  }

  jQuery(document).on('click', '.timeline-col', function (e) {
    e.preventDefault();
    var idx = parseInt(jQuery(this).attr('data-index'), 10);
    updateTimeline(idx);
  });

  jQuery('#timelinePrev').on('click', function (e) {
    e.preventDefault();
    updateTimeline(currentTimelineIdx - 1);
  });

  jQuery('#timelineNext').on('click', function (e) {
    e.preventDefault();
    updateTimeline(currentTimelineIdx + 1);
  });

  jQuery('#timelineDropdownToggle').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    jQuery('#timelineYearDropdown').toggleClass('is-open');
  });

  jQuery(document).on('click', '#timelineYearMenu .timeline-nav-item', function (e) {
    e.preventDefault();
    var idx = parseInt(jQuery(this).attr('data-index'), 10);
    jQuery('#timelineYearDropdown').removeClass('is-open');
    updateTimeline(idx);
  });

  jQuery(document).on('click', function (e) {
    if (!jQuery(e.target).closest('#timelineYearDropdown').length) {
      jQuery('#timelineYearDropdown').removeClass('is-open');
    }
  });

  if (jQuery('#timelineColumnsTrack').length) {
    updateTimeline(0);
    jQuery(window).on('resize', function () {
      updateTimeline(currentTimelineIdx);
    });
  }

  function goToGallerySlide($slider, index) {
    var $track = $slider.find('.project-gallery__track');
    var $items = $track.find('.project-gallery__item');
    var total = $items.length;
    if (!total) return;

    if (index < 0) index = 0;
    if (index > total - 1) index = total - 1;

    $slider.data('current-slide', index);

    var itemWidth = $items.eq(0).outerWidth();
    var gap = parseFloat($track.css('gap')) || 16;
    var shiftX = index * (itemWidth + gap);

    $track.css('transform', 'translate3d(-' + shiftX + 'px, 0, 0)');

    var $prev = $slider.find('.project-gallery__nav-btn--prev');
    var $next = $slider.find('.project-gallery__nav-btn--next');

    if (index === 0) {
      $prev.addClass('project-gallery__nav-btn--disabled');
    } else {
      $prev.removeClass('project-gallery__nav-btn--disabled');
    }

    if (index >= total - 1) {
      $next.addClass('project-gallery__nav-btn--disabled');
    } else {
      $next.removeClass('project-gallery__nav-btn--disabled');
    }
  }

  jQuery(document).on('click', '.project-gallery__nav-btn--next', function (e) {
    e.preventDefault();
    var $slider = jQuery(this).closest('.project-gallery__slider');
    var curr = $slider.data('current-slide') || 0;
    goToGallerySlide($slider, curr + 1);
  });

  jQuery(document).on('click', '.project-gallery__nav-btn--prev', function (e) {
    e.preventDefault();
    var $slider = jQuery(this).closest('.project-gallery__slider');
    var curr = $slider.data('current-slide') || 0;
    goToGallerySlide($slider, curr - 1);
  });

  var galleryTouchStartX = 0;
  var galleryTouchStartY = 0;

  jQuery(document).on('touchstart', '.project-gallery__track', function (e) {
    var touch = e.originalEvent.touches[0];
    galleryTouchStartX = touch.clientX;
    galleryTouchStartY = touch.clientY;
  });

  jQuery(document).on('touchend', '.project-gallery__track', function (e) {
    var touch = e.originalEvent.changedTouches[0];
    var deltaX = touch.clientX - galleryTouchStartX;
    var deltaY = touch.clientY - galleryTouchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      var $slider = jQuery(this).closest('.project-gallery__slider');
      var curr = $slider.data('current-slide') || 0;
      if (deltaX < 0) {
        goToGallerySlide($slider, curr + 1);
      } else {
        goToGallerySlide($slider, curr - 1);
      }
    }
  });

  function alignGalleryTrack() {
    var $container = jQuery('.project-gallery .container').first();
    if (!$container.length) return;
    if (window.innerWidth <= 991.98) {
      jQuery('.project-gallery__track').css({ 'padding-left': '', 'padding-right': '' });
      return;
    }
    var offset = $container.offset().left + parseFloat($container.css('padding-left'));
    jQuery('.project-gallery__track').css({
      'padding-left': offset + 'px',
      'padding-right': offset + 'px'
    });
  }

  jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = jQuery(e.target).attr('href');
    var $slider = jQuery(target).find('.project-gallery__slider');
    if ($slider.length) {
      alignGalleryTrack();
      goToGallerySlide($slider, 0);
    }
  });

  jQuery(window).on('resize', function () {
    alignGalleryTrack();
    jQuery('.project-gallery__slider').each(function () {
      var $slider = jQuery(this);
      var curr = $slider.data('current-slide') || 0;
      goToGallerySlide($slider, curr);
    });
  });

  alignGalleryTrack();
  jQuery('.project-gallery__slider').each(function () {
    goToGallerySlide(jQuery(this), 0);
  });

  function initOtherSlider(prefix) {
    var currentSlide = 0;
    var $track = jQuery('.' + prefix + '__track');
    var $slides = jQuery('.' + prefix + '__slide');
    var totalSlides = $slides.length;
    var $current = jQuery('.' + prefix + '__current');
    var $prevBtn = jQuery('.' + prefix + '__btn--prev');
    var $nextBtn = jQuery('.' + prefix + '__btn--next');

    if (!$track.length || !totalSlides) return;

    function updateSlide(idx) {
      if (idx < 0) idx = 0;
      if (idx >= totalSlides) idx = totalSlides - 1;
      currentSlide = idx;
      var shiftPercent = -(currentSlide * (100 / totalSlides));
      $track.css('transform', 'translate3d(' + shiftPercent + '%, 0, 0)');
      var slideNum = (currentSlide + 1 < 10 ? '0' : '') + (currentSlide + 1);
      $current.text(slideNum);
      $prevBtn.toggleClass('disabled', currentSlide === 0);
      $nextBtn.toggleClass('disabled', currentSlide === totalSlides - 1);
    }

    $prevBtn.on('click', function (e) {
      e.preventDefault();
      updateSlide(currentSlide - 1);
    });

    $nextBtn.on('click', function (e) {
      e.preventDefault();
      updateSlide(currentSlide + 1);
    });

    var touchStartX = 0;
    var touchStartY = 0;
    jQuery('.' + prefix + '__slider').on('touchstart', function (e) {
      touchStartX = e.originalEvent.touches[0].clientX;
      touchStartY = e.originalEvent.touches[0].clientY;
    });

    jQuery('.' + prefix + '__slider').on('touchend', function (e) {
      var touch = e.originalEvent.changedTouches[0];
      var deltaX = touch.clientX - touchStartX;
      var deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          updateSlide(currentSlide + 1);
        } else {
          updateSlide(currentSlide - 1);
        }
      }
    });

    updateSlide(0);
  }

  initOtherSlider('other-projects');
  initOtherSlider('other-jobs');

  $('.projects-filter__tab').on('click', function (e) {
    e.preventDefault();
    $('.projects-filter__tab').removeClass('projects-filter__tab--active');
    $(this).addClass('projects-filter__tab--active');
    if (this.scrollIntoView) {
      this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  $('.filter-form__item, .careers-dropdown-item').on('click', function (e) {
    e.preventDefault();
    const val = $(this).data('value') !== undefined ? $(this).data('value') : $(this).text().trim();
    const text = $(this).text().trim();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    const $dropdown = $(this).closest('.filter-form__dropdown, .dropdown');
    $dropdown.find('.filter-form__val, #selectedLocation').text(text);
    $dropdown.find('.filter-form__hidden-val').val(val).trigger('change');
  });

  $('#resumeFileInput').on('change', function () {
    const file = this.files && this.files[0];
    if (file) {
      $('#jobUploadText').text(file.name);
      $('#jobUploadBox').addClass('job-upload-box--has-file');
    } else {
      $('#jobUploadText').text('Tải hồ sơ lên');
      $('#jobUploadBox').removeClass('job-upload-box--has-file');
    }
  });

  $('#jobUploadBox').on('dragover dragenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('job-upload-box--dragover');
  });

  $('#jobUploadBox').on('dragleave drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('job-upload-box--dragover');
  });

  $('#jobUploadBox').on('drop', function (e) {
    const files = e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files;
    if (files && files.length > 0) {
      const fileInput = document.getElementById('resumeFileInput');
      if (fileInput) {
        fileInput.files = files;
        $('#resumeFileInput').trigger('change');
      }
    }
  });

  $('#jobSubmitBtn').on('click', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('resumeFileInput');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert('Vui lòng chọn hồ sơ đính kèm trước khi nộp.');
      return;
    }
    alert('Hồ sơ của bạn đã được gửi thành công! HUDLAND sẽ liên hệ với bạn trong thời gian sớm nhất.');
    fileInput.value = '';
    $('#resumeFileInput').trigger('change');
  });

  function filterCareers() {
    const locationVal = ($('input[name="location"]').val() || '').trim();
    const keywordVal = ($('.careers-section input[name="keyword"]').val() || '').toLowerCase().trim();

    $('.career-card').each(function () {
      const cardTitle = $(this).find('.career-card__title').text().toLowerCase();
      const cardLocation = $(this).find('.career-card__location').text().trim();

      const matchLocation = !locationVal || cardLocation.indexOf(locationVal) !== -1;
      const matchKeyword = !keywordVal || cardTitle.indexOf(keywordVal) !== -1;

      if (matchLocation && matchKeyword) {
        $(this).closest('.careers-col').show();
      } else {
        $(this).closest('.careers-col').hide();
      }
    });
  }

  $('input[name="location"]').on('change', filterCareers);
  $('.careers-section input[name="keyword"]').on('input', filterCareers);

  $('.shareholder-time-btn').on('click', function (e) {
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
});
