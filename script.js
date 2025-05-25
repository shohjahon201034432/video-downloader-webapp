function downloadVideo() {
    const url = document.getElementById("videoLink").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerText = "❗ Iltimos, video havolasini kiriting.";
        return;
    }

    Telegram.WebApp.ready();

    const user = Telegram.WebApp.initDataUnsafe.user;
    const user_id = user?.id;

    if (!user_id) {
        status.innerText = "❌ Telegram orqali ochilganligiga ishonch hosil qiling.";
        return;
    }

    status.innerText = "⏳ Yuklanmoqda...";

    fetch("https://your-backend-domain.com/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url, user_id })
    })
        .then((res) => res.json())
        .then((data) => {
            status.innerText = data.message;
        })
        .catch((err) => {
            console.error(err);
            status.innerText = "❌ Xatolik yuz berdi.";
        });
}
