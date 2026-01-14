/* Copyright and Disclaimer. 
    Prototype for educational purposes only. Mostly done with the help of AI. Some of the comments may be misleading. Code not optimized or cleaned. (c)2025 K.Weidmann */


// Transport tab functionality
document.querySelectorAll('.transport-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.transport-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});
// Trip option click handlers
document.querySelectorAll('.trip-option').forEach(option => {
    option.addEventListener('click', function() {
        this.style.backgroundColor = '#f0f0f0';
        setTimeout(() => {
            this.style.backgroundColor = 'white';
        }, 200);
    });
});
// Refresh button functionality
document.querySelector('.refresh-btn').addEventListener('click', function() {
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 500);
});
// Bottom navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item img').forEach(img => img.src = img.src.slice(0,-8) + "_dim.png");
        document.querySelectorAll('.nav-item').forEach(nav => nav.style.color = "#989898");
        this.querySelector('img').src = this.querySelector('img').src.slice(0,-8) + "_sel.png";
        this.style.color = "#fff";
    });
});
// Bottom navigation functionality
/* document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});
*/ 
// Back button functionality
document.querySelector('.back-arrow').addEventListener('click', function() {
    // In a real app, this would navigate back
    console.log('Navigate back to trip planner');
});
// Options button functionality
document.querySelector('.options-btn').addEventListener('click', function() {
    // In a real app, this would open options menu
    console.log('Open options menu');
});
// Warning message click handlers
document.querySelectorAll('.warning').forEach(warning => {
    warning.addEventListener('click', function() {
        // In a real app, this would show the message details
        console.log('Show warning message details');
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});
// Route input swap functionality
document.querySelector('.swap-icon').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.route-input');
    const temp = inputs[0].value;
    inputs[0].value = inputs[1].value;
    inputs[1].value = temp;
    // Add visual feedback
    this.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 300);
});
/***** Departure Overlay Logic **** */
// Overlay open/close
/***** document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("departureOverlay");
  const departureInfo = document.querySelector(".departure-info");
  const cancelBtn = document.getElementById("cancelOverlay");
  const doneBtn = document.getElementById("doneOverlay");
  if (departureInfo && overlay) {
    departureInfo.addEventListener("click", () => {
      overlay.classList.add("active");
    });
  }
  [cancelBtn, doneBtn].forEach(btn =>
    btn.addEventListener("click", () => overlay.classList.remove("active"))
  );
  // toggle buttons
  const depBtn = document.getElementById("btnDeparture");
  const arrBtn = document.getElementById("btnArrive");
  depBtn.addEventListener("click", () => {
    depBtn.classList.add("active");
    arrBtn.classList.remove("active");
  });
  arrBtn.addEventListener("click", () => {
    arrBtn.classList.add("active");
    depBtn.classList.remove("active");
  });
}); ***/
/////////Added New
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("departureOverlay");
  const routeOptions = document.querySelector(".route-options");
  const cancelBtn = document.getElementById("cancelOverlay");
  const doneBtn = document.getElementById("doneOverlay");
  const dateCol = document.getElementById("dateColumn");
  const hourCol = document.getElementById("hourColumn");
  const minCol = document.getElementById("minuteColumn");
  // === Dim background click closes picker ===
  const dim = document.getElementById("overlayDim");
  dim.addEventListener("click", () => overlay.classList.remove("active"));
  // === Position overlay right below route-options ===
  function positionOverlay() {
    const rect = routeOptions.getBoundingClientRect();
    const wrapperRect = document.querySelector(".app-wrapper").getBoundingClientRect();
    overlay.style.top = `${rect.bottom - wrapperRect.top-70}px`;
    // === Toggle: Departure vs Arrive by ===
  const depBtn = document.getElementById("btnDeparture");
  const arrBtn = document.getElementById("btnArrive");
  let mode = "departure"; // current mode state
  function toggleMode(selected) {
    if (selected === "departure") {
      depBtn.classList.add("active");
      arrBtn.classList.remove("active");
    } else {
      arrBtn.classList.add("active");
      depBtn.classList.remove("active");
    }
    mode = selected;
    // (Optional) update visible label in route-options if it exists
    const label = document.querySelector(".route-options .option-label");
    if (label) {
      label.textContent =
        mode === "departure" ? "Depart at" : "Arrive by";
    }
   } 
    depBtn.addEventListener("click", () => toggleMode("departure"));
	arrBtn.addEventListener("click", () => toggleMode("arrive"));
  }
  // === Build wheel lists ===
  function populatePicker() {
    const today = new Date();
    const days = [];
    for (let i = -2; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const label =
        i === 0
          ? "Today"
          : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
      days.push(label);
    }
    dateCol.innerHTML = days.map(d => `<div>${d}</div>`).join("");
    hourCol.innerHTML = Array.from({ length: 24 }, (_, i) =>
      `<div>${String(i).padStart(2, "0")}</div>`
    ).join("");
    minCol.innerHTML = Array.from({ length: 60 / 5 }, (_, i) =>
      `<div>${String(i * 5).padStart(2, "0")}</div>`
    ).join("");
  }
  // === Scroll snapping ===
  function snapColumn(col) {
  const itemH = 36;
  const visibleMid = col.scrollTop + col.clientHeight / 2;
  const idx = Math.round(visibleMid / itemH - 0.5); // center-based index
  col.scrollTo({ top: idx * itemH - (col.clientHeight / 2 - itemH / 2), behavior: "smooth" });
  [...col.children].forEach((el, i) =>
    el.classList.toggle("selected", i === idx)
  );
}
  [dateCol, hourCol, minCol].forEach(col => {
    col.addEventListener("scroll", () => {
      clearTimeout(col.snapTimeout);
      col.snapTimeout = setTimeout(() => snapColumn(col), 100);
    });
  });
  // === Open overlay ===
  routeOptions.addEventListener("click", () => {
    positionOverlay();
    populatePicker();
    overlay.classList.add("active");
  });
  // === Close overlay ===
  const closeOverlay = () => overlay.classList.remove("active");
  cancelBtn.addEventListener("click", closeOverlay);
  doneBtn.addEventListener("click", closeOverlay);
  // === Quick time buttons ===
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const label = e.target.textContent;
      const now = new Date();
      if (label.includes("15")) now.setMinutes(now.getMinutes() + 15);
      else if (label.includes("1 h")) now.setHours(now.getHours() + 1);
      const h = now.getHours();
      const m = Math.round(now.getMinutes() / 5) * 5;
      hourCol.scrollTo({ top: h * 36, behavior: "smooth" });
      minCol.scrollTo({ top: (m / 5) * 36, behavior: "smooth" });
    });
  });
    // ===== Location selection overlay =====
  const locOverlay = document.getElementById("locationOverlay");
  const locDim = document.getElementById("locOverlayDim");
  const cancelLoc = document.getElementById("cancelLocationOverlay");
  const locInput = document.getElementById("locationSearch");
  const startField = document.getElementById("startField");
  const destinationField = document.getElementById("destinationField");
  const locItems = locOverlay.querySelectorAll(".location-item");
  const stars = locOverlay.querySelectorAll(".location-item .star");
  let activeTarget = null;
  function openLocationOverlay(target) {
    activeTarget = target;
    const appWrapper = document.querySelector(".app-wrapper");
    const header = document.querySelector(".header");
    const headerRect = header.getBoundingClientRect();
    const appRect = appWrapper.getBoundingClientRect();
    const relativeTop =
      headerRect.bottom - appRect.top - (parseFloat(getComputedStyle(header).height) * 0.75);
    locOverlay.style.top = `${relativeTop}px`;
    locOverlay.classList.add("active");
    locInput.value = target.value || "";
    locInput.focus();
  }
  function closeLocationOverlay() {
    locOverlay.classList.remove("active");
    activeTarget = null;
  }
  startField.addEventListener("click", () => openLocationOverlay(startField));
  destinationField.addEventListener("click", () => openLocationOverlay(destinationField));
  cancelLoc.addEventListener("click", closeLocationOverlay);
  locDim.addEventListener("click", closeLocationOverlay);
  locItems.forEach(item => {
    item.addEventListener("click", () => {
      if (activeTarget) {
        activeTarget.value = item.dataset.name;
      }
      closeLocationOverlay();
    });
  });
  stars.forEach(star => {
    star.addEventListener("click", e => {
      e.stopPropagation();
      star.classList.toggle("active");
    });
  });
});

// Add groups functionality at the end of script.js
document.addEventListener('DOMContentLoaded', function () {
  let groups = JSON.parse(localStorage.getItem('groups')) || [];
  const btn = document.getElementById('groupBtn');
  const dropdown = document.getElementById('groupDropdown');
  const label = document.getElementById('groupLabel');
  const addGroupLi = document.getElementById('addGroupLi');

  function populateDropdown() {
    // Clear existing group items (keep title, clear, and add group)
    const items = dropdown.querySelectorAll('li:not(.group-title):not(.group-clear):not(#addGroupLi)');
    items.forEach(item => item.remove());
    // Add group items
    groups.forEach(g => {
      const li = document.createElement('li');
      li.textContent = g.name;
      li.dataset.id = g.id;
      li.setAttribute('role', 'menuitem');
      dropdown.appendChild(li);
    });
  }

  populateDropdown(); // Initial population

  function setOpen(open) {
    dropdown.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // toggle dropdown when clicking button
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!dropdown.classList.contains('open'));
  });

  // when a group or clear is clicked
  dropdown.addEventListener('click', function (e) {
    const li = e.target.closest('li');
    if (!li) return;
    // ignore title
    if (li.classList.contains('group-title')) return;
    // clear action
    if (li.dataset.action === 'clear') {
      delete btn.dataset.selectedGroup;
      label.textContent = 'No Group';
      setOpen(false);
      return;
    }
    // add group action
    if (li.id === 'addGroupLi') {
      // Show input form
      const formHtml = `
        <li class="group-title">Add New Group</li>
        <li style="padding: 10px;">
         <input type="text" id="newGroupName" placeholder="Enter group name" style="width: 100%; padding: 5px; margin-bottom: 5px;">
         <button id="saveGroupBtn" style="width: 100%; padding: 5px;">Save</button>
         <button id="cancelAddBtn" style="width: 100%; padding: 5px; margin-top: 5px;">Cancel</button>
        </li>
      `;
      dropdown.innerHTML = formHtml;
      const newGroupInput = document.getElementById('newGroupName');
      const saveBtn = document.getElementById('saveGroupBtn');
      const cancelBtn = document.getElementById('cancelAddBtn');
      newGroupInput.focus();
      saveBtn.addEventListener('click', function() {
        const name = newGroupInput.value.trim();
        if (name) {
          const id = 'g' + Date.now(); // Simple unique ID
          groups.push({ id, name });
          localStorage.setItem('groups', JSON.stringify(groups));
          populateDropdown();
          setOpen(false);
        }
      });
      cancelBtn.addEventListener('click', function() {
        populateDropdown();
        setOpen(false);
      });
      return;
    }
    // normal group selection
    if (li.dataset.id) {
      const id = li.dataset.id;
      const name = li.textContent;
      btn.dataset.selectedGroup = id;
      label.textContent = name;
      setOpen(false);
    }
  });

  // close when clicking outside
  document.addEventListener('click', function(){
    setOpen(false);
  });

  // close on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') setOpen(false);
  });
});
// Modify nav click for navigation between pages
document.addEventListener('DOMContentLoaded', function () {
  // Navigation between pages
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.id === 'groupsNav') {
        window.location.href = 'groups_screen.html';
      } else if (this.id === 'tripPlannerNav') {
        window.location.href = 'trip_planner.html';
      }
      // For other nav items, do nothing or handle as needed
    });
  });

  // Groups screen functionality (only if on groups_screen.html)
  if (document.getElementById('groupsScreen')) {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    const groupsScreen = document.getElementById('groupsScreen');
    const groupSearch = document.getElementById('groupSearch');
    const groupsList = document.getElementById('groupsList');
    const addGroupBtn = document.getElementById('addGroupBtn');

    function populateGroupsList(filter = '') {
      groupsList.innerHTML = '';
      const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
      filteredGroups.forEach(g => {
        const div = document.createElement('div');
        div.className = 'group-item';
        div.textContent = g.name;
        div.dataset.id = g.id;
        groupsList.appendChild(div);
      });
    }

    function showAddForm() {
      const formHtml = `
        <div class="groups-header">Add New Group</div>
        <div style="padding: 16px;">
         <input type="text" id="newGroupName" placeholder="Enter group name" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px;">
         <button id="saveGroupBtn" style="width: 48%; padding: 10px; background: #FFED05; border: none; border-radius: 8px; margin-right: 4%;">Save</button>
         <button id="cancelAddBtn" style="width: 48%; padding: 10px; background: #ddd; border: none; border-radius: 8px;">Cancel</button>
        </div>
      `;
      groupsScreen.innerHTML = formHtml;
      const newGroupInput = document.getElementById('newGroupName');
      const saveBtn = document.getElementById('saveGroupBtn');
      const cancelBtn = document.getElementById('cancelAddBtn');
      newGroupInput.focus();
      saveBtn.addEventListener('click', function() {
        const name = newGroupInput.value.trim();
        if (name) {
          const id = 'g' + Date.now();
          groups.push({ id, name });
          localStorage.setItem('groups', JSON.stringify(groups));
          showGroupsList();
        }
      });
      cancelBtn.addEventListener('click', function() {
        showGroupsList();
      });
    }

    function showGroupsList() {
      const listHtml = `
        <div class="groups-header">
         <input type="text" id="groupSearch" placeholder="Search groups" style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 8px;">
        </div>
        <div class="groups-list" id="groupsList" style="padding: 16px; overflow-y: auto; max-height: calc(100vh - 200px);">
         <!-- groups will be populated here -->
        </div>
        <div class="groups-footer" id="groupsFooter" style="padding: 16px; border-top: 1px solid #eee;">
         <button id="addGroupBtn" style="width: 100%; padding: 12px; background: #FFED05; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Add Group</button>
        </div>
      `;
      groupsScreen.innerHTML = listHtml;
      // Reattach event listeners
      const groupSearch = document.getElementById('groupSearch');
      const groupsList = document.getElementById('groupsList');
      const addGroupBtn = document.getElementById('addGroupBtn');
      populateGroupsList();
      groupSearch.addEventListener('input', function() {
        populateGroupsList(this.value);
      });
      addGroupBtn.addEventListener('click', showAddForm);
    }

    showGroupsList(); // Initial show

    // ...existing code...
  }
});