function createTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    return h + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + session;
}
