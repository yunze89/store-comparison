import './App.css'
import TodoOldRedux from 'components/TodoOldRedux'
import TodoRedux from 'components/TodoRedux'
import TodoRecoil from 'components/TodoRecoil'
import TodoRecoilV2 from 'components/TodoRecoilV2'
import TodoZustand from 'components/TodoZustand'
import Generator from 'components/Generator'
import ReRenderTest from 'components/ReRenderTest'

function App() {

  return (
    <>
      {/* <p>redux</p>
      <TodoOldRedux></TodoOldRedux> */}
      <p>redux-toolkit</p>
      <TodoRedux></TodoRedux>
      <p>recoil</p>
      <TodoRecoil></TodoRecoil>
      <p>recoil with dispatcher</p>
      <TodoRecoilV2></TodoRecoilV2>
      <p>zustand</p>
      <TodoZustand></TodoZustand>

      {/* <p>generator test</p>
      <Generator></Generator> */}

      {/* <p>rerender test</p>
      <ReRenderTest></ReRenderTest> */}
    </>
  )
}

export default App
