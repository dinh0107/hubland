# Coding Rules & Frontend Standards

> **NGUYÊN TẮC CỐT LÕI**: Tuyệt đối tuân thủ 100% tất cả các quy tắc đã đặt ra dưới đây, không tự ý làm theo ý mình, không sử dụng giải pháp ngoài chuẩn đã quy định.

## 1. Công nghệ (Tech Stack)
- Sử dụng **HTML5 thuần**, **Bootstrap 4.6** (CSS/JS bundle) và **jQuery**.
- Chú ý các thuộc tính tương tác JavaScript của Bootstrap 4: sử dụng cú pháp chuẩn Bootstrap 4 như `data-toggle="..."`, `data-target="..."` (tuyệt đối không dùng cú pháp `data-bs-*` của Bootstrap 5).
- **Thư viện Counter**: Luôn sử dụng bộ thư viện chuẩn `jquery.waypoints.min.js` và `jquery.counterup.min.js`.
- **Icon**: Luôn sử dụng **Font Awesome** (sử dụng file `style/all.css`), **tuyệt đối không tải ảnh icon (png/svg/jpg)** về dự án.
- Không tự ý dùng TailwindCSS hoặc các JS frameworks (React, Vue, v.v.) trừ khi có yêu cầu thêm.
- **Quy tắc Comment**: **Tuyệt đối không viết comment** ở bất kỳ đâu trong toàn bộ code (HTML, CSS, JavaScript). Code phải tự tường minh, sạch sẽ.

## 2. Quản lý CSS & Biến hệ thống (CSS Variables: Màu sắc & Typography)
- **Bắt buộc dùng biến CSS (`var(...)`) cho màu sắc và font chữ**:
  - Khai báo toàn bộ biến tập trung trong `:root` ngay đầu file CSS chính (`style.css`).
  - **Biến màu sắc**: Định nghĩa đầy đủ cho các màu chủ đạo, màu phụ, màu chữ, nền, viền, gradient (ví dụ: `--primary-color`, `--secondary-color`, `--accent-color`, `--text-main`, `--bg-light`,...). **Tuyệt đối không hardcode mã màu** (HEX/RGB) rải rác trong code CSS mà phải dùng biến `var(--...)`.
  - **Biến Typography (Font chữ & Độ đậm)**: Định nghĩa biến font chính `--font-main` (font-family) và các biến font-weight (`--fw-regular`, `--fw-medium`, `--fw-semibold`, `--fw-bold`, `--fw-extrabold`, `--fw-black`). 
  - **Kích thước chữ (`font-size`)**: Set giá trị trực tiếp tại class phần tử, không khai báo biến cho font-size.
- Sử dụng nhất quán các biến CSS này xuyên suốt toàn bộ dự án để thuận tiện bảo trì và tùy biến giao diện.
- **Ưu tiên tái sử dụng Class & dùng Modifier (DRY CSS)**:
  - **Tối đa hóa tái sử dụng class**: Khi các thành phần có thiết kế hoặc style gần giống nhau, bắt buộc phải dùng chung class base để tránh lặp code.
  - **Sử dụng Modifier**: Khi có biến thể về màu sắc, kích thước, kiểu dáng hay trạng thái, luôn thêm class modifier theo chuẩn BEM (ví dụ: `.card` đi kèm `.card--highlight`, `.btn` đi kèm `.btn--outline`, `.section-title` đi kèm `.section-title--white`) thay vì tạo class mới hoặc viết lại các thuộc tính trùng lặp.
- **Quy tắc CSS nghiêm ngặt cho hình ảnh**:
  - **Tuyệt đối KHÔNG set background image trong CSS (`background-image`, `background: url(...)`)**: Mọi ảnh nền, banner, hình ảnh section bắt buộc phải đặt trực tiếp bằng thẻ `<img>` trong HTML (bọc trong wrapper). Tuyệt đối không load bất kỳ ảnh nào qua CSS background.
  - **Tuyệt đối KHÔNG sử dụng `position: absolute`, `aspect-ratio`, `object-fit` vào thẻ `<img>`**.
  - **Tuyệt đối KHÔNG "ăn gian" CSS bằng cách gán `position: absolute` vào thẻ bọc ảnh** (wrapper/container chứa ảnh) để ép khung/phủ ảnh. Ảnh và khung bọc phải nằm trong luồng hiển thị tự nhiên của layout.
  - Ảnh responsive hoàn toàn theo kích thước tự nhiên kết hợp class Bootstrap (`.img-fluid`, `.w-100`).

## 3. Cấu trúc HTML & Chuẩn SEO
- **Quy tắc thẻ `<button>` và thẻ `<a>`**:
  - **Tuyệt đối KHÔNG dùng thẻ `<button>` lung tung ngoài form**: Thẻ `<button>` **CHỈ ĐƯỢC PHÉP DÙNG DUY NHẤT trong `<form>`** (submit, reset, form controls).
  - Toàn bộ các nút bấm tương tác bên ngoài form (nút điều hướng, xem thêm, tải về, mở modal/popup, nút play/pause video, đóng mở menu/search, scroll top, v.v.) **bắt buộc phải sử dụng thẻ `<a>`** (kết hợp `href="..."` hoặc `href="javascript:void(0)"`, `role="button"` nếu cần) kèm class nút phù hợp.
- **Chuẩn SEO & Semantic**:
  - Đầy đủ các thẻ meta quan trọng (`title`, `meta description`, `viewport`, Open Graph).
  - Cấu trúc Heading chuẩn: duy nhất một thẻ `<h1>` trên trang, các thẻ `<h2>`, `<h3>` phân cấp rõ ràng theo nội dung.
  - Sử dụng thẻ ngữ nghĩa HTML5 hợp lý (`<header>`, `<nav>`, `<main>`, `<footer>`), **hạn chế dùng thẻ `<section>`** để tránh lồng khối rườm rà.
  - **Hạn chế dùng thẻ `<p>`**: Thay bằng các thẻ phù hợp hơn (như `<span>`, `<div>` với text-class Bootstrap) để tránh margin/khoảng cách mặc định không mong muốn và tinh gọn DOM.
  - Thẻ ảnh `<img>` luôn có thuộc tính `alt`, `loading="lazy"`.
- **Tối ưu DOM (Không lồng thẻ quá sâu)**:
  - Giữ cây DOM phẳng, tinh gọn; hạn chế tối đa việc bọc nhiều tầng `div` / `container` / `wrapper` dư thừa.

## 4. Quy tắc Layout, Spacing & Responsive
- **Layout**: Ưu tiên dùng hệ thống Grid và Flexbox của Bootstrap 4.6 (`.container`, `.row`, `.col-*`, `.d-flex`,...) để chia layout và bố cục.
- **Spacing (Margin & Padding)**: **Tuyệt đối không dùng các class spacing của Bootstrap (`p-*`, `m-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `px-*`, `py-*`, `mx-*`, `my-*`)** vì khó tùy biến và khó responsive. Mọi khoảng cách padding/margin phải được khai báo tường minh trong file CSS tùy chỉnh riêng (`style.css`).
- **Vị trí code Responsive**: **Toàn bộ code responsive (`@media`) bắt buộc phải đặt ở dưới cùng file CSS (`style.css`)**.
  - Tuyệt đối không viết media query rải rác xen kẽ giữa các selector trên thân file.
  - Gom nhóm code responsive tập trung ở cuối file theo thứ tự các breakpoint chuẩn (Desktop -> Tablet -> Mobile, ví dụ: `@media (max-width: 1199.98px)`, `@media (max-width: 991.98px)`, `@media (max-width: 767.98px)`, `@media (max-width: 575.98px)`).
