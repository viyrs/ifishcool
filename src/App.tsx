import "./App.css";
import Hero from "./sections/Hero";

function App() {
  return (
    <div className="app-root">
      <header className="top-nav">
        <div className="top-nav-left">
          <span className="top-nav-logo">冷鱼闲风</span>
        </div>
        <nav className="top-nav-menu">
          <button type="button" className="top-nav-item">
            作品
          </button>
          <button type="button" className="top-nav-item">
            关于
          </button>
          <button type="button" className="top-nav-item">
            联系
          </button>
        </nav>
        {/* <div className="top-nav-right">
          <button type="button" className="top-nav-cta">
            下载简历
          </button>
        </div> */}
      </header>

      <Hero />
    </div>
  );
}

export default App;
