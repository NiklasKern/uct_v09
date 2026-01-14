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
    document.querySelectorAll('.trip-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// Refresh button functionality
document.querySelector('.refresh-btn').addEventListener('click', function() {
  // Add refresh logic here if needed
  console.log('Refresh clicked');
});

// Bottom navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});

// Groups functionality (overlay in trip_planner.html)
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('groupsScreen')) {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    const groupsScreen = document.getElementById('groupsScreen');
    const groupsFooter = document.getElementById('groupsFooter');
    const groupSearch = document.getElementById('groupSearch');
    const groupsList = document.getElementById('groupsList');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const mainContent = document.getElementById('mainContent');

    function populateGroupsList(filter = '') {
      groupsList.innerHTML = '';
      const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
      filteredGroups.forEach((g) => {
        const div = document.createElement('div');
        div.className = 'group-item';
        div.innerHTML = `
          <span>${g.name}</span>
          <button class="delete-btn" data-id="${g.id}">Delete</button>
        `;
        div.dataset.id = g.id;
        groupsList.appendChild(div);
      });
    }

    function showGroupsScreen() {
      mainContent.style.display = 'none';
      groupsScreen.style.display = 'flex';
      populateGroupsList();
      groupSearch.focus();
    }

    function hideGroupsScreen() {
      groupsScreen.style.display = 'none';
      mainContent.style.display = 'block';
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
        <div class="groups-footer" style="padding: 16px; border-top: 1px solid #eee;">
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
      // Attach delete listener here
      groupsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
          const id = e.target.getAttribute('data-id');
          const index = groups.findIndex(g => g.id === id);
          if (index !== -1) {
            groups.splice(index, 1);
            localStorage.setItem('groups', JSON.stringify(groups));
            populateGroupsList(groupSearch.value);
            populateDropdown();
          }
        }
      });
    }

    showGroupsList(); // Initial show

    // Navigation handler for overlay
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.id === 'groupsNav') {
          showGroupsScreen();
        } else {
          hideGroupsScreen();
        }
        // Handle active state
        document.querySelectorAll('.nav-item img').forEach(img => img.src = img.src.replace('_sel.png', '_dim.png'));
        document.querySelectorAll('.nav-item').forEach(nav => nav.style.color = "#989898");
        this.querySelector('img').src = this.querySelector('img').src.replace('_dim.png', '_sel.png');
        this.style.color = "#fff";
      });
    });
  }

  // Groups dropdown in trip details
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
          const id = 'g' + Date.now();
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

// Add event listeners to bottom navigation buttons
document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.querySelector('span:last-child').textContent.trim();
        if (buttonText === 'Trip planner') {
            // Navigate to the first screen of trip planner (e.g., reset to input view)
            // Assuming the first screen is hiding results and showing initial inputs
            document.getElementById('mainContent').style.display = 'none'; // Hide results
            window.location.href = 'trip_planner.html';
        } else if (buttonText === 'Groups') {
            // Show groups screen
            document.getElementById('groupsScreen').style.display = 'block';
            document.getElementById('mainContent').style.display = 'none';
        }
        // Add similar for other buttons if needed
    });
});