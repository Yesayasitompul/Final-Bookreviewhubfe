import { useNavigate } from "react-router-dom";
import { BookOutlined, RightOutlined, MoonFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 w-full py-3 px-6 transition-all duration-300 z-50 ${isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md" : "bg-transparent"}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <BookOutlined className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">BookReviewHub</span>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => {}} className="px-3 py-1 text-sm bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg font-medium transition-colors duration-300">
              Login
            </button>
            <button onClick={() => navigate("/books")} className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
              Koleksi Buku
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <BookOutlined className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-5xl" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Book Review Hub</span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Atur koleksi buku yang telah Anda baca dengan praktis. Tambahkan,
            ubah, dan kelompokan buku berdasarkan kategori serta ulasan.
          </p>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <FeatureCard
                color="from-blue-500 to-cyan-400"
                icon={<BookFilled />}
                title="Koleksi Buku"
                description="Satu tempat untuk menyimpan dan menyusun semua buku favorit Anda dengan rapi."
              />
              <FeatureCard
                color="from-purple-500 to-pink-400"
                icon={<TagFilled />}
                title="Kategori"
                description="Sesuaikan kategori agar buku bisa dikelompokkan sesuai genre atau topik pilihan Anda."
              />
              <FeatureCard
                color="from-yellow-400 to-orange-500"
                icon={<StarFilled />}
                title="Ulasan"
                description="Bagikan kesan dan opini Anda tentang setiap buku dalam koleksi Anda. "
              />
            </div>

            <button
              onClick={() => navigate("/books")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2 text-lg">AYO TELUSURI</span> 
              <RightOutlined className="animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Wavy Divider */}
      <div className="relative h-20 -mt-1">
        <svg className="absolute bottom-0 w-full h-20 fill-current text-white dark:text-gray-800" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
              Fitur Unggulan
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
              Apa yang Kami Sediakan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMSAxLTEyIDAgNiA2IDAgMCAxIDEyIDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatItem value="10,000+" label="Buku Tersimpan" />
            <StatItem value="2,500+" label="Pengguna Aktif" />
            <StatItem value="30+" label="Kategori Tersedia" />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-white dark:bg-gray-800 relative z-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 rounded-3xl p-12 shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 relative z-10">
              Mulai Atur Koleksi Buku Anda Sekarang
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
              Simpan semua buku favorit Anda di satu tempat dan buat perpustakaan digital Anda sendiri
            </p>
            <button
              onClick={() => navigate("/books")}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg relative z-10"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <BookOutlined className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">BookReview</span>
            </div>
            <div className="flex space-x-6">
              <FooterLink href="#" icon={<SocialIcon />} text="Instagram" />
              <FooterLink href="#" icon={<SocialIcon />} text="Twitter" />
              <FooterLink href="#" icon={<SocialIcon />} text="Facebook" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 BookReview. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              Dibuat tiap <MoonFilled className="text-blue-400" /> Dibuat Oleh Yesaya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature icons
const BookFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
  </svg>
);

const TagFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39.92 3.31 0l4.801-4.801a2.25 2.25 0 000-3.182L12.18 3.327a3 3 0 00-2.12-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
      clipRule="evenodd"
    />
  </svg>
);

const StarFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
      clipRule="evenodd"
    />
  </svg>
);

const SocialIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

// Data for features section
const features = [
  {
    icon: <BookFilled />,
    title: "Koleksi Lengkap",
    description: "Simpan buku dalam jumlah tak terbatas",
    color: "from-blue-400 to-cyan-300"
  },
  {
    icon: <TagFilled />,
    title: "Kategori Kustom",
    description: "Buat dan atur kategori sesuai kebutuhan",
    color: "from-purple-400 to-pink-300"
  },
  {
    icon: <StarFilled />,
    title: "Sistem Rating",
    description: "Beri penilaian untuk setiap buku yang Anda baca",
    color: "from-yellow-400 to-orange-300"
  },
  {
    icon: <SearchIcon />,
    title: "Pencarian Cepat",
    description: "Temukan buku dengan mudah dan cepat",
    color: "from-green-400 to-teal-300"
  }
];


// Feature card component with gradient
const FeatureCard = ({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800">
      <div className={`text-white mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

// Feature item component
const FeatureItem = ({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center p-4 transform hover:scale-105 transition-transform duration-300">
      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {description}
      </p>
    </div>
  );
};

// Statistic item component
const StatItem = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
};

// Footer link component
const FooterLink = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <a 
      href={href}
      className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
    >
      <span className="mr-1">{icon}</span>
      <span className="text-sm">{text}</span>
    </a>
  );
};

// You would need to add the CSS animation to your stylesheet
// For simplicity, we've defined it in the cssAnimation constant above

export default Home;