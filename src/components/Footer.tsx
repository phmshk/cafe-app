import { FC } from "react";
import Wrapper from "./Wrapper";

const Footer: FC = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <Wrapper>
        <div className="flex justify-between items-center w-full">
          <p className="text-base-100">&copy;2025 by Philipp Litzenberger</p>
          <nav>
            <h6 className="footer-title">Social</h6>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile in a new tab"
              title="GitHub (opens in new tab)"
            >
              LinkedIn
            </a>
            <br />
            <a
              href="https://github.com/phmshk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile in a new tab"
              title="GitHub (opens in new tab)"
            >
              GitHub
            </a>
          </nav>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
