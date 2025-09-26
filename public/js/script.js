function showTab(tabId) {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    // event listeners for each color guide box
    document.getElementById("trashBox").addEventListener("click", function () {
        console.log("Trash box clicked");
        sortByTag("Trash");
    });

    document.getElementById("commonBox").addEventListener("click", function () {
        console.log("Common box clicked");
        sortByTag("Common");
    });

    document.getElementById("uncommonBox").addEventListener("click", function () {
        console.log("Uncommon box clicked");
        sortByTag("Uncommon");
    });

    document.getElementById("rareBox").addEventListener("click", function () {
        console.log("Rare box clicked");
        sortByTag("Rare");
    });

    document.getElementById("mythicBox").addEventListener("click", function () {
        console.log("Mythic box clicked");
        sortByTag("Mythic");
    });
    document.getElementById("unknownBox").addEventListener("click", function () {
        console.log("Unknown box clicked");
        sortByTag("Unknown");
    });

    // event listeners for each tag guide box
    document.getElementById("classPogBox").addEventListener("click", function () {
        //console.log("Class Pog box clicked");
        sortByTag("Class Pog");
    });

    document.getElementById("pokepogBox").addEventListener("click", function () {
        //console.log("PokePogs box clicked");
        sortByTag("PokePogs");
    });

    document.getElementById("teacherCreatedBox").addEventListener("click", function () {
        //console.log("Teacher Created box clicked");
        sortByTag("Teacher Created");
    });

    document.getElementById("studentCreatedBox").addEventListener("click", function () {
        //console.log("Student Created box clicked");
        sortByTag("Student Created");
    });
});

function sortByTag(tag) {
    fetch('/searchPogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tags: tag   // Search by the specific tag
        })
    })
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("allPogsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // Clear the table before adding new rows
            data.forEach(function (pog) {
                var row = table.insertRow();
                row.style.Rank = pog.Rank;
                row.insertCell(0).innerText = pog.uid;
                row.insertCell(1).innerText = pog.serial;
                row.insertCell(2).innerText = pog.name;
                row.insertCell(3).innerText = pog.color;
                row.insertCell(4).innerText = pog.tags;
                row.addEventListener('click', function () {
                    showPogDetails(pog.uid);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching pogs:', error);
        });
}

function sortByRank(rank) {
    fetch('/searchPogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ranks: rank   // Search by the specific tag
        })
    })
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("allPogsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // Clear the table before adding new rows
            data.forEach(function (pog) {
                var row = table.insertRow();
                row.style.rank = pog.rank;
                row.insertCell(0).innerText = pog.uid;
                row.insertCell(1).innerText = pog.serial;
                row.insertCell(2).innerText = pog.name;
                row.insertCell(3).innerText = pog.color;
                row.insertCell(4).innerText = pog.tags;
                row.addEventListener('click', function () {
                    showPogDetails(pog.uid);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching pogs:', error);
        });
}

function searchPogs() {
    var idInput = document.getElementById("searchIdInput").value;
    var nameInput = document.getElementById("searchNameInput").value;
    var serialInput = document.getElementById("searchSerialInput").value;
    var tagsInput = document.getElementById("searchTagsInput").value;

    fetch('/searchPogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idInput,
            name: nameInput,
            serial: serialInput,
            tags: tagsInput
        })
    })
        .then(data => {
            var table = document.getElementById("allPogsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = '';
            data.forEach(function (pog) {
                var row = table.insertRow();
                row.style.rank = pog.rank;
                row.insertCell(0).innerText = pog.uid;
                row.insertCell(1).innerText = pog.serial;
                row.insertCell(2).innerText = pog.name;
                row.insertCell(3).innerText = pog.color;
                row.insertCell(4).innerText = pog.tags;
                row.addEventListener('click', function () {
                    showPogDetails(pog.uid);
                });
            });
        })

}

function sortTable(n, isNumeric = false, dir = "asc") {
    var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
    table = document.getElementById("allPogsTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (isNumeric) {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (isNumeric) {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function handleSort() {
    var sortOption = document.getElementById("sortOptions").value;
    switch (sortOption) {
        case "idAsc":
            sortTable(0, true, "asc");
            break;
        case "idDesc":
            sortTable(0, true, "desc");
            break;
        case "nameAsc":
            sortTable(2, false, "asc");
            break;
        case "nameDesc":
            sortTable(2, false, "desc");
            break;
        case "serial":
            sortTable(1);
            break;
        case "color":
            sortTable(3);
            break;
        case "tags":
            sortTable(4);
            break;
    }

} function showPogDetails(uid) {
    fetch(`/api/pogs/${uid}`)
        .then(response => response.json())
        .then(data => {
            var modal = document.getElementById("pogDetailsModal");
            var modalContent = document.getElementById("pogDetailsContent");
            var imageUrlWebp = `/pogs/${data.url}.webp`; // WebP image URL
            var imageUrlPng = `/pogs/${data.url}.png`;   // PNG image URL

            modalContent.innerHTML = `
                <div class="modal-text">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h2>Pog Details</h2>
                    <p><strong>ID:</strong> ${data.uid}</p>
                    <p><strong>Serial:</strong> ${data.serial}</p>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Color:</strong> ${data.color}</p>
                    <p><strong>Tags:</strong> ${data.tags}</p>
                    <p><strong>Lore:</strong> ${data.lore}</p>
                    <p><strong>Rank:</strong> ${data.rank}</p>
                    <p><strong>Creator:</strong> ${data.creator}</p>
                </div>
                <div class="modal-image">
                    <img id="pogImage" class="resized-image" src="${imageUrlWebp}" alt="${data.name}" />
                </div>
            `;

            // Add error handling for the image
            var pogImage = document.getElementById("pogImage");
            pogImage.onerror = function () {
                console.log('Failed to load:', pogImage.src);
                if (pogImage.src === imageUrlWebp) {
                    console.warn('WebP failed, trying PNG:', imageUrlPng);
                    pogImage.src = imageUrlPng;
                } else {
                    console.error('Both WebP and PNG failed, using fallback.');
                    pogImage.src = '/path/to/fallback-image.webp';
                }
            };

            modal.style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching pog details:', error);
        });
}
function showTab(tabId) {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
function searchPogs() {
    var idInput = document.getElementById("searchIdInput").value;
    var nameInput = document.getElementById("searchNameInput").value;
    var serialInput = document.getElementById("searchSerialInput").value;
    var tagsInput = document.getElementById("searchTagsInput").value;

    fetch('/searchPogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idInput,
            name: nameInput,
            serial: serialInput,
            tags: tagsInput
        })
    })
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("allPogsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // Clear the table before adding new rows
            data.forEach(function (pog) {
                var row = table.insertRow();
                row.style.rank = pog.rank; // Set the background color based on rank
                row.insertCell(0).innerText = pog.uid;
                row.insertCell(1).innerText = pog.serial;
                row.insertCell(2).innerText = pog.name;
                row.insertCell(3).innerText = pog.color;
                row.insertCell(4).innerText = pog.tags;
                row.addEventListener('click', function () {
                    showPogDetails(pog.uid);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching pogs:', error);
        });
}

function sortTable(n, isNumeric = false, dir = "asc") {
    var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
    table = document.getElementById("allPogsTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (isNumeric) {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (isNumeric) {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function handleSort() {
    var sortOption = document.getElementById("sortOptions").value;
    switch (sortOption) {
        case "idAsc":
            sortTable(0, true, "asc");
            break;
        case "idDesc":
            sortTable(0, true, "desc");
            break;
        case "nameAsc":
            sortTable(2, false, "asc");
            break;
        case "nameDesc":
            sortTable(2, false, "desc");
            break;
        case "serial":
            sortTable(1);
            break;
        case "color":
            sortTable(3);
            break;
        case "tags":
            sortTable(4);
            break;
    }
}
function showPogDetails(uid) {
    fetch(`/api/pogs/${uid}`)
        .then(response => response.json())
        .then(data => {
            var modal = document.getElementById("pogDetailsModal");
            var modalContent = document.getElementById("pogDetailsContent");
            var imageUrl3 = `/pogs/${data.url}.JPG`; // Construct the image URL using the url from the database
            var imageUrl2 = `/pogs/${data.url}.png`; // Construct the second image URL using the url from the database
            var imageUrl = `/pogs/${data.url}.webp`; // Construct the third image URL using the url from the database

            modalContent.innerHTML = `
                <div class="modal-text">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h2>Pog Details</h2>
                    <p><strong>ID:</strong> ${data.uid}</p>
                    <p><strong>Serial:</strong> ${data.serial}</p>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Color:</strong> ${data.color}</p>
                    <p><strong>Tags:</strong> ${data.tags}</p>
                    <p><strong>Lore:</strong> ${data.lore}</p>
                    <p><strong>Rank:</strong> ${data.rank}</p>
                    <p><strong>Creator:</strong> ${data.creator}</p>
                </div>
                <div class="modal-image">
                    <img id="pogImage" class="resized-image" src="${imageUrl}" alt="${data.name}" />
                </div>
            `;

            // Add error handling for the image
            var pogImage = document.getElementById("pogImage");
            pogImage.onerror = function () {
                console.error('Image failed to load:', pogImage.src);
            };

            modal.style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching pog details:', error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    var themeSwitch = document.getElementById('themeSwitch');

    // Check local storage for theme preference
    var isDarkMode = localStorage.getItem('darkMode') === 'true';
    themeSwitch.checked = isDarkMode;
    applyTheme(isDarkMode);

    themeSwitch.addEventListener('change', function () {
        var isDarkMode = themeSwitch.checked;

        // Apply the theme immediately without confirmation
        applyTheme(isDarkMode);

        // Store the theme preference in local storage
        localStorage.setItem('darkMode', isDarkMode);

        // Send the theme preference to the server
        fetch('/setTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ darkMode: isDarkMode })
        }).then(() => {
            // Clear the search inputs
            clearSearchInputs();

            // Reload the page to apply the theme change
            location.reload();
        });
    });
});

function clearSearchInputs() {
    document.getElementById("searchIdInput").value = '';
    document.getElementById("searchNameInput").value = '';
    document.getElementById("searchSerialInput").value = '';
    document.getElementById("searchTagsInput").value = '';
}

function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.modal-content').classList.add('dark-mode');
        document.querySelector('.color-guide').classList.add('dark-mode');
        document.querySelector('.raritydesc').classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('.modal-content').classList.remove('dark-mode');
        document.querySelector('.color-guide').classList.remove('dark-mode');
        document.querySelector('.raritydesc').classList.remove('dark-mode');
    }
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("pogDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }
}

window.onload = function () {
    // Ensure the modal is hidden when the page loads
    var modal = document.getElementById("pogDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }

    // Add the "loaded" class to the body to prevent FOUC
    document.body.classList.add('loaded');

    // Temporarily comment out adjustTable for debugging
    // adjustTable();

    // Add an event listener to adjust the table on window resize
    window.addEventListener('resize', adjustTable);
};

// Add the "loaded" class to the body to prevent FOUC
document.body.classList.add('loaded');

// Adjust the table layout based on screen size
adjustTable();

// Add an event listener to adjust the table on window resize
window.addEventListener('resize', adjustTable);
;

// Function to adjust the table layout
function adjustTable() {
    const screenWidth = window.innerWidth;
    const table = document.getElementById('allPogsTable');
    if (!table) return;

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');


    // Fetch pogs data from the server
    fetch('/api/pogs')
        .then(response => response.json())
        .then(pogs => {
            thead.innerHTML = '';

            if (screenWidth > 980) {
                thead.innerHTML = `
                            <tr>
                                <th>ID</th>
                                <th>Serial</th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Tags</th>
                            </tr>
                        `;
                tbody.innerHTML = pogs.map(pog => `
                            <tr class="list-color-change" style="background-color: ${getRank(pog.rank)};" onclick="showPogDetails(${pog.uid})">
                                <td data-label="ID">${pog.uid}</td>
                                <td data-label="Serial">${pog.serial}</td>
                                <td data-label="Name">${pog.name}</td>
                                <td data-label="Color">${pog.color}</td>
                                <td data-label="Tags">${pog.tags}</td>
                            </tr>
                        `).join('');
            } else {
                thead.innerHTML = `
                            <tr>
                                <th>ID</th>
                                <th>Serial</th>
                                <th>Name</th>
                               
                            </tr>
                        `;
                tbody.innerHTML = pogs.map(pog => `
                            <tr class="list-color-change" style="background-color: ${getRank(pog.rank)};" onclick="showPogDetails(${pog.uid})">
                                <td data-label="ID">${pog.uid}</td>
                                <td data-label="Serial">${pog.serial}</td>
                                <td data-label="Name">${pog.name}</td>
                              
                            </tr>
                        `).join('');
            }
        })
        .catch(error => console.error('Error fetching pogs:', error));
}
// Function to apply the theme
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.querySelector('.modal-content').classList.add('dark-mode');
        document.querySelector('.modal-content').classList.remove('light-mode');
        document.querySelectorAll('.guide').forEach(guide => {
            guide.classList.add('dark-mode');
            guide.classList.remove('light-mode');
        });
        document.querySelector('.raritydesc').classList.add('dark-mode');
        document.querySelector('.raritydesc').classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.querySelector('.modal-content').classList.add('light-mode');
        document.querySelector('.modal-content').classList.remove('dark-mode');
        document.querySelectorAll('.guide').forEach(guide => {
            guide.classList.add('light-mode');
            guide.classList.remove('dark-mode');
        });
        document.querySelector('.raritydesc').classList.add('light-mode');
        document.querySelector('.raritydesc').classList.remove('dark-mode');
    }
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("pogDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Event listener for clicking outside the modal
window.onclick = function (event) {
    var modal = document.getElementById("pogDetailsModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function getRank(rank) {
    const lightRanks = {
        'Common':'#ffffff',
        'Uncommon':'#ebf8dc',
        'Rare':'#dcf2f8',
        'Epic':'#e7d5f3',
        'Legendary':'#fdcc99',
        'Mythic':'#ff9898',
        'Default': '#ffffff'
    };

    const darkRanks = {
        'Common':'#333333',
        'Uncommon':'#3d442f',
        'Rare':'#2d3f4d',
        'Epic':'#34314b',
        'Legendary':'#4b3317',
        'Mythic':'#412020',
        'Default': '#333333'
    };

    const isDarkMode = document.body.classList.contains('dark-mode');
    const ranks = isDarkMode ? darkRanks : lightRanks;

    // Fallback if rank is undefined or invalid
    return ranks[rank] || ranks['Default'];
}

// Rarity Description functions
const raritydesc = document.getElementById("raritydesc");
function descrarityenter(whichcolor) {
    raritydesc.style.display = "block";
    if (whichcolor == "epic") {
        raritydesc.innerHTML = "<strong>Epic</strong><br>Pogs that are considered low quality or undesirable. These pogs are often mass-produced and lack unique features or designs. They may be damaged, poorly made, or simply not appealing to collectors.";
    } else if (whichcolor == "common") {
        raritydesc.innerHTML = "<strong>Common</strong><br>Pogs that are widely available and easy to find. These pogs are typically mass-produced and may feature popular designs or themes. While they may not be particularly rare or valuable, they can still be fun to collect and trade.";
    } else if (whichcolor == "uncommon") {
        raritydesc.innerHTML = "<strong>Uncommon</strong><br>Pogs that are less common than regular pogs, but still relatively easy to find. These pogs may feature unique designs or themes, or may be part of a limited edition set. While they may not be particularly rare or valuable, they can still be a fun addition to a collection.";
    } else if (whichcolor == "rare") {
        raritydesc.innerHTML = "<strong>Rare</strong><br>Pogs that are hard to find and highly sought after by collectors. These pogs may feature unique designs or themes, or may be part of a limited edition set. They may also be older pogs that are no longer in production. Rare pogs can be quite valuable, and collectors may go to great lengths to acquire them.";
    } else if (whichcolor == "legendary") {
        raritydesc.innerHTML = "<strong>Legendary</strong><br>Pogs that are extremely rare and highly coveted by collectors. These pogs may feature unique designs or themes, or may be part of a very limited edition set. They may also be older pogs that are no longer in production, or pogs that were only available through special promotions or events. Legendary pogs can be incredibly valuable, and collectors may pay top dollar to acquire them.";
    } else if (whichcolor == "mythic") {
        raritydesc.innerHTML = "<strong>Mythic</strong><br>Pogs that are extremely rare and highly coveted by collectors. These pogs may feature unique designs or themes, or may be part of a very limited edition set. They may also be older pogs that are no longer in production, or pogs that were only available through special promotions or events. Mythic pogs can be incredibly valuable, and collectors may pay top dollar to acquire them.";
    } else if (whichcolor == "unknown") {
        raritydesc.innerHTML = "<strong>Unknown</strong><br>Pogs that have not been assigned a rarity level. These pogs may be new releases or pogs that have not yet been evaluated by collectors. While they may not have a defined rarity level, they can still be a fun addition to a collection.";
    }
}
function descrarityleave() {
    raritydesc.style.display = "none";
}
document.addEventListener('mousemove', (event) => {
    if (raritydesc.style.display === "block") {
        raritydesc.style.left = `${event.pageX + 10}px`;
        raritydesc.style.top = `${event.pageY + 25}px`;
        raritydesc.style.right = `${window.innerWidth - (event.pageX + 10 + 500)}px`;
    }  
});