import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDy3QBcu_bEFdiBhRHVGdEi2G5vVdF0wXM",
    authDomain: "wedding-card-cdcce.firebaseapp.com",
    databaseURL: "https://wedding-card-cdcce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-card-cdcce",
    storageBucket: "wedding-card-cdcce.appspot.com",
    messagingSenderId: "985532056221",
    appId: "1:985532056221:web:cf5177f0b313a04ecb4a74",
    measurementId: "G-WY6R3LVYX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// Hàm thêm lời chúc
async function addWish(wish) {
    try {
        const time = serverTimestamp();
        const docRef = await addDoc(collection(db, "wishes"), {
            ...wish,
            createdTime: time
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}

async function getAllWishes() {
    try {
        const wishesQuery = query(
            collection(db, "wishes"),
            orderBy("createdTime", "desc"),
        );
        const querySnapshot = await getDocs(wishesQuery);
        const wishes = [];
        querySnapshot.forEach((doc) => {
            wishes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log('wishes', wishes);
        return wishes;
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}

function setWishesListener(callback) {
    const q = query(collection(db, "wishes"), orderBy("createdTime", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const wishes = [];
        querySnapshot.forEach((doc) => {
            wishes.push({id: doc.id, ...doc.data()});
        });
        console.log('wishes', wishes);
        callback(wishes)
    });
}


// Tự động gọi hàm khi trang load
$(document).ready(function () {
    setWishesListener(wishes => {
        const comments = document.getElementById('show-comments');
        comments.innerHTML = '';

        wishes.forEach((wish, index) => {
            const item = document.createElement('div');
            item.className = 'box-comment pb-3';
            item.innerHTML = '<div class="box-comment pb-3">\n' +
                `                        <h4 id="user-name-comment" class="mt-1">${wish.name}</h4>\n` +
                '                        <p id="comment-detail" class="m-0">\n' +
                `                            ${wish.content}\n` +
                '                        </p>\n' +
                '                    </div>';
            comments.appendChild(item);
        })
    });

    /*------------------------------------------
     = DONATE MODAL
     -------------------------------------------*/
    if ($("#donate-modal").length && $(".buttonDonate").length && $(".donate-modal-close").length) {
        $(document).on('click', '.buttonDonate', function () {
            $("#donate-modal").show();
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
        });
        $(document).on('click', '.donate-modal-close', function () {
            $("#donate-modal").hide();
        });
        $(document).on('click', 'body', function (e) {
            if (e.target.id == $("#donate-modal").attr('id')) {
                $("#donate-modal").hide();
            }
        });
    }

    $(document).on('click', '.crypto-item', function () {
        let parent = $(this).parents('.donate-card');
        parent.find('.cryptos-box-view').show();
        parent.find('.cryptos-box-view .coin-img').html('<img src="' + $(this).data('img') + '" />');
        parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
        parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
        parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({
            width: 150,
            height: 150,
            text: $(this).data('address')
        });
    });

    $(document).on('click', '.cryptos-box-view-close', function () {
        let parent = $(this).parents('.donate-card');
        parent.find('.cryptos-box-view').hide();
    });

    /*------------------------------------------
        = WISH FORM SUBMISSION
    -------------------------------------------*/
    if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            errorPlacement: function (error, element) {
                if (element.attr("name") === "content") {
                    error.insertAfter("#wish-form .vitualTextarea");
                } else {
                    error.insertAfter(element);
                }
            },
            messages: {
                name: {
                    required: '<span style="color:red;">Vui lòng nhập tên của bạn.</span>',
                    minlength: '<span style="color:red;">Tên phải lớn hơn 5 ký tự.</span>',
                },
                content: {
                    required: '<span style="color:red;">Vui lòng nhập lời chúc.</span>',
                    minlength: '<span style="color:red;">Lời chúc phải lớn hơn 10 ký tự.</span>',
                },
                email: {
                    email: '<span style="color:red;">Địa chỉ email không hợp lệ.</span>'
                }
            },

            submitHandler: async function (form, event) {
                try {
                    event.preventDefault();
                    const wish = {
                        name: document.getElementById('name-comment').value,
                        content: document.getElementById('detail-comment').value,
                    };
                    $("#loader").css("display", "inline-block");
                    addWish(wish).then((result) => {
                        $("#loader").hide();
                        form.reset();
                    });
                } catch (e) {
                    $("#loader").hide();
                    $("#error").slideDown("slow");
                    setTimeout(function () {
                        $("#error").slideUp("slow");
                    }, 5000);
                }
            }
        });
    }

    /*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
    if ($(".music-box").length) {
        var musicBtn = $(".music-box-toggle-btn"),
            musicBox = $(".music-holder");

        musicBtn.on("click", function () {
            musicBox.toggleClass("toggle-music-box");
            return false;
        })
    }

    /*------------------------------------------
        = BACK TO TOP
    -------------------------------------------*/
    if ($(".back-to-top-btn").length) {
        $(".back-to-top-btn").on("click", function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000, "easeInOutExpo");
            return false;
        })
    }

    $(document).on('click', '.calendar-button-custom-click', function (e) {
        e.preventDefault();
        $(this).parent().find('.calendar-button .atcb-click').click();
    });

    /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function () {
        $('ul.list-menu-icon').css('opacity', '1');
        $('ul.list-menu-icon').css('pointer-events', '');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function () {
        $('ul.list-menu-icon').css('opacity', '0');
        $('ul.list-menu-icon').css('pointer-events', 'none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity', '1');
    }, 3000);
    $(window).on("load", function () {
        if ($('.bii-logo').length > 0) {
            $('#menu-access').css('bottom', '278px');
            document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
        }
    })
});
