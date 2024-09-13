const Generator = () => {
    function* counter() {
        let count = 0;
        while (true) {
          count += 1;
          yield count;
        }
      }
      
    const countGen = counter();
      
    const executeCountGen = () => {
        console.log(countGen.next().value)
    }

    return (
        <div>
            Generator
            <button onClick={executeCountGen}> executeCountGen </button>
        </div>
    )
}

export default Generator