import './globals.css';

export const metadata = {
  title: 'Zayd Khan - YouTube Channel',
  description:
    'All Zayd Khan YouTube channel video watch here. you watch here shorts video, comedy video, funny video, kids learning video, educational video, video for kids',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}