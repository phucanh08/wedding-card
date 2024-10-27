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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Hàm thêm lời chúc
async function addWish(wish) {
    try {
        const time = serverTimestamp();
        const docRef = await addDoc(collection(db, "wishes"), {
            ...wish,
            createTime: time
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
        const querySnapshot = await getDocs(collection(db, "wishes"));
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
    const q = query(collection(db, "wishes"), orderBy("createTime", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const wishes = [];
        querySnapshot.forEach((doc) => {
            wishes.push({id: doc.id, ...doc.data()});
        });
        console.log('wishes', wishes);
        callback(wishes)
    });
}

export {
    addWish,
    getAllWishes
};
