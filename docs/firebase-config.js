import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    addDoc,
    collection, doc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where
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
const db = getFirestore(app);


async function getAllGuests() {
    try {
        const wishesQuery = query(
            collection(db, "guests"),
            orderBy("name"),
        );
        const querySnapshot = await getDocs(wishesQuery);
        const guests = [];
        querySnapshot.forEach((doc) => {
            guests.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return guests;
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}


// Hàm thêm confirm
async function addConfirm(data) {
    try {
        if (!guestId) {
            const createdTime = serverTimestamp();
            const docRef = await addDoc(collection(db, 'guests'), {
                name: data.guestName,
                createdTime: createdTime
            });
            guestId = docRef.id;
            currentGuest = {
                id: guestId,
                name: data.name,
                createdTime: createdTime,
            }
            guests.push(currentGuest);
            url.searchParams.append('code', guestId);
            history.pushState(null, '', url.href)
        }
        const time = serverTimestamp();
        const docRef = await addDoc(collection(db, 'rsvp'), {
            ...data,
            guestId: guestId,
            _name: currentGuest.name,
            createdTime: time
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}

async function getConfirm() {
    try {
        const rsvpQuery = query(
            collection(db, "rsvp"),
            where("guestId", "==", guestId),
            orderBy("createdTime", "desc"),
            limit(1),
        );
        const querySnapshot = await getDocs(rsvpQuery);
        querySnapshot.forEach((doc) => {
            rsvpData = {
                id: doc.id,
                ...doc.data()
            };
        });
        return rsvpData;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}


// Hàm thêm lời chúc
async function addWish(wish) {
    try {
        const time = serverTimestamp();
        const docRef = await addDoc(collection(db, "wishes"), {
            ...wish,
            createdTime: time
        });
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
        callback(wishes)
    });
}


// Tự động gọi hàm khi trang load
$(document).ready(function () {
    getAllGuests().then(result => {
        guests = result;
        currentGuest = result.find(e => e.id === guestId);
        if (currentGuest) {
            document.getElementById('guest-name').value = currentGuest.name;
            document.querySelector('#name-comment').value = currentGuest.name;
            // document.querySelector('#title-wedding-card').innerHTML = `Kính gửi ${currentGuest.name}!`;
            document.querySelector('#title-confirm-id').innerHTML = `Trân trọng kính mời ${currentGuest.name} đến tham dự buổi tiệc chung vui cùng gia đình chúng tôi!`;
        }
    });
    getConfirm().then(result => {
        if (result) {
            if (result.confirmStatus) {
                document.getElementById('send-confirm-btn').disabled = false;
            }
            document.getElementById('attendance_status_id').value = result.confirmStatus;
            if (result.numOfPerson) {
                document.getElementById('plus_ones_id').value = result.numOfPerson;
                document.getElementById('plus_ones_id').style.display = '';
            }
        }

    });

    setWishesListener(wishes => {
        const comments = document.getElementById('show-comments');
        comments.innerHTML = '';
        wishes.forEach((wish, index) => {
            const item = document.createElement('div');
            item.className = 'box-comment pb-3';
            item.innerHTML = '<div class="box-comment pb-3">\n' +
                `                        <h4 id="user-name-comment" class="mt-1">${wish.name}</h4>\n` +
                '                        <p id="comment-detail" class="m-0">\n' +
                `                            <pre style="white-space: pre-wrap; word-wrap: break-word; overflow: hidden;">${wish.content}</pre>\n` +
                '                        </p>\n' +
                '                    </div>';
            comments.appendChild(item);
        })
    });

    /*------------------------------------------
     = DONATE MODAL
     -------------------------------------------*/
    $(document).on('click', '.buttonDonate', function () {
        $("#donate-modal").show();
        if ($('body').hasClass('offcanvas')) {
            $('body').removeClass('offcanvas');
            $('.js-oliven-nav-toggle').removeClass('active');
        }
    });
    $(document).on('click', '.donate-modal-close', function () {
        $("#donate-modal").hide();
        $("#rsvp-modal").hide();
    });
    $(document).on('click', 'body', function (e) {
        if (e.target.id === $("#donate-modal").attr('id')) {
            $("#donate-modal").hide();
        }
        if (e.target.id === $("#rsvp-modal").attr('id')) {
            $("#rsvp-modal").hide();
        }
    });

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
        = RSVP FORM SUBMISSION
    -------------------------------------------*/

    $(document).on('submit', '#rsvp-form', async function (event) {
        try {
            event.preventDefault();
            const data = {
                guestName: document.getElementById('guest-name').value.trim() || currentGuest.name,
                confirmStatus: document.getElementById('attendance_status_id').value,
                numOfPerson: document.getElementById('plus_ones_id').value,
            };
            await addConfirm(data);
            $('#rsvp-modal').hide();
        } catch (e) {
        }
    });

    /*------------------------------------------
        = WISH FORM SUBMISSION
    -------------------------------------------*/
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
                await addWish(wish)
                form.reset();
            } catch (e) {
            }
        }
    });

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
