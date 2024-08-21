const apiUrl = 'http://localhost:3000/contacts';
let currentEditId = null;
document.addEventListener('DOMContentLoaded', () => {
  fetchContacts();
});

function fetchContacts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const contactsDiv = document.getElementById('contacts');
      contactsDiv.innerHTML = '';
      data.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.innerHTML = `
          <div>
            <h3>${contact.name}</h3>
            <p>${contact.email}</p>
            <p>${contact.phone}</p>
          </div>
          <div>
            <button onclick="editContact('${contact._id}')">Edit</button>
            <button onclick="deleteContact('${contact._id}')">Delete</button>
          </div>
        `;
        contactsDiv.appendChild(contactElement);
      });
    });
}

function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Phone number validation (Example: 10-digit number)
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid phone number (10 digits).');
    return;
  }
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, phone })
  })
    .then(response => response.json())
    .then(() => {
      fetchContacts();
    });
}

// function editContact(id) {
//   const name = prompt('Enter new name');
//   const email = prompt('Enter new email');
//   const phone = prompt('Enter new phone');

//   fetch(`${apiUrl}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name, email, phone })
//   })
//     .then(response => response.json())
//     .then(() => {
//       fetchContacts();
//     });
// }

function editContact(id) {
  currentEditId = id;

  // Fetch the contact details to pre-fill the form
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(contact => {
      document.getElementById('editName').value = contact.name;
      document.getElementById('editEmail').value = contact.email;
      document.getElementById('editPhone').value = contact.phone;

      // Show the modal
      document.getElementById('editContactModal').style.display = 'block';
    });
}

function closeEditModal() {
  document.getElementById('editContactModal').style.display = 'none';
  currentEditId = null;
}

function updateContact() {
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const phone = document.getElementById('editPhone').value;

  fetch(`${apiUrl}/${currentEditId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, phone })
  })
    .then(response => response.json())
    .then(() => {
      closeEditModal();
      fetchContacts();
    });
}

// Ensure the modal closes when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('editContactModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};


function deleteContact(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      fetchContacts();
    });
}