import DicePage from "./AppParts/DicePage/DicePage";
import SheetPage from "./AppParts/SheetPage/SheetPage";
import style from "./App.module.scss"

function App() {
  return (
    <div className={style.container}>
      <DicePage />
      <SheetPage />
    </div>
  )
}

export default App;
