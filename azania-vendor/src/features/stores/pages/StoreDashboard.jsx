import StoreBanner from "../components/StoreBanner";

const store = {
  name: "Azania Electronics",
  description: "Quality electronics at affordable prices",
  banner: "/images/store-banner.jpg",
  logo: "/images/store-logo.png",
  productCount: 42,
  followers: 128
};

function StoreDashboard() {
  return (
    <div>
      <StoreBanner store={store} />
    </div>
  );
}

export default StoreDashboard;