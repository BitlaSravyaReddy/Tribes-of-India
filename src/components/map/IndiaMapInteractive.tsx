"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IndiaMapSVG, interactiveStates } from './IndiaMapSVG';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
const stateNameToCode: Record<string, string> = {
  "Andhra Pradesh": "ap",
  "Telangana": "ts",
  "Tamil Nadu": "tn",
  "Arunachal Pradesh": "arunachal_pradesh", 
  "Assam": "assam",
  "Bihar": "bihar",
  "Chandigarh": "ch", 
  "Chhattisgarh": "chhattisgarh", 
  "Dādra and Nagar Haveli and Damān and Diu": "dn",
  "Delhi": "dl", 
  "Goa": "Goa", 
  "Gujarat": "Gujarat", 
  "Haryana": "Haryana", 
  "Himachal Pradesh": "Himachal", 
  "Jharkhand": "jh", 
  "Karnataka": "karnataka",
  "Kerala": "Kerala", 
  "Madhya Pradesh": "madhyapradesh", 
  "Maharashtra": "maharashtra", 
  "Manipur": "mn", 
  "Meghalaya": "ml", 
  "Mizoram": "mz",
  "Nagaland": "nl", 
  "Orissa": "or", 
  "Puducherry": "py", 
  "Punjab": "pb", 
  "Rajasthan": "rj", 
  "Sikkim": "sk",
   "Tripura": "tr", 
   "Uttar Pradesh": "up", 
   "Uttaranchal": "uk", 
   "West Bengal": "wb",
  "Lakshadweep": "ld", 
  "Jammu and Kashmir": "jk", 
  "Ladakh": "la"
};


export function IndiaMapInteractive() {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (stateName: string) => {
    const code = stateNameToCode[stateName]
    if (code && interactiveStates.includes(stateName)) {
       // ✅ Save state to localStorage
      router.push(`map/landing/${code}`); // ✅ Go to /landing
    }
  };

  const handleMouseEnter = (stateName: string) => {
    if (interactiveStates.includes(stateName)) {
      setHoveredState(stateName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  return (
    <div className="w-full max-w-4xl p-4 md:p-6">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Explore Bharat</CardTitle>
          <p className="text-muted-foreground">Click on a state to learn more. Hover to see names.</p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center gap-6">
          <div 
            className="w-full lg:w-2/3 relative"
            onMouseLeave={handleMouseLeave} // Clear hover when mouse leaves the entire SVG container
          >
            <IndiaMapSVG 
              onStateClick={handleStateClick} 
              hoveredState={hoveredState} 
              />
            {hoveredState && interactiveStates.includes(hoveredState) && (
              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-md shadow-lg text-sm font-semibold">
                {hoveredState}
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3 p-4 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary">Interactive States</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The following states are currently interactive. Click to explore.
            </p>
            <ul className="space-y-1 max-h-60 overflow-y-auto pr-2">
              {interactiveStates.map(state => (
                <li key={state}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`w-full justify-start ${selectedState === state ? 'bg-accent text-accent-foreground' : ''}`}
                    onClick={() => handleStateClick(state)}
                    onMouseEnter={() => handleMouseEnter(state)}
                  >
                    {state}
                  </Button>
                </li>
              ))}
            </ul>
             <p className="text-xs text-muted-foreground mt-4">
              Note: Map is a simplified representation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
