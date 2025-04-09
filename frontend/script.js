function toggleMenu() {
    let menu = document.getElementById("menu");
    let menuIcon = document.querySelector(".menu-icon");

    menu.classList.toggle("active");
    menuIcon.classList.toggle("open"); // Add class to animate the menu icon
}

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    loadData();
});

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
});

// Function to handle Admin Login
function adminLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded admin credentials (replace with database validation in future)
    const adminUser = "admin";
    const adminPass = "password123";

    if (username === adminUser && password === adminPass) {
        alert("Login successful!");
        sessionStorage.setItem("isAdmin", "true"); // Store login session
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password!";
    }

    return false; // Prevent form submission
}

// ** Function to show only the selected section **
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// ** Function to update dashboard statistics dynamically **
function updateDashboard() {
    document.getElementById("donorCount").innerText = document.querySelectorAll("#donorTable tr").length - 1;
    document.getElementById("patientCount").innerText = document.querySelectorAll("#patientTable tr").length - 1;
    document.getElementById("requestCount").innerText = document.querySelectorAll("#requestTable tr").length - 1;
}

// ** Function to delete a row and update the count **
function deleteRow(button, countId) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row); // Remove the row
    updateDashboard(); // Update statistics
}

// ** Function to approve a blood request and update stock **
function approveRequest(button) {
    let row = button.parentNode.parentNode;
    let bloodGroup = row.cells[1].innerText; // Get blood group
    let unitsRequested = parseInt(row.cells[2].innerText);

    // Update blood stock
    let stockTable = document.querySelector("#bloodStock table");
    let rows = stockTable.rows;
    for (let i = 1; i < rows.length; i++) {
        let stockBloodGroup = rows[i].cells[0].innerText;
        let availableUnits = parseInt(rows[i].cells[1].innerText);

        if (stockBloodGroup === bloodGroup) {
            if (availableUnits >= unitsRequested) {
                rows[i].cells[1].innerText = availableUnits - unitsRequested; // Deduct stock
                row.cells[3].innerText = "✅ Approved"; // Change status
                row.cells[3].style.color = "green"; // Green text for status
                disableActionButtons(row); // Disable approve/reject buttons
            } else {
                alert("❌ Not enough stock available!");
            }
            break;
        }
    }
    updateDashboard();
}

// ** Function to reject a blood request **
function rejectRequest(button) {
    let row = button.parentNode.parentNode;
    row.cells[3].innerText = "❌ Rejected"; // Change status
    row.cells[3].style.color = "red"; // Red text for status
    disableActionButtons(row); // Disable approve/reject buttons
}

// ** Function to disable action buttons after approve/reject **
function disableActionButtons(row) {
    let buttons = row.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

function logout() {
    alert("Logging out...");
    sessionStorage.removeItem("isAdmin"); // Remove session
    window.location.href = "admin_login.html"; // Redirect to login page
}




    
/*
// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Move camera back
camera.position.z = 10;

// Create Geometry for Waves
const geometry = new THREE.PlaneGeometry(20, 10, 100, 100);

// Create Shader Material (Blood Flow Effect)
const bloodShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 3.0 + time * 2.0) * 0.5;
            float wave2 = cos(pos.y * 3.0 - time * 1.5) * 0.3;
            pos.z += wave + wave2; 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
            float redWave = sin(vUv.x * 5.0 + time) * 0.5 + 0.5;
            float darkRedWave = cos(vUv.y * 5.0 - time) * 0.5 + 0.5;
            
            vec3 color1 = vec3(0.8, 0, 0); // Bright Red
            vec3 color2 = vec3(0.2, 0, 0); // Dark Red
            vec3 finalColor = mix(color1, color2, darkRedWave);
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `,
});

// Create Plane Mesh
const bloodWave = new THREE.Mesh(geometry, bloodShaderMaterial);
bloodWave.rotation.x = -Math.PI / 4; // Tilt for better 3D look
scene.add(bloodWave);

// Animate the Blood Flow
function animate() {
    requestAnimationFrame(animate);
    bloodShaderMaterial.uniforms.time.value += 0.02; // Adjust speed
    renderer.render(scene, camera);
}
animate();

// Handle Resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
*/
