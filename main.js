import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
  authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
  projectId: "insan-cemerlang-92ee0",
  storageBucket: "insan-cemerlang-92ee0.appspot.com",
  messagingSenderId: "332441427242",
  appId: "1:332441427242:web:73c31309147ef1dab15253",
  measurementId: "G-JW04DZL85R"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarmember() {
  const refDokumen = collection(db, "member");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      nohp: dok.data().nohp,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahmember(nama, alamat, nohp) {
  try {
    const dokRef = await addDoc(collection(db, 'member'), {

      nama: nama,
      alamat: alamat,
      nohp: nohp,
    });
    console.log('Berhasil menambah datamember ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah datamember ' + e);
  }
}


export async function hapusmember(docid) {
  await deleteDoc(doc(db, "member", docid));
}
export async function ubahProduk(docId, nama, alamat, nohp) {
  await updateDoc(doc(db, "member", docId), {
    nama: nama,
    alamat:alamat,
    nohp: nohp,
  });
}

export async function ambilmember(docId) {
  const docRef = await doc(db, "member", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
