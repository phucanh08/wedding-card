// Khởi tạo LightGallery v2 (thay cho bản v1/jQuery cũ vốn nhúng trong libs.js).
// API v2 là vanilla JS + plugin tách rời; UMD expose các global:
//   lightGallery, lgZoom, lgThumbnail, lgAutoplay, lgFullscreen
// Dùng dynamic mode để giữ nguyên mảng `photoGalleries` (36 ảnh) build trong index.html.
window.addEventListener('load', function () {
    if (typeof lightGallery === 'undefined') return;

    // Khử cảnh báo license cho mục đích dùng GPLv3 (open-source)
    var LICENSE = '0000-0000-000-0000';
    var data = (typeof photoGalleries !== 'undefined' && Array.isArray(photoGalleries)) ? photoGalleries : [];

    // --- Thư viện ảnh cưới (36 ảnh, dynamic mode) ---
    var container = document.getElementById('photoGalleryContainer');
    if (container && data.length) {
        var mainGallery = lightGallery(container, {
            plugins: [lgZoom, lgThumbnail, lgAutoplay, lgFullscreen],
            dynamic: true,
            dynamicEl: data,
            download: false,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
            actualSize: true,
            enableZoomAfter: 300,
            licenseKey: LICENSE,
        });
        // Mỗi thumbnail có class .btn-see-more-gallery + data-index -> mở đúng ảnh
        document.addEventListener('click', function (e) {
            var item = e.target.closest('.btn-see-more-gallery');
            if (!item) return;
            mainGallery.openGallery(parseInt(item.getAttribute('data-index'), 10) || 0);
        });
    }

    // --- Ảnh QR ủng hộ (mở từng ảnh đơn) ---
    document.addEventListener('click', function (e) {
        var qr = e.target.closest('.qr-code-image');
        if (!qr) return;
        var src = qr.getAttribute('src');
        if (!src) return;
        // Tạo host tạm cho mỗi lần mở rồi destroy khi đóng
        var host = document.createElement('div');
        document.body.appendChild(host);
        var qrGallery = lightGallery(host, {
            plugins: [lgZoom],
            dynamic: true,
            dynamicEl: [{ src: src, thumb: src }],
            download: false,
            actualSize: true,
            enableZoomAfter: 300,
            licenseKey: LICENSE,
        });
        host.addEventListener('lgAfterClose', function () {
            qrGallery.destroy();
            host.remove();
        }, { once: true });
        qrGallery.openGallery(0);
    });
});
