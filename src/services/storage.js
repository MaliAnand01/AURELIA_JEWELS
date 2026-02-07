const KEYS = {
    USERS: "aurelia_users",
    CURRENT_USER: "aurelia_current_user",
    CART: "aurelia_cart",
    ORDERS: "aurelia_orders",
    WISHLIST: "aurelia_wishlist",
};

export const StorageService = {
    // --- USERS & AUTH ---
    getUsers: () => {
        return JSON.parse(localStorage.getItem(KEYS.USERS) || "[]");
    },

    addUser: (user) => {
        const users = StorageService.getUsers();
        // Check if email exists
        if (users.find((u) => u.email === user.email)) {
            throw new Error("User already exists");
        }
        const newUser = {
            ...user,
            id: crypto.randomUUID(),
            role: "user",
            phone: user.phone || "", // Ensure phone is stored
            createdAt: new Date()
        };
        users.push(newUser);
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
        return newUser;
    },

    updateUser: (userId, updatedData) => {
        const users = StorageService.getUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            localStorage.setItem(KEYS.USERS, JSON.stringify(users));

            // If updating current user, sync session
            const currentUser = StorageService.getCurrentUser();
            if (currentUser && currentUser.id === userId) {
                StorageService.setCurrentUser(users[index]);
            }
            return users[index];
        }
        throw new Error("User not found");
    },

    deleteUser: (userId) => {
        const users = StorageService.getUsers();
        const updatedUsers = users.filter((u) => u.id !== userId);
        localStorage.setItem(KEYS.USERS, JSON.stringify(updatedUsers));

        // Clear session if it's the current user
        const currentUser = StorageService.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            StorageService.logout();
        }
    },

    loginUser: (email, password) => {
        // Admin Check (Hardcoded for now as requested or stored?)
        // User requested "add admin login functionality where when admin login with his admin specific credintials"
        // Let's hardcode a master admin or check db.
        if (email === "admin@aurelia.com" && password === "admin123") {
            const adminUser = { id: "admin-001", name: "Aurelia Admin", email, role: "admin" };
            StorageService.setCurrentUser(adminUser);
            return adminUser;
        }

        const users = StorageService.getUsers();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) throw new Error("Invalid credentials");

        StorageService.setCurrentUser(user);
        return user;
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
    },

    setCurrentUser: (user) => {
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    },

    logout: () => {
        localStorage.removeItem(KEYS.CURRENT_USER);
    },

    // --- CART ---
    getCart: (userId) => {
        // In a real app, cart is linked to user. Here we support global (guest) or user-specific.
        // For simplicity, let's keep one cart per browser or prefix with userId if exists.
        const key = userId ? `${KEYS.CART}_${userId}` : KEYS.CART;
        return JSON.parse(localStorage.getItem(key) || "[]");
    },

    saveCart: (userId, cart) => {
        const key = userId ? `${KEYS.CART}_${userId}` : KEYS.CART;
        localStorage.setItem(key, JSON.stringify(cart));
    },

    // --- ORDERS ---
    getOrders: () => {
        return JSON.parse(localStorage.getItem(KEYS.ORDERS) || "[]");
    },

    addOrder: (order) => {
        const orders = StorageService.getOrders();
        const newOrder = { ...order, id: crypto.randomUUID(), status: "Pending", date: new Date().toISOString() };
        orders.push(newOrder); // Add to beginning?
        localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
        return newOrder;
    },

    // Get orders for specific user
    getUserOrders: (userId) => {
        const orders = StorageService.getOrders();
        return orders.filter(o => o.userId === userId);
    },

    // Update order status (Admin)
    updateOrderStatus: (orderId, status) => {
        const orders = StorageService.getOrders();
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = status;
            localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
        }
    }
};
