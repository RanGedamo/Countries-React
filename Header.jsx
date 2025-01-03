

const Header = ()=>{
    return(
        <>
        <button
        type="button"
        aria-label="Scroll Top Button"
        className="button scroll-top flex flex-ai-c flex-jc-c scale-effect"
      >
        <i className="fa-regular fa-chevron-up icon"></i>
      </button>
      <header className="header">
        <div className="container flex flex-jc-sb flex-ai-c">
          <div className="logo">
            <a href="index.html">
              <h1>Where in the world?</h1>
            </a>
          </div>
          <button
            type="button"
            aria-label="Theme Switcher Button"
            className="theme-toggle flex flex-jc-sb flex-ai-c"
          >
            <i className="fa-regular fa-moon theme-icon"></i>
            <span className="theme-text">Dark Mode</span>
          </button>
        </div>
      </header>
      </>
    )
}

export default Header;