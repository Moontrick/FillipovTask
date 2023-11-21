import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About page here!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, modi!
      </p>
      <Link to="/home">Home Page</Link>
    </div>
  );
};

export default About;