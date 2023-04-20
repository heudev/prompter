import AutoScroll from "./AutoScroll";
import Draggable from 'react-draggable';

function App() {
  return (
    <div>
      <Draggable>
        <div>
          <AutoScroll className="pb-5-0 mb-5"></AutoScroll>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
