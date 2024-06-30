const apiUrl = 'http://localhost:3000/contacts';

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

function editContact(id) {
  const name = prompt('Enter new name');
  const email = prompt('Enter new email');
  const phone = prompt('Enter new phone');

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
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

function deleteContact(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      fetchContacts();
    });
}
