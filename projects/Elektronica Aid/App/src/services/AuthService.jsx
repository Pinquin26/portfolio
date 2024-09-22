import pb from "./PocketbaseService";

class AuthService {
    constructor({ user, error }) {
        this.db = pb;
        this.user = user;
        this.error = error;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.loginFromCookies = this.loginFromCookies.bind(this);
    }

    async login(usrn, ps) {
        try {
            // Inloggen met gebruikersnaam en wachtwoord.
            const authData = await this.db
                .collection("users")
                .authWithPassword(usrn, ps);
            if (authData) {
                // Als de authenticatiegegevens bestaan, stel de gebruikersmodel in en retourneer succes.
                this.setUserModel(authData);
                return { type: true };
            } else {
                // Anders geef een foutmelding en retourneer false.
                this.error("Er is iets misgegaan");
                return false;
            }
        } catch (e) {
            // Vang eventuele fouten op en geef een foutmelding terug.
            this.error(e.message);
            return false;
        }
    }

    logout() {
        // Uitloggen door cookies te wissen en gebruikersinformatie te verwijderen.
        const authData = this.db.authStore.clear();
        this.user.setUser(false);
        return authData;
    }

    async register(formData) {
        const {
            username,
            password,
            confirmPassword,
            name,
            lastName,
            email,
            city,
            postalCode,
            street,
            number,
            bus,
            country,
            dateOfBirth,
        } = formData;
        try {
            const authData = await this.db.collection("users").create({
                username,
                password,
                passwordConfirm: confirmPassword,
                name,
                lastName,
                email,
                city,
                postalCode,
                street,
                number,
                bus,
                country,
                dateOfBirth,
            });
            console.log(authData);
            if (authData) {
                console.log(authData);
                await this.login(username, password);
                return true;
            } else {
                this.error("Something went wrong, please try again");
                return false;
            }
        } catch (e) {
            this.error(e.message);
            console.log(e);
            return false;
        }
    }
    async updateUser(userId, formData) {
        console.log(formData.email);
        try {
            const {
                username,
                name,
                lastName,
                email,
                city,
                postalCode,
                street,
                number,
                bus,
                country,
            } = formData;
            const updatedUser = await this.db
                .collection("users")
                .update(userId, {
                    //username: this.user.username,
                    email: email,
                    bus: bus,
                    city: city,
                    country: country,
                    //dateOfBirth: this.user.dateOfBirth,
                    name: name,
                    lastName: lastName,
                    number: number,
                    postalCode: postalCode,
                    street: street,
                    //favorites: this.user.favorites,
                    //shoppingcart: this.user.shoppingcart,
                    //admin: this.user.admin,
                });
            if (updatedUser) {
                this.updateUserModel(updatedUser);
                return true;
            } else {
                this.error("Something went wrong, please try again");
                return false;
            }
        } catch (e) {
            this.error(e.message);
            console.log(e);
            return false;
        }
    }

    async loginFromCookies() {
        // Inloggen met behulp van opgeslagen cookies.
        const dataModel = {
            record: this.db.authStore.model,
            token: this.db.authStore.token,
        };
        this.setUserModel(dataModel);
    }
    setUserModel(data) {
        this.user.setUser({
            username: data.record.username,
            emailVisibility: data.record.emailVisibility,
            email: data.record.email,
            bus: data.record.bus,
            name: data.record.name,
            lastName: data.record.lastName,
            city: data.record.city,
            postalCode: data.record.postalCode,
            street: data.record.street,
            number: data.record.number,
            country: data.record.country,
            dateOfBirth: data.record.dateOfBirth,
            id: data.record.id,
            verified: data.record.verified,
            admin: data.record.admin,
            favorites: data.record.favorites,
            shoppingcart: data.record.shoppingcart,
        });
    }
    updateUserModel(data) {
        const updatedFields = {};
        for (const field in data.record) {
            if (this.user.hasOwnProperty(field)) {n
                updatedFields[field] = data.record[field];
            }
        }
        this.user.setUser(
            Object.assign({}, this.user, updatedFields)
        );
    }

    get isLoggedIn() {
        console.log(this.db.authStore.isValid);
        return this.db.authStore.isValid;
    }
}

export default AuthService;
