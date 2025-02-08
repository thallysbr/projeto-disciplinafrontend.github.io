document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userList = document.getElementById("userList");
    const search = document.getElementById("search");
    const clearAll = document.getElementById("clearAll");
    const clearFields = document.getElementById("clearFields");
    
    function loadUsers() {
        userList.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => addUserToList(user));
    }
    
    function addUserToList(user) {
        const li = document.createElement("li");
        li.textContent = `${user.date} - ${user.name} (${user.email})`;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.onclick = function () {
            removeUser(user);
        };
        
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    }
    
    function removeUser(userToRemove) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.email !== userToRemove.email);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }
    
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newUser = {
            name: userName.value,
            email: userEmail.value,
            date: new Date().toLocaleString()
        };
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        addUserToList(newUser);
        userName.value = "";
        userEmail.value = "";
    });
    
    search.addEventListener("input", function () {
        const searchTerm = search.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";
        users.filter(user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
             .forEach(user => addUserToList(user));
    });
    
    clearAll.addEventListener("click", function () {
        localStorage.removeItem("users");
        loadUsers();
    });
    
    clearFields.addEventListener("click", function () {
        userName.value = "";
        userEmail.value = "";
    });
    
    loadUsers();
});