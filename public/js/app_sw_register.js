if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/app_sw.js")
        .then((reg) => {
            console.log("Service worker registered")
        })
        .catch((err) => {
            console.error("Service worker registration failed:", err)
        })
}