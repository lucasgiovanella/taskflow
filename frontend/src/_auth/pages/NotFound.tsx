import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <FaSadTear className="text-9xl mb-8 animate-bounce" size={48} />
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-lg mb-8">
        Oops! A página que você está procurando não existe.
      </p>
      <Link to="/" className="px-6 py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
