import React, { forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export type TopNavProps = {
  menuOpen: boolean;
  menuAnimatingOut: boolean;
  onToggleMenu: () => void;
  dropdownRef: React.Ref<HTMLDivElement>;
};

const TopNav = forwardRef<HTMLElement, TopNavProps>(
  ({ menuOpen, menuAnimatingOut, onToggleMenu, dropdownRef }, headerRef) => {
    const handleScrollTo = (target: string) => {
      gsap.to(window, {
        duration: 0.9,
        ease: "power3.inOut",
        scrollTo: { y: target, offsetY: 90 },
      });
    };

    const handleSelect = (target: string) => {
      onToggleMenu();
      handleScrollTo(target);
    };

    return (
      <header
        ref={headerRef}
        className={`top-nav ${
          menuOpen || menuAnimatingOut ? "top-nav--open" : ""
        }`}
      >
        <div className="top-nav-inner">
          <div className="top-nav-left">
            <button
              type="button"
              className="top-nav-menu-toggle"
              onClick={onToggleMenu}
            >
              <span className="top-nav-menu-icon">≡</span>
              <span className="top-nav-menu-label">菜单</span>
            </button>
          </div>

          <div className="top-nav-center">
            <span className="top-nav-logo">冷鱼闲风</span>
          </div>

          <div className="top-nav-right">
            <div className="top-nav-actions">
              <button
                type="button"
                className="top-nav-pill top-nav-pill-accent"
              >
                加入
              </button>
            </div>
          </div>

          <div className="top-nav-ticker">
            <div className="top-nav-ticker-track">
              冷鱼闲风 · Developer × AI Product × Design · 个人实验场
              &nbsp;&nbsp; · &nbsp;&nbsp; 冷鱼闲风 · Developer × AI Product ×
              Design · 个人实验场 &nbsp;&nbsp; · &nbsp;&nbsp;
            </div>
          </div>
        </div>

        {(menuOpen || menuAnimatingOut) && (
          <div
            ref={dropdownRef}
            className={`top-nav-dropdown ${
              menuAnimatingOut
                ? "top-nav-dropdown--closing"
                : "top-nav-dropdown--open"
            }`}
          >
            <button
              type="button"
              className="top-nav-dropdown-item"
              onClick={() => handleSelect("#projects")}
            >
              作品集 · Projects
            </button>
            <button
              type="button"
              className="top-nav-dropdown-item"
              onClick={() => handleSelect("#about")}
            >
              关于我 · About
            </button>
            <button
              type="button"
              className="top-nav-dropdown-item"
              onClick={() => handleSelect("#notes")}
            >
              博客 / 记录 · Notes
            </button>
            <button
              type="button"
              className="top-nav-dropdown-item"
              onClick={() => handleSelect("#contact")}
            >
              联系方式 · Contact
            </button>
          </div>
        )}
      </header>
    );
  }
);

TopNav.displayName = "TopNav";

export default TopNav;
