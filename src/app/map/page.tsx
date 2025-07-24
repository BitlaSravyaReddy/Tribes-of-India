'use client'
import { redirect } from 'next/navigation'
import { IndiaMapInteractive } from '../../components/map/IndiaMapInteractive';
import '../globals.css'


export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 bg-background">
      <IndiaMapInteractive />
    </main>
  );
}
