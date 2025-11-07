import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const videos = [
  { name: "Exploring the Universe", img: "/src/assets/logo.png", description: "Learn about galaxies, stars, and planets.", url: "https://www.youtube.com/embed/xyz123" },
  { name: "The Solar System", img: "/src/assets/logo.png", description: "Discover the planets in our solar system.", url: "https://www.youtube.com/embed/abc456" },
  { name: "Life on Mars?", img: "/src/assets/logo.png", description: "Explore the possibilities of life on Mars.", url: "https://www.youtube.com/embed/def789" },

  // added videos (total 10)
  { name: "How Stars Are Born", img: "/src/assets/logo.png", description: "Star formation explained.", url: "https://www.youtube.com/embed/1G7G4z0Jk0I" },
  { name: "Black Holes Explained", img: "/src/assets/logo.png", description: "What is a black hole?", url: "https://www.youtube.com/embed/e-P5IFTqB98" },
  { name: "The Milky Way Tour", img: "/src/assets/logo.png", description: "A guided tour of our galaxy.", url: "https://www.youtube.com/embed/7WbXkG6qX5Q" },
  { name: "Exoplanets 101", img: "/src/assets/logo.png", description: "Finding planets around other stars.", url: "https://www.youtube.com/embed/8hX9M7k0bQw" },
  { name: "The Scale of the Universe", img: "/src/assets/logo.png", description: "From atoms to galaxies.", url: "https://www.youtube.com/embed/1f9I8wZ9pqk" },
  { name: "Gravity & Orbits", img: "/src/assets/logo.png", description: "How gravity shapes motion in space.", url: "https://www.youtube.com/embed/7n3hT8k5GfU" },
  { name: "Space Telescopes", img: "/src/assets/logo.png", description: "How we see the universe.", url: "https://www.youtube.com/embed/3bI3mN0XyV4" },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col text-white bg-black">
      <Header activePage="videos" />
      <SearchBar data={videos} />
      <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-2">{video.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{video.description}</p>
            <div className="relative" style={{paddingTop: '56.25%'}}>
              <iframe
                src={video.url}
                title={video.name}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}