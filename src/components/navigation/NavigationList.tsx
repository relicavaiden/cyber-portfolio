import NavigationLink from "./NavigationLink";
import type { NavigationItem } from "@/navigation/navigation";

interface NavigationListProps {
    navigation: NavigationItem[];
}

const NavigationList = ({navigation}: NavigationListProps) => {
    return (
        <nav aria-label="Main navigation" className="flex items-center gap-6">
            {navigation.map((navLink) => (
                <NavigationLink
                    key={navLink.path}
                    item={navLink}
            />
            ))}
        </nav>
    );
};

export default NavigationList;