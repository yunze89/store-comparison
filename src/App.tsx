import './App.css'
import TodoRedux from 'components/TodoRedux'
import TodoRecoil from 'components/TodoRecoil'
import TodoRecoilV2 from 'components/TodoRecoilV2'
import TodoZustand from 'components/TodoZustand'

function App() {
  return (
    <>
      <p>redux</p>
      <TodoRedux></TodoRedux>
      <p>recoil</p>
      <TodoRecoil></TodoRecoil>
      <p>recoil with dispatcher</p>
      <TodoRecoilV2></TodoRecoilV2>
      <p>zustand</p>
      <TodoZustand></TodoZustand>
    </>
  )
}

export default App
