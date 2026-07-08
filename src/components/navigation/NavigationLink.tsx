import Link from "next/link"
import type {NavigationItem} from "@/navigation/navigation";

interface NavigationLinkProps {
    item: NavigationItem;
}

const NavigationLink = ({item}: NavigationLinkProps) => {
    switch (item.status) {
        case "available":
            return(
                <Link href={item.path}>
                    {item.name}
                </Link>
            )
        case "disabled":
            return(
                <span>
                    {item.name}
                </span>
            )
        case "coming-soon":
            return(
                <span>
                    {item.name}
                    <span> Coming Soon</span>
                </span>
            )
        default:
            return null;
    }
};

export default NavigationLink;