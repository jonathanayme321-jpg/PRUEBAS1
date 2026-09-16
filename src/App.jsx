import { ThemeProvider } from './context/ThemeContext'
import { CalendarProvider } from './context/CalendarContext'
import { Header } from './components/layout/Header'
import { CalendarPage } from './pages/CalendarPage'
import { ThemeModal } from './components/theme/ThemeModal'
import { BottomNav } from './components/layout/BottomNav'

function App() {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <div className="min-h-screen bg-slate-50/50 dark:bg-[#121212] text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Header />
          <CalendarPage />
          <ThemeModal />
          <BottomNav />
        </div>
      </CalendarProvider>
    </ThemeProvider>
  )
}

export default App