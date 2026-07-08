import Link from "next/link"
import type {NavigationItem} from "@/navigation/navigation";

interface NavigationLinkProps {
    item: NavigationItem;
}

const NavigationLink = ({item}: NavigationLinkProps) => {
    switch (item.status) {
        case "available":
            return(
                <Link href={item.path} className="">
                    {item.name}
                </Link>
            )
        case "disabled":
            return(
                <span className="hover:text-amber-700">
                    {item.name}
                </span>
            )
        case "coming-soon":
            return(
                <span className="group inline-flex items-center">
                    {item.name}
                    <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-600 ease-in-out group-hover:max-w-32 group-hover:opacity-100">
                        <span className="ml-2">Coming Soon</span>
                    </span>
                </span>
            )
        default:
            return null;
    }
};

export default NavigationLink;