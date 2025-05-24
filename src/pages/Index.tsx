import { Footer } from "@/components/ui/footer";
import { WikiGame } from "@/components/wiki-game/WikiGame";

const Index = () => {
  return (
    <div className="flex-grow min-h-screen bg-slate-100 py-8">
      <WikiGame />
      <Footer />
    </div>
  );
};

export default Index;
