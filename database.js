let users = [
    {
        id: "0",
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
];

let nextID = 1;

function getUsers() {
    console.log(users);
    return users;
}

function getUserById(id) {
    return users.find(u => u.id === id)
}

function createUser(data) {
    const payload = {
        id: String(nextID++),
        ...data,
    }

    users.push(payload);
    return payload;
}

function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id);
    users[index] = {
        ...users[index],
        ...data,
    };

    return users[index];
}

function deleteUser(id) {
    deletedUser = users.filter(u => u.id === id)[0];
    users = users.filter(u => u.id !== id);
    return deletedUser;
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}