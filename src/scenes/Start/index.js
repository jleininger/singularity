import { useNavigate } from "react-router-dom";
import "./index.css";

function Start({ onClick }) {
  const navigate = useNavigate();

  return (
    <div className="start-screen">
      <div className="center">
        <h1>Singularity</h1>
        <p
          className="start"
          onClick={() => {
            navigate("/singularity");
          }}
        >
          (Click here to start)
        </p>
      </div>
      <footer>
        <a
          href="https://www.jadonleininger.com/#/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          More
        </a>
        <p className="middle">
          Created by <br />
          <a
            href="https://www.jadonleininger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jadon Leininger
          </a>
        </p>
        <a
          href="https://github.com/jleininger/singularity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </footer>
    </div>
  );
}

export default Start;
