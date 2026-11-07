(function () {
    const headerTemplate = `
<header class="header" id="header">
    <div class="container">
        <div class="row align-items-center header__row">
            <div class="col-auto header__col-brand">
                <a href="./index.html" class="header__logo" aria-label="HUDLAND Trang chủ">
                    <img src="./image/logo.png" alt="HUDLAND JSC Logo" class="img-fluid header__logo-img"
                        loading="lazy">
                </a>
            </div>

            <div class="col d-none d-xl-flex justify-content-end align-items-center header__col-nav">
                <nav class="header__nav">
                    <ul class="header__menu">
                        <li class="header__menu-item">
                            <a href="./gioi-thieu.html" class="header__menu-link">GIỚI THIỆU</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./du-an.html" class="header__menu-link">DỰ ÁN</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./linh-vuc-hoat-dong.html" class="header__menu-link">LĨNH VỰC HOẠT ĐỘNG</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./quan-he-co-dong.html" class="header__menu-link">QUAN HỆ CỔ ĐÔNG</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./tin-tuc.html" class="header__menu-link">TIN TỨC</a>
                        </li>
                        <li class="header__menu-item">
                            <a href="./tuyen-dung.html" class="header__menu-link">TUYỂN DỤNG</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="col-auto header__col-actions">
                <div class="header__actions">
                    <a href="javascript:void(0)" class="header__btn header__btn--search" id="searchBtn"
                        role="button" aria-label="Tìm kiếm">
                        <i class="fa-regular fa-magnifying-glass"></i>
                    </a>

                    <div class="dropdown header-lang">
                        <a href="javascript:void(0)" class="header-lang__btn dropdown-toggle" id="langDropdown"
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="header-lang__flag">
                                <img src="./image/flag-vn.png" alt="Việt Nam" class="header-lang__flag-img"
                                    loading="lazy">
                            </span>
                            <span class="header-lang__code">VIE</span>
                            <i class="fa-solid fa-chevron-down header-lang__arrow"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right header-lang__menu"
                            aria-labelledby="langDropdown">
                            <a class="dropdown-item header-lang__item active" href="?lang=vi">
                                <span class="header-lang__flag">
                                    <img src="./image/flag-vn.png" alt="Việt Nam" class="header-lang__flag-img"
                                        loading="lazy">
                                </span>
                                Tiếng Việt (VN)
                            </a>
                            <a class="dropdown-item header-lang__item" href="?lang=en">
                                English (EN)
                            </a>
                        </div>
                    </div>

                    <a href="javascript:void(0)" class="header__btn header__btn--menu" id="menuToggleBtn"
                        role="button" aria-label="Menu">
                        <span class="header__menu-bars" id="menuToggleBars">
                            <span class="header__menu-bar header__menu-bar--top"></span>
                            <span class="header__menu-bar header__menu-bar--middle"></span>
                            <span class="header__menu-bar header__menu-bar--bottom"></span>
                        </span>
                        <span class="header__menu-close" id="menuToggleClose">
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="header-search" id="headerSearch">
        <div class="container">
            <div class="header-search__inner">
                <input type="text" class="header-search__input" placeholder="Nhập từ khóa tìm kiếm..."
                    aria-label="Tìm kiếm">
                <a href="javascript:void(0)" class="header-search__close" id="searchCloseBtn" role="button"
                    aria-label="Đóng tìm kiếm">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
        </div>
    </div>
</header>

<div class="sidebar-backdrop" id="sidebarBackdrop"></div>
<aside class="sidebar-menu" id="sidebarMenu">
    <div class="sidebar-menu__header d-xl-none">
        <a href="./index.html" class="sidebar-menu__logo">
            <img src="./image/logo.png" alt="HUDLAND JSC Logo" class="img-fluid sidebar-menu__logo-img"
                loading="lazy">
        </a>
        <a href="javascript:void(0)" class="sidebar-menu__close" id="sidebarCloseBtn" role="button"
            aria-label="Đóng menu">
            <i class="fa-solid fa-xmark"></i>
        </a>
    </div>

    <nav class="sidebar-menu__nav">
        <ul class="sidebar-menu__list">
            <li class="sidebar-menu__item">
                <a href="./index.html" class="sidebar-menu__link">
                    <i class="fa-solid fa-house sidebar-menu__icon"></i>
                    <span class="sidebar-menu__text">TRANG CHỦ</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./gioi-thieu.html" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">GIỚI THIỆU</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./du-an.html" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">DỰ ÁN</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./index.html#activities" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">LĨNH VỰC HOẠT ĐỘNG</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./index.html#investors" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">QUAN HỆ CỔ ĐÔNG</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./tin-tuc.html" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">TIN TỨC</span>
                </a>
            </li>
            <li class="sidebar-menu__item">
                <a href="./tuyen-dung.html" class="sidebar-menu__link">
                    <span class="sidebar-menu__text">TUYỂN DỤNG</span>
                </a>
            </li>
            <li class="sidebar-menu__item sidebar-menu__item--internal">
                <a href="./index.html#internal" class="sidebar-menu__link">
                    <i class="fa-solid fa-user sidebar-menu__icon"></i>
                    <span class="sidebar-menu__text">KHU VỰC NỘI BỘ</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>
`;

    const footerTemplate = `
<footer class="footer">
    <div class="container">
        <div class="row align-items-center footer-main-row">
            <div class="col-12 col-lg-6 footer-col-info">
                <div class="footer-brand">
                    <a href="./index.html" class="footer-brand__link"><img src="./image/logo-white.png" alt="HUDLAND" class="footer-logo" loading="lazy"></a>
                    <h3 class="footer-company-name">CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN BẤT ĐỘNG SẢN HUDLAND</h3>
                </div>
                <div class="footer-info-list">
                    <div class="footer-info-item">
                        <span class="footer-info-label">Trụ sở chính:</span>
                        <p class="footer-info-val">Tầng 12, tòa nhà HUDLAND TOWER Lô A-CC7, Khu dịch vụ tổng hợp Linh Đàm, phường Định Công, thành phố Hà Nội</p>
                    </div>
                    <div class="row footer-contact-row">
                        <div class="col-12 col-sm-4 footer-contact-col">
                            <span class="footer-info-label">Điện thoại:</span>
                            <a href="tel:02436523862" class="footer-info-val footer-info-link">024. 36523862</a>
                        </div>
                        <div class="col-12 col-sm-4 footer-contact-col">
                            <span class="footer-info-label">Fax:</span>
                            <span class="footer-info-val">024.36523864</span>
                        </div>
                        <div class="col-12 col-sm-4 footer-contact-col">
                            <span class="footer-info-label">Email:</span>
                            <a href="mailto:hudland@hudland.com.vn" class="footer-info-val footer-info-link">hudland@hudland.com.vn</a>
                        </div>
                    </div>
                </div>
                <div class="footer-socials">
                    <a href="https://facebook.com/hudland" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Facebook">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener" class="footer-social-btn" aria-label="YouTube">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener" class="footer-social-btn" aria-label="TikTok">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>

            <div class="col-12 col-lg-6 footer-col-form">
                <div class="footer-form-card">
                    <h4 class="footer-form-title">ĐĂNG KÝ NHẬN THÔNG TIN</h4>
                    <form class="footer-form" action="#" method="POST">
                        <div class="row footer-form-row">
                            <div class="col-12 col-sm-6 footer-field">
                                <input type="text" name="name" class="footer-input" placeholder="Họ và tên *" required>
                            </div>
                            <div class="col-12 col-sm-6 footer-field">
                                <input type="email" name="email" class="footer-input" placeholder="Email *" required>
                            </div>
                            <div class="col-12 col-sm-6 footer-field">
                                <input type="tel" name="phone" class="footer-input" placeholder="Số điện thoại *" required>
                            </div>
                            <div class="col-12 col-sm-6 footer-field">
                                <input type="text" name="subject" class="footer-input" placeholder="Tiêu đề">
                            </div>
                            <div class="col-12 footer-field">
                                <input type="text" name="message" class="footer-input" placeholder="Lời nhắn *" required>
                            </div>
                        </div>
                        <div class="footer-form-bottom">
                            <div class="footer-captcha">
                                <label class="footer-captcha-label">
                                    <input type="checkbox" class="footer-captcha-check" required>
                                    <span class="footer-captcha-text">Tôi không phải là người máy</span>
                                </label>
                            </div>
                            <button type="submit" class="footer-submit-btn">
                                <span class="footer-submit-text">Gửi Thông Tin</span>
                                <span class="footer-submit-circle" aria-hidden="true">
                                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                                        <path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="footer-copyright-row">
            <p class="footer-copyright-text">© 2026 HUDLAND. All rights reserved.</p>
            <div class="footer-copyright-links">
                <a href="#privacy" class="footer-copyright-link">Chính sách bảo mật</a>
                <span class="footer-copyright-sep" aria-hidden="true">|</span>
                <a href="#terms" class="footer-copyright-link">Điều khoản sử dụng</a>
                <span class="footer-copyright-sep" aria-hidden="true">|</span>
                <a href="#sitemap" class="footer-copyright-link">Sitemap</a>
            </div>
        </div>
    </div>
</footer>

<div class="floating-actions">
    <a href="tel:02437833666" class="floating-actions__btn floating-actions__btn--phone" aria-label="Gọi điện">
        <i class="fa-solid fa-phone"></i>
    </a>
    <a href="https://m.me/hudland" target="_blank" rel="noopener"
        class="floating-actions__btn floating-actions__btn--messenger" aria-label="Nhắn tin Messenger">
        <i class="fa-brands fa-facebook-messenger"></i>
    </a>
    <a href="javascript:void(0)" class="floating-actions__btn floating-actions__btn--top" id="backToTopBtn"
        role="button" aria-label="Lên đầu trang">
        <i class="fa-solid fa-chevron-up"></i>
    </a>
</div>
`;

    class AppHeader extends HTMLElement {
        connectedCallback() {
            const base = this.getAttribute('data-base-path') || this.getAttribute('base-path') || './';
            const theme = this.getAttribute('theme') || (this.classList.contains('header--light') ? 'light' : '');
            let content = headerTemplate;
            if (base !== './') {
                content = content.replace(/(src|href)="\.\//g, `$1="${base}`);
            }
            if (theme === 'light') {
                content = content.replace('class="header"', 'class="header header--light"');
            }
            this.innerHTML = content;
        }
    }

    class AppFooter extends HTMLElement {
        connectedCallback() {
            const base = this.getAttribute('data-base-path') || this.getAttribute('base-path') || './';
            let content = footerTemplate;
            if (base !== './') {
                content = content.replace(/(src|href)="\.\//g, `$1="${base}`);
            }
            this.innerHTML = content;
        }
    }

    if (!customElements.get('app-header')) {
        customElements.define('app-header', AppHeader);
    }
    if (!customElements.get('app-footer')) {
        customElements.define('app-footer', AppFooter);
    }
})();

