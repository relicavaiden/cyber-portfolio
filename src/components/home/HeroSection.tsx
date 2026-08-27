type PortfolioPerspectiveProps = {
    perspective: "engineering" | "security"
};

const HeroSection = (
    {perspective,}: PortfolioPerspectiveProps
) => {
    return (
        <section>
            <div>
                {perspective === "engineering" && (
                <div className="engineering-enter">
                    <h2 className="pt-4 pb-2 text-center text-xl">Engineering</h2>

                    <p className="text-center pb-2 text-balance max-w-96
                    ">A developer focused on building clean, maintainable software with security considered from the start.</p>
                </div>
            )}
            

            {perspective === "security" && (
                <div className="security-enter">
                    <h2 className="pt-4 pb-2 text-center text-xl">Cybersecurity</h2>

                    <p className="text-center text-balance pb-2 max-w-96">A cybersecurity professional focused on identifying weaknesses, hardening systems, and improving application security.</p>
                </div>
            )}
                    
            </div>
        </section>
    );
};

export default HeroSection;