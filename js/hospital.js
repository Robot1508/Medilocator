// This file manages the hospital data and displays it on the map. 
// It includes functions to initialize the map, display hospitals, and handle user interactions.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { showAlert } from './users.js'; // Assuming showAlert is defined in users.js

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const hospitals = [];

// Fetch hospitals from Firestore
async function fetchHospitals() {
  const querySnapshot = await getDocs(collection(db, "hospitals"));
  querySnapshot.forEach((doc) => {
    hospitals.push({ id: doc.id, ...doc.data() });
  });
  displayHospitals(hospitals);
}

// Initialize the map
let map;
function initMap() {
  const kolhapur = { lat: 16.7050, lng: 74.2433 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: kolhapur,
  });

  hospitals.forEach(h => {
    const marker = new google.maps.Marker({
      position: { lat: h.lat, lng: h.lng },
      map: map,
      title: h.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h6>${h.name}</h6><p>${h.city}${h.phone ? ' • ' + h.phone : ''}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

// Display hospitals on the page
function displayHospitals(list) {
  const container = document.getElementById("hospitalList");
  container.innerHTML = "";
  list.forEach(h => {
    const badgeClass = h.availability === 'Beds Available' ? 'bg-success' : h.availability === 'Limited' ? 'bg-warning text-dark' : 'bg-danger';
    container.innerHTML += `
      <div class="card hospital-card p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="fw-bold mb-1">${h.name}</h5>
            <small class="text-muted">${h.city} | ${h.type}</small><br>
            <span class="badge ${badgeClass} badge-status">${h.availability}</span><br>
            <small><i class="fas fa-phone-alt"></i> Hospital: ${h.phone || 'N/A'}</small>
          </div>
          <button class="btn btn-outline-primary btn-sm" onclick="showDetails('${h.name.replace(/'/g, "\\'")}')">Details</button>
        </div>
      </div>`;
  });
}

// Call fetchHospitals to load data
fetchHospitals();

// Google Maps API initialization
window.initMap = initMap;