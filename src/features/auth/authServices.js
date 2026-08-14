const SIMULATE_DELAY = 1500;
export const authServices = {
    login: async (_credentials) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                window.location.href = "/dashboard";
                resolve();
            }, SIMULATE_DELAY);
        });
    },
    register: async (_data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                window.location.href = "/login";
                resolve();
            }, SIMULATE_DELAY);
        });
    },
    forgotPassword: async (_email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, SIMULATE_DELAY);
        });
    },
    validatePasswordStrength: (password) => {
        return password.length >= 8;
    },
    validatePasswordsMatch: (password, confirmPassword) => {
        return Boolean(password && confirmPassword && password === confirmPassword);
    },
};
