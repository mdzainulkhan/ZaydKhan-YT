# Zayd Khan - YouTube Channel Dashboard

A modern YouTube channel dashboard built with **Next.js** that displays videos from the **Zayd Khan** YouTube channel using the **YouTube Data API v3**. The application provides a clean, responsive interface where users can browse videos, search content, and view real-time channel statistics.

## Features

* Fetches all videos from the Zayd Khan YouTube channel using the YouTube Data API.
* Real-time channel statistics.
* Displays:

  * Total Subscribers
  * Total Videos Published
  * Total Channel Views
* Video Search functionality.
* Responsive video grid layout.
* Video thumbnails with title and publish date.
* Add Light and Dark mode.
* Watch videos directly on the same page.
* Fast loading and optimized performance.
* Mobile-friendly responsive design.

## Tech Stack

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* YouTube Data API v3
* Axios (API Requests)

## Screenshots

Add screenshots of the homepage, search functionality, and channel statistics here.

```
/public/screenshots/home.png
/public/screenshots/search.png
/public/screenshots/stats.png
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/zayd-khan.git
```

Move to the project folder:

```bash
cd zayd-khan
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and add your YouTube API Key:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_CHANNEL_ID=YOUR_CHANNEL_ID
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

## Project Structure

```
app/
components/
lib/
public/
styles/
```

## API

This project uses the **YouTube Data API v3** to retrieve:

* Channel Information
* Subscriber Count
* Total Videos
* View Count
* Playlist Videos
* Search Results

## Performance

* Server-side rendering with Next.js
* Optimized API requests
* Responsive UI
* Lazy-loaded images
* SEO-friendly pages

## Future Enhancements

* Video Categories
* Pagination / Infinite Scroll
* Dark Mode
* Playlist Support
* Trending Videos
* Favorite Videos
* Watch Later
* Related Videos
* Video Filtering

## Live Demo

```
https://zaydkhan.vercel.app/
```

## License

This project is licensed under the MIT License.

---

**Developed with Next.js and the YouTube Data API to create a fast, responsive, and user-friendly YouTube channel dashboard for the Zayd Khan channel.**
