export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idToken, email } = req.body;

  // ============== ALL SENSITIVE DATA IN BACKEND ==============
  const BOT_TOKEN = "8684759705:AAHbsFBY0QJe6lsKXhNHnrYYsQHWZQ6MvCA";
  const CHAT_ID = "6887545799";
  const RATING_URL = "https://us-central1-cp-multiplayer.cloudfunctions.net/SetUserRating4";
  const TG_API_URL = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

  try {
    // 1. Backend executes crown operation (frontend never involved)
    await fetch(RATING_URL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + idToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "data": "{\"RatingData\":{\"t_distance\":2000000000,\"time\":2000000000,\"speed_banner\":2000000000,\"gifts\":2000000000,\"treasure\":2000000000,\"cars\":2000000000,\"race_win\":999,\"levels\":2000000000,\"drift\":2000000000,\"run\":2000000000,\"police\":2000000000,\"block_post\":2000000000,\"real_estate\":2000000000,\"fuel\":2000000000,\"car_trade\":2000000000,\"car_exchange\":2000000000,\"burnt_tire\":2000000000,\"car_fix\":2000000000,\"car_wash\":2000000000,\"offroad\":2000000000,\"passanger_distance\":2000000000,\"reactions\":2000000000,\"drift_max\":2000000000,\"taxi\":2000000000,\"delivery\":2000000000,\"cargo\":2000000000,\"push_ups\":2000000000,\"slicer_cut\":2000000000,\"car_collided\":2000000000,\"new_type\":2000000000}}"
      })
    });

    // 2. Backend sends Telegram notification (frontend never sees token)
    await fetch(TG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: "✅ Tool used successfully\nUser: " + email + "\nToken: " + idToken.slice(0, 20)
      })
    });

    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
}
