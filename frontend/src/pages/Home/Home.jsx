/* eslint-disable react/prop-types */
import ProjectList from "../Project/ProjectList";

const Home = (props) => {
  const { change, sendRefresh } = props;

  return (
    <div className="absolute w-full mt-16">
      <ProjectList change={change} sendRefresh={sendRefresh} />
    </div>
  );
};

export default Home;
