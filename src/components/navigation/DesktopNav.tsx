import { navigation } from "@/navigation/navigation";
import NavigationList from "./NavigationList";

const DesktopNav = () => {
    return (
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <div>Edward Ricks</div>

            <NavigationList navigation={navigation}/>
        </div>
    );
};

export default DesktopNav;