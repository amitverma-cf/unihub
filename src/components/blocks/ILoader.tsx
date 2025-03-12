import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const ILoader = ({ size, right }: { size?: string, right?: boolean }) => {
    return (
        <div className="flex flex-row justify-center items-center text-center w-full">
            <Loader2 size={size} className={cn("animate-spin", right ? "mr-2 mt-0.5" : "")} />
        </div>
    )
}

export default ILoader