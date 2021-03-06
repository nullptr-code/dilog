const db = require("../util/database");

module.exports = class Post {
    constructor(id, postId, userName, text, reacts, creationTime) {
        this.id = id;
        this.userName = userName;
        this.postId = postId;
        this.text = text;
        this.reacts = reacts;
        this.creationTime = creationTime;
    }

    save() {
        return db.execute(
            `INSERT INTO comment
            (userName, postId, reacts, creationTime, text) 
            VALUES
            (?, ?, ?, ?, ?);`,
            [
                this.userName,
                this.postId,
                this.reacts,
                this.creationTime,
                this.text,
            ]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM comment ORDER BY(creationTime) desc");
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM comment WHERE id = ?", [id]);
    }

    static fetchByPostId(postId) {
        return db.execute("SELECT * from comment WHERE postId=?", [postId]);
    }

    static updateText(id, newText) {
        return db.execute("UPDATE comment SET text=? WHERE (id=?);", [
            newText,
            id,
        ]);
    }

    static updateReact(id, reacts) {
        return db.execute("UPDATE comment SET reacts=? WHERE (id=?)", [
            reacts,
            id,
        ]);
    }

    static deleteById(id) {
        return db.execute("DELETE FROM comment WHERE id=?;", [id]);
    }

    static reportByID(commentID, creationTime, reportReason) {
        return db.execute(
            "INSERT INTO reportcomments (commentID, creationTime, reportReason) VALUES (?, ?, ?)",
            [commentID, creationTime, reportReason]
        );
    }
};
