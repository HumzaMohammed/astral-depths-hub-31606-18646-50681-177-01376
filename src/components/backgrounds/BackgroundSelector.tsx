import { useState } from "react";
import { NeuralLightGrid } from "./NeuralLightGrid";
import { DataStreamHorizon } from "./DataStreamHorizon";
import { QuantumMeshfield } from "./QuantumMeshfield";
import { FloatingCodeParticles } from "./FloatingCodeParticles";
import { DigitalCityBlueprint } from "./DigitalCityBlueprint";
import { AuroraMatrix } from "./AuroraMatrix";
import { HolographicDNA } from "./HolographicDNA";
import { CyberwaveGrid } from "./CyberwaveGrid";
import { FractalIntelligence } from "./FractalIntelligence";
import { AICoreReactor } from "./AICoreReactor";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const backgrounds = [
  { id: 1, name: "Neural Light Grid", component: NeuralLightGrid },
  { id: 2, name: "Data Stream Horizon", component: DataStreamHorizon },
  { id: 3, name: "Quantum Meshfield", component: QuantumMeshfield },
  { id: 4, name: "Floating Code Particles", component: FloatingCodeParticles },
  { id: 5, name: "Digital City Blueprint", component: DigitalCityBlueprint },
  { id: 6, name: "Aurora Matrix", component: AuroraMatrix },
  { id: 7, name: "Holographic DNA", component: HolographicDNA },
  { id: 8, name: "Cyberwave Grid", component: CyberwaveGrid },
  { id: 9, name: "Fractal Intelligence", component: FractalIntelligence },
  { id: 10, name: "AI Core Reactor", component: AICoreReactor },
];

export const BackgroundSelector = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CurrentBackground = backgrounds[currentIndex].component;

  const nextBackground = () => {
    setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBackground = () => {
    setCurrentIndex((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  return (
    <>
      <CurrentBackground />
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevBackground}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium min-w-[200px] text-center">
          <span className="text-muted-foreground">Background #{currentIndex + 1}:</span>
          <br />
          <span className="text-foreground">{backgrounds[currentIndex].name}</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={nextBackground}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
