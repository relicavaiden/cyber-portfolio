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
                <>
                    <h2>Engineering</h2>
                    <p>A developer focused on building clean, maintainable software with security considered from the start.</p>
                </>
            )}
            

            {perspective === "security" && (
                <>
                    <h2>Cybersecurity</h2>
                    <p>A cybersecurity professional focused on identifying weaknesses, hardening systems, and improving application security.</p>
                </>
            )}
                    
            </div>
        </section>
    );
};

export default HeroSection;