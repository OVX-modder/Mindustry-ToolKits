# 🏭 Mindustry Toolkits

**The Ultimate Companion App for Mindustry Players.**

Mindustry Toolkits is a feature-rich, community-driven Progressive Web App (PWA) designed to make your factory-building experience smoother. Whether you are calculating perfect ratios for vanilla or modded gameplay, looking up recipes, borrowing community logic processors, or sharing your factory schematics, this app has everything you need in one place.

Built with a mobile-first philosophy, it features a beautiful GitHub-inspired dark theme, smooth animations, and is fully installable as an Android APK.

## 🚀 Features

### 🧮 Ratio Calculator
Stop doing mental math. 
* **Simple Mode:** Instantly calculate inputs, outputs, and power requirements for all standard Serpulo and Erekir factories.
* **Advanced Mode:** Playing with mods? Type in custom multi-input/multi-output recipes and let the app do the heavy lifting.

### 📖 Offline Recipe Browser
Your pocket encyclopedia.
* Browse a complete database of factories.
* Search by building name or by the specific resources they output.
* Features pixel-perfect, extracted item icons for immediate visual recognition.
* **100% Offline:** Works perfectly even in Airplane mode.

### 💻 Logic Snippet Library
Master Mindustry's mlog system.
* Access a curated library of community-tested logic processors (from basic toggles to advanced unit miners).
* **One-Tap Copy:** Copy code directly to your clipboard.
* **Favorites System:** Star your most-used scripts to keep them at the top.
* **Built-in Guide:** Includes visual instructions on how to load the code into your Logic Processors in-game.

### 🌐 Community Hub & Schematic Sharing
The heart of the app. Connect with other engineers.
* **Upload:** Share your logic codes, factory layouts, and `.msch` schematics. Add tags and upload showcase screenshots so people know what they are downloading.
* **Discover:** Filter by tags (e.g., `#early-game`, `#defense`) or search for specific items.
* **Social Features:** Upvote the best schematics, leave reviews, reply to other players, and like helpful comments.

### 👤 Personal Profile & Admin Moderation
* Track your total uploads and upvotes.
* Manage and delete your own content.
* **Admin Dashboard:** The developer (Admin) has a golden badge and the ability to moderate *all* content on the platform to keep the community clean.

## 📱 How to Install

### Option 1: Android APK (Recommended)
1. Go to the **[Releases](https://github.com/OVX-modder/mindustry-toolkits/releases)** page on this repository.
2. Download the latest `.apk` file.
3. Open the file on your Android device (you may need to allow "Install from unknown sources").
4. Launch and enjoy!

### Option 2: Progressive Web App (Web)
You don't need to download anything to use the tools.
1. Visit **[https://mindustry-toolkit.netlify.app/](https://mindustry-toolkit.netlify.app/)** on your mobile browser.
2. In Chrome, tap the three dots and select **"Install App"** or **"Add to Home Screen"**.
3. The app will now act exactly like a native app with fullscreen support.

## 🛠️ Tech Stack

This project was built from scratch to be lightweight, fast, and easy to maintain.

* **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6 Modules). No heavy frameworks like React or Angular.
* **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL) for user authentication, image storage, and community data.
* **Hosting:** [Netlify](https://www.netlify.com/) for blazing-fast global content delivery.
* **App Packaging:** [PWABuilder](https://www.pwabuilder.com/) to convert the PWA into an Android App Bundle (AAB) and APK.
* **Styling:** Custom CSS utilizing CSS Variables for seamless Dark/Light mode switching.

## 🧑‍💻 Local Development

If you want to run this project locally or contribute:

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mindustry-toolkits.git
