import Link from "next/link"
import { Mic } from "lucide-react"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary transition-transform group-hover:scale-105 shadow-lg shadow-primary/20">
        <Mic className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="font-bold tracking-tight text-lg text-foreground">
        AudienceAI
      </span>
    </Link>
  )
}
