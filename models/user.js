const db = require("../util/database");

module.exports = class User {
    constructor(userName, email, displayPicture, dateOfBirth, bio, password) {
        this.userName = userName;
        this.email = email;
        this.displayPicture = displayPicture;
        this.dateOfBirth = dateOfBirth;
        this.bio = bio;
        this.password = password;
    }

    save() {
        return db.execute(
            "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (?, ?, ?, ?)",
            [this.userName, this.email, this.dateOfBirth, this.password]
        );
    }

    static fetchAll() {}

    static fetchByName(name) {
        return db.execute("SELECT * FROM user WHERE userName=?", [name]);
    }

    static fetchEmail(name) {
        return db.execute("SELECT email FROM user WHERE userName = (?)", [
            name,
        ]);
    }

    static fetchByEmail(email) {
        return db.execute("SELECT * FROM user WHERE email=?", [email]);
    }

    static fetchLikeName(name) {
        return db.execute("SELECT * FROM user WHERE userName LIKE ?", [
            "%" + name + "%",
        ]);
    }

    static updateBioImage(username, new_bio, imageUrl) {
        return db.execute(
            "UPDATE user SET bio = (?), displayPicture = (?) WHERE userName = (?)",
            [new_bio, imageUrl, username]
        );
    }

    static updatePassword(username, new_password) {
        return db.execute(
            "UPDATE user SET password = (?) WHERE userName = (?)",
            [new_password, username]
        );
    }

    static fetchFollowers(username) {
        return db.execute(
            "SELECT userName, email, displayPicture, dateOfBirth, bio, password FROM user, follows WHERE userName = followerId and followingId = (?);",
            [username]
        );
    }

    static fetchFollowing(username) {
        return db.execute(
            "SELECT userName, email, displayPicture, dateOfBirth, bio, password FROM user, follows WHERE userName = followingId and followerId = (?);",
            [username]
        );
    }

    static deleteByName(username) {
        return db.execute("DELETE FROM user WHERE userName = (?);", [username]);
    }
};
