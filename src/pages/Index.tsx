import { Footer } from "@/components/ui/footer";
import { WikiGame } from "@/components/wiki-game/WikiGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-8">
      <WikiGame />
      <Footer />
    </div>
  );
};

export default Index;
